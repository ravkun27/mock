import { Button } from "carbon-components-react";
import { DirectionStraightRight } from "@carbon/icons-react";
const HeroSection = () => {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>


      {/* Hero Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Badges */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <img
            src="https://cdn.prod.website-files.com/668eeec9e813ea8b3d7706b7/67d2dce8f1f87d874e29ee31_Product%20Hunt%20Badge.svg"
            alt="Product Hunt Badge"
            style={{ height: "36px" }}
          />
          <img
            src="https://cdn.prod.website-files.com/668eeec9e813ea8b3d7706b7/67d2dce847d28b67cfa4f24d_Product%20Hunt%20Badge-1.svg"
            alt="G2 Rating"
            style={{ height: "36px" }}
          />
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: 400,
            marginBottom: "0.75rem",
            lineHeight: 1.2,
          }}
        >
          Don’t create a survey. <br />
          <span style={{ fontWeight: 700 }}>Start a conversation</span>
        </h1>

        {/* Subheading */}
        <p
          style={{
            fontSize: "1.25rem",
            fontWeight: 400,
            maxWidth: "720px",
            marginBottom: "1.25rem",
            color: "#525252",
          }}
        >
          10× your insights with AI-powered surveys and interviews.
        </p>

        {/* CTA Button */}
        <Button
          kind="primary"
          style={{
            borderRadius: "0.75rem",
            fontSize: "1rem",
            padding: "0.75rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
          onClick={() => (window.location.href = "/get-started")}
        >
          Get Started <DirectionStraightRight />
        </Button>

        {/* Helper Text */}
        <p
          style={{
            fontSize: "0.875rem",
            marginTop: "0.5rem",
            color: "#8d8d8d",
            fontWeight: 500,
          }}
        >
          No credit card required
        </p>
      {/* Demo Image */}
      <div
        style={{
          width: "100%",
          maxWidth: "1024px",
          height: "20rem",
          marginTop: "2rem",
          overflow: "hidden",
          borderRadius: "1rem",
        }}
      >
        <img
          src="https://cdn.prod.website-files.com/668eeec9e813ea8b3d7706b7/67d2ddb016a5c8e286695644_Insights.avif"
          alt="Insights Preview"
          style={{
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      </div>
    </div>
  );
};

export default HeroSection;
