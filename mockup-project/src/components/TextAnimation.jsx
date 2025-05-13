import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function TextAnimation({ text, children, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div
      ref={ref}
      className={`relative w-full flex justify-center items-center text-center py-4 ${className}`}
    >
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {children || text}
      </motion.div>
    </div>
  );
}
