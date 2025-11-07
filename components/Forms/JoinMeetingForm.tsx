"use client";
import React, { useState } from "react";
import { z } from "zod";
import axios from "axios";
import {
  joinMeetingSchema,
  JoinMeetingFormValues,
} from "@/validations/meeting.schema";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAppUser } from "@/contexts/UserContext";

function JoinMeetingForm() {
  const { appUser } = useAppUser();
  const router = useRouter();
  const [formData, setFormData] = useState<JoinMeetingFormValues>({
    meetingId: "",
  });
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      joinMeetingSchema.parse(formData);
      const url = `/api/meeting/join?candidateId=${appUser?._id}`;
      const res = await axios.post(url, formData);

      if (res.data.success) {
        router.push(`/meeting/${formData.meetingId}`);
      } else {
        setError(res.data.message || "Unable to join meeting");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0].message);
      } else if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Failed to join meeting");
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className={`p-8 ${
        pathname === "/dashboard/candidate/join-meeting" ? "w-full h-full" : "max-w-lg"
      } mx-auto bg-gray-900 text-gray-50 shadow-2xl rounded-xl border border-gray-700`}
    >
      {pathname !== "/dashboard/candidate/join-meeting" && (
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-6 border-b border-gray-700 pb-2">
          Join Scheduled Interview
        </h1>
      )}

      {error && (
        <p className="mb-4 text-sm text-red-400 bg-red-900/50 border border-red-700 p-3 rounded-lg">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label
            htmlFor="meetingId"
            className="block text-sm font-medium text-gray-300"
          >
            Meeting ID <span className="text-pink-400">*</span>
          </Label>
          <input
            id="meetingId"
            name="meetingId"
            value={formData.meetingId}
            onChange={(e) => setFormData({ meetingId: e.target.value })}
            placeholder="Enter meeting ID..."
            className="mt-1 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            disabled={isSubmitting}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-linear-to-r from-cyan-500 via-purple-500 to-pink-700 hover:from-cyan-700 hover:via-purple-600 hover:to-pink-800 text-white font-semibold rounded-md h-10"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Join Meeting"}
        </Button>
      </form>

      <p className="mt-4 text-sm text-gray-500">
        For technical support, please contact:{" "}
        <span className="text-cyan-400">mohnishgorana1@gmail.com</span>
      </p>
    </main>
  );
}

export default JoinMeetingForm;
