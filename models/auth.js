// routes/auth.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, phoneNumber, email, city } = req.body;

  try {
    const existingUser = await User.findOne({ phoneNumber });

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

module.exports = router;
