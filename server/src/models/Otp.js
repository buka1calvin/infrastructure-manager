import mongoose from "mongoose";

const otpSchema=new mongoose.Schema({
    email: {
        type: String,
        required: true
      },
      otp: {
        type: String,
        required: true
      }
},
{ timestamps: true }
)
const OTP=mongoose.model('Otp',otpSchema)

export default OTP;
