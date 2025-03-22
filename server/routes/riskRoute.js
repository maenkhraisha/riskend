import express from "express";
import { riskController } from "../controller/riskContoller.js";
const router = express.Router();

router.get("/", riskController.getRisks);
router.post("/", riskController.addRisk);
router.put("/", riskController.updateRisk);
router.delete("/", riskController.deleteRisk);

export { router as riskRouter };
