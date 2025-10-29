import { containerVariants, itemVariants } from "@/constants/homepage-data";
import { motion } from "framer-motion";
import { Code, Cpu, Layers, Zap } from "lucide-react";

export const TechStackSection = () => {
  const technologies = [
    {
      icon: Zap,
      name: "React",
      description: "Modern, high-performance UI library.",
    },
    {
      icon: Cpu,
      name: "WebRTC",
      description: "Peer-to-peer, low-latency video and audio.",
    },
    {
      icon: Code,
      name: "Monaco Editor",
      description: "VS Code's powerful code editor engine.",
    },
    {
      icon: Layers,
      name: "Realtime Sync",
      description: "Optimized data synchronization architecture.",
    },
  ];

  return (
    <motion.section
      className="mb-20 py-10 bg-gray-900/50 rounded-2xl"
      initial="hidden"
      whileInView="visible"
      // FIX: Removed 'once: true'
      viewport={{ amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl font-bold text-center text-gray-100 mb-12"
        variants={itemVariants}
      >
        Built on a Rock-Solid Foundation
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            className="text-center p-4"
            variants={itemVariants}
          >
            <tech.icon className="w-12 h-12 text-indigo-400 mx-auto mb-3" />

            <h4 className="text-xl font-semibold text-white">{tech.name}</h4>

            <p className="text-gray-400 text-sm">{tech.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
