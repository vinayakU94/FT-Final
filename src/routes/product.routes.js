import { Router } from "express";
import { addProduct, getProduct } from "../controllers/product.controller.js";


const router = Router();

router.route("/add").post(addProduct);

router.route("/get").get(getProduct);
// router.route("/getAll").get(getAllCategory);

export default router;

import { Router } from "express";
import { addProduct, getProduct } from "../controllers/product.controller.js";


const router = Router();

router.route("/add").post(addProduct);

router.route("/get").get(getProduct);
// router.route("/getAll").get(getAllCategory);

export default router;
