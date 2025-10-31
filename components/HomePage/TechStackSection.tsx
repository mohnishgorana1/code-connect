import { motion } from "framer-motion";
import { Code, Cpu, Layers, Zap } from "lucide-react";
// Assuming these provide basic hidden/visible states for stagger to work
import { containerVariants, itemVariants } from "@/constants/homepage-data";

export const TechStackSection = () => {
  const technologies = [
    {
      icon: Zap,
      name: "React",
      description:
        "Powers the entire, lightning-fast user interface. Ensures a dynamic and high-performance frontend experience.",
    },
    {
      icon: Cpu,
      name: "WebRTC",
      description:
        "Enables secure, peer-to-peer, and low-latency video and audio streaming for flawless live interviews.",
    },
    {
      icon: Code,
      name: "Monaco Editor",
      description:
        "The powerful code engine from VS Code, providing syntax highlighting, autocomplete, and multi-language support.",
    },
    {
      icon: Layers,
      name: "Realtime Sync",
      description:
        "Custom-built, optimized architecture to synchronize code, state, and actions instantly between all participants.",
    },
  ];

  return (
    <motion.section
      className="mb-20 pt-16 pb-20 bg-gray-900/50 rounded-2xl border border-gray-800 shadow-2xl" // Enhanced outer styling
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.3 }}
      // 🚨 Enhancement 1: Staggered animation for sequential reveal
      variants={{
        visible: { transition: { staggerChildren: 0.15 } },
        hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
      }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-12 
    bg-clip-text text-transparent bg-linear-to-r from-indigo-300 to-cyan-400" // Updated gradient for contrast
        variants={itemVariants}
      >
        Built on a Rock-Solid Foundation
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            // 🚨 Enhancement 3: Glassmorphism/Premium Card Style
            className="text-center p-6 rounded-2xl h-full flex flex-col justify-between cursor-pointer 
                   border border-indigo-700/50 backdrop-blur-sm bg-indigo-900/20 shadow-xl transition-all duration-300"
            variants={itemVariants}
            // 🚨 Enhancement 2: Wiggle/Bounce Hover Effect
            whileHover={{
              scale: 1.05,
              rotate: [0, -2, 2, -2, 2, 0], // Wiggle sequence is now supported
              boxShadow: "0 0 40px rgba(129, 140, 248, 0.6)",

              transition: {
                // 💡 FIX: Explicitly use "tween" for keyframe support
                type: "tween",
                duration: 0.5, // Total time for the wiggle and scale change
                ease: "easeInOut",
              },
            }}
          >
            {/* Icon and Name */}
            <tech.icon className="w-12 h-12 text-indigo-400 mx-auto mb-4" />

            <h4 className="text-xl font-bold text-white mb-2">{tech.name}</h4>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-snug">
              {tech.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
