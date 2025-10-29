'use client'
import { containerVariants, itemVariants } from "@/constants/homepage-data";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const FAQItem = ({ question, answer }: { question: any; answer: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      className="border-b border-gray-700 py-4"
      variants={itemVariants}
    >
      <button
        className="flex justify-between items-center w-full text-left text-lg font-semibold text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-cyan-400" />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="mt-3 pb-2 text-gray-400">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

export const FAQSection = () => {
  const faqs = [
    {
      question:
        "What infrastructure do you use to support different languages?",
      answer:
        "CodeConnect utilizes secure, containerized environments for each coding session. This ensures fast, isolated execution for every supported language without requiring any local setup from the user or candidate.",
    },
    {
      question: "Is the video conferencing secure and reliable?",
      answer:
        "We use WebRTC with end-to-end encryption for all video and audio streams. Our infrastructure is optimized for low-latency, high-definition communication, minimizing connectivity issues.",
    },
    {
      question:
        "Can I integrate CodeConnect with my Applicant Tracking System (ATS)?",
      answer:
        "Yes, the Pro Plan includes API access for seamless integration with major ATS platforms (e.g., Greenhouse, Lever) to streamline interview scheduling and data synchronization.",
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
        className="text-3xl font-bold text-center text-gray-100 mb-8"
        variants={itemVariants}
      >
        Frequently Asked Questions
      </motion.h2>

      <motion.div
        className="max-w-3xl mx-auto bg-gray-900 rounded-xl p-6 shadow-xl border border-gray-800"
        variants={itemVariants}
      >
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </motion.div>
    </motion.section>
  );
};