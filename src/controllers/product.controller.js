
import { Category } from "../models/category.model.js";
import {  Product } from "../models/Product.model.js";
import { checkNullUndefined } from "../utils/tools.js";

const addProduct = async (req, res) => {
  const { name , categoryId } = req.body;

  if (checkNullUndefined(name) || checkNullUndefined(categoryId)) {
    return res.status(400).json({ error: "invalid credentials" });
  }

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
      name,categoryId
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
};

const getProduct = async (req, res) => {
  const { name } = req.body;

  if (checkNullUndefined(name)) {
    return res.status(400).json({ error: "invalid credentials" });
  }

  try {
    const existedCategory = await Product.findOne({
      $or: [{ name }],
    });

    if (!existedCategory) {
      return res.status(400).json({
        status: "Failed",
        message: "Product does not Exist",
      });
    }

    res.status(201).json({ message: "ok", body: existedCategory });
  } catch (error) {
    console.error("Error getting Product", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export {
  addProduct,
  getProduct
}