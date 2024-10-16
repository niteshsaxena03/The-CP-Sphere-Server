import asyncHandler from "../utils/AsyncHandler.js"; // Import asyncHandler for handling async errors
import { validationResult } from "express-validator"; // Import validationResult for validation checks
import ApiError from "../utils/ApiError.js"; // Import your custom ApiError class
import LeetCodeUsername from "../models/leetcode.model.js"; // Import the LeetCodeUsername model

// Controller function to add a new LeetCode username
const addLeetCodeUsername = asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, "Validation error", errors.array());
  }

  const { username } = req.body;

  try {
    // Find the LeetCode usernames document (assuming there's only one document)
    const leetcodeDoc = await LeetCodeUsername.findOne();

    if (!leetcodeDoc) {
      // Create a new document if none exists
      const newLeetCodeUsername = new LeetCodeUsername({
        usernames: [username],
      });
      await newLeetCodeUsername.save();
      return res
        .status(201)
        .json({ message: "LeetCode username added successfully" });
    }

    // Check if the username already exists
    if (leetcodeDoc.usernames.includes(username)) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Add the new username to the array
    leetcodeDoc.usernames.push(username);
    await leetcodeDoc.save();

    res.status(200).json({ message: "LeetCode username added successfully" });
  } catch (error) {
    console.error("Error adding LeetCode username:", error);
    throw new ApiError(500, "Server error while adding username");
  }
});

const getLeetCodeUsernames = async (req, res) => {
  try {
    const usernames = await LeetCodeUsername.find(); // Fetch all usernames
    res.status(200).json(usernames); // Return the usernames in the response
  } catch (error) {
    res.status(500).json({ message: "Error fetching usernames", error });
  }
};

export { addLeetCodeUsername, getLeetCodeUsernames }; // Export the controller function for use in your routes
