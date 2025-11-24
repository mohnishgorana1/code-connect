"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import JoinMeetingForm from "@/components/Forms/JoinMeetingForm";
import { useAppUser } from "@/contexts/UserContext";

export default function JoinPage() {
  const searchParams = useSearchParams();
  const meetingIdFromUrl = searchParams.get("meetingId");
  const router = useRouter();
  const { appUser } = useAppUser();
  const [error, setError] = useState<string | null>(null);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    // If meetingId is present in URL -> auto join
    const autoJoin = async () => {
      if (!meetingIdFromUrl || !appUser?._id) return;
      setIsJoining(true);

      try {
        console.log("auto join", appUser?._id, meetingIdFromUrl);
        const url = `/api/meeting/join`;
        const res = await axios.post(url, {
          meetingId: meetingIdFromUrl,
          userId: appUser?._id,
        });

        if (res.data.success) {
          router.push(`/meeting/${meetingIdFromUrl}`);
        } else {
          if (meetingIdFromUrl) {
            setError(
              `${res.data.message}. Meeting ID: ${meetingIdFromUrl}` ||
                "Unable to join meeting."
            );
          } else {
            setError(`${res.data.message}` || "Unable to join meeting.");
          }
        }
      } catch (err: any) {
        setError(`${err.response?.data?.message} Meeting ID: ${meetingIdFromUrl}` || "Failed to join meeting.");
      } finally {
        setIsJoining(false);
      }
    };
    autoJoin();
  }, [meetingIdFromUrl, appUser, router]);

  if (isJoining) {
    return (
      <main className="flex h-[80vh] flex-col items-center justify-center text-gray-100 bg-neutral-950">
        <Loader2 className="animate-spin w-10 h-10 mb-3 text-indigo-400" />
        <p className="text-sm">Joining meeting...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-950 text-gray-100">
        <p className="text-red-400 font-medium mb-4">{error}</p>
        <JoinMeetingForm />
      </main>
    );
  }

  // If no meetingId, show form
  if (!meetingIdFromUrl) {
    return <JoinMeetingForm />;
  }

  return null; // Auto-join handled above
}
