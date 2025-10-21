"use client";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";

function LiveMeetingRoomPage() {
  const { meetingId } = useParams();
  const [copied, setCopied] = useState(false);

  const meetingLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/meet/meeting/${meetingId}`
      : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(meetingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    } catch (error) {
      console.error("Failed to copy meeting link:", error);
    }
  };
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-gray-100 px-4">
      <h1 className="text-3xl font-bold text-indigo-400 mb-4">
        Live Meeting Room
      </h1>

      <p className="text-gray-400 mb-4 text-center">
        Meeting ID:{" "}
        <span className="font-mono text-cyan-400 break-all">{meetingId}</span>
      </p>

      <div className="flex flex-col items-center gap-3">
        <Button
          onClick={handleCopyLink}
          variant="outline"
          className="cursor-pointer border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10"
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4 text-green-400" />
              Link Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy Meeting Link
            </>
          )}
        </Button>

        <p className="text-sm text-gray-500 mt-2 max-w-md text-center">
          Share this link with the candidate to join the interview:
          <br />
          <span className="text-cyan-400 font-mono text-xs">{meetingLink}</span>
        </p>
      </div>
    </main>
  );
}

export default LiveMeetingRoomPage;
