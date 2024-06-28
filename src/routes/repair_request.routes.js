import { Router } from "express";
import { addRepairRequest, getRepairRequest, getAllRepairRequests } from "../controllers/repair_request.controller.js";


const router = Router();

router.route("/add").post(addRepairRequest);

router.route("/get").get(getRepairRequest);
router.route("/getAll").get(getAllRepairRequests);

export default router;
