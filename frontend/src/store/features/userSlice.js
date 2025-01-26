import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/axiosInstance";

const initialState = {
  EdCourses: [],
  EdCourse: null,
  loading: false,
  error: null,
};

export const enrolledCourses = createAsyncThunk(
  "user/enrolledCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("api/user/enrolledCourses");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "No course found");
    }
  }
);

export const enrolledCourse = createAsyncThunk(
  "user/enrolledCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("api/user/enrolledCourse", {
        courseId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch course");
    }
  }
);

export const userProfile = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("api/user/profile");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch profile");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "api/user/update-profile",
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update profile"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(enrolledCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(enrolledCourses.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.EdCourses = payload.courses;
      })
      .addCase(enrolledCourses.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.error;
      })
      .addCase(enrolledCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(enrolledCourse.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.EdCourse = payload.course;
      })
      .addCase(enrolledCourse.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.error;
      });
  },
});

export default userSlice.reducer;
