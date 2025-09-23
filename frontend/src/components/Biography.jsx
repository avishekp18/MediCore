import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-10 items-center">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={imageUrl}
            alt="About Us"
            className="w-full max-w-lg rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Text Section */}
        <div className="space-y-4">
          <p className="text-indigo-600 font-semibold uppercase tracking-wide">Biography</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-800">Who We Are</h3>
          <p className="text-gray-600 leading-relaxed">
            We are a team of dedicated professionals committed to transforming
            healthcare management through innovative technology. Our mission is to
            provide a seamless, secure, and efficient hospital management
            experience for doctors, staff, and patients alike.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our vision is simple: empower healthcare providers with tools that let
            them focus on what matters most — patient care. By integrating modern
            technology with user-friendly design, we aim to reduce administrative
            burden, improve communication, and enhance overall hospital
            efficiency.
          </p>
          <p className="text-gray-600 leading-relaxed">
            With a passion for coding and a dedication to problem-solving, our
            team continues to innovate, learn, and grow. We believe technology can
            save lives, not just time — and we’re here to prove it.
          </p>
          <p className="text-gray-800 italic">Because in healthcare, every second counts.</p>
        </div>
      </div>
    </section>
  );
};

export default Biography;
