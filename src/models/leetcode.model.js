import mongoose from "mongoose";

// Define the schema for LeetCode usernames
const leetCodeUsernameSchema = new mongoose.Schema({
  usernames: {
    type: [String], // An array of strings to store usernames
    required: true,
    default: [], // Optional: set a default empty array
  },
});

// Create the model based on the schema
const LeetCodeUsername = mongoose.model(
  "LeetCodeUsername",
  leetCodeUsernameSchema
);

// Export the model for use in other files
export default LeetCodeUsername;
