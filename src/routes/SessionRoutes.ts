// SessionDetailsRoutes.ts
import { Router } from "express";
import {
  getAllSessions,
  getSessionById,
  checkSessionById,
  createSession,
  createPayloadForSession,
  getPayloadBySessionId,
  updateSession,
  deleteSession,
} from "../controllers/SessionDetailsController";

const router = Router();

router.get("/", getAllSessions);
router.get("/:sessionId", getSessionById);
router.get("/check/:sessionId", checkSessionById);
router.post("/", createSession);
router.post("/payload", createPayloadForSession);
router.get("/payload/:sessionId", getPayloadBySessionId);
router.put("/:sessionId", updateSession);
router.delete("/:sessionId", deleteSession);

export default router;
