import {User} from "../models/User.model.js";
import { checkNullUndefined } from "../utils/tools.js";

import { Category } from "../models/category.model.js";
import {  Product } from "../models/Product.model.js";
// import { checkNullUndefined } from "../utils/tools.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const registerUser =  async (req, res) => {
  const { name , categoryId } = req.body;

  if (checkNullUndefined(name) || checkNullUndefined(categoryId)) {
    return res.status(400).json({ error: "invalid credentials" });
  }

  const imageLocalPath = req.files?.image[0]?.path;
    if (!imageLocalPath) {
        return res.status(400).json({ error: "image not present" });
    }
    const imageLink = await uploadOnCloudinary(imageLocalPath)


  try {
    const existedCategory = await Category.findOne({
      $or: [{ _id:categoryId }],
    });

    if (!existedCategory) {
      return res.status(400).json({
        status: "Failed",
        message: "Category does not exist",
      });
    }
    const product = await Product.create({
      name,categoryId,image: imageLink.url
    });
    const createdProduct = await Product.findById(product._id);

    if (!createdProduct) {
      return res.status(400).json({
        status: "Failed",
        message: "something went wrong",
      });
    }

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error("Error creating Product:", error);
    res.status(500).json({ error: "Internal server error" });
  }  }













export {
    registerUser,
  
}
