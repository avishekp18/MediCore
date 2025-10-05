import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import cloudinary from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";

// Helper: Validate required fields
const validateFields = (fields) => {
  for (const key in fields) {
    if (!fields[key]) return key;
  }
  return null;
};

/**
 * Patient Registration
 */
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } =
    req.body;

  // 1. Validate required fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please fill all required fields!", 400));
  }

  // 2. Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return next(new ErrorHandler("User already registered!", 400));

  // 3. Create new patient
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password, // Make sure User schema hashes password in pre-save middleware
    role: "Patient",
  });

  // 4. Generate JWT & send response
  generateToken(user, "User registered successfully!", 201, res);
});

/**
 * Login (Admin / Patient / Doctor)
 */
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  const missingField = validateFields({ email, password, role });
  if (missingField)
    return next(new ErrorHandler(`${missingField} is required!`, 400));

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password)))
    return next(new ErrorHandler("Invalid email or password!", 400));
  if (role !== user.role)
    return next(new ErrorHandler("User not found with this role!", 400));

  generateToken(user, "Login successful!", 200, res);
});

/**
 * Add New Admin
 */
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } =
    req.body;
  const missingField = validateFields({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
  });
  if (missingField)
    return next(new ErrorHandler(`${missingField} is required!`, 400));

  if (await User.findOne({ email }))
    return next(new ErrorHandler("Admin already exists!", 400));

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin",
  });
  res
    .status(201)
    .json({ success: true, message: "Admin registered successfully", admin });
});

/**
 * Add New Doctor
 */

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  console.log("req.body:", req.body);
  console.log("req.files:", req.files);

  // 1. Ensure file is present
  if (!req.files || !req.files.docAvatar)
    return next(new ErrorHandler("Doctor avatar is required!", 400));

  const { docAvatar } = req.files;

  // 2. Validate file type
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype))
    return next(new ErrorHandler("File format not supported!", 400));

  // 3. Validate required fields
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;

  const missingField = validateFields({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    doctorDepartment,
  });
  if (missingField)
    return next(new ErrorHandler(`${missingField} is required!`, 400));

  // 4. Check for existing doctor
  if (await User.findOne({ email }))
    return next(new ErrorHandler("Doctor already exists!", 400));

  // 5. Upload avatar to Cloudinary
  let cloudinaryResponse;
  try {
    cloudinaryResponse = await cloudinary.v2.uploader.upload(
      docAvatar.tempFilePath,
      { folder: "doctor_avatars" }
    );
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Failed to upload avatar", 500));
  }

  // 6. Create doctor
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res
    .status(201)
    .json({ success: true, message: "Doctor registered successfully", doctor });
});

/**
 * Get All Doctors (with optional pagination)
 */
export const getAllDoctors = catchAsyncErrors(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const doctors = await User.find({ role: "Doctor" }).skip(skip).limit(limit);
  const total = await User.countDocuments({ role: "Doctor" });

  res.status(200).json({
    success: true,
    doctors,
    page,
    totalPages: Math.ceil(total / limit),
    total,
  });
});

/**
 * Get Logged-in User Details
 */
export const getUserDetails = catchAsyncErrors(async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

/**
 * Logout
 */
export const logout = (tokenName) =>
  catchAsyncErrors(async (req, res) => {
    res
      .status(200)
      .cookie(tokenName, "", { httpOnly: true, expires: new Date(0) })
      .json({
        success: true,
        message: `${tokenName.replace("Token", "")} logged out successfully.`,
      });
  });
