import { Schema, model } from "mongoose";

const repairRequestSchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    dateTime: {
        type: Date,
        default: Date.now,
    },
    pickupAddress: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const RepairRequest = model("RepairRequest", repairRequestSchema);
