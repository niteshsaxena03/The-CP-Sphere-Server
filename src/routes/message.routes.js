import express from "express";
import { body } from "express-validator"; // Importing validation middleware
import { addMessage, getMessages } from "../controllers/message.controller.js"; // Import both controller functions

const router = express.Router();

// Route to add a new message
router.post(
  "/new-message", // Define the endpoint for adding a new message
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("message").notEmpty().withMessage("Message is required"),
    body("date").optional().isISO8601().withMessage("Invalid date format"), // Made optional
    body("time").notEmpty().withMessage("Time is required"),
  ],
  addMessage // Controller function to handle the request
);

// Route to get all messages
router.get("/all-messages", getMessages); // Use the controller for fetching messages

export default router;
