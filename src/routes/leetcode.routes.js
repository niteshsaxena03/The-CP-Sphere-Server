import express from "express";
import { body } from "express-validator"; // Importing validation middleware
import {
  addLeetCodeUsername,
  getLeetCodeUsernames,
} from "../controllers/leetcode.controller.js"; // Import both controller functions

const router = express.Router();

// Route to add a new LeetCode username
router.post(
  "/leetcode-username", // Define the endpoint for adding a LeetCode username
  [
    body("username")
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
  ],
  addLeetCodeUsername // Controller function to handle the request
);

// Route to get all LeetCode usernames
router.get("/leetcode-username", getLeetCodeUsernames); // Add this line for the GET route

export default router;
