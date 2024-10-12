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
    type: [String], // or [Schema.Types.ObjectId] if referencing another schema
    default: [], // Initializes with an empty array
  },
});

export const User = mongoose.model("User", userSchema);
