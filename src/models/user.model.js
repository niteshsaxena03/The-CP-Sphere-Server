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
});

export const User = mongoose.model("User", userSchema);
