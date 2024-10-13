import { linkAccController } from "../controller/linkAccContoller.js";
import express from "express";

const router = express.Router();

router.get("/cms", linkAccController.getAllLinkAccounts);
router.get("/", linkAccController.getLinkAccounts);
router.post("/", linkAccController.addLinkAcc);
router.put("/", linkAccController.updateLinkAcc);
router.delete("/", linkAccController.deleteLinkAcc);

export { router as linkAccRouter };
