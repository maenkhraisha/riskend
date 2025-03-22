import { masterAccController } from "../controller/masterAccContoller.js";
import express from "express";

const router = express.Router();

router.get("/connect", masterAccController.getMasterAccountsConnect);
router.get("/my-account", masterAccController.getMasterAccountsById);
router.get("/", masterAccController.getMasterAccounts);
router.post("/", masterAccController.addMasterAcc);
router.put("/", masterAccController.updateMasterAcc);
router.delete("/", masterAccController.deleteMasterAcc);

export { router as masterAccRouter };
