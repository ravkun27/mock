import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  const { scrollY } = useScroll();

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Responsive scroll values based on screen size
  const scrollDistance = isMobile ? 1200 : 1800;

  // Text positioning and movement with responsive values
  const textX = useTransform(
    scrollY,
    [0, scrollDistance],
    ["0%", isMobile ? "-20%" : "-50%"]
  );
  const textY = useTransform(
    scrollY,
    [0, scrollDistance, scrollDistance + 1],
    ["0%", "0%", "-50%"]
  );
  const smoothTextX = useSpring(textX, { stiffness: 100, damping: 25 });
  const smoothTextY = useSpring(textY, { stiffness: 100, damping: 25 });

  // Responsive movement speeds
  const speedMultiplier = isMobile ? 0.7 : 1;

  // Individual speeds for each image for varied movement
  const leftImage1Y = useTransform(
    scrollY,
    [0, scrollDistance],
    [0, -400 * speedMultiplier]
  );
  const leftImage2Y = useTransform(
    scrollY,
    [0, scrollDistance],
    [0, -250 * speedMultiplier]
  );
  const leftImage3Y = useTransform(
    scrollY,
    [0, scrollDistance],
    [0, -320 * speedMultiplier]
  );

  const rightImage1Y = useTransform(
    scrollY,
    [0, scrollDistance],
    [0, -280 * speedMultiplier]
  );
  const rightImage2Y = useTransform(
    scrollY,
    [0, scrollDistance],
    [0, -450 * speedMultiplier]
  );
  const rightImage3Y = useTransform(
    scrollY,
    [0, scrollDistance],
    [0, -350 * speedMultiplier]
  );

  // Combine speeds into arrays for mapping
  const leftImageYValues = [leftImage1Y, leftImage2Y, leftImage3Y];
  const rightImageYValues = [rightImage1Y, rightImage2Y, rightImage3Y];

  // Using placeholder images for the artifact
  const leftImages = [
    "https://cdn.prod.website-files.com/672a1dc3f9c27f98c24c36dc/6733507a003f74c018b90ea4_work-8.avif",
    "https://cdn.prod.website-files.com/672a1dc3f9c27f98c24c36dc/672b51761780c73184d6be27_work-4.avif",
    "https://cdn.prod.website-files.com/672a1dc3f9c27f98c24c36dc/672cb284cb302a4669b68d0f_work-7.avif",
  ];

  const rightImages = [
    "https://cdn.prod.website-files.com/672a1dc3f9c27f98c24c36dc/672b569253e152a1903565f3_scroll-down.avif",
    "https://cdn.prod.website-files.com/672a1dc3f9c27f98c24c36dc/672cb0c1262874241732297c_work-6.avif",
    "https://cdn.prod.website-files.com/672a1dc3f9c27f98c24c36dc/672b505eb37e30ad04b87c26_work-3.avif",
  ];

  // Define which images appear in front of text (high z-index) and which behind (low z-index)
  const imageZIndexes = {
    left: [40, 20, 40], // First and third image in front, second behind
    right: [20, 40, 20], // Second image in front, first and third behind
  };

  // Responsive image positioning and dimensions
  const getLeftImagePositions = () => {
    if (isMobile) {
      return [
        { top: "10vh", width: "40vw", height: "25vh", translateX: "-5%" },
        { top: "40vh", width: "28vw", height: "20vh", translateX: "5%" },
        { top: "70vh", width: "32vw", height: "30vh", translateX: "-5%" },
      ];
    }
    return [
      { top: "10vh", width: "20vw", height: "42vh", translateX: "-5%" },
      { top: "60vh", width: "18vw", height: "32vh", translateX: "15%" },
      { top: "100vh", width: "24vw", height: "60vh", translateX: "-10%" },
    ];
  };

  const getRightImagePositions = () => {
    if (isMobile) {
      return [
        { top: "15vh", width: "25vw", height: "22vh", translateX: "0%" },
        { top: "45vh", width: "32vw", height: "28vh", translateX: "0%" },
        { top: "80vh", width: "28vw", height: "25vh", translateX: "0%" },
      ];
    }
    return [
      { top: "20vh", width: "12vw", height: "30vh", translateX: "8%" },
      { top: "65vh", width: "20vw", height: "45vh", translateX: "-12%" },
      { top: "110vh", width: "19vw", height: "55vh", translateX: "5%" },
    ];
  };

  const leftImagePositions = getLeftImagePositions();
  const rightImagePositions = getRightImagePositions();

  return (
    <div className="relative h-[200vh] w-full bg-white">
      {/* Fixed container for scrolling content */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Lower z-index images layer (z-20) - images that go behind text */}
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{ zIndex: 20, isolation: "isolate" }}
          >
            {/* Left column lower z-index images */}
            <div
              className={`absolute ${
                isMobile ? "left-[5vw]" : "left-[10vw]"
              } h-full`}
            >
              {leftImages.map(
                (src, idx) =>
                  imageZIndexes.left[idx] === 20 && (
                    <motion.div
                      key={`left-lower-${idx}`}
                      style={{
                        y: leftImageYValues[idx],
                        position: "absolute",
                        top: leftImagePositions[idx].top,
                        width: leftImagePositions[idx].width,
                        height: leftImagePositions[idx].height,
                        transform: `translateX(${leftImagePositions[idx].translateX})`,
                      }}
                      className="overflow-hidden"
                    >
                      <img
                        src={src}
                        alt={`Project ${idx + 1}`}
                        className="w-full h-full object-cover rounded-xl shadow-lg"
                      />
                    </motion.div>
                  )
              )}
            </div>

            {/* Right column lower z-index images */}
            <div
              className={`absolute ${
                isMobile ? "right-[35vw]" : "right-[25vw]"
              } h-full`}
            >
              {rightImages.map(
                (src, idx) =>
                  imageZIndexes.right[idx] === 20 && (
                    <motion.div
                      key={`right-lower-${idx}`}
                      style={{
                        y: rightImageYValues[idx],
                        position: "absolute",
                        top: rightImagePositions[idx].top,
                        width: rightImagePositions[idx].width,
                        height: rightImagePositions[idx].height,
                        transform: `translateX(${rightImagePositions[idx].translateX})`,
                      }}
                      className="overflow-hidden"
                    >
                      <img
                        src={src}
                        alt={`Project ${idx + 4}`}
                        className="w-full h-full object-cover rounded-xl shadow-lg"
                      />
                    </motion.div>
                  )
              )}
            </div>
          </div>

          {/* Text layer (z-30) */}
          <motion.div
            style={{
              x: smoothTextX,
              y: smoothTextY,
              position: "absolute",
              top: "50%",
              left: isMobile ? "90%" : "80%",
              translateX: "-50%",
              translateY: "-50%",
              zIndex: 30,
            }}
          >
            <h1
              style={{
                fontSize: isMobile ? "18vw" : "18vw",
                fontFamily: "Saira Condensed, sans-serif",
              }}
              className="uppercase whitespace-nowrap tracking-tight text-black font-bold text-center"
            >
              Digital Innovation Studio
            </h1>
          </motion.div>

          {/* Higher z-index images layer (z-40) - images that go in front of text */}
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{ zIndex: 40, isolation: "isolate" }}
          >
            {/* Left column higher z-index images */}
            <div
              className={`absolute ${
                isMobile ? "left-[8vw]" : "left-[20vw]"
              } h-full`}
            >
              {leftImages.map(
                (src, idx) =>
                  imageZIndexes.left[idx] === 40 && (
                    <motion.div
                      key={`left-higher-${idx}`}
                      style={{
                        y: leftImageYValues[idx],
                        position: "absolute",
                        top: leftImagePositions[idx].top,
                        width: leftImagePositions[idx].width,
                        height: leftImagePositions[idx].height,
                        transform: `translateX(${leftImagePositions[idx].translateX})`,
                      }}
                      className="overflow-hidden"
                    >
                      <img
                        src={src}
                        alt={`Project ${idx + 1}`}
                        className="w-full h-full object-cover rounded-xl shadow-lg"
                        loading="eager"
                      />
                    </motion.div>
                  )
              )}
            </div>

            {/* Right column higher z-index images */}
            <div
              className={`absolute ${
                isMobile ? "right-[12vw]" : "right-[30vw]"
              } h-full`}
            >
              {rightImages.map(
                (src, idx) =>
                  imageZIndexes.right[idx] === 40 && (
                    <motion.div
                      key={`right-higher-${idx}`}
                      style={{
                        y: rightImageYValues[idx],
                        position: "absolute",
                        top: rightImagePositions[idx].top,
                        width: rightImagePositions[idx].width,
                        height: rightImagePositions[idx].height,
                        transform: `translateX(${rightImagePositions[idx].translateX})`,
                      }}
                      className="overflow-hidden"
                    >
                      <img
                        src={src}
                        alt={`Project ${idx + 4}`}
                        className="w-full h-full object-cover rounded-xl shadow-lg"
                        loading="eager"
                      />
                    </motion.div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
