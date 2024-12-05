import { Router } from "express";
import { addLocation, getLocations } from "../controllers/location.controller.js";

const router = Router();

router.route("/add").post(addLocation);

router.route("/get").post(getLocations);

export default router;
