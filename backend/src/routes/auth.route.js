import express from "express";
import { handleRefreshToken, login, logout, register } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/refresh_token", handleRefreshToken);

export default router;
