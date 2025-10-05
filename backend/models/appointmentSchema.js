import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required!"],
      minlength: [3, "First Name must contain at least 3 characters!"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required!"],
      minlength: [3, "Last Name must contain at least 3 characters!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      validate: [validator.isEmail, "Provide a valid email!"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required!"],
      minlength: [11, "Phone number must contain exactly 11 digits!"],
      maxlength: [11, "Phone number must contain exactly 11 digits!"],
    },
    nic: {
      type: String,
      required: [true, "NIC is required!"],
      minlength: [13, "NIC must contain exactly 13 digits!"],
      maxlength: [13, "NIC must contain exactly 13 digits!"],
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required!"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required!"],
      enum: ["Male", "Female"],
    },
    appointment_date: {
      type: Date,
      required: [true, "Appointment date is required!"],
      index: true, // Add index for faster queries on dates
    },
    department: {
      type: String,
      required: [true, "Department is required!"],
      trim: true,
    },
    doctor: {
      firstName: {
        type: String,
        required: [true, "Doctor first name is required!"],
        trim: true,
      },
      lastName: {
        type: String,
        required: [true, "Doctor last name is required!"],
        trim: true,
      },
    },
    hasVisited: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      required: [true, "Address is required!"],
      trim: true,
    },
    doctorId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Doctor ID is required!"],
      index: true, // Indexed for faster doctor-specific queries
    },
    patientId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Patient ID is required!"],
      index: true, // Indexed for faster patient-specific queries
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
      index: true, // Indexed for status-based queries
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
