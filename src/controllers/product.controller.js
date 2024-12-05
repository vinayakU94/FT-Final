
import { Category } from "../models/category.model.js";
import {  Product } from "../models/Product.model.js";
import { checkNullUndefined } from "../utils/tools.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const addProduct = async (req, res) => {
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
  }
  // res.status(201).json({message:"hello"})
};

const getProduct = async (req, res) => {
  const { name } = req.body;

  if (checkNullUndefined(name)) {
    return res.status(400).json({ error: "invalid credentials" });
  }

  try {
    const existedCategory = await Category.findOne({
      $or: [{ name }],
    });

    if (!existedCategory) {
      return res.status(400).json({
        status: "Failed",
        message: "Category does not Exist",
      });
    }

    res.status(201).json({ message: "ok", body: existedCategory });
  } catch (error) {
    console.error("Error getting category", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});

    if (!allProducts) {
      return res.status(400).json({
        status: "Failed",
        message: "Product does not Exist",
      });
    }

    res.status(201).json({ message: "ok", body: allProducts });
  } catch (error) {
    console.error("Error getting all Products", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export {
  addProduct,
  getProduct,
  getAllProducts
}