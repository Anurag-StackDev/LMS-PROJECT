
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice.js';
import instrutorReducer from './features/instructorSlice.js';
import courseReducer from './features/courseSlice.js';
import orderReducer from './features/orderSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    instructor: instrutorReducer,
    course: courseReducer,
    order: orderReducer,
  },

});

export default store;
