import mongoose from "mongoose";

// Define the schema for messages
const messageSchema = new mongoose.Schema({
  messages: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        time: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
    default: [
      {
        name: "Alice",
        message: "Hello everyone! Excited to discuss here.",
        date: new Date("2024-10-18T10:00:00"), // Specific date
        time: "10:00 AM",
      },
      {
        name: "Bob",
        message: "Hi Alice! Welcome to the discussion.",
        date: new Date("2024-10-18T10:05:00"),
        time: "10:05 AM",
      },
      {
        name: "Charlie",
        message: "What topics are we discussing today?",
        date: new Date("2024-10-18T10:10:00"),
        time: "10:10 AM",
      },
    ],
  },
});

// Create the model based on the schema
const Message = mongoose.model("Message", messageSchema);

// Export the model for use in other files
export default Message;
