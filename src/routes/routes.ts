import { Router } from "express";
import { checkDatabaseHealth, JsonResponseToText } from "../utils/db-health";
import PayloadRoutes from "./PayloadRoutes"; // Import payload-related routes
import SessionRoutes from "./SessionRoutes"; // Import session-related routes
const router = Router();

// Mount session and payload related routes
router.use("/api/sessions", SessionRoutes);
router.use("/payload", PayloadRoutes);

router.get("/health", async (req, res) => {
  try {
    const dbHealth = await checkDatabaseHealth();
    const textResponse = JsonResponseToText(dbHealth);
    res.status(200).send(textResponse);
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(500).send({
      message: "An error occurred while performing the health check.",
      error: error,
    });
  }
});

export default router;
