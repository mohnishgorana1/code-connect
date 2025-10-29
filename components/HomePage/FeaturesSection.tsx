import { BarChart, ClipboardList, Clock, Code, Users, Video } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/constants/homepage-data";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Code,
      title: "Real-Time Code Editor",
      description:
        "Collaborate instantly on tasks with synchronized cursors and syntax highlighting.",
    },
    {
      icon: Video,
      title: "Integrated Video & Audio",
      description:
        "Keep the conversation flowing naturally with a built-in, high-definition video call.",
    },
    {
      icon: Users,
      title: "One-Click Interview Room",
      description:
        "Launch secure, dedicated sessions with all the tools necessary for a technical assessment.",
    },
  ];

  return (
    <motion.section
      className="grid md:grid-cols-3 gap-8 mb-20"
      initial="hidden"
      whileInView="visible"
      // FIX: Removed 'once: true'
      viewport={{ amount: 0.3 }}
      variants={containerVariants}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="bg-gray-800/70 p-8 rounded-2xl border border-gray-700 shadow-2xl hover:bg-gray-800 transition duration-300"
          variants={itemVariants}
        >
          <feature.icon className="w-10 h-10 text-cyan-400 mb-4 p-1.5 bg-gray-900 rounded-full" />

          <h3 className="text-2xl font-bold mb-3 text-white">
            {feature.title}
          </h3>

          <p className="text-gray-400">{feature.description}</p>
        </motion.div>
      ))}
    </motion.section>
  );
};

export const AdvancedFeaturesSection = () => {
  const advancedFeatures = [
    {
      icon: Clock,
      title: "Full Interview Playback",
      description:
        "Replay the entire coding session— keystroke by keystroke—to gain deeper insight into problem-solving approaches.",
      color: "text-red-400",
    },
    {
      icon: BarChart,
      title: "Performance Benchmarking",
      description:
        "Automatically grade code correctness and efficiency against test cases and track candidate time-to-solution.",
      color: "text-yellow-400",
    },
    {
      icon: ClipboardList,
      title: "Custom Template Library",
      description:
        "Save and share custom interview templates and evaluation rubrics across your entire engineering team.",
      color: "text-green-400",
    },
  ];

  return (
    <motion.section
      className="mb-20 py-10"
      initial="hidden"
      whileInView="visible"
      // FIX: Removed 'once: true'
      viewport={{ amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-4xl font-extrabold text-center mb-12 text-gray-100"
        variants={itemVariants}
      >
        Enterprise-Ready Assessment Tools
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">
        {advancedFeatures.map((feature, index) => (
          <motion.div
            key={index}
            className="p-8 rounded-2xl bg-gray-900 border border-gray-700 shadow-xl"
            variants={itemVariants}
          >
            <feature.icon
              className={`w-10 h-10 mb-4 ${feature.color} p-1.5 bg-gray-800 rounded-full`}
            />

            <h3 className="text-2xl font-bold mb-3 text-white">
              {feature.title}
            </h3>

            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
