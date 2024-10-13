import { User } from "../models/user.model.js"; // Import your User model
import { validationResult } from "express-validator"; // For validation
import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";

// Controller function to handle user signup
const signupUser = asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, "Validation error", errors.array());
  }

  // Destructure the incoming request body
  const { fullName, email, experienceLevel, firebaseUid } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "User already exists");
    }

    // Create a new user document in MongoDB
    const newUser = new User({
      fullName,
      email,
      experienceLevel,
      firebaseUid, // Store the Firebase UID
      unsolvedQuestions: [], // Initialize the unsolved questions array
    });

    // Save the user to MongoDB
    await newUser.save();

    // Send success response
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error during signup:", error);
    throw new ApiError(500, "Server error during user registration");
  }
});

// Controller function to fetch unsolved questions for a user
const getUnsolvedQuestions = asyncHandler(async (req, res) => {
  const { email } = req.params; // Expecting email in params

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Return the unsolved questions
    res.status(200).json({ unsolvedQuestions: user.unsolvedQuestions });
  } catch (error) {
    console.error("Error fetching unsolved questions:", error);
    throw new ApiError(500, "Server error while fetching questions");
  }
});

// Controller function to add a new unsolved question
const addUnsolvedQuestion = asyncHandler(async (req, res) => {
  const { email } = req.params; // Get email from params
  const { question, link } = req.body; // Get question and link from the request body

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the question already exists
    const questionExists = user.unsolvedQuestions.some((q) => q.link === link);
    if (questionExists) {
      return res.status(400).json({ message: "Question already exists" });
    }

    // Add the new question to the unsolved questions array
    user.unsolvedQuestions.push({ question, link });
    await user.save(); // Save the updated user document

    // Return the new question
    res.status(201).json({ newQuestion: { question, link } });
  } catch (error) {
    console.error("Error adding unsolved question:", error);
    throw new ApiError(500, "Server error while adding question");
  }
});

// Controller function to delete an unsolved question
const deleteUnsolvedQuestion = asyncHandler(async (req, res) => {
  const { email } = req.params; // Get email from params
  const { questionName } = req.body; // Expecting the question name in the request body

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter the unsolvedQuestions array to remove the question with the matching name
    user.unsolvedQuestions = user.unsolvedQuestions.filter(
      (question) =>
        question.question.toLowerCase() !== questionName.toLowerCase()
    );

    await user.save();

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    throw new ApiError(500, "Internal server error");
  }
});

const getQuestionLogsByEmail = asyncHandler(async (req, res) => {
  try {
    const { email } = req.params; // Get user email from the request parameters
    const user = await User.findOne({ email }); // Fetch user by email

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.questionLogs); // Send the question logs
  } catch (error) {
    console.error("Error fetching question logs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const addQuestionLog = asyncHandler(async (req, res) => {
  const { email, questionName, link, dateSolved, topic, learning } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new question log object
    const newLog = {
      questionName,
      link,
      dateSolved,
      topic,
      learning,
    };

    // Push the new log into the user's questionLogs array
    user.questionLogs.push(newLog);

    // Save the updated user document
    await user.save();

    return res
      .status(201)
      .json({ message: "Question log added successfully", log: newLog });
  } catch (error) {
    console.error("Error adding question log:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

const deleteQuestionLog = async (req, res) => {
  const { email } = req.params; // Get the email from the request parameters
  const { questionName } = req.body; // Get the question name from the request body

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter out the log with the specified question name from questionLogs
    user.questionLogs = user.questionLogs.filter(
      (log) => log.questionName !== questionName
    );

    await user.save(); // Save the updated user document

    return res
      .status(200)
      .json({ message: "Question log deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting question log", error });
  }
};

export {
  signupUser,
  getUnsolvedQuestions,
  addUnsolvedQuestion,
  deleteUnsolvedQuestion,
  getQuestionLogsByEmail,
  addQuestionLog,
  deleteQuestionLog,
};
