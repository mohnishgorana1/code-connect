import { motion } from "framer-motion";
const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};
export const TitleWord = ({ children }) => (
  <motion.span
    className="inline-block mr-3"
    variants={itemVariants}
    style={{ display: "inline-block" }}
  >
     {children}
  </motion.span>
);