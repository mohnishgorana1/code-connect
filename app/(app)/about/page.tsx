"use client";
import { Footer } from "@/components/Footer";
import { containerVariants, itemVariants } from "@/constants/homepage-data";
import { motion } from "framer-motion";
import { Gem, Globe, Zap } from "lucide-react";

const coreValues = [
  {
    icon: Zap,
    title: "Velocity",
    description:
      "We believe in speed of execution. Our platform is built for minimal friction, from one-click launch to live compilation.",
  },
  {
    icon: Gem,
    title: "Integrity",
    description:
      "Trust is paramount. We ensure secure, compliant, and auditable environments to protect both companies and candidates.",
  },
  {
    icon: Globe,
    title: "Connection",
    description:
      "Hiring is human. We integrate high-fidelity communication to ensure context and non-verbal cues are part of the process.",
  },
];

function AboutPage() {
  return (
    <main>
      <motion.main
        className="bg-gray-950 min-h-screen text-white pt-20 pb-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }} // Trigger animations when 20% of the main section is visible
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <motion.div className="text-center py-16" variants={itemVariants}>
            <motion.h2
              className="text-6xl font-extrabold tracking-tighter h-18 bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-indigo-500"
              variants={itemVariants}
            >
              Building the Future of Technical Hiring
            </motion.h2>
            <motion.p
              className="text-2xl text-indigo-200 max-w-3xl mx-auto mt-4"
              variants={itemVariants}
            >
              We are dedicated to transforming the technical interview from a
              stressful gatekeeper to a genuine collaboration.
            </motion.p>
          </motion.div>

          {/* --- 2. OUR MISSION & STORY --- */}
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-start bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-800"
            variants={itemVariants}
          >
            <div>
              <motion.h3
                className="text-3xl font-bold mb-4 text-cyan-400"
                variants={itemVariants}
              >
                Our Origin Story
              </motion.h3>
              <motion.p
                className="text-gray-300 leading-relaxed"
                variants={itemVariants}
              >
                Founded by a team of engineers and recruiters tired of
                fragmented tooling, we envisioned a single, comprehensive
                platform. We started with a simple collaborative editor and
                quickly realized the power of integrating high-fidelity video,
                real-time code execution, and structured assessment into one
                flow. Our goal is to measure competence, not performance
                anxiety.
              </motion.p>
            </div>
            <div>
              <motion.h3
                className="text-3xl font-bold mb-4 text-indigo-400"
                variants={itemVariants}
              >
                The Vision
              </motion.h3>
              <motion.p
                className="text-gray-300 leading-relaxed"
                variants={itemVariants}
              >
                To be the essential hub where every technical talent is
                accurately assessed and every engineering team finds their next
                great hire, all within a fair, transparent, and engaging
                environment. We aim to move beyond traditional screening methods
                and foster genuine connections between interviewers and
                candidates.
              </motion.p>
            </div>
          </motion.div>

          {/* --- 3. CORE VALUES GRID --- */}
          <div className="text-center">
            <motion.h2
              className="text-4xl font-extrabold mb-12"
              variants={itemVariants}
            >
              The Pillars We Stand On
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  className="p-8 rounded-xl bg-gray-800/50 border border-indigo-700/30 hover:shadow-2xl hover:shadow-indigo-900/50 transition duration-300"
                  variants={itemVariants}
                >
                  <value.icon className="w-10 h-10 text-pink-400 mx-auto mb-4 p-2 bg-gray-950 rounded-full shadow-lg" />
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- 4. FINAL CTA (Placeholder for the actual CTA component) --- */}
          <motion.div className="text-center pt-8 pb-4" variants={itemVariants}>
            <p className="text-xl text-cyan-300 font-semibold">
              Ready to transform your hiring process?
            </p>
            <button className="mt-4 px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-200">
              Contact Sales
            </button>
          </motion.div>
        </div>
      </motion.main>
      <Footer />
    </main>
  );
}

export default AboutPage;
