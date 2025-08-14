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
