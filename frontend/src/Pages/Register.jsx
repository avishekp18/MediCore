import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext.jsx";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const { isAuthenticated, setUser, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/patient/register`,
        formData,
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      toast.success(data.message);

      // Update global auth state
      setUser(data.user);
      setIsAuthenticated(true);

      navigate("/"); // Redirect to home after registration
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-center mb-2">Sign Up</h2>
      <p className="text-gray-600 text-center mb-6">Please sign up to continue</p>

      <form onSubmit={handleRegistration} className="space-y-4">
        {/* First + Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* NIC + DOB */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NIC
            </label>
            <input
              type="text"
              name="nic"
              placeholder="Enter your NIC"
              value={formData.nic}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Gender + Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Already Registered */}
        <div className="flex justify-end items-center gap-2 text-sm">
          <p className="m-0 text-gray-600">Already Registered?</p>
          <Link to="/login" className="text-blue-600 hover:underline">
            Login Now
          </Link>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
