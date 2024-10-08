import { brokerAccController } from "../controller/brokerAccContoller.js";
import express from "express";

const router = express.Router();

router.get("/:id", brokerAccController.getBrokerAccounts);
router.post("/", brokerAccController.addBrokerAcc);
router.put("/", brokerAccController.updateBrokerAcc);
router.delete("/", brokerAccController.deleteBrokerAcc);

export { router as brokerAccRouter };
