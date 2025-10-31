import {
  BarChart,
  ClipboardList,
  Clock,
  Code,
  Users,
  Video,
} from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/constants/homepage-data";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAppUser } from "@/contexts/UserContext";
import { Role } from "@/models/user.model";

export const FeaturesSection = () => {
  const { appUser } = useAppUser();
  const features = [
    {
      icon: Code,
      title: "Real-Time Code Editor",
      description:
        "Collaborate instantly on tasks with synchronized cursors, comprehensive syntax highlighting, and live compilation. This removes all setup friction and lets you focus purely on the technical challenge.",
      extraInfo: "Zero Setup, Live Compilation, Syntax Highlighting",
    },
    {
      icon: Video,
      title: "Integrated Video & Audio",
      description:
        "Keep the conversation flowing naturally with a built-in, high-definition video and audio call, ensuring non-verbal cues and context are never lost. It eliminates the need for external meeting links.",
      extraInfo: "HD Quality, Low Latency, No External Apps Needed",
    },
    {
      icon: Users,
      title: "One-Click Interview Room",
      description:
        "Launch secure, dedicated sessions instantly. Every room comes pre-loaded with customizable technical assessments and a clean environment for both the interviewer and the candidate. This is your central hub for assessment.",
      extraInfo: "Secure Sessions, Custom Templates, Instant Launch",
      highlights: [
        {
          label: "Instant Setup",
          text: "No waiting, no configuration — generate a dedicated session link that’s live in under two seconds.",
        },
        {
          label: "Assessment Ready",
          text: "Preloaded coding environments, quizzes, and prebuilt role-based challenges for quick evaluation.",
        },
        {
          label: "Secure & Private",
          text: "End-to-end encrypted sessions ensure complete confidentiality for both candidate and interviewer.",
        },
      ],
    },
  ];

  return (
    <motion.section className="mb-20 py-10 mx-1" whileInView="visible">
      <motion.h2
        className="text-4xl font-extrabold text-center mb-16 text-gray-100"
        variants={itemVariants}
      >
        The Core Collaborative Platform
      </motion.h2>

      <div className="grid md:grid-cols-12 md:max-w-6xl mx-auto">
        {/* left : one click interview room */}
        {features.slice(2, 3).map((feature) => (
          <motion.div
            key={2}
            className="md:col-span-8 p-8 bg-indigo-950/50 flex flex-col gap-5 rounded-l-lg"
            variants={itemVariants}
          >
            <div className="flex items-center justify-start">
              <feature.icon className="w-12 h-12 text-pink-400 mr-4 p-2 bg-indigo-950 rounded-full shadow-lg" />
              <h3 className="text-3xl font-extrabold text-white">
                {feature.title}
              </h3>
            </div>

            <p className="text-indigo-200">{feature.description}</p>

            {feature.highlights && (
              <div className="space-y-2">
                {feature.highlights.map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-pink-400 font-bold text-sm">
                      {item.label}
                    </span>
                    <p className="text-indigo-200 text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="self-start mt-8">
              {appUser?.role === Role.Interviewer ? (
                <Link href={"/meeting/create"}>
                  <Button className="bg-pink-700 hover:bg-pink-800 cursor-pointer ">
                    Create Interview
                  </Button>
                </Link>
              ) : (
                <Link href={"/meeting/join"}>
                  <Button className="bg-pink-700 hover:bg-pink-800 cursor-pointer ">
                    Join Interview
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        ))}

        {/* right: realtime editor and integrated AV */}
        <div className="md:col-span-4 grid grid-rows-2 ">
          {features.slice(0, 2).map((feature, index) => (
            <motion.div
              key={index}
              className={`p-6 bg-gray-800/70 ${
                index === 0
                  ? "border-b border-gray-700 rounded-tr-lg"
                  : "rounded-br-lg"
              }`}
              variants={itemVariants}
            >
              <span className="flex flex-wrap items-center gap-2 mb-4">
                <feature.icon className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 p-1.5 bg-gray-900 rounded-full" />

                <h3 className="text-xl font-bold text-white">
                  {feature.title}
                </h3>
              </span>

              <p className="text-gray-400 text-sm mb-3">
                {feature.description}
              </p>

              <p className="text-indigo-400 font-medium text-xs pt-3 mt-3">
                {feature.extraInfo}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export const AdvancedFeaturesSection = () => {
  const advancedFeatures = [
    {
      icon: Clock,
      title: "Full Interview Playback",
      status: "Available",
      description:
        "Replay the entire coding session— keystroke by keystroke—to gain deeper insight into problem-solving approaches.",
      color: "text-red-400",
    },
    {
      icon: BarChart,
      title: "Performance Analysis",
      status: "Coming Soon",
      description:
        "Automatically grade code correctness and efficiency against test cases and track candidate time-to-solution.",
      color: "text-yellow-400",
    },
    {
      icon: ClipboardList,
      title: "Custom Template Library",
      status: "Coming Soon",
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

            <h3 className="text-2xl font-bold mb-3 text-white flex items-center flex-wrap">
              {feature.title}
              <span
                className={`
                        px-2 py-1 mt-2 text-[8px] font-semibold uppercase rounded-full tracking-wider whitespace-nowrap
                        ${
                          feature.status === "Available"
                            ? "bg-emerald-600/30 text-emerald-300 border border-emerald-700"
                            : "bg-amber-600/30 text-amber-300 border border-amber-700"
                        }
                    `}
              >
                {feature.status}
              </span>{" "}
            </h3>

            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
