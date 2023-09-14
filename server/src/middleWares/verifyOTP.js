import OTP from "../models/Otp";
import verfyToken from "../utils/verifytoken";
import { generateToken } from "../utils/generateToken";
import "dotenv/config";
import Blacklist from "../models/BlackListModel";

const verifyOtp = async (req, res) => {
  try {
    const token = req.params.token;
    const blacklisted = await Blacklist.findOne({ token });
    if (blacklisted) {
      return res
        .status(401)
        .json({ error: "please generate another token!" });
    }
    const verifyToken = verfyToken(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).json({ error: "unauthorized user!" });
    }
    const otp = req.body.otp;
    const user = await OTP.findOne({
      otp,
      createdAt: {
        $gte: new Date(new Date() - 10 * 60 * 1000),
      },
    });
    if (!user) {
      return res.status(403).json("invalid OTP!");
    }
    user.otp = null;
    const payload = {
      _id: verifyToken.data._id,
      email: verifyToken.data.email,
      role: verifyToken.data.role,
      isActive: verifyToken.data.isActive,
    };
    const tokenOTP = generateToken(payload);
    await user.deleteOne();
    res
      .status(200)
      .json({ message: "logged in successfully", token: tokenOTP });
    await Blacklist.create({ token });
  } catch (error) {
    res.status(500).json({ message: "server error!", error: error.message });
  }
};

export default verifyOtp;
