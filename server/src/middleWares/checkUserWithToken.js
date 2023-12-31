import { verifyToken } from "../utils/generateToken";
import Blacklist from "../models/BlackListModel";
import User from "../models/UserModel";

const extractToken = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      return res.status(401).json({ status: 401, message: "Please sign in" });
    }
    const token = req.header("Authorization").split(" ")[1];
    const isTokenExist = await Blacklist.findOne({ token });

    if (isTokenExist)
      return res
        .status(200)
        .json({ message: "Your session has expired, please login!" });

    const details = verifyToken(token);
    const userExists = await User.findOne({ email: details.data.email });
    // console.log("+++++",userExists)
    if (!userExists) {
      return res.status(401).json({ status: 401, message: "User not found!" });
    }
    req.user = userExists;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: 401, message: "No valid credentials" });
  }
};
export default extractToken;
