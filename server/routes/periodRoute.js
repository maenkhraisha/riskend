import express from "express";
import { periodController } from "../controller/periodContoller.js";
const router = express.Router();

router.get("/", periodController.getPeriods);
router.post("/", periodController.addPeriod);
router.put("/", periodController.updatePeriod);
router.delete("/", periodController.deletePeriod);

export { router as periodRouter };
