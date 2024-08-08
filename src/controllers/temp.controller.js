import {User} from "../models/User.model.js";
import { checkNullUndefined } from "../utils/tools.js";



const registerUser =  async (req, res) => {
  res.status(201).json({ message: 'User signed up successfully ' });
  }













export {
    registerUser,
  
}
