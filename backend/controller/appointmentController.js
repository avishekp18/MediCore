import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

/**
 * @desc Post a new appointment by patient
 */
export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    address,
  } = req.body;

  // Validate all required fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please fill all required fields!", 400));
  }

  // Lookup doctor by name & department
  const doctor = await User.findOne({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });

  if (!doctor) {
    return next(new ErrorHandler("Doctor not found!", 404));
  }

  // Create appointment
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob: new Date(dob),
    gender,
    appointment_date: new Date(appointment_date),
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited: false,
    address,
    doctorId: doctor._id,
    patientId: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Appointment successfully created!",
    appointment,
  });
});

/**
 * @desc Get all appointments (admin)
 */
export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find()
    .populate("patientId", "firstName lastName email phone")
    .populate("doctorId", "firstName lastName doctorDepartment email phone");

  res.status(200).json({
    success: true,
    appointments,
  });
});

/**
 * @desc Update appointment status (admin)
 */
export const updateAppointmentStatus = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Accepted", "Rejected"].includes(status)) {
      return next(new ErrorHandler("Invalid status value!", 400));
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return next(new ErrorHandler("Appointment not found!", 404));
    }

    res.status(200).json({
      success: true,
      message: "Appointment status updated successfully!",
      appointment,
    });
  }
);

/**
 * @desc Delete an appointment (admin)
 */
export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);

  if (!appointment) {
    return next(new ErrorHandler("Appointment not found!", 404));
  }

  await appointment.deleteOne();

  res.status(200).json({
    success: true,
    message: "Appointment deleted successfully!",
  });
});

export const getUserAppointments = catchAsyncErrors(async (req, res, next) => {
  const patientId = req.params.id;

  const appointments = await Appointment.find({ patientId })
    .populate("doctorId", "firstName lastName doctorDepartment email phone")
    .sort({ appointment_date: 1 }); // optional: sort by date

  res.status(200).json({ success: true, appointments });
});
