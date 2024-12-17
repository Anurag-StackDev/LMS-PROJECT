import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookiesParser from "cookie-parser";
import connectDB from "./database/db.js";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import courseRoutes from "./routes/course.route.js";
import instructerRoutes from "./routes/instructer.route.js";
import orderRoutes from "./routes/order.route.js";
import courseProgressRoutes from "./routes/progress.route.js";

const app = express();

const PORT = process.env.PORT || 6969;

//middleware
app.use(express.json({ limit: "10mb" }));
app.use(cookiesParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

//routes

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/instructer", instructerRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/progress", courseProgressRoutes);

//error handle
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("server is connected to Port : " + PORT);
  } catch (error) {
    console.error(error);
  }
});
