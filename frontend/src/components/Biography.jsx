import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="About Us" />
      </div>
      <div className="banner">
        <p className="subtitle">Biography</p>
        <h3>Who We Are</h3>
        <p>
          We are a team of dedicated professionals committed to transforming
          healthcare management through innovative technology. Our mission is to
          provide a seamless, secure, and efficient hospital management
          experience for doctors, staff, and patients alike.
        </p>
        <p>
          Our vision is simple: empower healthcare providers with tools that let
          them focus on what matters most — patient care. By integrating modern
          technology with user-friendly design, we aim to reduce administrative
          burden, improve communication, and enhance overall hospital
          efficiency.
        </p>
        <p>
          With a passion for coding and a dedication to problem-solving, our
          team continues to innovate, learn, and grow. We believe technology can
          save lives, not just time — and we’re here to prove it.
        </p>
        <p><em>Because in healthcare, every second counts.</em></p>
      </div>
    </div>
  );
};

export default Biography;
