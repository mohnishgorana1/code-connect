"use client";
import React, { useState } from "react";
import {
  createMeetingSchema,
  CreateMeetingFormValues,
  ClientMeetingSchema,
} from "@/validations/meeting.schema";
import { z } from "zod";
import axios from "axios";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { useAppUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

const ErrorMessage = ({ message }: { message: string | undefined }) =>
  message ? <p className="text-red-400 text-sm mt-1">{message}</p> : null;

const ShadcnInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  React.ComponentPropsWithoutRef<"input"> & { isTextarea?: boolean }
>(({ className, isTextarea, ...props }, ref) => {
  const baseClasses =
    "mt-1 flex w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors";

  if (isTextarea) {
    return (
      <textarea
        className={`${baseClasses} min-h-[80px] ${className}`}
        ref={ref as React.Ref<HTMLTextAreaElement>}
        {...(props as React.ComponentPropsWithoutRef<"textarea">)}
      />
    );
  }
  return (
    <input
      type="text"
      className={`${baseClasses} h-10 ${className}`}
      ref={ref as React.Ref<HTMLInputElement>}
      {...(props as React.ComponentPropsWithoutRef<"input">)}
    />
  );
});
ShadcnInput.displayName = "ShadcnInput";

function CreateNewMeetingForm() {
  const { appUser } = useAppUser();
  const router = useRouter();

  const initialTime = new Date(Date.now() + 5 * 60000)
    .toISOString()
    .substring(0, 16);

  const [formData, setFormData] = useState<CreateMeetingFormValues>({
    title: "",
    description: "",
    candidateEmail: "",
    startTime: initialTime,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateMeetingFormValues, string>>
  >({});
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setErrors({});
    setIsSubmitting(true);

    try {
      createMeetingSchema.parse(formData);
      const url = `/api/meeting/create?interviewerId=${appUser?._id}`;
      const response = await axios.post(url, formData);
      if (response.data.success) {
        setMessage(
          `✅ Success! Meeting scheduled. Room ID: ${response.data.data.meeting._id}`
        );
        setFormData({
          title: "",
          description: "",
          candidateEmail: "",
          startTime: new Date(Date.now() + 5 * 60000)
            .toISOString()
            .substring(0, 16),
        });
        const { meeting } = response.data.data;
        // setTimeout(() => router.push(`/meeting/${meeting?._id}`), 1200);
      } else {
        setMessage(
          `❌ Error: ${response.data.message || "Failed to create meeting"}`
        );
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.issues.reduce(
          (acc, issue) => ({
            ...acc,
            [issue.path[0] as keyof CreateMeetingFormValues]: issue.message,
          }),
          {} as Partial<Record<keyof CreateMeetingFormValues, string>>
        );
        setErrors(newErrors);
        setMessage("Please correct the highlighted form errors.");
      } else if (axios.isAxiosError(error) && error.response) {
        const result = error.response.data;
        setMessage(`❌ Error: ${result.message || "Failed to create meeting"}`);

        // Handle specific backend validation errors returned in the 'errors' array
        if (result.errors && Array.isArray(result.errors)) {
          const backendErrors = result.errors.reduce(
            (acc: any, error: any) => ({ ...acc, [error.path]: error.message }),
            {}
          );
          setErrors(backendErrors);
        }
      } else {
        // Handle unexpected network/other errors
        console.error("Submission error:", error);
        setMessage("An unexpected network or internal error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="p-8 max-w-lg mx-auto bg-gray-900 text-gray-50 shadow-2xl rounded-xl border border-gray-700">
      <h1 className="text-3xl font-extrabold text-cyan-400 mb-6 border-b border-gray-700 pb-2">
        Schedule New Interview
      </h1>

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

      <form onSubmit={handleSubmit} className="space-y-8">
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

        <div>
          <Label
            htmlFor="startTime"
            className="block text-sm font-medium text-gray-300"
          >
            Start Time <span className="text-pink-400">*</span>
          </Label>
          <ShadcnInput
            id="startTime"
            name="startTime"
            type="datetime-local"
            value={formData.startTime}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          <ErrorMessage message={errors.startTime} />
        </div>

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
