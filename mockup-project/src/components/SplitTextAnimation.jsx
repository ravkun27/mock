import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function SplitTextAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div
      ref={ref}
      className="w-full flex flex-col justify-center my-12 text-center tracking-[-0.05em] font-[Saira_Condensed] px-4"
    >
      {/* Line 1: STRAIGHT */}
      <motion.div
        className="flex flex-wrap font-bold uppercase mb-10 
                   text-[19vw] md:text-[9vw] lg:text-[8vw] leading-none"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.span variants={wordVariants}>Straight</motion.span>
      </motion.div>

      {/* Line 2: TO THE [image] */}
      <motion.div
        className="flex flex-wrap items-center font-bold uppercase mb-10 gap-4 sm:gap-6 md:gap-10 
                   text-[19vw] md:text-[9vw] lg:text-[8vw] leading-none"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {["To", "The"].map((word, idx) => (
          <motion.span key={idx} variants={wordVariants}>
            {word}
          </motion.span>
        ))}
        <motion.span variants={wordVariants}>
          <img
            src="https://cdn.prod.website-files.com/672a1dc3f9c27f98c24c36dc/673350fee016d0d7c36ae365_work-6-big-p-800.avif"
            alt="icon"
            className="w-[40vw] sm:w-[30vw] md:w-[20vw] h-auto max-h-[30vh] object-cover rounded-2xl"
          />
        </motion.span>
      </motion.div>

      {/* Line 3: BOLD IDEAS */}
      <motion.div
        className="flex flex-wrap gap-4 sm:gap-6 md:gap-10 font-bold uppercase 
                   text-[19vw] sm:text-[10vw] md:text-[9vw] lg:text-[8vw] leading-none"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {["Bold", "Ideas"].map((word, idx) => (
          <motion.span key={idx} variants={wordVariants}>
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
