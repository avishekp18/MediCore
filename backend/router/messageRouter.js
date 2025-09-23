import express from "express";
import {
  getAllMessages,
  sendMessage,
} from "../controller/messageController.js";
import { authenticate, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

// Send a message (restricted to Admin or Patient)
router.post(
  "/",
  authenticate("Patient", "patientToken"), // or "Admin", "adminToken"
  sendMessage
);

// Get all messages (Admin only)
router.get("/", authenticate("Admin", "adminToken"), getAllMessages);

export default router;
