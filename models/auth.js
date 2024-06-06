// routes/auth.js
import { Router } from 'express';
import User, { findOne } from '../models/User';
const router = Router();

router.post('/signup', async (req, res) => {
  const { name, phoneNumber, email, city, password } = req.body;

  try {
    const existingUser = await findOne({ phoneNumber });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this phone number already exists' });
    }

    const newUser = new User({ name, phoneNumber, email, city });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
