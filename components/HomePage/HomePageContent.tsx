"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Video,
  Users,
  ArrowRight,
  Quote,
  Zap,
  Cpu,
  Layers,
  BarChart,
  Clock,
  ClipboardList,
  MessageSquare,
  Target,
  Terminal,
  Check,
  Link,
  ChevronDown,
  Plug,
} from "lucide-react";
import AnchorLink from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const AnimatedCodeLine = ({ children, delay, className = "" }) => (
  <motion.div
    className={`mb-0.5 text-gray-200 ${className}`}
    initial={{ width: 0, opacity: 0 }}
    whileInView={{ width: "100%", opacity: 1 }}
    // FIX: Removed viewport={{ once: true }} to allow re-animation on scroll
    viewport={{ amount: 0.8 }} // Set a high amount so the animation triggers immediately
    transition={{
      duration: 0.5,
      delay: delay,
      ease: "easeInOut",
    }}
    style={{ overflow: "hidden", whiteSpace: "nowrap" }}
  >
    {children}
  </motion.div>
);

const TitleWord = ({ children }) => (
  <motion.span
    className="inline-block mr-3"
    variants={itemVariants}
    style={{ display: "inline-block" }}
  >
     {children}
  </motion.span>
);
const HeroSection = () => {
  // Split the title into words for individual animation
  const titleWords1 = ["CodeConnect"];
  const titleWords2 = ["Live", "Interview", "Platform"];

  return (
    <section className="text-center mb-20">
      <motion.h1
        className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-indigo-500">
          {titleWords1.map((word, index) => (
            <TitleWord key={index}>{word}</TitleWord>
          ))}
        </span>

        <span className="block text-gray-200 mt-2">
          {titleWords2.map((word, index) => (
            <TitleWord key={titleWords1.length + index}>{word}</TitleWord>
          ))}
        </span>
      </motion.h1>

      <motion.p
        className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-10"
        variants={itemVariants}
      >
        Streamline technical interviews with synchronized **video conferencing**
        and a **real-time code editor** in one collaborative space.
      </motion.p>

      {/* Animated Call to Action Button */}
      <motion.button
        className="px-8 py-4 bg-linear-to-r from-cyan-500 to-indigo-600 text-lg font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/50 transition duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
        variants={itemVariants}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 25px rgba(0, 255, 255, 0.5)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <AnchorLink href={"/meeting/create"}>
          Start Your Live Session
        </AnchorLink>
        <ArrowRight className="ml-2 w-5 h-5" />
      </motion.button>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: Code,
      title: "Real-Time Code Editor",
      description:
        "Collaborate instantly on tasks with synchronized cursors and syntax highlighting.",
    },
    {
      icon: Video,
      title: "Integrated Video & Audio",
      description:
        "Keep the conversation flowing naturally with a built-in, high-definition video call.",
    },
    {
      icon: Users,
      title: "One-Click Interview Room",
      description:
        "Launch secure, dedicated sessions with all the tools necessary for a technical assessment.",
    },
  ];

  return (
    <motion.section
      className="grid md:grid-cols-3 gap-8 mb-20"
      initial="hidden"
      whileInView="visible"
      // FIX: Removed 'once: true'
      viewport={{ amount: 0.3 }}
      variants={containerVariants}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="bg-gray-800/70 p-8 rounded-2xl border border-gray-700 shadow-2xl hover:bg-gray-800 transition duration-300"
          variants={itemVariants}
        >
          <feature.icon className="w-10 h-10 text-cyan-400 mb-4 p-1.5 bg-gray-900 rounded-full" />

          <h3 className="text-2xl font-bold mb-3 text-white">
            {feature.title}
          </h3>

          <p className="text-gray-400">{feature.description}</p>
        </motion.div>
      ))}
    </motion.section>
  );
};

