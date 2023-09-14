import User from "../models/UserModel";
import { BcryptUtil } from "../utils/bcrypt";
import Blacklist from "../models/BlackListModel";
import Jwt from "jsonwebtoken";

export const registerUser = async (data) => {
  const { firstname, lastname, email, role, phoneNumber, password, isActive } =
    data;
  const newUser = await User.create({
    firstname,
    lastname,
    email,
    role,
    phoneNumber,
    password: await BcryptUtil.hash(password),
    isActive,
  });
  return newUser;
};

const checkToken = (token, env) => {
  const payload = Jwt.verify(token, env, (error, decodedToken) => {
    if (error) {
      return error;
    }
    return decodedToken;
  });

  return payload;
};
export default checkToken;

export const findUserById = async (id) => {
  const user = await User.findById({ _id: id });
  if (user) {
    return user;
  } else {
    return false;
  }
};
export const findUserByEmail = async (email) => {
  const UserInfo = await User.findOne({ email });

  if (UserInfo == null) {
    return false;
  }
  return UserInfo;
};
export const findAllUsers = async (userId) => {
  const users = await User.find({ _id: { $ne: userId } });
  if (users) {
    return users;
  }
  return false;
};

export const logout = async (userData) => {
  const token = userData.split(" ")[1];
  await Blacklist.create({ token });
};
