// models/user.js
import { Schema, model } from 'mongoose';

const locationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  ReceiversName: {
    type: String,
    required: true
  },
  ReceiversContact: {
    type: String,
    required: true,
 
  },
  AddressType: String,
  FlatHouseFloorBuilding: String,
  nearbyLandmark: String
  
});


//    return <String, dynamic>{
//   'id': id,
//   'ReceiversName': ReceiversName,
//   'ReceiversContact': ReceiversContact,
//   'AddressType': AddressType,
//   'FlatHouseFloorBuilding': FlatHouseFloorBuilding,
//   'nearbyLandmark': nearbyLandmark,
// };
export const Location = model('Location', locationSchema);
