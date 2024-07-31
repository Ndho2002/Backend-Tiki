const mongoose = require("mongoose");
const OtpSchema = new mongoose.Schema(
  {
    userId: String,
    otp: String,
    expiresAt: Date,
  },
  { timestamps: true }
);

const Otp = mongoose.model("Otp", OtpSchema);
module.exports = Otp;
