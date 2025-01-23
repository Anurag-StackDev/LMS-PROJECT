import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/axiosInstance";

const initialState = {
  courses: [] ,
  loading: false,
  error: null,
  searchResults: [],
};

export const allCourses = createAsyncThunk(
  "course/allCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("api/course/all");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch courses");
    }
  }
);

export const searchCourse = createAsyncThunk(
  "course/searchCourse",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`api/course/search?query=${query}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Search failed");
    }
  }
);

export const singleCourse = createAsyncThunk(
  "course/singleCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`api/course/singleCourse/${courseId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch course");
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(allCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.courses;
      })
      .addCase(allCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.courses;
      })
      .addCase(searchCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(singleCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(singleCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.searchCourses;
      })
      .addCase(singleCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = courseSlice.actions;
export default courseSlice.reducer;