const WorkflowSection = () => {
  const steps = [
    {
      step: 1,
      title: "Create Room & Task",
      icon: Link,
      description:
        "Define the interview parameters and select a pre-loaded coding task or create your own from scratch.",
    },
    {
      step: 2,
      title: "Invite Candidate",
      icon: MessageSquare,
      description:
        "Share the unique, secure link instantly via email or integrate with your existing ATS system.",
    },
    {
      step: 3,
      title: "Collaborate & Assess",
      icon: Target,
      description:
        "Conduct the live video session while observing the candidate's coding process in real-time.",
    },
  ];

  return (
    <motion.section
      className="mb-20 py-10"
      initial="hidden"
      whileInView="visible"
      // FIX: Removed 'once: true'
      viewport={{ amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-4xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-linear-to-r from-white to-cyan-200"
        variants={itemVariants}
      >
        How CodeConnect Works in 3 Simple Steps
      </motion.h2>

      <div className="grid md:grid-cols-11 gap-4 items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.step}>
            {/* Step Card */}
            <motion.div
              className="col-span-1 md:col-span-3 flex flex-col items-center p-6 bg-gray-800/80 rounded-xl shadow-xl border border-gray-700 h-full"
              variants={itemVariants}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500/20 border-2 border-indigo-400 text-indigo-400 font-bold text-xl mb-4">
                {step.step}
              </div>

              <step.icon className="w-8 h-8 text-cyan-400 mb-3" />

              <h3 className="text-xl font-bold text-white mb-2 text-center">
                {step.title}
              </h3>

              <p className="text-gray-400 text-sm text-center">
                {step.description}
              </p>
            </motion.div>

            {/* Arrow Separator (Hidden on mobile, hidden after last step) */}
            {index < steps.length - 1 && (
              <motion.div
                className="hidden md:flex items-center justify-center col-span-1"
                variants={itemVariants}
              >
                <ArrowRight className="w-10 h-10 text-gray-500 animate-pulse" />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.section>
  );
};

const CodeDemoSection = () => (
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
            // Candidate is typing this line...
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
            // Interviewer points to this line
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

const AdvancedFeaturesSection = () => {
  const advancedFeatures = [
    {
      icon: Clock,
      title: "Full Interview Playback",
      description:
        "Replay the entire coding session— keystroke by keystroke—to gain deeper insight into problem-solving approaches.",
      color: "text-red-400",
    },
    {
      icon: BarChart,
      title: "Performance Benchmarking",
      description:
        "Automatically grade code correctness and efficiency against test cases and track candidate time-to-solution.",
      color: "text-yellow-400",
    },
    {
      icon: ClipboardList,
      title: "Custom Template Library",
      description:
        "Save and share custom interview templates and evaluation rubrics across your entire engineering team.",
      color: "text-green-400",
    },
  ];

  return (
    <motion.section
      className="mb-20 py-10"
      initial="hidden"
      whileInView="visible"
      // FIX: Removed 'once: true'
      viewport={{ amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-4xl font-extrabold text-center mb-12 text-gray-100"
        variants={itemVariants}
      >
        Enterprise-Ready Assessment Tools
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">
        {advancedFeatures.map((feature, index) => (
          <motion.div
            key={index}
            className="p-8 rounded-2xl bg-gray-900 border border-gray-700 shadow-xl"
            variants={itemVariants}
          >
            <feature.icon
              className={`w-10 h-10 mb-4 ${feature.color} p-1.5 bg-gray-800 rounded-full`}
            />

            <h3 className="text-2xl font-bold mb-3 text-white">
              {feature.title}
            </h3>

            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

const LanguageSupportSection = () => {
  const languages = [
    { name: "JavaScript / Node.js", icon: "JS", color: "text-yellow-300" },
    { name: "Python 3", icon: "Py", color: "text-blue-400" },
    { name: "Java 17", icon: "Ja", color: "text-red-500" },
    { name: "C++ 20", icon: "C+", color: "text-cyan-400" },
    { name: "Go", icon: "Go", color: "text-green-400" },
    { name: "TypeScript", icon: "TS", color: "text-indigo-400" },
  ];

  return (
    <motion.section
      className="mb-20"
      initial="hidden"
      whileInView="visible"
      // FIX: Removed 'once: true'
      viewport={{ amount: 0.1 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl font-bold text-center text-gray-100 mb-12"
        variants={itemVariants}
      >
        Multi-Language Environment
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {languages.map((lang, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center p-4 bg-gray-800/80 rounded-xl border border-gray-700 hover:bg-gray-700/50 transition duration-300"
            variants={itemVariants}
          >
            {/* <Terminal className={`w-8 h-8 mb-2 ${lang.color}`} /> */}

            <span className={`text-xl font-extrabold ${lang.color} mb-1`}>
              {lang.icon}
            </span>

            <p className="text-sm font-medium text-gray-300 text-center">
              {lang.name}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

const TestimonialSection = () => {
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

            <p className="text-lg italic text-gray-300 mb-4">"{t.quote}"</p>

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

const TechStackSection = () => {
  const technologies = [
    {
      icon: Zap,
      name: "React",
      description: "Modern, high-performance UI library.",
    },
    {
      icon: Cpu,
      name: "WebRTC",
      description: "Peer-to-peer, low-latency video and audio.",
    },
    {
      icon: Code,
      name: "Monaco Editor",
      description: "VS Code's powerful code editor engine.",
    },
    {
      icon: Layers,
      name: "Realtime Sync",
      description: "Optimized data synchronization architecture.",
    },
  ];

  return (
    <motion.section
      className="mb-20 py-10 bg-gray-900/50 rounded-2xl"
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
        Built on a Rock-Solid Foundation
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            className="text-center p-4"
            variants={itemVariants}
          >
            <tech.icon className="w-12 h-12 text-indigo-400 mx-auto mb-3" />

            <h4 className="text-xl font-semibold text-white">{tech.name}</h4>

            <p className="text-gray-400 text-sm">{tech.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

const FAQItem = ({ question, answer }) => {
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

const FAQSection = () => {
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

const PricingSection = () => {
  const features = [
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
              {features.map((f, i) => (
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

const FinalCallToAction = () => (
  <motion.section
    className="mb-40 pt-16 pb-16 bg-linear-to-r from-cyan-900/50 to-indigo-900/50 rounded-2xl border border-indigo-700 shadow-3xl"
    initial="hidden"
    whileInView="visible"
    // FIX: Removed 'once: true'
    viewport={{ amount: 0.5 }}
    variants={containerVariants}
  >
    <div className="text-center max-w-4xl mx-auto">
      <motion.h2
        className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-linear-to-r from-white to-cyan-200"
        variants={itemVariants}
      >
        Stop Screening. Start Connecting.
      </motion.h2>

      <motion.p
        className="text-xl text-indigo-200 mb-8"
        variants={itemVariants}
      >
        Get a 14-day free trial and experience the future of technical hiring
        today.
      </motion.p>

      <motion.button
        className="px-10 py-4 bg-white text-indigo-800 text-lg font-bold rounded-xl shadow-xl hover:bg-gray-200 transition duration-300 transform hover:scale-105"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Claim Your Free Trial
      </motion.button>
    </div>
  </motion.section>
);

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
