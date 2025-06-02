import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import LogoStrip from "../components/LogoStrip";
import TestimonialsSection from "../components/TestimonialsSection";

const LandingPage = () => {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh", // ✅ Use minHeight instead
        width: "100%",
        fontFamily: "IBM Plex Sans, sans-serif",
        overflowX: "hidden",
        color: "#161616",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('https://cdn.prod.website-files.com/668eeec9e813ea8b3d7706b7/67bae08cd29cfa3700ac0f75_home-hero-bg.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
          height: "60%",
        }}
      />
      {/* Content */}
      <div style={{ position: "relative", zIndex: 3 }}>
        <Navbar />
        <div style={{ paddingTop: "8rem" /* Adjust based on Navbar height */ }}>
          <HeroSection />
        </div>
        <LogoStrip />
      </div>
      <div>
        <TestimonialsSection />
      </div>
    </div>
  );
};

export default LandingPage;
