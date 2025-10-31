"use client";
import { containerVariants, itemVariants } from "@/constants/homepage-data";
import { useAppUser } from "@/contexts/UserContext";
import { Role } from "@/models/user.model";
import { motion } from "framer-motion";
import Link from "next/link";

export const FinalCallToAction = () => {
  const { appUser } = useAppUser();

  let headline = "Stop Screening. Start Connecting.";
  let subheading =
    "Get a 14-day free trial and experience the future of technical hiring today.";
  let buttonText = "Claim Your Free Trial";
  let link = "/sign-up";

  if (appUser?.role === Role.Interviewer) {
    headline = "Streamline Your Hiring Funnel.";
    subheading =
      "Discover custom assessment templates and seamless collaboration tools. Get started with your 14-day free trial today.";
    buttonText = "Start Free Trial for Interviewers";
    link = "/meeting/create";
  } else if (appUser?.role === Role.Candidate) {
    headline = "Land Your Dream Role Faster.";
    subheading = "";
    buttonText = "Join Meeting Now";
    link = "/meeting/join";
  }

  return (
    <motion.section
      className="my-8 pt-16 pb-16 rounded-2xl shadow-3xl bg-linear-to-r from-cyan-900/50 from-10% via-40% via-purple-900/30 to-90% to-indigo-900/50"
      initial="hidden"
      whileInView="visible"
      // FIX: Removed 'once: true'
      viewport={{ amount: 0.5 }}
      variants={containerVariants}
    >
      <div className="text-center max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl font-extrabold mb-4 text-white"
          variants={itemVariants}
        >
          {headline}
        </motion.h2>

        <motion.p
          className="text-xl text-indigo-200 mb-8"
          variants={itemVariants}
        >
          {subheading}
        </motion.p>

        <Link href={link}>
          <motion.button
            className="px-10 py-4 bg-white text-indigo-800 text-lg font-bold rounded-xl shadow-xl hover:bg-gray-200 transition duration-300 transform hover:scale-105 cursor-pointer"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {buttonText}
          </motion.button>
        </Link>
      </div>
    </motion.section>
  );
};
