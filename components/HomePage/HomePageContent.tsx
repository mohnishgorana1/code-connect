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

function HomePageContent() {
  return (
    <motion.main
      className="min-h-screen bg-gray-950 text-white font-inter p-4 sm:p-8 home-scrollbar"
      initial="hidden"
      animate="visible"
      // This section uses 'animate' which runs on mount, so no 'once: true' issue here
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto py-16 md:py-24">
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <CodeDemoSection />
        <AdvancedFeaturesSection />
        <LanguageSupportSection />
        <TestimonialSection />
        <TechStackSection />
        <FAQSection />
        <PricingSection />
        <FinalCallToAction />
      </div>
    </motion.main>
  );
}

export default HomePageContent;
