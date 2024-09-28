import { countryController } from "../controller/countryContoller.js";
import express from "express";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.get("/", countryController.getCountries);
router.post("/", verifyJWT, countryController.addCountry);
router.put("/", verifyJWT, countryController.updateCountry);
router.delete("/", verifyJWT, countryController.deleteCountry);

export { router as countryRouter };
