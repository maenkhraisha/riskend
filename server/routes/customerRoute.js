import express from "express";
import { customerController } from "../controller/customerController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.post("/signup", customerController.signup);

router.post("/login", customerController.login);

router.post("/resetPassword/:token", customerController.resetPassword);

router.post("/forgetPassword", customerController.forgetPassword);

router.get("/logout", verifyJWT, customerController.logout);
router.get("/:id", verifyJWT, customerController.getCustomer);
router.get("/", verifyJWT, customerController.getCustomers);
router.put("/", verifyJWT, customerController.updateCustomer);
router.post("/change-password", verifyJWT, customerController.updatePassword);

export { router as customerRouter };
