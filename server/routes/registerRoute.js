import express from "express";
import { userController } from "../controller/userController.js";
const router = express.Router();

router.post("/", userController.signup);

export { router as registerRouter };
