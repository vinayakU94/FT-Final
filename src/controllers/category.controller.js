import { Category } from "../models/category.model.js";
import { checkNullUndefined } from "../utils/tools.js";

const addCategory = async (req, res) => {
  const { name } = req.body;

  if (checkNullUndefined(name)) {
    return res.status(400).json({ error: "invalid credentials" });
  }

  try {
    const existedCategory = await Category.findOne({
      $or: [{ name }],
    });

    if (existedCategory) {
      return res.status(400).json({
        status: "Failed",
        message: "Category already registered",
      });
    }
    const category = await Category.create({
      name,
    });
    const createdCategory = await Category.findById(category._id);

    if (!createdCategory) {
      return res.status(400).json({
        status: "Failed",
        message: "something went wrong",
      });
    }

    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCategory = async (req, res) => {
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

const getAllCategory = async (req, res) => {
  try {
    const allCategory = await Category.find({});

    if (!allCategory) {
      return res.status(400).json({
        status: "Failed",
        message: "Category does not Exist",
      });
    }

    res.status(201).json({ message: "ok", body: allCategory });
  } catch (error) {
    console.error("Error getting all category", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export {
  addCategory,
  getAllCategory,
  getCategory
}