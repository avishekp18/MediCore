import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {


  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Info */}
        <div className="footer-brand">
          <img src="/logo.png" alt="MediCore Logo" className="footer-logo" />
          <h3>MediCore Hospital</h3>
          <p>Your trusted healthcare partner for life.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/appointment">Appointment</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p><FaPhone /> 999-999-9999</p>
          <p><MdEmail /> contact@medicore.com</p>
          <p><FaLocationArrow />india</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MediCore Hospital. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
