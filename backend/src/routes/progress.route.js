import express from "express"
import { authProtected } from "../middleware/auth.middleware.js"
import { courseProgress, updateCourseProgress } from "../controllers/progress.controller.js"

const router = express.Router()

router.get("course-progress", authProtected, courseProgress)
router.post("update-progress", authProtected, updateCourseProgress)

export default router