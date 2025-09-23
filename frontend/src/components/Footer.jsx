import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="relative text-white pt-16 pb-8 bg-gradient-to-r from-indigo-700 to-gray-900 overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-green-400 rounded-full opacity-15 blur-3xl animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* Brand Info */}
        <div className="space-y-4">
          <img src="/logo.png" alt="MediCore Logo" className="w-32 h-auto" />
          <h3 className="text-2xl font-bold">MediCore Hospital</h3>
          <p className="text-gray-200">Your trusted healthcare partner for life.</p>
          {/* Social Media */}
          <div className="flex items-center gap-4 mt-2">
            <a href="#" className="p-2 rounded-full bg-green-500 hover:bg-green-600 transition-transform transform hover:scale-110">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 rounded-full bg-green-500 hover:bg-green-600 transition-transform transform hover:scale-110">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 rounded-full bg-green-500 hover:bg-green-600 transition-transform transform hover:scale-110">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-xl font-semibold pb-2 inline-block border-b-2 border-green-500">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link className="hover:text-green-400 transition-colors" to="/">Home</Link>
            </li>
            <li>
              <Link className="hover:text-green-400 transition-colors" to="/appointment">Appointment</Link>
            </li>
            <li>
              <Link className="hover:text-green-400 transition-colors" to="/about">About</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h4 className="text-xl font-semibold pb-2 inline-block border-b-2 border-green-500">Contact Us</h4>
          <p className="flex items-center gap-2 text-gray-200 hover:text-green-400 transition-colors">
            <FaPhone className="text-green-500" /> 999-999-9999
          </p>
          <p className="flex items-center gap-2 text-gray-200 hover:text-green-400 transition-colors">
            <MdEmail className="text-green-500" /> contact@medicore.com
          </p>
          <p className="flex items-center gap-2 text-gray-200 hover:text-green-400 transition-colors">
            <FaLocationArrow className="text-green-500" /> India
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} MediCore Hospital. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
