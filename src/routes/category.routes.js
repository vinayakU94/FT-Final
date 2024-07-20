import { Router } from "express";
import { addCategory, getAllCategory, getCategory } from "../controllers/category.controller.js";


const router = Router();

router.route("/add").post(addCategory);

router.route("/get").get(getCategory);
router.route("/getAll").get(getAllCategory);

export default router;
