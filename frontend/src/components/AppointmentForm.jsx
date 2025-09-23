import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext.jsx";

const AppointmentForm = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    appointmentDate: "",
    department: "Pediatrics",
    doctorId: "",
    address: "",
    hasVisited: false,
  });

  const [doctors, setDoctors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  // Prefill logged-in user info
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  // Fetch all doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/user/doctors", {
          withCredentials: true,
        });
        setDoctors(data.doctors);
      } catch (error) {
        toast.error("Failed to fetch doctors");
      }
    };
    fetchDoctors();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle doctor selection
  const handleDoctorChange = (e) => {
    setFormData((prev) => ({ ...prev, doctorId: e.target.value }));
  };

  // Submit appointment
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const { firstName, lastName, email, appointmentDate, doctorId } = formData;
    if (!firstName || !lastName || !email || !appointmentDate || !doctorId) {
      toast.error("Please fill in all required fields!");
      setSubmitting(false);
      return;
    }

    try {
      const selectedDoctor = doctors.find((d) => d._id === doctorId);
      if (!selectedDoctor) throw new Error("Doctor not found!");

      const payload = {
        ...formData,
        appointment_date: formData.appointmentDate,
        doctor_firstName: selectedDoctor.firstName,
        doctor_lastName: selectedDoctor.lastName,
      };

      await axios.post("http://localhost:4000/api/v1/appointment/", payload, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Appointment successfully created!");
      // Reset only relevant fields
      setFormData((prev) => ({
        ...prev,
        phone: "",
        nic: "",
        dob: "",
        gender: "",
        appointmentDate: "",
        doctorId: "",
        address: "",
        hasVisited: false,
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-indigo-50 py-10 px-4">
      <div className="bg-white shadow-2xl rounded-3xl max-w-4xl w-full p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Book an Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* NIC & DOB */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="nic"
              placeholder="NIC"
              value={formData.nic}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Gender & Appointment Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          {/* Department & Doctor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="department"
              value={formData.department}
              onChange={(e) => {
                handleChange(e);
                setFormData((prev) => ({ ...prev, doctorId: "" }));
              }}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {departmentsArray.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>

            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleDoctorChange}
              disabled={!formData.department}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Select Doctor</option>
              {doctors
                .filter((d) => d.doctorDepartment === formData.department)
                .map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.firstName} {doc.lastName}
                  </option>
                ))}
            </select>
          </div>

          {/* Address */}
          <textarea
            name="address"
            rows="3"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          {/* Checkbox */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="hasVisited"
              checked={formData.hasVisited}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span>Have you visited before?</span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl shadow-lg transition transform hover:-translate-y-1 ${submitting ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
              }`}
          >
            {submitting ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
