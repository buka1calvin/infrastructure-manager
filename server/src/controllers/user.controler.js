import User from "../models/UserModel";
import {
  registerUser,
  findUserById,
  findUserByEmail,
  findAllUsers,
} from "../service/user.service";
import { BcryptUtil } from "../utils/bcrypt";
import { generateToken } from "../utils/generateToken";
import generateOTP from "../utils/generateOTP";
import OTP from "../models/Otp";
import { validationOTPmail } from "../service/emailValidation.service";
import { logout } from "../service/user.service";
import { sendDriverProfileUpdateEmail } from "../service/emailValidation.service";
import { sendVerificationEmail, sendEmail } from "../service/sendEmail.service";
import checkToken from "../service/user.service";
import ItemRegister from "../models/ItemRegister";

export const createUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      role,
      phoneNumber,
      password,
      isActive,
    } = req.body;
    const userData = {
      firstname,
      lastname,
      email,
      role,
      phoneNumber,
      password,
      isActive,
    };
    const token = generateToken(userData, { expiresIn: "10min" });
    const response = await registerUser(userData);
    return res.status(201).json({
      user: response,
      message:
        "User register successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const verifyEmail = async (req, res) => {
  const { token: token } = req.query;
  try {
    const decodedToken = checkToken(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decodedToken.data.email });
    if (!decodedToken || !decodedToken.data || !decodedToken.data.email) {
      return res.status(400).json({ message: "Invalid token" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      return res.status(419).json({ message: "Token expired" });
    }
    if (user.isEmailVerified == true) {
      return res.status(200).json({ message: "Email already verified" });
    }
    user.isEmailVerified = true;
    await user.save();
    return res.status(200).json({ message: "email verified" });
  } catch (error) {
    if (error.status === 404) {
      res.status(500).json({ message: "token expired" });
    }
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      return res.status(400).json({ error: "user don't exist!" });
    }
    const passwordMaches = await BcryptUtil.compare(
      req.body.password,
      foundUser.password
    );
    if (!passwordMaches) {
      return res.status(400).json({ error: "passwords don't match!" });
    }
    const userToken = {
      _id: foundUser.id,
      firstname: foundUser.firstname,
      email: foundUser.email,
      role: foundUser.role,
      isactive: foundUser.isActive,
    };
    const token = generateToken(userToken);
      return res.status(200).json({
        message: "user logged in successfully!",
        user: {
          id: foundUser.id,
          firstname: foundUser.firstname,
          email: foundUser.email,
          role: foundUser.role,
          isactive: foundUser.isActive,
        },
        token: token,
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const fillEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      const userInfo = {
        email: user.email,
        id: user.userID,
      };
      const token = generateToken(userInfo, { expiresIn: "10m" });
      const sendToEmail = req.body.email;
      const link = `${process.env.APP_URL}/auth/reset-password?token=${token}`;
      const HTMLText = `<html>
      <head>
      <style>
      .controler{
       display: flex;
       justify-content: center;
       align-items: center;
       background-color: gainsboro;
      }
      .container {
        border: 2px;
        color: black;
      }
      .button {
        background-color: #9B51E0;
        padding: 10px 20px;
        text-decoration: none;
        font-weight: bold;
        border-radius: 4px;
      }
      .button:hover{
       background-color: #8a7a99;
      }
      .container-full{
        background-color: white;
        border-radius: 4px;
        box-shadow: 8px white;
        position: relative;
        opacity: 70%;
        width: 60%;
        padding: 8px 8px 8px 8px;
        margin: auto;
      }
      .container-small{
       position: absolute;
       border-radius: 4px 4px 0px 0px;
       top: 0;
       left: 0;
       background-color: #9B51E0;
       width: 100%;
       height: 18%;
      }
      img{
        width: 200%;
        height: 100%;
        object-fit: cover;
      }
      .header{
        background-repeat: no-repeat;
        background-size: fit;
        width: 50%;
        height: 30%;
      }
      a{
        text-decoration: none;
        color: white;
      }
      span{
        color: #fff;
      }
    </style>
     </head>
     <body>
     <div class="controler">
      <div class="container-full">
      <div class="container-small" style="display: flex;">
          <p style="color: aliceblue; font-family: 'Courier New', Courier, monospace; padding: 20px;">Have You Heard? <br> Alive Now!</p> 
          <span style="padding: 12px; font-size: 30px;text-align: center; margin-left: 10px;">WooHo Car</span></div>
      <div style='font-size: 12px'><strong> <h3>Hi ${user.lastname}<h3/><br> <br>
      <div class = "header">
      <img src='https://d1u4v6449fgzem.cloudfront.net/2020/03/The-Ecommerce-Business-Model-Explained.jpg' alt='header'/>
      </div><br> <br>
      <div class="container">
      <h3>Please click  here to reset your password </h3>
      <a href="${link}" class="button"><span>Reset Password</span></a>
      </div>
      <br> <br>Remember, beware of scams and keep this one-time verification link confidential.<br>
      </strong><br>WooHoo Car</div>
      </div>
      </div>
      </body>
      </html>
       `;
      await sendEmail(sendToEmail, "Reset password", HTMLText);
      res.status(200).json({
        message: "Reset password email has been sent, check your inbox",
      });
    }
  } catch (error) {
    console.log("server error", error);
    res.status(500).json({ error: "server error" });
  }
};

export const ResetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const payload = checkToken(token, process.env.JWT_SECRET);

    if (payload) {
      const hashPassword = await BcryptUtil.hash(req.body.password);
      await User.updateOne(
        { email: payload.data.email },
        {
          password: hashPassword,
          lastTimePasswordUpdated: new Date(),
          expired: false,
        }
      );
      res.status(200).json({ message: "Password changed successfully" });
    } else {
      res.status(400).json({ message: "invalid token" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await findUserById(userId);
    if (user) {
      return res.status(200).json({ userDetails: user });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const editUserProfile = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const decodeUser = await findUserByEmail(userEmail);

    if (!decodeUser) return res.status(401).json("user not found");
    const billingAddress = {
      province: req.body.province || "",
      district: req.body.district || "",
      street: req.body.street || "",
      email: req.body.email || "",
    };

    const user = await User.findByIdAndUpdate(
      decodeUser._id,
      {
        $set: {
          userId: req.body.userId || decodeUser.userId,
          DOB: req.body.DOB || decodeUser.DOB,
          gender: req.body.gender || decodeUser.gender,
          preferredLanguage:
            req.body.preferredLanguage || decodeUser.preferredLanguage,
          preferredCurrency:
            req.body.preferredCurrency || decodeUser.preferredCurrency,
          billingAddress: billingAddress,
          phoneNumber: req.body.phoneNumber || decodeUser.phoneNumber,
          profilePic:req.file ? req.file.path : decodeUser.profilePic,
          bio:  req.body.bio || decodeUser.bio
        },
      },
      { new: true }
    );
    console.log(user.profilePic)
    // console.log("user:",user)
    return res
      .status(200)
      .json({ user: user, message: "User profile updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



export const updateVerificationStatus = async (req, res) => {
  try {
    const adminUser = req.user;
    const { id } = req.params;

    const { verificationStatus } = req.body;

    if (adminUser.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Only admin users can update verification status" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (verificationStatus === "rejected") {
      user.role = "passenger";
      user.carPictures = [];
      user.driverLicenseNumber = null;
    } else if (verificationStatus === "approved") {
      user.role = "driver";
    }

    user.verificationStatus = verificationStatus;

    await user.save();

    return res.status(200).json({
      user: user,
      message: "Verification status updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    await logout(req.headers.authorization);
    return res.status(200).json({
      message: "Successfully logged out.",
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const user = req.user._id;
    if (user) {
      const AllUsers = await findAllUsers(user);
      res.status(200).json({ users: AllUsers });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getUserById=async(req,res)=>{
  try{
    const userId=req.params._id;
    const user=await User.findById(userId)
    if(!userId){
      return res.status(400).json({error:"user not found!"})
    }
    return res.status(200).json({user:user})
  }
  catch(error){
    return res.status(500).json({error:error.message})
  }
}
