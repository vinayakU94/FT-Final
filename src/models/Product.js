
import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Product", productSchema);
