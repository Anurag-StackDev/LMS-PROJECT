import express from "express";
import { authProtected } from "../middleware/auth.middleware.js";
import {
  enrolledCourse,
  enrolledCourses,
  userProfile,
  updateProfile,
} from "../controllers/user.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.get("/profile", authProtected, userProfile),
  router.post("/update-profile", authProtected, upload, updateProfile),
  router.get("/enrolledCourses", authProtected, enrolledCourses);
router.post("/enrolledCourse", authProtected, enrolledCourse);

export default router;
