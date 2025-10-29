"use client";
import { motion } from "framer-motion";

const AnimatedCodeLine = ({ children, delay, className = "" }: {
    children: React.ReactNode,
    delay: number;
    className?: string;
}) => (
  <motion.div
    className={`mb-0.5 text-gray-200 ${className}`}
    initial={{ width: 0, opacity: 0 }}
    whileInView={{ width: "100%", opacity: 1 }}
    // FIX: Removed viewport={{ once: true }} to allow re-animation on scroll
    viewport={{ amount: 0.8 }} // Set a high amount so the animation triggers immediately
    transition={{
      duration: 0.5,
      delay: delay,
      ease: "easeInOut",
    }}
    style={{ overflow: "hidden", whiteSpace: "nowrap" }}
  >
    {children}
  </motion.div>
);
export default AnimatedCodeLine