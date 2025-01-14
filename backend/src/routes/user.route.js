import express from "express"
import { authProtected } from "../middleware/auth.middleware.js"
import { enrolledCourses, userProfile, updateProfile } from "../controllers/user.controller.js"
import upload from "../middleware/multer.js"

const router = express.Router()

router.get("/profile", authProtected, userProfile),
router .post("/update-profile",authProtected,upload, updateProfile ),
router.get("/enrolledIn", authProtected, enrolledCourses)

export default router