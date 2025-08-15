import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | MediCore Medical Institute"}
        imageUrl={"./public/about.png"}
      />
      <Biography imageUrl={"./public/whoweare.png"} />
    </>
  );
};

export default AboutUs;
