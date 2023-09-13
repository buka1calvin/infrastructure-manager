import mongoose from "mongoose";
// import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["student", "visitor", "admin"],
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/dd92qmql1/image/upload/v1688126539/DEV/user_3_nec6s8.png",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// userSchema.plugin(passportLocalMongoose)
const User = mongoose.model("User", userSchema);

export default User;
