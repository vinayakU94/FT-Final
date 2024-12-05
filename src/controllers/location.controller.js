import {Location} from "../models/Location.model.js";
import { checkNullUndefined } from "../utils/tools.js";



const addLocation = async (req, res) => {
  const { userId, ReceiversName, ReceiversContact, AddressType, FlatHouseFloorBuilding, nearbyLandmark } = req.body;

  console.log(req.body);

  // Check for null or undefined values
  if (checkNullUndefined(userId)) {
    return res.status(400).json({ error: "Invalid credentials: userId is null or undefined" });
  }
  if (checkNullUndefined(ReceiversName)) {
    return res.status(400).json({ error: "Invalid credentials: ReceiversName is null or undefined" });
  }
  if (checkNullUndefined(ReceiversContact)) {
    return res.status(400).json({ error: "Invalid credentials: ReceiversContact is null or undefined" });
  }
  if (checkNullUndefined(AddressType)) {
    return res.status(400).json({ error: "Invalid credentials: AddressType is null or undefined" });
  }
  if (checkNullUndefined(FlatHouseFloorBuilding)) {
    return res.status(400).json({ error: "Invalid credentials: FlatHouseFloorBuilding is null or undefined" });
  }
  if (checkNullUndefined(nearbyLandmark)) {
    return res.status(400).json({ error: "Invalid credentials: nearbyLandmark is null or undefined" });
  }

  // Validate the ReceiversContact as a phone number (10 digits)
  const phoneNumberPattern = /^\d{10}$/;
  if (!phoneNumberPattern.test(ReceiversContact)) {
    return res.status(400).json({
      status: "Failed",
      message: "Invalid phone number entered. It should be 10 digits."
    });
  }

  try {
    // Insert the location data into MongoDB
    const location = await Location.create({
      userId,
      ReceiversName,
      ReceiversContact,
      AddressType,
      FlatHouseFloorBuilding,
      nearbyLandmark
    });

    // Verify that the location was successfully created
    const createdLocation = await Location.findById(location._id);
    if (!createdLocation) {
      return res.status(400).json({
        status: "Failed",
        message: "Something went wrong"
      });
    }

    // Respond with success if the location was added successfully
    res.status(201).json({ message: 'Location added successfully' });
  } catch (error) {
    console.error('Error adding location:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};





  const getLocations = async (req, res) => {
    const {userId} = req.body

    if (checkNullUndefined(userId) ) {
      return res.status(400).json({ error: "invalid credentials null" })
    }

    try {
      const Locations = await Location.find({userId:userId});
  
      res.status(201).json({ message: "ok", body: Locations });
    } catch (error) {
      console.error("Error getting locations : ", error);
      res.status(500).json({ error: `Internal server error ${error}` });
    }
  };
  





export {
    addLocation,
    getLocations,
}
