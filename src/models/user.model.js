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
    type: [{ question: String, link: String }],
    default: [
      {
        question: "Example Question 1",
        link: "https://example.com/question1",
      },
      {
        question: "Example Question 2",
        link: "https://example.com/question2",
      },
      {
        question: "Example Question 3",
        link: "https://example.com/question3",
      },
    ],
  },
  questionLogs: {
    type: [
      {
        questionName: String,
        link: String,
        dateSolved: Date,
        topic: String,
        learning: String,
      },
    ],
    default: [
      {
        questionName: "Dummy Question 1",
        link: "https://example.com/question-log1",
        dateSolved: new Date("2024-10-01"),
        topic: "Data Structures",
        learning: "Learned about arrays and linked lists.",
      },
      {
        questionName: "Dummy Question 2",
        link: "https://example.com/question-log2",
        dateSolved: new Date("2024-10-05"),
        topic: "Algorithms",
        learning: "Understood the concept of sorting algorithms.",
      },
    ],
  },
});

export const User = mongoose.model("User", userSchema);
