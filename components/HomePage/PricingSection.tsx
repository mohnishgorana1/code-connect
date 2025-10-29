import { motion } from "framer-motion";
import { Check } from "lucide-react";

export const PricingSection = () => {
  const pricingFeatures = [
    "Unlimited Interviews",
    "Custom Interview Templates",
    "Code Playback & Review",
    "Dedicated Support Channel",
  ];

  return (
    <section className="pt-10 pb-4 mb-20">
      <motion.h2
        className="text-3xl font-bold text-center text-gray-100 mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        // FIX: Removed 'once: true' (if it were present)
        viewport={{ amount: 0.3 }}
      >
        Ready to Upgrade Your Hiring?
      </motion.h2>

      <motion.div
        className="max-w-4xl mx-auto bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        // FIX: Removed 'once: true'
        viewport={{ amount: 0.2 }}
        transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Free Trial Card */}
          <div className="flex-1 p-6 bg-gray-900 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-2">Free Trial</h3>

            <p className="text-gray-400 mb-4">
              Perfect for individual users and quick tests.
            </p>

            <p className="text-4xl font-extrabold text-cyan-400 mb-6">
              $0<span className="text-lg text-gray-500">/mo</span>
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-300">
                <Check className="w-5 h-5 text-green-400 mr-2" /> 5
                Interviews/Month
              </li>

              <li className="flex items-center text-gray-300">
                <Check className="w-5 h-5 text-green-400 mr-2" /> Basic Code
                Editor
              </li>

              <li className="flex items-center text-gray-300">
                <Check className="w-5 h-5 text-green-400 mr-2" /> Standard Video
                Quality
              </li>
            </ul>

            <button className="w-full py-3 bg-cyan-600 font-semibold rounded-lg hover:bg-cyan-500 transition duration-200">
              Try for Free
            </button>
          </div>
          {/* Pro Plan Card */}
          <div className="flex-1 p-6 bg-indigo-900 rounded-xl border-4 border-indigo-500 shadow-indigo-500/30">
            <h3 className="text-2xl font-bold text-white mb-2">Pro Plan</h3>

            <p className="text-indigo-200 mb-4">
              Scalable solution for growing recruitment teams.
            </p>

            <p className="text-5xl font-extrabold text-white mb-6">
              $99<span className="text-lg text-indigo-300">/mo</span>
            </p>

            <ul className="space-y-3 mb-6">
              {pricingFeatures.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center text-white font-medium"
                >
                  <Check className="w-5 h-5 text-green-300 mr-2" /> {f}
                </li>
              ))}
            </ul>

            <button className="w-full py-3 bg-white text-indigo-800 font-bold rounded-lg hover:bg-gray-100 transition duration-200 shadow-lg">
              Go Pro Now
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
