import { Router } from "express";
import {
  addRepairRequest,
  getRepairRequest,
  getAllRepairRequests,
} from "../controllers/repair_request.controller.js";


import { upload } from "../middleware/multer.middleware.js";


const router = Router();

router.route("/add").post(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  addRepairRequest
);

router.route("/get").get(getRepairRequest);
router.route("/getAll").get(getAllRepairRequests);

export default router;
