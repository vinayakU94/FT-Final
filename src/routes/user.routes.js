import { Router } from "express";
import { loginUser, registerUser, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/signup").post(registerUser);

router.route("/login").post(loginUser);

router.route("/update").post(updateUser);

export default router;
