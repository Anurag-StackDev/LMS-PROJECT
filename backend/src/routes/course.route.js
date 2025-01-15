import express from "express"
import { getAllCourse, searchCourse, singleCourse } from "../controllers/course.controller.js"

const router = express.Router()

router.get("/all", getAllCourse)
router.get("/search",searchCourse)
router.get("/singleCourse/:courseId", singleCourse)

export default router