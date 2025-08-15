import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {
  const departmentsArray = [
    { name: "Pediatrics", imageUrl: "./public/departments/pedia.jpg" },
    { name: "Orthopedics", imageUrl: "./public/departments/ortho.jpg" },
    { name: "Cardiology", imageUrl: "./public/departments/cardio.jpg" },
    { name: "Neurology", imageUrl: "./public/departments/neuro.jpg" },
    { name: "Oncology", imageUrl: "./public/departments/onco.jpg" },
    { name: "Radiology", imageUrl: "./public/departments/radio.jpg" },
    { name: "Physical Therapy", imageUrl: "./public/departments/therapy.jpg" },
    { name: "Dermatology", imageUrl: "./public/departments/derma.jpg" },
    { name: "ENT", imageUrl: "./public/departments/ent.jpg" },
  ];

  const responsive = {
    extraLarge: { breakpoint: { max: 3000, min: 1324 }, items: 4 },
    large: { breakpoint: { max: 1324, min: 1005 }, items: 3 },
    medium: { breakpoint: { max: 1005, min: 700 }, items: 2 },
    small: { breakpoint: { max: 700, min: 0 }, items: 1 },
  };

  return (
    <div className="container departments">
      <h2>Departments</h2>
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={2500}
        keyBoardControl
        removeArrowOnDeviceType={["tablet", "mobile"]}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        {departmentsArray.map(({ name, imageUrl }, index) => (
          <div key={index} className="card">
            <div className="depart-name">{name}</div>
            <img src={imageUrl} alt={`${name} Department`} loading="lazy" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Departments;
