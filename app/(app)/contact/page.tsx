"use client";
import { Footer } from "@/components/Footer";
import { containerVariants, itemVariants } from "@/constants/homepage-data";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const contactDetails = [
  {
    icon: Mail,
    title: "General Inquiries",
    value: "mohnishgorana1@gmail.com",
    href: "mailto:mohnishgorana1@gmail.com",
  },
  {
    icon: Phone,
    title: "Sales & Partnerships",
    value: "+91 7999517181",
    href: "tel:+917999517181",
  },
  {
    icon: MapPin,
    title: "Headquarters",
    value: "Neemuch, MP",
    href: "#", // Placeholder link
  },
];

function ContactPage() {
  return (
    <div>
      <motion.main
        className="bg-gray-950 min-h-screen text-white pt-20 pb-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* --- 1. HERO SECTION --- */}
          <motion.div className="text-center py-16" variants={itemVariants}>
            <motion.h2
              className="text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-indigo-500"
              variants={itemVariants}
            >
              Get In Touch With Our Team
            </motion.h2>
            <motion.p
              className="text-xl text-indigo-200 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Whether you have questions about pricing, features, or need
              technical support, we&apos;re here to help.
            </motion.p>
          </motion.div>

          {/* --- 2. CONTACT FORM AND INFO GRID --- */}
          <div className="grid md:grid-cols-3 gap-12">
            {/* LEFT COLUMN: CONTACT DETAILS */}
            <motion.div
              className="md:col-span-1 space-y-8 p-6 bg-gray-900 rounded-xl shadow-xl border border-gray-800"
              variants={itemVariants}
            >
              <motion.h3
                className="text-2xl font-bold text-cyan-400"
                variants={itemVariants}
              >
                Direct Contacts
              </motion.h3>
              {contactDetails.map((detail, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  variants={itemVariants}
                >
                  <detail.icon className="w-6 h-6 text-pink-400 shrink-0 mt-1" />
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {detail.title}
                    </p>
                    <a
                      href={detail.href}
                      className="text-indigo-300 hover:text-indigo-400 transition"
                    >
                      {detail.value}
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* RIGHT COLUMN: CONTACT FORM */}
            <motion.div
              className="md:col-span-2 p-8 bg-gray-900 rounded-xl shadow-xl border border-gray-800"
              variants={itemVariants}
            >
              <motion.h3
                className="text-2xl font-bold mb-6 text-indigo-400"
                variants={itemVariants}
              >
                Send Us a Message
              </motion.h3>
              <form className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-cyan-500 focus:border-cyan-500 transition duration-150"
                    placeholder="Jane Doe"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-cyan-500 focus:border-cyan-500 transition duration-150"
                    placeholder="jane@company.com"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-cyan-500 focus:border-cyan-500 transition duration-150"
                    placeholder="How can we help you?"
                  ></textarea>
                </motion.div>
                <motion.button
                  type="submit"
                  className="w-full px-4 py-3 bg-cyan-600 text-white font-bold rounded-lg shadow-md hover:bg-cyan-700 transition duration-200"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Inquiry
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
}

export default ContactPage;
