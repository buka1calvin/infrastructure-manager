import User from "../models/UserModel";
import { BcryptUtil } from "../utils/bcrypt";
import { generateToken } from "../utils/generateToken";

const adminSeeder = async () => {
  try {
    // Check if admin user already exists
    const adminUser = await User.findOne({ firstname: "admin" });
    if (adminUser) {
      console.log("Admin user is connected!");
      return;
    }

    // Create the admin user
    const adminUserData = {
      firstname: "admin",
      lastname: "1",
      email: "rukundoclovis30@gmail.com",
      role: "admin",
      phoneNumber: "+250786639348",
      isEmailVerified: true,
      // Set other admin user properties as needed
    };

    // Hash the admin user's password
    const hashedPassword = await BcryptUtil.hash("adminPassword"); // Replace 'adminPassword' with the desired password

    // Assign the hashed password to the admin user data
    adminUserData.password = hashedPassword;

    // Save the admin user to the database
    const createdAdminUser = await User.create(adminUserData);

    // Generate a token for the admin user
    const token = generateToken(createdAdminUser);

    console.log("Admin user seeded successfully");
    console.log("Admin user token:", token);
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};
export default adminSeeder;
