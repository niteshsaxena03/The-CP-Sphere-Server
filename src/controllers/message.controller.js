import asyncHandler from "../utils/AsyncHandler.js"; // Import asyncHandler for handling async errors
import { validationResult } from "express-validator"; // Import validationResult for validation checks
import ApiError from "../utils/ApiError.js"; // Import your custom ApiError class
import Message from "../models/message.model.js"; // Import the Message model

// Controller for adding a new message
const addMessage = asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, "Validation error", errors.array());
  }

  const { name, message, date, time } = req.body;

  try {
    // Find the existing message document (assuming there's only one document)
    let messageDocument = await Message.findOne();

    // If no document exists, return a 404 response
    if (!messageDocument) {
      return res.status(404).json({
        success: false,
        message: "No message document found. Please create one first.",
      });
    }

    // Create a new message object
    const newMessage = {
      name,
      message,
      date: date || new Date(), // Use provided date or current date if not provided
      time,
    };

    // Add the new message to the messages array
    messageDocument.messages.push(newMessage);
    await messageDocument.save();

    res.status(201).json({
      success: true,
      data: messageDocument.messages, // Return the updated messages array
      message: "Message added successfully",
    });
  } catch (error) {
    console.error("Error adding message:", error);
    throw new ApiError(500, "Server error while adding message");
  }
});

// Controller function to fetch all messages
const getMessages = asyncHandler(async (req, res) => {
  try {
    let messageDocument = await Message.findOne(); // Find the first message document
    if (!messageDocument) {
      // Initialize a new message document if none exists
      messageDocument = new Message({
        messages: [], // Initialize with an empty array
      });
      await messageDocument.save(); // Save to the database
    }
    res.status(200).json({
      success: true,
      data: messageDocument.messages, // Return the messages array
    });
  } catch (error) {
    console.error("Error retrieving messages:", error);
    throw new ApiError(500, "Error fetching messages");
  }
});

export { addMessage, getMessages }; // Export the controller function for use in your routes
