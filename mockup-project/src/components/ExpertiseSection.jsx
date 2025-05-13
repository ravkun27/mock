import React, { useEffect, useRef } from "react";

const sections = [
  {
    title: "Strategy",
    description:
      "We craft comprehensive digital strategies that align with your business goals and resonate with your target audience.",
    points: [
      "Digital Strategy",
      "Brand Growth",
      "Market Analysis",
      "ROI Optimization",
    ],
    imageUrl:
      "https://cdn.prod.website-files.com/672a1dc3f9c27f98c24c36dc/67335740d23eaace3d16930c_service-4-big.avif",
  },
  {
    title: "Design",
    description:
      "We create user-centric designs that balance aesthetics with functionality for delightful digital experiences.",
    points: [
      "UI/UX Design",
      "Prototyping",
      "Brand Identity",
      "Responsive Layouts",
    ],
    imageUrl:
      "https://cdn.prod.website-files.com/672a1dc3f9c27f98c24c36dc/67335740d23eaace3d16930c_service-4-big.avif",
  },
  {
    title: "Development",
    description:
      "We bring your vision to life with scalable, maintainable, and high-performance code across platforms.",
    points: [
      "Web Development",
      "App Development",
      "API Integration",
      "Maintenance",
    ],
    imageUrl:
      "https://cdn.prod.website-files.com/672a1dc3f9c27f98c24c36dc/67335740d23eaace3d16930c_service-4-big.avif",
  },
];

const ExpertiseSection = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      sectionRefs.current.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;

        // Calculate how much to translate the section based on scroll position
        const translateY = Math.max(
          0,
          Math.min(150, scrollPosition - sectionTop + 300)
        );

        // Apply translation to create overlap effect
        if (index > 0) {
          section.style.transform = `translateY(-${translateY}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative my-24">
      <div className="container mx-auto max-w-[80vw]">
        <div className="space-y-12 md:space-y-44">
          {sections.map((section, idx) => (
            <div
              key={section.title}
              ref={(el) => (sectionRefs.current[idx] = el)}
              className={`grid grid-cols-1 md:grid-cols-2 gap-0  overflow-hidden sticky z-${
                80 + idx
              }  ${idx !== 0 ? "top-20 h-[480px]" : "top-0 h-[80%] md:h-[400px]"}`}
              style={{
                backgroundColor: "#000",
              }}
            >
              {/* TEXT SECTION */}
              <div
                className={`flex flex-col justify-center items-center h-full w-full p-10 ${
                  idx % 2 === 0 ? "md:order-1" : "md:order-2"
                }`}
              >
                <h3 className="text-4xl font-bold mb-6 text-white">
                  {section.title}
                </h3>
                <p className="mb-8 text-lg text-gray-200 leading-relaxed">
                  {section.description}
                </p>
                <ul className="grid grid-cols-2 gap-4">
                  {section.points.map((point) => (
                    <li key={point} className="flex items-center text-gray-300">
                      <span className="text-teal-400 mr-2">•</span> {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* IMAGE SECTION */}
              <div
                className={`h-[25vh] md:h-[16vh] w-full ${
                  idx % 2 === 0 ? "md:order-2" : "md:order-1"
                }`}
              >
                <img
                  src={section.imageUrl}
                  alt={section.title}
                  className="w-full h-full md:h-auto object-cover transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertiseSection;
