import express from "express";
import { authProtected } from "../middleware/auth.middleware.js";
import { createStripeSession, stripeWebhook } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/create-session", authProtected, createStripeSession);
router.post("/stripe-webhook", authProtected, express.raw({ type: "application/json" }), stripeWebhook);

export default router;
