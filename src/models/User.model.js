// models/user.js
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  fcmtoken: {
    type: String,
    default: ""
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  email: String,
  city: String,
  password: {
    type: String,
    required: true
  },
});

export const User = model('User', userSchema);
