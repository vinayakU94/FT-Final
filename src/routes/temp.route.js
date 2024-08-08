import { Router } from "express";
import { registerUser } from "../controllers/temp.controller.js";

const router = Router();

router.route("/temp").post(registerUser);



export default router;
