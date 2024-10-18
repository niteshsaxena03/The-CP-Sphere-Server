import { Message } from "../models/message.model.js"; // Adjust the import path as necessary
import asyncHandler from "../utils/AsyncHandler.js";

// Controller for adding a new message
const addMessage = asyncHandler(async (req, res) => {
  try {
    const { name, message, date, time } = req.body;

    // Find the existing message document (if it exists)
    let messageDocument = await Message.findOne();

    // If no document exists, create one
    if (!messageDocument) {
      messageDocument = new Message({
        messages: [], // Initialize with an empty array
      });
    }

    // Create a new message object
    const newMessage = {
      name,
      message,
      date,
      time,
    };

    // Add the new message to the messages array
    messageDocument.messages.push(newMessage);

    // Save the updated message document to the database
    await messageDocument.save();

    // Respond with the created message and updated messages
    return res.status(201).json({
      success: true,
      data: messageDocument.messages, // Return the updated messages array
    });
  } catch (error) {
    console.error("Error adding message:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Controller function to fetch all messages
const getMessages = asyncHandler(async (req, res) => {
  try {
    // Attempt to find the first message document
    let messageDocument = await Message.findOne();

    // If no document exists, create one with an empty messages array
    if (!messageDocument) {
      messageDocument = new Message({
        messages: [], // Initialize with an empty array
      });
      await messageDocument.save(); // Save the new document to the database
    }

    // Return the messages array (which may now be empty)
    return res.status(200).json({
      success: true,
      data: messageDocument.messages, // Return the messages array
    });
  } catch (error) {
    console.error("Error retrieving messages:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export { addMessage, getMessages };
