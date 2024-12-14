import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import connectDB from "./database/db.js";

const app = express();

const PORT = process.env.PORT || 6969;

//middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

//routes



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
