import { containerVariants, itemVariants } from "@/constants/homepage-data";
import { ArrowRight, Link, MessageSquare, Target } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

export const WorkflowSection = () => {
  const steps = [
    {
      step: 1,
      title: "Create Room & Task",
      icon: Link,
      description:
        "Define the interview parameters and select a pre-loaded coding task or create your own from scratch.",
    },
    {
      step: 2,
      title: "Invite Candidate",
      icon: MessageSquare,
      description:
        "Share the unique, secure link instantly via email or integrate with your existing ATS system.",
    },
    {
      step: 3,
      title: "Collaborate & Assess",
      icon: Target,
      description:
        "Conduct the live video session while observing the candidate's coding process in real-time.",
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
        className="text-4xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-linear-to-r from-white to-cyan-200"
        variants={itemVariants}
      >
        How CodeConnect Works in 3 Simple Steps
      </motion.h2>

      <div className="grid md:grid-cols-11 gap-4 items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.step}>
            {/* Step Card */}
            <motion.div
              className="col-span-1 md:col-span-3 flex flex-col items-center p-6 bg-gray-800/80 rounded-xl shadow-xl border border-gray-700 h-full"
              variants={itemVariants}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500/20 border-2 border-indigo-400 text-indigo-400 font-bold text-xl mb-4">
                {step.step}
              </div>

              <step.icon className="w-8 h-8 text-cyan-400 mb-3" />

              <h3 className="text-xl font-bold text-white mb-2 text-center">
                {step.title}
              </h3>

              <p className="text-gray-400 text-sm text-center">
                {step.description}
              </p>
            </motion.div>

            {/* Arrow Separator (Hidden on mobile, hidden after last step) */}
            {index < steps.length - 1 && (
              <motion.div
                className="hidden md:flex items-center justify-center col-span-1"
                variants={itemVariants}
              >
                <ArrowRight className="w-10 h-10 text-gray-500 animate-pulse" />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.section>
  );
};