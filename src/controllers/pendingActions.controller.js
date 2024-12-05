import { RepairRequest } from "../models/RepairRequest.model.js";
import { checkNullUndefined } from "../utils/tools.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { PendingAction } from "../models/pendingActions.model.js";
import { sendNotificationToFCM } from "./Notification.controller.js";
import { User } from "../models/User.model.js";


const addPendingAction = async (req, res) => {
    const { repairRequestId, comment, response , action} = req.body;
    console.log("adding Pending Action")
    console.log(req.body);
    if (checkNullUndefined(repairRequestId) ||  checkNullUndefined(action)) {
        return res.status(400).json({ error: "Required fields not present" });
    }
    // console.log(req)

    
    

    
    try {
      const repairRequest = await RepairRequest.findOne({
        $or: [{"_id":repairRequestId}]
        })
        if(repairRequest == null){
          return res.status(400).json({
            status: "Failed",
            message: "repair request doesnot exist",
        })
        }
        const user = await User.findOne({
          $or: [{"_id":repairRequest.userId}]
          })
          if(user == null){
            return res.status(400).json({
              status: "Failed",
              message: " does not exist",
          });
        }
        const pendingAction = await PendingAction.create({
            repairRequestId, comment, response,action
        });

        const createdPendingAction = await PendingAction.findById(pendingAction._id).populate('repairRequestId');

        if (!createdPendingAction) {
            return res.status(400).json({
                status: "Failed",
                message: "Something went wrong",
            });
        }
        const userfcm = user.fcmtoken;
        if(userfcm != null && userfcm != ""){
          req.body.registrationToken = userfcm;
          req.body.notificationTitle = `Pending Action Generated`;
          req.body.notificationBody = `message : ${action}`;
          await sendNotificationToFCM(req,res);
        }

        res.status(201).json({ message: "Pending Action created successfully", body: PendingAction });
    } catch (error) {
        console.error("Error creating Pending Action:", error);
        res.status(500).json({ error: `Internal server error ${error} error ` });
    }
};
const updatePendingAction = async (req, res) => {
    const {  comment, response , action , PendingActionId } = req.body;
    if( checkNullUndefined(PendingActionId) ){
        return res.status(400).json({ error: " PendingActionId cannot be null" });
    }

    try {
       
        const pendingAction = await PendingAction.findOne({
            $or: [{"_id":PendingActionId}]
      
            })
          if (!pendingAction) {
            return res.status(404).json({ error: 'Pending Action not found' });
          }
        const updateFields = {}; 
        if (comment !== undefined) updateFields.comment = comment;
        if (response !== undefined) updateFields.response = response;
        if (action !== undefined) updateFields.action = action;
        
    
        // Update the user document with the fields that are not null
        const pendingActions = await PendingAction.updateOne({ "_id":PendingActionId }, { $set: updateFields });
    
        // const updatedPendingAction = await PendingAction.findOne({
        //   $or: [{_id:pendingAction._id}]
        //   })
        const updatedPendingAction = await PendingAction.find({repairRequestId:pendingAction.repairRequestId});
        
        res.status(200).json({ message: 'RepairRequest updated successfully' , body: updatedPendingAction });
      
    
    
    
      } catch (error) {
        console.error('Error updating Repair request:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const getRepairRequestsPendingAction = async (req, res) => {
    const {repairRequestId} = req.body

    if (checkNullUndefined(repairRequestId) ) {
      return res.status(400).json({ error: "invalid credentials null" })
    }

    try {
      const pendingAction = await PendingAction.find({repairRequestId:repairRequestId});
  
      res.status(201).json({ message: "ok", body: pendingAction });
    } catch (error) {
      console.error("Error getting pendingAction : ", error);
      res.status(500).json({ error: `Internal server error ${error}` });
    }
  };
  

const getAllPendingActions = async (req, res) => {
    try {
        const allPendingAction = await PendingAction.find({});
        res.status(200).json({ message: "ok", body: allPendingAction });
    } catch (error) {
        console.error("Error getting all Pending Actions", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export {
    addPendingAction,
    getRepairRequestsPendingAction,
    getAllPendingActions,
    updatePendingAction
};
