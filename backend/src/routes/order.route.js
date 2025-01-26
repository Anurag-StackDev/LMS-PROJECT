import express from "express";
import { authProtected } from "../middleware/auth.middleware.js";
import { createStripeSession, handlePaymentSuccess } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/create-session',authProtected, createStripeSession);
router.post('/payment-success', handlePaymentSuccess);

export default router;
