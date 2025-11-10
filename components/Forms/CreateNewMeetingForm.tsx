"use client";
import React, { useState } from "react";
import {
  createMeetingSchema,
  CreateMeetingFormValues,
} from "@/validations/meeting.schema";
import { z } from "zod";
import axios from "axios";
import { Button } from "../ui/button";
import { ArrowRightCircle, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { useAppUser } from "@/contexts/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const ErrorMessage = ({ message }: { message: string | undefined }) =>
  message ? <p className="text-red-400 text-sm mt-1">{message}</p> : null;

// ShadcnInput component remains the same for basic text/date inputs
const ShadcnInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  React.ComponentPropsWithoutRef<"input"> & { isTextarea?: boolean }
>(({ className, isTextarea, ...props }, ref) => {
  const baseClasses =
    "mt-1 flex w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors";

  if (isTextarea) {
    return (
      <textarea
        className={`${baseClasses} min-h-20 ${className}`}
        ref={ref as React.Ref<HTMLTextAreaElement>}
        {...(props as React.ComponentPropsWithoutRef<"textarea">)}
      />
    );
  }
  return (
    <input
      // Note: We changed type="text" here, but for 'type="date"' in the form,
      // the original input logic is still applied based on the props spread.
      type={props.type || "text"}
      className={`${baseClasses} h-10 ${className}`}
      ref={ref as React.Ref<HTMLInputElement>}
      {...(props as React.ComponentPropsWithoutRef<"input">)}
    />
  );
});
ShadcnInput.displayName = "ShadcnInput";

function CreateNewMeetingForm() {
  const pathname = usePathname();
  const { appUser } = useAppUser();
  const router = useRouter();
  const [copyMessage, setCopyMessage] = useState("");

  // Calculate initial time in IST and convert to 12-hour format
  const now = new Date(Date.now() + 5 * 60000); // 5 minutes in future
  const initialDate = now.toISOString().substring(0, 10); // YYYY-MM-DD

  const currentHour24 = now.getHours();
  // Convert 24hr to 12hr (0 becomes 12, 13 becomes 1, etc.)
  const currentHour12 = currentHour24 % 12 || 12;
  const currentMinute = Math.ceil(now.getMinutes() / 5) * 5; // Round to nearest 5 minutes
  const initialAMPM = currentHour24 >= 12 ? "PM" : "AM";

  // State variables for Date and 12-hour Time parts
  const [datePart, setDatePart] = useState(initialDate);
  const [hour12, setHour12] = useState(String(currentHour12).padStart(2, "0"));
  const [minute, setMinute] = useState(String(currentMinute).padStart(2, "0"));
  const [ampm, setAMPM] = useState(initialAMPM);

  const [formData, setFormData] = useState<CreateMeetingFormValues>({
    title: "",
    description: "",
    candidateEmail: "",
    startTime: "", // Will be set on submit
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateMeetingFormValues, string>>
  >({});
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdMeeting, setCreatedMeeting] = useState<any>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Only update core form fields, time fields are managed separately
    if (name in formData && name !== "startTime") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCopyLink = (link: any) => {
    // ... (copy logic remains the same)
    const el = document.createElement("textarea");
    el.value = link;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopyMessage("✅ Link copied!");
    toast.success("Meeting Link Copied");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setErrors({});
    setCreatedMeeting(null);
    setIsSubmitting(true);

    // 1. Convert 12hr format to 24hr format
    let hour24 = parseInt(hour12, 10);

    if (ampm === "PM" && hour24 !== 12) {
      hour24 += 12;
    } else if (ampm === "AM" && hour24 === 12) {
      hour24 = 0; // Midnight (12 AM) is hour 0
    }

    const hour24Str = String(hour24).padStart(2, "0");

    // 2. Combine date, 24hr local time string
    // This string is interpreted as Local Time (IST)
    const localDateTimeString = `${datePart}T${hour24Str}:${minute}:00`;
    const localDateObject = new Date(localDateTimeString);

    if (isNaN(localDateObject.getTime())) {
      setErrors((prev) => ({
        ...prev,
        startTime: "Invalid date or time selected.",
      }));
      setIsSubmitting(false);
      setMessage("Please correct the highlighted form errors.");
      return;
    }

    // 3. Convert Local Date object to UTC ISO string for the backend
    const utcStartTime = localDateObject.toISOString();

    const dataToSend = {
      ...formData,
      startTime: utcStartTime,
    };

    console.log("Local Time:", localDateTimeString, "UTC Time:", utcStartTime);

    try {
      // Note: Zod schema must be updated to accept the new format (if needed).
      // For now, using dataToSend for parsing.
      createMeetingSchema.parse(dataToSend);

      const url = `/api/meeting/create?interviewerId=${appUser?._id}`;
      const response = await axios.post(url, dataToSend);

      if (response.data.success) {
        setMessage(`✅ Success! Meeting scheduled`);

        // Reset time parts to current time + 5min for next entry
        const resetNow = new Date(Date.now() + 5 * 60000);
        const resetHour24 = resetNow.getHours();
        const resetHour12 = resetHour24 % 12 || 12;
        const resetMinute = Math.ceil(resetNow.getMinutes() / 5) * 5;
        const resetAMPM = resetHour24 >= 12 ? "PM" : "AM";

        setHour12(String(resetHour12).padStart(2, "0"));
        setMinute(String(resetMinute).padStart(2, "0"));
        setAMPM(resetAMPM);
        setDatePart(resetNow.toISOString().substring(0, 10));

        setFormData({
          title: "",
          description: "",
          candidateEmail: "",
          startTime: "",
        });
        const { meeting } = response.data.data;
        setCreatedMeeting(meeting);
      } else {
        setMessage(
          `❌ Error: ${response.data.message || "Failed to create meeting"}`
        );
      }
    } catch (error) {
      // ... (Error handling logic remains the same)
      if (error instanceof z.ZodError) {
        const newErrors = error.issues.reduce(
          (acc, issue) => ({
            ...acc,
            [issue.path[0] as keyof CreateMeetingFormValues]: issue.message,
          }),
          {} as Partial<Record<keyof CreateMeetingFormValues, string>>
        );
        // Zod error for startTime might need to be explicitly set since it's derived
        if (newErrors.startTime) {
          setErrors((prev) => ({ ...prev, startTime: newErrors.startTime }));
        }
        setErrors(newErrors);
        setMessage("Please correct the highlighted form errors.");
      } else if (axios.isAxiosError(error) && error.response) {
        const result = error.response.data;
        setMessage(`❌ Error: ${result.message || "Failed to create meeting"}`);

        if (result.errors && Array.isArray(result.errors)) {
          const backendErrors = result.errors.reduce(
            (acc: any, error: any) => ({ ...acc, [error.path]: error.message }),
            {}
          );
          setErrors(backendErrors);
        }
      } else {
        console.error("Submission error:", error);
        setMessage("An unexpected network or internal error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate meeting link if available
  const meetingLink = createdMeeting
    ? `${window.location.origin}/meeting/${createdMeeting._id}`
    : null;

  return (
    <main
      className={`p-8 ${
        pathname === "/dashboard/interviewer/create-meeting"
          ? "w-full h-full"
          : "max-w-lg"
      } mx-auto bg-gray-900 text-gray-50 shadow-2xl rounded-xl border border-gray-700`}
    >
      <h1 className="text-3xl font-extrabold text-cyan-400 mb-6 border-b border-gray-700 pb-2">
        Schedule New Interview
      </h1>

      {/* Message Block */}
      {message && (
        <div
          className={`p-4 mb-5 rounded-lg font-medium border-l-4 ${
            message.startsWith("✅ Success")
              ? "bg-green-900/50 text-green-300 border-green-500"
              : "bg-red-900/50 text-red-300 border-red-500"
          }`}
        >
          {message}
        </div>
      )}

      {/* Created Meeting Link Block */}
      {createdMeeting && meetingLink && (
        <div className=" space-y-3 my-4 pb-4 w-full flex flex-col bg-gray-800/40 px-2 rounded-md transition-all duration-500 ease-out">
          <div className="mt-4 p-3 bg-gray-800/70 rounded-lg">
            <p className="text-sm font-semibold mb-2 text-gray-200">
              Shareable Meeting Link:
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <input
                type="text"
                readOnly
                value={meetingLink}
                className="grow p-2 text-sm text-cyan-400 bg-gray-900 border border-gray-600 rounded-md truncate"
              />
              <Button
                type="button"
                onClick={() => handleCopyLink(meetingLink)}
                className={`shrink-0 ${
                  copyMessage ? "bg-green-600" : "bg-cyan-600"
                } text-white hover:bg-cyan-700 active:bg-cyan-800 transition duration-150 shadow shadow-cyan-500/50`}
              >
                {copyMessage ? "Copied!" : "Copy Link"}
              </Button>
            </div>
          </div>
          <Link
            href={meetingLink}
            className="self-start flex gap-x-2 border border-cyan-500 rounded-xl text-cyan-500 px-4 py-1.5 items-center justify-center hover:text-cyan-600 duration-300 ease-in-out font-medium "
          >
            Go to Meeting Page <ArrowRightCircle />
          </Link>
        </div>
      )}

      {/* Form Starts Here */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div>
          <Label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300"
          >
            Meeting Title <span className="text-pink-400">*</span>
          </Label>
          <ShadcnInput
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Final Round Interview"
            disabled={isSubmitting}
            className=""
          />
          <ErrorMessage message={errors.title} />
        </div>

        {/* Description */}
        <div>
          <Label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300"
          >
            Description (Optional)
          </Label>
          <ShadcnInput
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Goals, agenda, or specific topics to cover..."
            disabled={isSubmitting}
            isTextarea
          />
          <ErrorMessage message={errors.description} />
        </div>

        {/* Candidate Email */}
        <div>
          <Label
            htmlFor="candidateEmail"
            className="block text-sm font-medium text-gray-300"
          >
            Candidate Email <span className="text-pink-400">*</span>
          </Label>
          <ShadcnInput
            id="candidateEmail"
            name="candidateEmail"
            type="email"
            value={formData.candidateEmail}
            onChange={handleChange}
            placeholder="candidate@registered-user.com"
            disabled={isSubmitting}
          />
          <ErrorMessage message={errors.candidateEmail} />
        </div>

        {/* Date and Time Pickers (Updated for 12hr format) */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* 1. Date Picker */}
          <div className="flex-1">
            <Label
              htmlFor="datePart"
              className="block text-sm font-medium text-gray-300"
            >
              Start Date (IST)<span className="text-pink-400">*</span>
            </Label>
            <ShadcnInput
              id="datePart"
              name="datePart"
              type="date"
              value={datePart}
              onChange={(e) => setDatePart(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {/* 2. Time Pickers (12hr Format - Dropdowns) */}
          <div className="flex-1">
            <Label className="block text-sm font-medium text-gray-300">
              Start Time (IST - 12hr)<span className="text-pink-400">*</span>
            </Label>
            <div className="flex gap-2">
              {/* Hour */}
              <select
                value={hour12}
                onChange={(e) => setHour12(e.target.value)}
                disabled={isSubmitting}
                className="mt-1 flex w-1/3 rounded-md border border-gray-600 bg-gray-800 px-2 py-2 text-sm text-gray-100 focus:border-cyan-500 transition-colors h-10"
              >
                {/* Hours 01 to 12 */}
                {[...Array(12)].map((_, i) => {
                  const h = String((i % 12) + 1).padStart(2, "0");
                  return (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  );
                })}
              </select>

              {/* Minute (in 5-minute increments for cleaner UX) */}
              <select
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                disabled={isSubmitting}
                className="mt-1 flex w-1/3 rounded-md border border-gray-600 bg-gray-800 px-2 py-2 text-sm text-gray-100 focus:border-cyan-500 transition-colors h-10"
              >
                {/* Minutes 00, 05, 10, ... 55 */}
                {[...Array(12)].map((_, i) => {
                  const m = String(i * 5).padStart(2, "0");
                  return (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  );
                })}
              </select>

              {/* AM/PM */}
              <select
                value={ampm}
                onChange={(e) => setAMPM(e.target.value)}
                disabled={isSubmitting}
                className="mt-1 flex w-1/3 rounded-md border border-gray-600 bg-gray-800 px-2 py-2 text-sm text-gray-100 focus:border-cyan-500 transition-colors h-10"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>
        <ErrorMessage message={errors.startTime} />

        <Button
          type="submit"
          className="cursor-pointer w-full h-10 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-gray-900 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-700 text-white shadow-lg hover:from-cyan-700 hover:via-purple-600 hover:to-pink-800 "
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-x-2">
              Submitting <Loader2 className="animate-spin" />
            </span>
          ) : (
            "Schedule Meeting"
          )}
        </Button>
      </form>
    </main>
  );
}



export default CreateNewMeetingForm;
