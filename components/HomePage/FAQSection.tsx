"use client";
import { containerVariants, itemVariants } from "@/constants/homepage-data";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const FAQItem = ({
  question,
  answer,
}: {
  question: any;
  answer: any;
}) => {
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
        "No, direct API integration with external Applicant Tracking Systems (ATS) is currently not supported. You can export interview data manually for import into your ATS.",
    },
    {
      question: "What programming languages are supported?",
      answer:
        "We support some major programming languages, including Python, JavaScript (Node.js), Java, C++. All environments come pre-configured with necessary compilers and runtime dependencies.",
    },
    {
      question: "How does the code playback feature work?",
      answer:
        "The code playback feature captures every keystroke, clipboard paste, and code execution event. It then reconstructs the entire interview timeline, allowing reviewers to see the exact progression of the candidate's solution.",
    },
    {
      question: "Do I need to install any software?",
      answer:
        "Absolutely not. CodeConnect is entirely browser-based. Interviewers and candidates only need a modern web browser (Chrome, Firefox, Edge) and a stable internet connection.",
    },
    {
      question: "What is the cost structure?",
      answer:
        "We offer three main tiers: a Free Tier for basic use, a Team Plan with more features and user seats, and an Enterprise Plan tailored for larger organizations with custom needs.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 14-day free trial for the Team Plan, which gives you full access to all collaborative features to test our platform thoroughly before committing.",
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
        className="max-w-3xl md:max-w-5xl mx-auto bg-gray-900 rounded-xl p-6 shadow-xl border border-gray-800"
        variants={itemVariants}
      >
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </motion.div>
    </motion.section>
  );
};
