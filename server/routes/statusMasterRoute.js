import express from "express";
import { statusMasterController } from "../controller/statusMasterContoller.js";
import verifyJWT from "../middleware/verifyJWT.js";
const router = express.Router();

router.get("/", verifyJWT, statusMasterController.getStatus);
router.post("/", verifyJWT, statusMasterController.addStatus);
router.put("/", verifyJWT, statusMasterController.updateStatus);
router.delete("/", verifyJWT, statusMasterController.deleteStatus);

export { router as statusMasterRouter };
