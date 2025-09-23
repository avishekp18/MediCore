import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MessageForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const { firstName, lastName, email, phone, message } = formData;
    const newErrors = {};

    if (!firstName || firstName.length < 3)
      newErrors.firstName = "First name must be at least 3 characters.";
    if (!lastName || lastName.length < 3)
      newErrors.lastName = "Last name must be at least 3 characters.";
    if (!email || !/^[\w.-]+@[\w.-]+\.\w+$/.test(email))
      newErrors.email = "Please enter a valid email.";
    if (!phone || phone.length !== 11)
      newErrors.phone = "Phone number must be exactly 11 digits.";
    if (!message || message.length < 10)
      newErrors.message = "Message must be at least 10 characters.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/message/",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(data.message);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Send Us A Message</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 ${errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 ${errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 ${errors.phone ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            rows="6"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 ${errors.message ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
