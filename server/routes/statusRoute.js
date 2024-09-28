import express from "express";
import { statusController } from "../controller/statusContoller.js";
import verifyJWT from "../middleware/verifyJWT.js";
const router = express.Router();

router.get("/", verifyJWT, statusController.getStatus);
router.post("/", verifyJWT, statusController.addStatus);
router.put("/", verifyJWT, statusController.updateStatus);
router.delete("/", verifyJWT, statusController.deleteStatus);

export { router as statusRouter };
