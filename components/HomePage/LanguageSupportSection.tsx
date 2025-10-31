import { containerVariants, itemVariants } from "@/constants/homepage-data";
import { motion } from "framer-motion";

export const LanguageSupportSection = () => {
  const languages = [
    {
      name: "JavaScript / Node.js",
      icon: "JS",
      status: "Available",
      color: "text-yellow-300",
    },
    {
      name: "Python 3",
      icon: "Py",
      status: "Available",
      color: "text-blue-400",
    },
    {
      name: "Java 17",
      icon: "Ja",
      status: "Coming Soon",
      color: "text-red-500",
    },
    { name: "C++ 20", icon: "C+", status: "Available", color: "text-cyan-400" },
    { name: "Go", icon: "Go", status: "Coming Soon", color: "text-green-400" },
    {
      name: "TypeScript",
      icon: "TS",
      status: "Available",
      color: "text-indigo-400",
    },
  ];

  return (
    <motion.section
      className="mb-20"
      initial="hidden"
      whileInView="visible"
      // FIX: Removed 'once: true'
      viewport={{ amount: 0.1 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl font-bold text-center text-gray-100 mb-12"
        variants={itemVariants}
      >
        Multi-Language Environment
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {languages.map((lang, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center p-4 bg-gray-800/80 rounded-xl border border-gray-700 hover:bg-gray-700/50 hover:-translate-y-3 ease-out  transition duration-300"
            variants={itemVariants}
          >
            <span className={`text-xl font-extrabold ${lang.color} mb-1`}>
              {lang.icon}
            </span>

            <p className="text-sm font-medium text-gray-300 text-center">
              {lang.name}{" "}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
