import AnimatedCodeLine from "./AnimatedCodeLine";
import { motion } from "framer-motion";

export const CodeDemoSection = () => (
  <section className="mb-20">
    <motion.h2
      className="text-3xl font-bold text-center text-gray-100 mb-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      // FIX: Removed 'once: true'
      viewport={{ amount: 0.3 }}
      transition={{ delay: 0.2 }}
    >
      Experience the Synergy
    </motion.h2>

    <motion.div
      className="bg-gray-800 rounded-2xl p-6 md:p-10 shadow-3xl overflow-hidden"
      initial={{ scaleY: 0.5, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      // FIX: Removed 'once: true'
      viewport={{ amount: 0.3 }}
      transition={{ type: "spring", stiffness: 80, delay: 0.4 }}
    >
      <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
        <span className="text-lg font-mono text-cyan-400">/src/task.js</span>

        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>

          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>

          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      {/* Mock Code Lines with typing animation effect */}

      <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
        <AnimatedCodeLine delay={0.8}>
          <span className="text-pink-400">function</span>{" "}
          <span className="text-yellow-300">findUnique</span>(arr) {"{"}
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={1.2} className="pl-4">
          <span className="text-gray-500">
            {`// Candidate is typing this line...`}
          </span>
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={1.6} className="pl-4">
          <span className="text-blue-400">const</span> counts ={" "}
          <span className="text-pink-400">new</span>{" "}
          <span className="text-yellow-300">Map</span>();
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={2.0} className="pl-4">
          <span className="text-blue-400">for</span> (
          <span className="text-blue-400">const</span> item{" "}
          <span className="text-pink-400">of</span> arr) {"{"}
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={2.4} className="pl-8">
          counts.
          <span className="text-yellow-300">set</span>(item, (counts.
          <span className="text-yellow-300">get</span>(item) ||{" "}
          <span className="text-green-400">0</span>) +{" "}
          <span className="text-green-400">1</span>);
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={2.8} className="pl-4">
          {"}"}
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={3.2} className="pl-4">
          <span className="text-pink-400">for</span> (
          <span className="text-blue-400">const</span> [item, count]{" "}
          <span className="text-pink-400">of</span> counts) {"{"}
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={3.6} className="pl-8">
          <span className="text-blue-400">if</span> (count ==={" "}
          <span className="text-green-400">1</span>) {"{"}
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={4.0} className="pl-12">
          <span className="text-pink-400">return</span> item;{" "}
          <span className="text-gray-500">
            {`// Interviewer points to this line`}
          </span>
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={4.4} className="pl-8">
          {"}"}
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={4.8} className="pl-4">
          {"}"}
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={5.2}>{"}"}</AnimatedCodeLine>
      </div>
    </motion.div>
  </section>
);
