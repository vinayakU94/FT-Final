import { RepairRequest } from "../models/RepairRequest.model.js";
import { checkNullUndefined } from "../utils/tools.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
const addRepairRequest = async (req, res) => {
    const { categoryId, productId, userId, pickupAddress,deliveryAddress, description, image, status } = req.body;

    if (checkNullUndefined(categoryId, productId, userId, pickupAddress,deliveryAddress ,description)) {
        return res.status(400).json({ error: "Required fields not present" });
    }
    // console.log(req)
    console.log("dsf")
    console.log(req.files)
    const imageLocalPath = req.files?.image[0]?.path;
    if (!imageLocalPath) {
        return res.status(400).json({ error: "image not present" });
    }

    const imageLink = await uploadOnCloudinary(imageLocalPath)
    console.log("image link " +  imageLink);
    try {
        const repairRequest = await RepairRequest.create({
            categoryId,
            productId,
            userId,
            pickupAddress,
            deliveryAddress,
            description,
            image : imageLink.url,
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
        res.status(500).json({ error: `Internal server error ${error} error ` });
    }
};

const getUsersRepairRequest = async (req, res) => {
    const {userId} = req.body

    if (checkNullUndefined(userId) ) {
      return res.status(400).json({ error: "invalid credentials null" })
    }

    try {
      const RepairRequests = await RepairRequest.find({userId:userId ,active: true});
  
      res.status(201).json({ message: "ok", body: RepairRequests });
    } catch (error) {
      console.error("Error getting locations : ", error);
      res.status(500).json({ error: `Internal server error ${error}` });
    }
  };
  

const getRepairRequest = async (req, res) => {
    const { id } = req.params;

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


const updateRepairRequest = async (req, res) => {
    const { repairRequestId,active, pickupAddress,deliveryAddress, description, image, status } = req.body;
    if(checkNullUndefined(repairRequestId) ){
        return res.status(400).json({ error: "repairRequestId cannot be null" });
    }

    try {
        const repairRequest = await RepairRequest.findOne({
          $or: [{"_id":repairRequestId}]
    
          })
        if (!repairRequest) {
          return res.status(404).json({ error: 'Repair Request not found' });
        }
        const updateFields = {}; 
        if (pickupAddress !== undefined) updateFields.pickupAddress = pickupAddress;
        if (deliveryAddress !== undefined) updateFields.deliveryAddress = deliveryAddress;
        if (description !== undefined) updateFields.description = description;
        if (image !== undefined) updateFields.image = image;
        if (status !== undefined) updateFields.status = status;
        if (active !== undefined) updateFields.active = active;
    
        // Update the user document with the fields that are not null
        await RepairRequest.updateOne({ "_id":repairRequestId }, { $set: updateFields });
    
        const updatedRepairRequest = await RepairRequest.findOne({
          $or: [{_id:repairRequest._id}]
          })
        res.status(200).json({ message: 'RepairRequest updated successfully' , body: updateRepairRequest });
      
    
    
    
      } catch (error) {
        console.error('Error updating Repair request:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

export {
    addRepairRequest,
    getRepairRequest,
    getAllRepairRequests,
    getUsersRepairRequest,
    updateRepairRequest
};
