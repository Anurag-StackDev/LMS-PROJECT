import express from "express";
import { authProtected } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.js";
import {
  createCourse,
  deleteCourse,
  enrolledStudents,
  updateCourse,
} from "../controllers/Instructer.controller.js";

const router = express.Router();

const uploadFiles = upload.fields([{ name: "thumbnail", name: "lectures" }]);

router.post("/create-course", authProtected, uploadFiles, createCourse);
router.post("/update-course", authProtected, uploadFiles, updateCourse);
router.get("/delete-course/:courseId", authProtected, deleteCourse);
router.get("/enrolled-students", authProtected, enrolledStudents);

export default router;
