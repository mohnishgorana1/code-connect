import { containerVariants, itemVariants } from "@/constants/homepage-data";
import { motion } from "framer-motion";

export const FinalCallToAction = () => (
  <motion.section
    className="mb-40 pt-16 pb-16 bg-linear-to-r from-cyan-900/50 to-indigo-900/50 rounded-2xl border border-indigo-700 shadow-3xl"
    initial="hidden"
    whileInView="visible"
    // FIX: Removed 'once: true'
    viewport={{ amount: 0.5 }}
    variants={containerVariants}
  >
    <div className="text-center max-w-4xl mx-auto">
      <motion.h2
        className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-linear-to-r from-white to-cyan-200"
        variants={itemVariants}
      >
        Stop Screening. Start Connecting.
      </motion.h2>

      <motion.p
        className="text-xl text-indigo-200 mb-8"
        variants={itemVariants}
      >
        Get a 14-day free trial and experience the future of technical hiring
        today.
      </motion.p>

      <motion.button
        className="px-10 py-4 bg-white text-indigo-800 text-lg font-bold rounded-xl shadow-xl hover:bg-gray-200 transition duration-300 transform hover:scale-105"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Claim Your Free Trial
      </motion.button>
    </div>
  </motion.section>
);
