import {User} from "../models/User.model.js";
import { checkNullUndefined } from "../utils/tools.js";

import bcrypt from "bcrypt"

const registerUser =  async (req, res) => {
    const { name, phoneNumber, email, city, password } = req.body;
    
    if (checkNullUndefined(name) || checkNullUndefined(phoneNumber) || checkNullUndefined(email) || checkNullUndefined(city) || checkNullUndefined(password)) {
      return res.status(400).json({ error: "invalid credentials null" })
    }
    const phoneNumberPattern = /^\d{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Check if the phone number does not match the pattern
    if (!phoneNumberPattern.test(phoneNumber)) {
      return res.status(400).json({
        status: "Failed",
        message: "Invalid phone number entered. It should be 10 digits."
      });
    }
    // Check if the password is at least 8 characters long
    if (!password || password.length < 8) {
      return res.status(400).json({
        status: "Failed",
        message: "Password must be greater than 8 characters."
      });
    }
    // Check if the email does not match the pattern
    if (!emailPattern.test(email)) {
      return res.status(400).json({
        status: "Failed",
        message: "Invalid email address entered."
      });
    }
    try {
      // Here you would insert the user data into MongoDB using the client
        
        const existedUser = await User.findOne({
        $or: [{ phoneNumber }, { email }]
        })

        if(existedUser){
            return res.status(400).json({
                status: "Failed",
                message: "Email or phone no already registered"
              });
        }

        let passwordcrpted = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            phoneNumber,
            email, 
            city,
            password: passwordcrpted,
        })
        const createdUser = await User.findById(user._id).select(
            "-password"
        )

        if(!createdUser){
            return res.status(400).json({
                status: "Failed",
                message: "something went wrong"
              });
        }
    //   const db = client.db("myDatabase");
    //   const collection = db.collection("users");
    //   await collection.insertOne({ name, phoneNumber, email, city, password: passwordcrpted });

      res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
      console.error('Error signing up user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


 const loginUser =  async (req, res) => {
    const { phoneNumber, password } = req.body;
    console.log("user")
    console.log(req.body);

    if(checkNullUndefined(phoneNumber) || checkNullUndefined(password)){
        return res.status(400).json({ error: "invalid credentials" });
    }

    try {
      // Here you would find the user in MongoDB using the client and authenticate the user
    //   const db = client.db("myDatabase");
    //   const collection = db.collection("users");
    //   const user = await collection.findOne({ phoneNumber });
        
      const user = await User.findOne({
        $or: [{phoneNumber}]
        })
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }


      bcrypt.compare(req.body.password, user.password, function (err, response) {
        if (response) {
          res.status(200).json({ message: 'User logged in successfully', body: user });
        } else {
          // response is OutgoingMessage object that server response http request
          return res.status(400).json({ success: false, message: 'passwords do not match' });
        }
      });



    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  const updateUser = async (req,res) => {
    const {userid,name, city , fcmtoken} = req.body;
    console.log(req.body);

    if(checkNullUndefined(userid)){
      return res.status(400).json({error: "userid is required"})
    }
    try{
      const user = User.findOne({
        $or: [{"_id":userid}]

        });

        if (!user) {
          return res.status(400).json({ error: 'User not found' });
        }
  
        const updateFields = {}; 
        if (name !== undefined) updateFields.name = name;
        if (city !== undefined) updateFields.city = city;
        if (fcmtoken !== undefined) updateFields.fcmtoken = fcmtoken;

        const updateduser = await User.updateOne({ "_id":userid }, { $set: updateFields });
        
        res.status(200).json({ message: 'user updated successfully' , body: updateduser });
    }catch(err){
      console.error('Error updating in user:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }











export {
    registerUser,
    loginUser,
    updateUser
}
