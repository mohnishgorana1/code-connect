import { motion } from "framer-motion";
import { TitleWord } from "./TitleWord";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAppUser } from "@/contexts/UserContext";
import { Role } from "@/models/user.model";

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

export const HeroSection = () => {
  // Split the title into words for individual animation
  const titleWords1 = ["CodeConnect"];
  const titleWords2 = ["Live", "Interview", "Platform"];

  const { appUser } = useAppUser();

  return (
    <section className="text-center mb-20">
      <motion.h1
        className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-indigo-500">
          {titleWords1.map((word, index) => (
            <TitleWord key={index}>{word}</TitleWord>
          ))}
        </span>

        <span className="block text-gray-200 mt-2">
          {titleWords2.map((word, index) => (
            <TitleWord key={titleWords1.length + index}>{word}</TitleWord>
          ))}
        </span>
      </motion.h1>

      <motion.p
        className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-10"
        variants={itemVariants}
      >
        Streamline technical interviews with synchronized{" "}
        <strong>video conferencing </strong>
        and a <strong>real-time code editor </strong>
        in one collaborative space.
      </motion.p>

      {/* Animated Call to Action Button */}
      {appUser?.role === Role.Interviewer ? (
        <motion.button
          className="px-8 py-4 bg-linear-to-r from-cyan-500 to-indigo-600 text-lg font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/50 transition duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 25px rgba(0, 255, 255, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href={"/meeting/create"}>Start Your Live Session</Link>
          <ArrowRight className="ml-2 w-5 h-5" />
        </motion.button>
      ) : (
        <motion.button
          className="px-8 py-4 bg-linear-to-r from-cyan-500 to-indigo-600 text-lg font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/50 transition duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 25px rgba(0, 255, 255, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href={"/meeting/join"}>Join Your Live Session</Link>
          <ArrowRight className="ml-2 w-5 h-5" />
        </motion.button>
      )}
    </section>
  );
};
