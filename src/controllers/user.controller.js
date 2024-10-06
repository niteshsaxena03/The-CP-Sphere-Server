import { User } from "../models/user.model.js"; // Import your User model
import { validationResult } from "express-validator"; // For validation
import asyncHandler from "../utils/AsyncHandler.js"

// Controller function to handle user signup
const signupUser = asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure the incoming request body
  const { fullName, email, experienceLevel, firebaseUid } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user document in MongoDB
    const newUser = new User({
      fullName,
      email,
      experienceLevel,
      firebaseUid, // Store the Firebase UID
    });

    // Save the user to MongoDB
    await newUser.save();

    // Send success response
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error during user registration" });
  }
});

export {signupUser};