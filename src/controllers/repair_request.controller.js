import { RepairRequest } from "../models/repairRequest.model.js";
import { checkNullUndefined } from "../utils/tools.js";

const addRepairRequest = async (req, res) => {
    const { categoryId, productId, userId, pickupAddress, description, image, status } = req.body;

    if (checkNullUndefined(categoryId, productId, userId, pickupAddress, description)) {
        return res.status(400).json({ error: "Required fields not present" });
    }

    try {
        const repairRequest = await RepairRequest.create({
            categoryId,
            productId,
            userId,
            pickupAddress,
            description,
            image,
            status
        });

        const createdRepairRequest = await RepairRequest.findById(repairRequest._id).populate('categoryId').populate('productId');

        if (!createdRepairRequest) {
            return res.status(400).json({
                status: "Failed",
                message: "Something went wrong",
            });
        }

        res.status(201).json({ message: "Repair request created successfully", body: createdRepairRequest });
    } catch (error) {
        console.error("Error creating repair request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getRepairRequest = async (req, res) => {
    const { id } = req.body;

    try {
        const repairRequest = await RepairRequest.findById(id).populate('categoryId').populate('productId');

        if (!repairRequest) {
            return res.status(400).json({
                status: "Failed",
                message: "Repair request does not exist",
            });
        }

        res.status(200).json({ message: "ok", body: repairRequest });
    } catch (error) {
        console.error("Error getting repair request", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getAllRepairRequests = async (req, res) => {
    try {
        const allRepairRequests = await RepairRequest.find({}).populate('categoryId').populate('productId');

        if (!allRepairRequests.length) {
            return res.status(400).json({
                status: "Failed",
                message: "No repair requests found",
            });
        }

        res.status(200).json({ message: "ok", body: allRepairRequests });
    } catch (error) {
        console.error("Error getting all repair requests", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export {
    addRepairRequest,
    getRepairRequest,
    getAllRepairRequests
};
