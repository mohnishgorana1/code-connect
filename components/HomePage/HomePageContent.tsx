"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { containerVariants } from "@/constants/homepage-data";
import { HeroSection } from "./HeroSection";
import { AdvancedFeaturesSection, FeaturesSection } from "./FeaturesSection";
import { WorkflowSection } from "./WorkflowSection";
import { LanguageSupportSection } from "./LanguageSupportSection";
import { TestimonialSection } from "./TestimonialsSection";
import { TechStackSection } from "./TechStackSection";
import { FAQSection } from "./FAQSection";
import { PricingSection } from "./PricingSection";
import { FinalCallToAction } from "./FinalCallToAction";
import { CodeDemoSection } from "./CodeDemoSection";
import { Footer } from "../Footer";

function HomePageContent() {
  return (
    <motion.main
      className="min-h-screen bg-gray-950 text-white font-inter  home-scrollbar"
      initial="hidden"
      animate="visible"
      // This section uses 'animate' which runs on mount, so no 'once: true' issue here
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto py-20 md:pt-32 ">
        <HeroSection />
        <WorkflowSection />
        <FeaturesSection />
        <CodeDemoSection />
        <AdvancedFeaturesSection />
        <LanguageSupportSection />
        <TestimonialSection />
        <TechStackSection />
        <FAQSection />
        <PricingSection />
        <FinalCallToAction />
      </div>
      <Footer />
    </motion.main>
  );
}

export default HomePageContent;
