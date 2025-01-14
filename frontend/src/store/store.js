
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice.js';
import instrutorReducer from './features/instructorSlice.js';
import courseReducer from './features/courseSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    instructor: instrutorReducer,
    course: courseReducer,
  },
});

export default store;
