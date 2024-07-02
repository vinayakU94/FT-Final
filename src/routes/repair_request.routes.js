import { Router } from "express";
import { addRepairRequest, getRepairRequest, getAllRepairRequests,updateRepairRequestStatus } from "../controllers/repair_request.controller.js";


const router = Router();

router.route("/add").post(addRepairRequest);

router.route("/get").get(getRepairRequest);
router.route("/getAll").get(getAllRepairRequests);
router.route("/update-status").put(updateRepairRequestStatus);

export default router;
