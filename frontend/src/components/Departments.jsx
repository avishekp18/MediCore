import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {
  const departmentsArray = [
    { name: "Pediatrics", imageUrl: "/departments/pedia.jpg" },
    { name: "Orthopedics", imageUrl: "/departments/ortho.jpg" },
    { name: "Cardiology", imageUrl: "/departments/cardio.jpg" },
    { name: "Neurology", imageUrl: "/departments/neuro.jpg" },
    { name: "Oncology", imageUrl: "/departments/onco.jpg" },
    { name: "Radiology", imageUrl: "/departments/radio.jpg" },
    { name: "Physical Therapy", imageUrl: "/departments/therapy.jpg" },
    { name: "Dermatology", imageUrl: "/departments/derma.jpg" },
    { name: "ENT", imageUrl: "/departments/ent.jpg" },
  ];

  const responsive = {
    extraLarge: { breakpoint: { max: 3000, min: 1324 }, items: 4 },
    large: { breakpoint: { max: 1324, min: 1005 }, items: 3 },
    medium: { breakpoint: { max: 1005, min: 700 }, items: 2 },
    small: { breakpoint: { max: 700, min: 0 }, items: 1 },
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Departments
        </h2>
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={2500}
          keyBoardControl
          removeArrowOnDeviceType={["tablet", "mobile"]}
          containerClass="carousel-container z-0"
          itemClass="carousel-item-padding-40-px"
        >
          {departmentsArray.map(({ name, imageUrl }, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden m-2 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={imageUrl}
                alt={`${name} Department`}
                loading="lazy"
                className="w-full h-56 object-cover"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 px-4 py-2 rounded-full text-gray-800 font-semibold shadow">
                {name}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Departments;
