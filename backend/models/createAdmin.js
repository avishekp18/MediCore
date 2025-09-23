import mongoose from "mongoose";
import { User } from "./userSchema.js";
import { dbConnection } from "../database/dbConnection.js";
import { config } from "dotenv";
import path from "path";

config({ path: path.resolve("../.env") }); // one folder up
dbConnection();

const seedAdmin = async () => {
  try {
    await User.deleteMany({}); // WARNING: Deletes all users, use only in dev!

    const admin = await User.create({
      firstName: "Super",
      lastName: "Admin",
      email: "admin@example.com",
      phone: "0771234567",
      nic: "1234567890123",
      dob: "1980-01-01",
      gender: "Male",
      password: "Admin@123",
      role: "Admin",
    });

    console.log("Admin seeded successfully:", admin.email);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
