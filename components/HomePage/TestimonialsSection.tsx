import { containerVariants, itemVariants } from "@/constants/homepage-data";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export const TestimonialSection = () => {
  const testimonials = [
    {
      quote:
        "CodeConnect slashed our technical assessment time by 40%. The dual video and code interface is a game-changer.",
      name: "Alex M.",
      title: "CTO, Innovatech",
    },
    {
      quote:
        "The low-latency editor feels like we're coding side-by-side. It provides a truly accurate picture of a candidate's skills.",
      name: "Jordan P.",
      title: "Sr. Engineering Manager, Webcorp",
    },
    {
      quote:
        "Easy to set up and incredibly reliable. Our recruitment team finally has the tool they need for remote interviews.",
      name: "Sarah K.",
      title: "Head of HR, FutureSoft",
    },
  ];

  return (
    <motion.section
      className="mb-20"
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
        Trusted by Top Tech Teams
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-xl border-t-4 border-cyan-500 shadow-xl"
            variants={itemVariants}
          >
            <Quote className="w-6 h-6 text-cyan-400 mb-3 rotate-180" />

            <p className="text-lg italic text-gray-300 mb-4">{`"${t.quote}"`}</p>

            <div className="text-sm">
              <p className="font-semibold text-white">{t.name}</p>
              <p className="text-cyan-400">{t.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
