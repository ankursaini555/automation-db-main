// src/index.ts
require("./config/otelConfig");
import express from "express";
import { AppDataSource } from "./data-source"; // Database connection
import routes from "./routes/routes"; // Import the combined routes
import dotenv from "dotenv";
import { logger } from "./utils/logger";

// Initialize dotenv to load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware for parsing JSON request body
app.use(express.json());

// Initialize database connection and server
async function initializeApp() {
  try {
    // Establish the database connection
    const connection = await AppDataSource.initialize();

    logger.info("Database connection established successfully!");

    // Register all routes
    app.use("/", routes);

    // Start the Express server
    app.listen(port, () => {
      logger.info(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.trace(error);
    logger.error("Error during database initialization:", error);
  }
}

// Start the application
initializeApp();
