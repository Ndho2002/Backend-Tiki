const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requied: true,
    },
    email: {
      type: String,
      requied: true,
      unique: true,
    },
    address: {
      type: String,
    },
    image: {
      type: String,
    },

    password: {
      type: String,
      requied: true,
    },
    isAdmin: { type: Boolean, default: false, required: true },
    phone: {
      type: Number,
      requied: true,
    },
    access_token: {
      type: String,
      requied: true,
    },
    refresh_token: {
      type: String,
      requied: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
