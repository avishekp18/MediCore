import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables!");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to database!");
  } catch (err) {
    console.error("❌ Error connecting to database:", err.message);
    process.exit(1); // Exit process if DB connection fails
  }
};
