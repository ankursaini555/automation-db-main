import { Router } from "express";
import SessionRoutes from "./SessionRoutes"; // Import session-related routes
import PayloadRoutes from "./PayloadRoutes"; // Import payload-related routes
import { checkDatabaseHealth } from "../utils/db-health";
const router = Router();

// Mount session and payload related routes
router.use("/api/sessions", SessionRoutes);
router.use("/payload", PayloadRoutes);

router.get("/health", async (req, res) => {
  try {
    const dbHealth = await checkDatabaseHealth();

    res.status(200).send({
      service: process.env.DB_USERNAME || "Database Service",
      database: dbHealth,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(500).send({
      message: "An error occurred while performing the health check.",
      error: error,
    });
  }
});

export default router;
