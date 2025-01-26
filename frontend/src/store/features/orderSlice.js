import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/axiosInstance";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/order/create-session",
        orderData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const handlePaymentSuccess = createAsyncThunk(
  "order/handlePaymentSuccess",
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/order/payment-success",
        { sessionId }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(handlePaymentSuccess.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map(order =>
          order.paymentId === action.payload.paymentId ? action.payload : order
        );
      })
      .addCase(handlePaymentSuccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default orderSlice.reducer;
