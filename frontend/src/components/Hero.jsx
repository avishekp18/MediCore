import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <section className="relative bg-gradient-to-r from-indigo-50 to-white overflow-hidden py-20 lg:py-32">
      {/* Decorative shapes */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-200 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-pink-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <div className="space-y-6 lg:space-y-8">
          <h1 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            {title}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg lg:text-lg max-w-md sm:max-w-lg">
            MediCore Medical Institute offers expert, compassionate care tailored to each patient. Our skilled team ensures a smooth, seamless journey toward optimal health and wellness.
          </p>
          <div className="mt-4">
            <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
              Book Appointment
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative flex justify-center items-center">
          <img
            src={imageUrl}
            alt="Hero"
            className="w-full max-w-lg rounded-3xl shadow-2xl transform transition-transform duration-700 hover:scale-105 animate-bounce-slow"
          />
          <img
            src="/Vector.png"
            alt="Vector"
            className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 opacity-50 animate-pulse hidden sm:block"
          />
        </div>
      </div>

      {/* Optional diagonal bottom section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-white skew-y-1 origin-bottom"></div>
    </section>
  );
};

export default Hero;
