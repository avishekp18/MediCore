import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Register from "./Pages/Register";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
import { useAuth } from "./AuthContext.jsx";
import Dashboard from "./Pages/Dashboard"; // import your Dashboard page

const App = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-lg">Loading...</div>;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/appointment"
          element={isAuthenticated ? <Appointment /> : <Navigate to="/login" replace />}
        />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />
        {/* Add Dashboard route */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
        />
      </Routes>
      <Footer />
      <ToastContainer position="top-center" />
    </Router>
  );
};


export default App;  