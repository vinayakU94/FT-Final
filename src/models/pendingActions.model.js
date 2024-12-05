import { Schema, model } from "mongoose";

const pendingActionSchema = new Schema(
  {
   
    repairRequestId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "RepairRequest",
    },
    dateTime: {
        type: Date,
        default: Date.now,
    },
    action: {
      type: String,
    },
    comment: {
        type: String,
        default: "enter a comment"
    },
    response: {
      type: String,
      default: "Waiting"
    },
  },
  {
    timestamps: true,
  }
);

export const PendingAction = model("PendingAction", pendingActionSchema);

