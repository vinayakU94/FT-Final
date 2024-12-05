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
    deliveryAddress: {
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
        enum: ["request raised", "repair partner confirmation await", "Confirmed and reay to pick", "waiting for estimate", "Estimate and waiting confirmation", "cancelled by user", "cancelled by FixThis"],
    },
    active:{
      type:Boolean,
      default: true
    }
  },
  {
    timestamps: true,
  }
);

export const RepairRequest = model("RepairRequest", repairRequestSchema);


/*

request raised
repair partner confirmation await
Confirmed and reay to pick 
picked up and deliver to repair partner 
waiting for estimate
Estimate and waiting confirmation


*/