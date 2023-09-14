import verfyToken from "../utils/verifytoken";
import User from "../models/UserModel";
import "dotenv/config";

const updateUserStatus = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const verifyUser = verfyToken(token, process.env.JWT_SECRET);

    if (verifyUser.data.role !== "admin") {
      return res
        .status(400)
        .json({ error: "Only admin users can update user status" });
    }
    try {
      const user = await User.findOne({ _id: req.params.id });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const updatedIsActive = !user.isActive;
      await User.findOneAndUpdate(
        { _id: req.params.id },
        { isActive: updatedIsActive },
        { new: true }
      );

      return res.status(200).json({ user: updatedIsActive });
    } catch (err) {
      return res.status(500).json({ error: "enter valid uuid" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const assignUserRole = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const verifyUser = verfyToken(token, process.env.JWT_SECRET);

    if (verifyUser.data.role !== "admin") {
      return res
        .status(400)
        .json({ error: "Only admin users can update user status" });
    }
    try {
      const selectedUser = await User.findOne({ _id: req.params.id });

      if (!selectedUser) {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (err) {
      return res.status(500).json({ error: "enter valid user id" });
    }
    const { newRole } = req.body;

    if (!["admin", "passenger", "driver"].includes(newRole)) {
      return res.status(400).json({ error: "Invalid role specified" });
    }

    await User.findOneAndUpdate(
      { _id: req.params.id },
      { role: newRole },
      { new: true }
    );

    return res.status(200).json({ user: "new role assigned succeessfully " });
  } catch (error) {
    return res.status(500).json({ status: 500, error: "Server error" });
  }
};
export { assignUserRole, updateUserStatus };
