import React from "react";
import LandingNav from "./LandingNav";
import HeroSection from "./HeroSection";
import AccessTime from "./AccessTime";
import Features from "./Features";
import Services from "./Services";
import Footer from "./Footer";

const Landing = () => {
  return (
    <div>
      <LandingNav />
      <HeroSection />
      <AccessTime />
      <Features />
      <Services />
      <Footer />
    </div>
  );
};

export default Landing;
