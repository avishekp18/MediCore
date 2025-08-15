import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthContext.jsx";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/patient/logout`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setIsAuthenticated(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    <nav className="navbar container">
      <div className="logo">
        <span className="logo-text">
          Medi<span className="logo-highlight">Core</span>
        </span>
      </div>

      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to="./" onClick={() => setShow(false)}>Home</Link>
          <Link to="appointment" onClick={() => setShow(false)}>Appointment</Link>
          <Link to="about" onClick={() => setShow(false)}>About Us</Link>
        </div>

        {isAuthenticated ? (
          <button className="logoutBtn btn" onClick={handleLogout}>
            LOGIN
          </button>
        ) : (
          <button className="loginBtn btn" onClick={goToLogin}>
            LOGOUT
          </button>
        )}
      </div>

      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
