import { Router } from "express";
import { addPendingAction, getAllPendingActions, getRepairRequestsPendingAction, updatePendingAction } from "../controllers/pendingActions.controller.js";


const router = Router();

router.route("/add").post(addPendingAction);

router.route("/update").post(updatePendingAction);

router.route("/get").post(getRepairRequestsPendingAction);

router.route("/getall").get(getAllPendingActions);

export default router;
