import React, { useState } from "react";
import { DirectionStraightRight } from "@carbon/icons-react";

const testimonials = [
  {
    img: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Alice Smith",
    occupation: "Product Manager",
    quote: "This product transformed our workflow. Highly recommended!",
  },
  {
    img: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "John Doe",
    occupation: "Developer",
    quote: "Clean UI and great UX. The team nailed it!",
  },
  {
    img: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Samantha Ray",
    occupation: "Designer",
    quote: "I love how intuitive and modern everything feels.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Mike Johnson",
    occupation: "Marketing Lead",
    quote: "Our KPIs improved drastically thanks to this solution.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Laura Perez",
    occupation: "HR Specialist",
    quote: "Onboarding became a breeze. Couldn’t be happier!",
  },
];

const TestimonialsSection = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, testimonials.length - 3));
  };

  return (
    <div style={{ padding: "4rem 1rem", backgroundColor: "#fafafa" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ fontSize: "2rem", lineHeight: "1.3" }}>
            See what our customers <br /> had to say.
          </h2>
          <div style={{ display: "flex", gap: ".5rem" }}>
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: startIndex === 0 ? "not-allowed" : "pointer",
              }}
            >
              <DirectionStraightRight
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "1px solid #000",
                  transform: "rotate(180deg)",
                  opacity: startIndex === 0 ? 0.3 : 1,
                }}
              />
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex >= testimonials.length - 3}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor:
                  startIndex >= testimonials.length - 3
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              <DirectionStraightRight
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "1px solid #000",
                  opacity: startIndex >= testimonials.length - 3 ? 0.3 : 1,
                }}
              />
            </button>
          </div>
        </div>

        {/* Testimonial Cards Row */}
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            overflow: "hidden",
            transition: "transform 0.3s ease",
          }}
        >
          {testimonials
            .slice(startIndex, startIndex + 3)
            .map(({ img, name, occupation, quote }, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  flex: "0 0 calc(33.333% - 1rem)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={img}
                  alt={name}
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "1rem",
                  }}
                />
                <p style={{ fontStyle: "italic", marginBottom: "1rem" }}>
                  "{quote}"
                </p>
                <p style={{ fontWeight: "bold" }}>{name}</p>
                <p style={{ color: "#666", fontSize: "0.9rem" }}>
                  {occupation}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
