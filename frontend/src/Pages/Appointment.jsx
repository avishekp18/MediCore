import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | MediCore Medical Institute"}
        imageUrl={"./public/signin.png"}
      />
      <AppointmentForm />
    </>
  );
};

export default Appointment;
