"use client";
import React, { useState } from "react";
import {
  MessageSquare,
  DollarSign,
  Send,
  Zap,
  BookOpen,
  Clock,
  Code,
  Users,
  TrendingUp,
  Target,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { useAppUser } from "@/contexts/UserContext";
import Loader from "@/components/Loader";
import axios from "axios";
import { Role } from "@/models/user.model";
import { redirect } from "next/navigation";
import { toast } from "sonner";

// Define the shape of the domain sub-object based on the Mongoose model
const initialDomain = { domain: "", proficiencyLevel: "mid" };
const proficiencyLevels = ["junior", "mid", "senior", "principal"];

// Define the initial state for the entire form
const initialFormData = {
  bio: "",
  primarySkills: "", // Stored as comma-separated string on the frontend
  yearsOfExperience: 0,
  interviewDomains: [initialDomain], // Array of domain objects
  ratePerHour: "",
};

const FEATURES = [
  {
    icon: Code,
    title: "Deep Technical Focus",
    description:
      "Evaluate candidates on cutting-edge technologies and real-world problem-solving.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description:
      "Set your own hours and choose interviews that fit your personal workflow.",
  },
  {
    icon: Users,
    title: "Community Impact",
    description:
      "Help raise the bar for engineering talent across the industry.",
  },
  {
    icon: DollarSign,
    title: "Transparent Earnings",
    description:
      "Receive competitive, timely payment with clear visibility on your hourly rates.",
  },
  {
    icon: TrendingUp,
    title: "Professional Growth",
    description:
      "Continuously refine your assessment skills and stay updated on industry standards.",
  },
  {
    icon: Target,
    title: "Curated Opportunities",
    description:
      "We match you with candidates perfectly aligned with your specific domain expertise.",
  },
];

function BecomeInterviewerPage() {
  const [formData, setFormData] = useState(initialFormData);
  const { appUser, loading } = useAppUser();

  // New state for submission handling
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleDomainChange = (index, e) => {
    const { name, value } = e.target;
    const newDomains = formData.interviewDomains.map((domain, i) => {
      if (i === index) {
        return { ...domain, [name]: value };
      }
      return domain;
    });
    setFormData((prev) => ({ ...prev, interviewDomains: newDomains }));
  };

  const addDomain = () => {
    setFormData((prev) => ({
      ...prev,
      interviewDomains: [...prev.interviewDomains, initialDomain],
    }));
  };

  // Handler to remove a domain entry
  const removeDomain = (index) => {
    const newDomains = formData.interviewDomains.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, interviewDomains: newDomains }));
  };

  // Placeholder for the submission function (not implemented as requested)
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!appUser || !appUser._id) {
      console.error("User ID not available for submission.");
      return; // Stop if user isn't loaded
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    console.log("Form Data Submitted (Logic not implemented):", formData);

    const payload = {
      appUserId: appUser?._id,
      ...formData,
      ratePerHour:
        formData.ratePerHour === "" ? undefined : formData.ratePerHour,
    };

    try {
      const response = await axios.post(
        "/api/users/become-instructor",
        payload
      );

      if (response.data.success) {
        toast.success("Application Submitted Successfully!");
        setFormData(initialFormData);
        setSubmitStatus("success");
      }
    } catch (error) {
      console.error("Network Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (appUser?.role !== Role.Candidate) {
    redirect("/");
  }

  // Determine message box style
  const messageColor =
    submitStatus === "success"
      ? "bg-green-600/20 border-green-500 text-green-300"
      : submitStatus === "error"
      ? "bg-red-600/20 border-red-500 text-red-300"
      : "";
  const messageIcon =
    submitStatus === "success" ? (
      <CheckCircle className="w-5 h-5 mr-2" />
    ) : submitStatus === "error" ? (
      <XCircle className="w-5 h-5 mr-2" />
    ) : null;

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center p-4 sm:p-8 font-inter">
      {/* Main Container: Two-column layout for md screens and above */}
      <div className="w-full max-w-7xl md:grid md:grid-cols-6 bg-gray-900 rounded-xl overflow-hidden">
        {/* Left Column (Content/Animation - Hidden on small screens) */}
        <aside className="hidden h-full md:flex md:col-span-2 p-8 lg:p-12 flex-col justify-between bg-gray-800/30 border-r border-gray-800">
          <div className="">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">
              Elevate the Engineering Standard
            </h2>
            <p className="text-gray-300 mb-10 text-base">
              Join an elite network of technical experts shaping the future of
              talent acquisition. Your insight is crucial.
            </p>

            <div className="space-y-6">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="flex items-start">
                  <feature.icon className="w-6 h-6 text-teal-400 shrink-0 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-100">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <footer className="text-center text-gray-500 text-sm">
            Securely managed by our platform.
          </footer>
        </aside>

        {/* Right Column (The Form - Full width on small screens) */}
        <section className="md:col-span-4 p-6 sm:p-10">
          <header className="mb-8 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
              Interviewer Application
            </h1>
            <p className="text-gray-400">
              Please provide detailed information to accelerate the review
              process.
            </p>
          </header>

          <div className="mb-8 p-4 bg-yellow-800/20 border rounded-lg text-yellow-300 flex items-start shadow-xl">
            <BookOpen className="w-5 h-5 mr-3 mt-0.5 shrink-0 text-yellow-400" />
            <div>
              <p className="font-semibold mb-1 text-sm sm:text-base">
                Important Submission Note:
              </p>
              <p className="text-sm">
                Submitting this form again will{" "}
                <strong>completely overwrite</strong> any previous application
                data you have submitted.
                <br />
                Please ensure all details are current and correct before
                finalizing your entry.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Submission Status Message Box */}
            {submitStatus !== "idle" && submitMessage && (
              <div
                className={`flex items-center p-4 border rounded-lg transition-all duration-300 ${messageColor}`}
                role="alert"
              >
                {messageIcon}
                <p className="font-medium text-sm sm:text-base">
                  {submitMessage}
                </p>
              </div>
            )}

            {/* Section 1: Professional Summary */}
            <div className="space-y-6 p-6 bg-gray-900 border border-gray-800 rounded-lg">
              <h2 className="text-2xl font-semibold text-indigo-400 flex items-center">
                <MessageSquare className="w-6 h-6 mr-2" />
                1. Professional Summary
              </h2>

              {/* Bio Field */}
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Professional Bio <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  required
                  value={formData.bio}
                  onChange={handleChange}
                  maxLength={1000}
                  placeholder="Describe your background, key achievements, and interviewing philosophy."
                  className="w-full p-3 border border-gray-700 rounded-lg shadow-inner focus:ring-indigo-500 focus:border-indigo-500 bg-gray-800 text-white transition duration-150 placeholder-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1 text-right">
                  Max 1000 characters. Current: {formData.bio.length}
                </p>
              </div>

              {/* Years of Experience & Rate */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="yearsOfExperience"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Years of Industry Experience{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    required
                    min="0"
                    max="50"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    placeholder="e.g., 8"
                    className="w-full p-3 border border-gray-700 rounded-lg shadow-inner focus:ring-indigo-500 focus:border-indigo-500 bg-gray-800 text-white transition duration-150 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="ratePerHour"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Desired Rate per Hour (USD)
                  </label>
                  <div className="relative">
                    <DollarSign className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="number"
                      id="ratePerHour"
                      name="ratePerHour"
                      min="0"
                      value={formData.ratePerHour}
                      onChange={handleChange}
                      placeholder="e.g., 120"
                      className="w-full p-3 pl-10 border border-gray-700 rounded-lg shadow-inner focus:ring-indigo-500 focus:border-indigo-500 bg-gray-800 text-white transition duration-150 placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Skills and Expertise */}
            <div className="space-y-6 p-6 bg-gray-900 border border-gray-800 rounded-lg">
              <h2 className="text-2xl font-semibold text-indigo-400 flex items-center">
                <Zap className="w-6 h-6 mr-2" />
                2. Skills & Interview Focus
              </h2>

              {/* Primary Skills */}
              <div>
                <label
                  htmlFor="primarySkills"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Primary Skills (Comma-Separated){" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="primarySkills"
                  name="primarySkills"
                  required
                  value={formData.primarySkills}
                  onChange={handleChange}
                  placeholder="e.g., GoLang, Kubernetes, Distributed Systems, ML Engineering"
                  className="w-full p-3 border border-gray-700 rounded-lg shadow-inner focus:ring-indigo-500 focus:border-indigo-500 bg-gray-800 text-white transition duration-150 placeholder-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  List your core technical proficiencies.
                </p>
              </div>

              {/* Interview Domains */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <BookOpen className="w-4 h-4 mr-1 text-indigo-400" />
                  Domains and Proficiency Levels{" "}
                  <span className="text-red-500 ml-1">*</span>
                </label>

                {formData.interviewDomains.map((domainObj, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row gap-3 p-4 border border-gray-700 rounded-lg bg-gray-800"
                  >
                    {/* Domain Input */}
                    <div className="flex-1">
                      <input
                        type="text"
                        name="domain"
                        required
                        value={domainObj.domain}
                        onChange={(e) => handleDomainChange(index, e)}
                        placeholder="e.g., Database Sharding or React Performance"
                        className="w-full p-2 border border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-800 text-white placeholder-gray-500"
                      />
                    </div>

                    {/* Proficiency Select */}
                    <div className="w-full sm:w-1/3">
                      <select
                        name="proficiencyLevel"
                        required
                        value={domainObj.proficiencyLevel}
                        onChange={(e) => handleDomainChange(index, e)}
                        className="w-full p-2 border border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-800 text-white appearance-none placeholder-gray-500"
                      >
                        {proficiencyLevels.map((level) => (
                          <option
                            key={level}
                            value={level}
                            className="bg-gray-800"
                          >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Remove Button */}
                    {formData.interviewDomains.length > 1 && (
                      <div className="w-full sm:w-auto flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => removeDomain(index)}
                          className="w-full sm:h-8 sm:w-8 sm:flex sm:items-center sm:justify-center p-2 bg-red-800 text-red-300 rounded-lg hover:bg-red-700 transition duration-150"
                          aria-label="Remove domain"
                        >
                          &times;
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addDomain}
                  className="flex items-center text-sm font-semibold text-teal-400 hover:text-teal-300 transition duration-150"
                >
                  + Add Another Domain
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white transition duration-200 transform ${
                  isSubmitting
                    ? "bg-indigo-700 cursor-not-allowed opacity-70"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 hover:scale-[1.01]"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Application for Review
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default BecomeInterviewerPage;
