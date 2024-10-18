import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"; // Ensure you have dotenv for environment variables

dotenv.config({
  path: "./src/.env",
});

const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Use the environment variable for better security
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" })); // Set a limit for JSON payloads
app.use(express.static("public")); // Serve static files from the "public" directory
app.use(urlencoded({ extended: true, limit: "16kb" })); // Parse URL-encoded data
app.use(cookieParser()); // Parse cookies

// Routes import
import userRouter from "./src/routes/user.routes.js";
import leetcodeRouter from "./src/routes/leetcode.routes.js";
import messageRouter from "./src/routes/message.routes.js";

// Routes declaration
app.use("/api/v1/users", userRouter); // Update to match your API versioning
app.use("/api/v1/leetcode", leetcodeRouter); // Add leetcode routes
app.use("/api/v1/messages", messageRouter); // Add message routes


// Export the app for server initiation
export { app };
