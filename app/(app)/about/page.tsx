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
        viewport={{ amount: 0.2 }}
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

          <motion.div className="space-y-16" variants={itemVariants}>
            <motion.div
              className="text-center max-w-4xl mx-auto"
              variants={itemVariants}
            >
              <motion.h3
                className="text-4xl font-extrabold mb-4 text-indigo-300"
                variants={itemVariants}
              >
                Our Purpose: Competence Over Anxiety
              </motion.h3>
              <motion.p
                className="text-gray-300 text-lg leading-relaxed"
                variants={itemVariants}
              >
                Founded by engineers and recruiters tired of fragmented tooling,
                we envisioned a single, comprehensive platform that shifts the
                focus from performance pressure back to genuine technical merit.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10">
              <motion.div
                className="p-6 rounded-lg border-l-4 border-cyan-500 bg-gray-900/70 shadow-lg"
                variants={itemVariants}
              >
                <motion.h4
                  className="text-2xl font-bold mb-3 text-cyan-400"
                  variants={itemVariants}
                >
                  Our Origin Story
                </motion.h4>
                <motion.p
                  className="text-gray-300 leading-relaxed"
                  variants={itemVariants}
                >
                  We started with a simple collaborative editor and quickly
                  realized the power of integrating high-fidelity video,
                  real-time code execution, and structured assessment into one
                  flow. Our goal is to measure true **competence**, not just
                  interview performance.
                </motion.p>
              </motion.div>

              {/* THE VISION */}
              <motion.div
                className="p-6 rounded-lg border-l-4 border-indigo-500 bg-gray-900/70 shadow-lg"
                variants={itemVariants}
              >
                <motion.h4
                  className="text-2xl font-bold mb-3 text-indigo-400"
                  variants={itemVariants}
                >
                  The Vision
                </motion.h4>
                <motion.p
                  className="text-gray-300 leading-relaxed"
                  variants={itemVariants}
                >
                  To be the essential hub where every technical talent is
                  accurately assessed and every engineering team finds their
                  next great hire. We champion a **fair, transparent, and
                  engaging** environment that fosters genuine connection.
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          <div className="text-center pt-16">
            {" "}
            <motion.h2
              className="text-4xl font-extrabold mb-12 text-indigo-300"
              variants={itemVariants}
            >
              The Pillars We Stand On
            </motion.h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-10 mx-auto w-full">
              {" "}
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  className="p-8 rounded-xl bg-gray-800 shadow-2xl 
                             border-t-4 border-b-4 border-indigo-700/50 
                             hover:border-t-4 hover:border-b-4 hover:border-cyan-500 
                             transition duration-500 transform hover:scale-[1.02] 
                             flex flex-col justify-between"
                  variants={itemVariants}
                >
                  <div className="mb-4">
                    <value.icon
                      className={`w-12 h-12 mx-auto mb-3 p-2 rounded-lg shadow-lg 
                                          ${
                                            value.title === "Velocity"
                                              ? "text-pink-300 bg-indigo-900/50"
                                              : value.title === "Integrity"
                                              ? "text-cyan-300 bg-indigo-900/50"
                                              : value.title === "Connection"
                                              ? "text-yellow-300 bg-indigo-900/50"
                                              : "text-green-300 bg-indigo-900/50"
                                          }`}
                    />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-sm grow">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

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
