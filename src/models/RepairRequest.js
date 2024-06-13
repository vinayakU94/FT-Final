
import { Schema, model } from "mongoose";

const repairRequestSchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    ProductId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    UserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    DateTime: {
        type: Date,
        default: Date.now(),
    },
    PickupAddress: {
        type: String,
        required: true,
    },
    Image: {
        type: String,
    },
    Description: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("RepairRequest", repairRequestSchema);
