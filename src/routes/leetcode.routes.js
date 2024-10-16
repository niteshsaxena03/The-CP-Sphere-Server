import express from "express";
import { body } from "express-validator"; // Importing validation middleware
import { addLeetCodeUsername } from "../controllers/leetcode.controller.js"; // Adjust the path as necessary

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

export default router;
