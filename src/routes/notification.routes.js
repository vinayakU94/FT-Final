import { Router } from "express";
import { sendNotificationToFCM } from "../controllers/Notification.controller.js";

const router = Router();

router.route("/sendToFCM").post(sendNotificationToFCM);

// router.route("/sendUser").post(loginUser);

// router.route("/update").post(updateUser);

export default router;
