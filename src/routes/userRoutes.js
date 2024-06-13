// routes/userRoutes.js
// imports
import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";







const router = Router()


router.route("/signup").post(registerUser)


router.route("/login").post(loginUser)


// const bcrypt = require('bcrypt');
// const User = require('../../../models/User');
// //hey
// const test=2;
// // Route for user login with phone number and password
// router.post('/login', async (req, res) => {
//   const { phoneNumber, password } = req.body;

//   try {
//     // Find the user by phone number
//     const user = await User.findOne({ phoneNumber });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Compare the input password with the stored hashed password
//     if (!(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ error: 'Invalid phone number or password' });
//     }

//     res.status(200).json({ message: 'User logged in successfully' });
//   } catch (error) {
//     console.error('Error logging in user:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

export default router