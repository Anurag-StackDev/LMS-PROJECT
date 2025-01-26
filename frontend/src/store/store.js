import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice.js";
import instrutorReducer from "./features/instructorSlice.js";
import courseReducer from "./features/courseSlice.js";
import orderReducer from "./features/orderSlice.js";
import userReducer from "./features/userSlice.js";
import courseProgress from "./features/courseProgressSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    order: orderReducer,
    course: courseReducer,
    instructor: instrutorReducer,
    courseProgress: courseProgress,
  },
});

export default store;
