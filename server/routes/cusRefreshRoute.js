import express from "express";
import { cusRefreshController } from "../controller/cusResfreshTokenController.js";
const router = express.Router();

router.get("/", cusRefreshController.getRefreshToken);

export { router as cusRefreshRouter };
