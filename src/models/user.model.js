import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  experienceLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  firebaseUid: {
    type: String,
    required: true, // This will store the Firebase UID
  },
  unsolvedQuestions: {
    type: [{ question: String, link: String }], // Specify the type as an array of objects
    default: [
      {
        question: "What is the time complexity of binary search?",
        link: "https://example.com/question1",
      },
      {
        question: "Explain the difference between a stack and a queue.",
        link: "https://example.com/question2",
      },
      {
        question: "What is dynamic programming?",
        link: "https://example.com/question3",
      },
    ],
  },
});

export const User = mongoose.model("User", userSchema);
