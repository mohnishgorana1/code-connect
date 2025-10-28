"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import MeetingStream from "@/components/Meeting/MeetingStream";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import LiveblocksMeetingProvider from "@/contexts/LiveblocksProvider";

export default function LiveMeetingRoomPage() {
  const { meetingId } = useParams();
  const [meetingLink, setMeetingLink] = useState("");
  const [meetingData, setMeetingData] = useState<any>();
  const [copied, setCopied] = useState(false);
  const { user, isLoaded } = useUser();
  const client = useStreamVideoClient();
  const [callDetails, setCallDetails] = useState<Call>();
  const [isCreatingStreamMeeting, setIsCreatingStreamMeeting] = useState(false);
  const [isStreamMeetingCreated, setIsStreamMeetingCreated] = useState(false);

  const handleCopy = async () => {
    if (!meetingLink) return;
    try {
      await navigator.clipboard.writeText(meetingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const createStreamMeeting = async () => {
    if (!client || !user) return;
    setIsCreatingStreamMeeting(true);

    try {
      const id = meetingId; // you can use mongoDB database meeting id or roomId;
      console.log(
        "client at meeting typelist to create call object ",
        "id: ",
        id,
        client
      );

      const call = client.call("default", id); // using the available client to create a Call object
      console.log("call object ", call);
      if (!call) throw new Error("Failed to create meeting");

      const startsAt = new Date(Date.now()).toISOString();

      const description = meetingData?.description || "New Interview";

      // It makes the critical API call to the Stream server: await call.getOrCreate(...), which confirms and saves the meeting details
      const response = await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      console.log(
        "respone of call.getOrCreate basically call details is logged",
        response
      );

      setCallDetails(call);
      setIsStreamMeetingCreated(true);
      // toast.success("Meeting Created");
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsCreatingStreamMeeting(false);
    }
  };

  // Build meeting link
  useEffect(() => {
    if (typeof window !== "undefined" && meetingId) {
      setMeetingLink(`${window.location.origin}/meet/meeting/${meetingId}`);
    }
  }, [meetingId]);

  // Fetch meeting from Database details
  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await axios.get(`/api/meeting/${meetingId}`);

        if (res.data.success) {
          console.log("meeting data", res.data.data.meeting);

          setMeetingData(res.data.data.meeting);
          // now create meeting for stream
          createStreamMeeting();
        } else {
          console.error(res.data.message);
        }
      } catch (err) {
        console.error("Error fetching meeting details:", err);
      }
    };

    if (meetingId && isLoaded) fetchMeeting();
  }, [meetingId]);

  if (!isStreamMeetingCreated) {
    return (
      <main className="min-h-screen flex flex-col bg-gray-950">
        <header className="w-full flex items-center justify-between px-6 py-3 border-b border-neutral-800">
          <h1 className="text-xl font-semibold text-indigo-400">
            {meetingData ? meetingData?.title : "Loading..."}
          </h1>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 flex items-center gap-2"
              >
                <MoreHorizontal className="h-4 w-4" /> More
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-gray-900 border border-neutral-700 text-gray-100">
              <DialogHeader>
                <DialogTitle className="text-indigo-400">
                  Meeting Details
                </DialogTitle>
              </DialogHeader>

              {meetingData ? (
                <div className="mt-2 space-y-3">
                  <p>
                    <span className="text-gray-400">Meeting ID:</span>{" "}
                    <span className="font-mono text-cyan-400">{meetingId}</span>
                  </p>
                  <p>
                    <span className="text-gray-400">Status:</span>{" "}
                    <span className="text-green-400">{meetingData.status}</span>
                  </p>

                  <div>
                    <p className="text-gray-400">Interviewer:</p>
                    <p className="text-sm text-indigo-300">
                      {meetingData.interviewer?.name} (
                      {meetingData.interviewer?.email})
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Candidate:</p>
                    <p className="text-sm text-indigo-300">
                      {meetingData.candidate?.name} (
                      {meetingData.candidate?.email})
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-gray-400">Meeting Link:</p>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-mono text-sm break-all">
                        {meetingLink || "Loading..."}
                      </span>
                      <Button
                        onClick={handleCopy}
                        variant="outline"
                        className="border-indigo-500 text-indigo-400 hover:bg-indigo-500/10"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Loading meeting info...</p>
              )}
            </DialogContent>
          </Dialog>
        </header>
        <section className="flex-1 flex items-center justify-center animate-pulse">
          Setting Up Meeting...
        </section>
      </main>
    );
  }

  return (
    <main className="flex flex-col bg-gray-950">
      {/* --- Stream Meeting Content --- */}
      <section className="">
        <div className="text-gray-400 italic">
          {/* 🎥 Meeting interface will render here (video, mic, screen share, etc.) */}
          {meetingData && (
            <LiveblocksMeetingProvider meetingId={meetingId as string}>
              {" "}
              <MeetingStream
                meetingId={meetingData._id}
                meetingData={meetingData}
                meetingLink={meetingLink}
              />{" "}
            </LiveblocksMeetingProvider>
          )}
        </div>
      </section>
    </main>
  );
}
