import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 3 },
    lastName: { type: String, required: true, minLength: 3 },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: validator.isEmail,
    },
    phone: { type: String, required: true, minLength: 10, maxLength: 10 },
    nic: { type: String, required: true, minLength: 13, maxLength: 13 },
    dob: { type: Date, required: true },
    gender: { type: String, required: true, enum: ["Male", "Female"] },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      required: true,
      enum: ["Patient", "Doctor", "Admin"],
    },
    doctorDepartment: { type: String },
    docAvatar: {
      public_id: String,
      url: String,
    },
  },
  { timestamps: true }
);

// Password hashing before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Password comparison method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
