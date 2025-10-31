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

  const bgClasses = [
    "bg-blue-900/30", // Step 1: Slightly blue tint
    "bg-purple-900/20", // Step 2: Slightly purple tint
    "bg-green-900/30", // Step 3: Slightly green tint
  ];

  return (
    <motion.section className="mb-20 py-10" viewport={{ amount: 0.3 }}>
      <motion.h2
        className="text-4xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-linear-to-r from-white to-cyan-200"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} // Title ko abhi bhi sirf ek baar animate rakhte hain
        transition={{ duration: 0.5 }}
      >
        How CodeConnect Works in 3 Simple Steps
      </motion.h2>

      <div className="grid md:grid-cols-11 gap-4 items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.step}>
            <motion.div
              className={`col-span-1 md:col-span-3 flex flex-col items-center p-6 ${bgClasses[index]} rounded-xl shadow-xl  h-full transition duration-300 cursor-pointer hover:scale-110 ease-in-out `}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ amount: 0.5 }}
              transition={{
                delay: index * 0.4, // Slower delay (0s, 0.4s, 0.8s)
                duration: 0.7, // Slower duration
                type: "spring",
                stiffness: 80, // Thoda soft spring effect
              }}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500/20 border-2 border-indigo-400 text-indigo-400 font-bold text-xl mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center flex items-center gap-3">
                {step.title}
                <step.icon className="w-8 h-8 text-cyan-400" />
              </h3>
              <p className="text-gray-400 text-sm text-center">
                {step.description}
              </p>{" "}
            </motion.div>

            {/* Arrow Separator */}
            {index < steps.length - 1 && (
              <motion.div
                className="hidden md:flex items-center justify-center col-span-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                // 🚨 FIX 1: 'once: true' ko hataya
                viewport={{ amount: 0.5 }}
                transition={{
                  // Arrow delay bhi badhaya
                  delay: index * 0.4 + 0.6,
                  duration: 0.5,
                }}
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
