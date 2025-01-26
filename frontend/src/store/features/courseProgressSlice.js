import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/axiosInstance";

const initialState = {
  progress: [],
  loading: false,
  error: null,
};

export const getProgress = createAsyncThunk(
  "progress/progress",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/course-progress`, {
        courseId
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch progress"
      );
    }
  }
);

export const updateProgress = createAsyncThunk(
  "progress/updateProgress",
  async (progressData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/api/update-progress`,
        {progressData}
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update progress"
      );
    }
  }
);

const progressSlice = createSlice({
  name: "progress",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload.Progress;
      })
      .addCase(getProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload.courseProgress;
      })
      .addCase(updateProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default progressSlice.reducer;
