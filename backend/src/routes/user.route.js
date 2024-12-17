import express from "express"
import { authProtected } from "../middleware/auth.middleware.js"
import { enrolledCourses, getUserProfile, updateProfile } from "../controllers/user.controller.js"
import upload from "../middleware/multer.js"

const router = express.Router()

router.get("/profile", authProtected, getUserProfile),
router .post("/update-profile",authProtected,upload.single("imageFile"), updateProfile ),
router.get("/enrolledIn", authProtected, enrolledCourses)

export default router