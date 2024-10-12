import { Router } from "express";
import {
  signupUser,
  getUnsolvedQuestions,
  addUnsolvedQuestion,
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

router.route("/:email/unsolved-questions").post(addUnsolvedQuestion);

export default router;
