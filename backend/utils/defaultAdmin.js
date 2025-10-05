import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";

export const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "Admin" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin", 10);
      await User.create({
        firstName: "Default",
        lastName: "Admin",
        email: "admin@123",
        password: hashedPassword,
        role: "Admin",
      });
      console.log("✅ Default admin created: admin@123 / admin");
    }
  } catch (err) {
    console.error("Failed to create default admin:", err.message);
  }
};
