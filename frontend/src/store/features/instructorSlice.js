import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/axiosInstance";

const initialState = {
  iCourses: [],
  loading: false,
  error: null,
  message: null,
};

export const instructorCourses = createAsyncThunk(
  "instructor/instructorCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/instructor/instructor-courses");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch courses");
    }
  }
);

export const createCourse = createAsyncThunk(
  "instructor/createCourse",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/instructor/create-course",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Course creation failed");
    }
  }
);

export const updateCourse = createAsyncThunk(
  "instructor/updateCourse",
  async ({ courseId, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/instructor/update-course/${courseId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Course update failed");
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "instructor/deleteCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/instructor/delete-course/${courseId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Course deletion failed");
    }
  }
);

const instructorSlice = createSlice({
  name: "instructor",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearMessage(state) {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(instructorCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(instructorCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.iCourses = action.payload.courses;
      })
      .addCase(instructorCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.iCourses.push(action.payload.course);
        state.message = action.payload.message;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.iCourses.findIndex(course => course._id === action.payload.course._id);
        if (index !== -1) {
          state.iCourses[index] = action.payload.course;
        }
        state.message = action.payload.message;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.iCourses = state.iCourses.filter(course => course._id !== action.meta.arg);
        state.message = action.payload.message;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearMessage } = instructorSlice.actions;
export default instructorSlice.reducer;
