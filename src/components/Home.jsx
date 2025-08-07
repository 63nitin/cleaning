import React from "react";
import HeroSection from "./LandingPage/Hero";
import Services from "./LandingPage/Service";
import AboutUs from "./LandingPage/About";
import Testimonials from "./LandingPage/Testemonials";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Services />
      <AboutUs />
      <Testimonials />
    </>
  );
}