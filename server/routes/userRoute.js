import express from "express";
import { userController } from "../controller/userController.js";
import verifyJWT from "../middleware/verifyJWT.js";
const router = express.Router();

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.get("/logout", userController.logout);

router.post("/resetPassword/:token", userController.resetPassword);

router.post("/forgetPassword", userController.forgetPassword);

router.get("/users", verifyJWT, userController.getUsers);
router.get("/:id", verifyJWT, userController.getUser);

export { router as userRouter };
