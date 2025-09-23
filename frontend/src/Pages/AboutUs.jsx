import React from "react";
import Hero from "../components/Hero";

const AboutUs = () => {
  return (
    <section className="bg-gray-50">
      {/* Hero Section */}
      <Hero
        title="Learn More About Us | MediCore Medical Institute"
        imageUrl="/about.png"
        className="relative z-10"
      />

      {/* Biography Section */}
      <div className="relative bg-gradient-to-r from-indigo-100 to-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <div className="space-y-6">
            <p className="text-indigo-600 font-semibold uppercase tracking-wide animate-fade-in">
              Biography
            </p>
            <h3 className="text-4xl sm:text-5xl font-bold text-gray-800 animate-fade-in delay-100">
              Who We Are
            </h3>
            <p className="text-gray-700 leading-relaxed animate-fade-in delay-200">
              We are a team of dedicated professionals committed to transforming healthcare management
              through innovative technology. Our mission is to provide a seamless, secure, and efficient
              hospital management experience for doctors, staff, and patients alike.
            </p>
            <p className="text-gray-600 leading-relaxed italic animate-fade-in delay-300">
              Because in healthcare, every second counts.
            </p>
          </div>

          {/* Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg transform hover:scale-105 transition-transform duration-500">
              <img
                src="/whoweare.png"
                alt="Who We Are"
                className="rounded-3xl shadow-2xl object-cover w-full"
              />
              {/* Optional floating accent shape */}
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-indigo-300 rounded-full opacity-50 blur-3xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
