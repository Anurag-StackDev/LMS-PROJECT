import express from "express";
import { authProtected } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.js";
import {
  createCourse,
  deleteCourse,
  instructorCourses,
  updateCourse,
} from "../controllers/Instructor.controller.js";

const router = express.Router();

router.post("/create-course", authProtected, upload, createCourse);
router.put("/update-course/:courseId", authProtected, upload, updateCourse);
router.delete("/delete-course/:courseId", authProtected, deleteCourse);
router.get("/instructor-courses", authProtected, instructorCourses);

export default router;