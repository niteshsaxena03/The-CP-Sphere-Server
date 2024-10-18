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
    default: [],
  },
});

// Create the model based on the schema
const Message = mongoose.model("Message", messageSchema);

// Export the model for use in other files
export default Message;
