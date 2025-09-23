import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext.jsx";

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  // Redirect automatically when login succeeds
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const backendURL = "http://localhost:4000";
      const { data } = await axios.post(
        `${backendURL}/api/v1/user/login`,
        { ...formData, role: "Patient" },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      login(data.user); // update context
      toast.success(data.message);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white py-10">
      <div className="bg-white shadow-2xl rounded-3xl max-w-md w-full p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Sign In</h2>
        <p className="text-gray-600 text-center mb-8">Welcome back! Please login to continue.</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          <div className="flex justify-end items-center gap-2 text-sm">
            <p className="m-0 text-gray-600">Not Registered?</p>
            <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
              Register Now
            </Link>
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              disabled={submitting}
              className={`w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl shadow-lg transition transform hover:-translate-y-1 ${submitting ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
                }`}
            >
              {submitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
