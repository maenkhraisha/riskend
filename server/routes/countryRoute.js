import { countryController } from "../controller/countryContoller.js";
import express from "express";

const router = express.Router();

router.get("/", countryController.getCountries);
router.post("/", countryController.addCountry);
router.put("/", countryController.updateCountry);
router.delete("/", countryController.deleteCountry);

export { router as countryRouter };
