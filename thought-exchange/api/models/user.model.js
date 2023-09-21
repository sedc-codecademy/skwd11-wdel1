import mongoose from "mongoose";

import { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 40,
  },
  refreshTokens: [
    {
      type: String,
    },
  ],
});

export const User = mongoose.model("User", userSchema);
