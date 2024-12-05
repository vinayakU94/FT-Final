import { Router } from "express";
import { addCategory, getAllCategory, getCategory } from "../controllers/category.controller.js";

import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/add").post(
    upload.fields([
      {
        name: "image",
        maxCount: 1,
      },
    ]),
    addCategory
  );

router.route("/get").get(getCategory);
router.route("/getAll").get(getAllCategory);

export default router;
