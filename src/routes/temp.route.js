import { Router } from "express";
import { registerUser } from "../controllers/temp.controller.js";
// import { Router } from "express";
import { addProduct, getProduct,getAllProducts } from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/temp").post(
    upload.fields([
      {
        name: "image",
        maxCount: 1,
      },
    ]),
    registerUser
  );




export default router;
