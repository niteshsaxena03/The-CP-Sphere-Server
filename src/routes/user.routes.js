import { Router } from "express";
import {
  signupUser,
  getUnsolvedQuestions,
  addUnsolvedQuestion,
  deleteUnsolvedQuestion,
  getQuestionLogsByEmail,
  addQuestionLog,
  deleteQuestionLog,
  getUserByEmail,
} from "../controllers/user.controller.js";
import { body } from "express-validator"; // For validation

// Initialize the router
const router = Router();

// POST /api/v1/users/signup - Register a new user
router.route("/signup").post(
  [
    // Validation checks
    body("fullName").notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("experienceLevel")
      .notEmpty()
      .withMessage("Experience level is required"),
    body("firebaseUid").notEmpty().withMessage("Firebase UID is required"),
  ],
  signupUser // Call the controller function
);

// GET /api/v1/users/:email/unsolved-questions - Fetch unsolved questions for the user
router.route("/:email/unsolved-questions").get(getUnsolvedQuestions);

// POST /api/v1/users/:email/unsolved-questions - Add an unsolved question
router.route("/:email/unsolved-questions").post(addUnsolvedQuestion);

// DELETE /api/v1/users/:email/unsolved-questions - Delete an unsolved question by name
router.route("/:email/unsolved-questions").delete(deleteUnsolvedQuestion);

// GET /api/v1/users/logs/:email - Fetch question logs for the user
router.route("/logs/:email").get(getQuestionLogsByEmail);

// POST /api/v1/users/logs - Add a question log for the user
router.route("/logs").post(
  [
    // Validation checks (you can add validations as needed)
    body("email").isEmail().withMessage("Valid email is required"),
    body("questionName").notEmpty().withMessage("Question name is required"),
    body("link").isURL().withMessage("Valid link is required"),
    body("dateSolved").notEmpty().withMessage("Date solved is required"),
    body("topic").notEmpty().withMessage("Topic is required"),
    //body("learning").notEmpty().withMessage("Learning details are required"),
  ],
  addQuestionLog // Call the controller function to add a question log
);

// DELETE /api/v1/users/logs/:email - Delete a question log by name
router.route("/logs/:email").delete(
  [
    body("questionName").notEmpty().withMessage("Question name is required"), // Validation for question name
  ],
  deleteQuestionLog // Call the controller function to delete a question log
);

// Route to fetch user details
router.route("/email/:email").get(getUserByEmail); // Fetch user by emailry


export default router;
