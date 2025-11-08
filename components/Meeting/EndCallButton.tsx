"use client";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useAppUser } from "@/contexts/UserContext";
import axios from "axios";
import { MeetingStatus } from "@/models/meeting.model";
import { toast } from "sonner";

function EndCallButton({ meetingId }: { meetingId: string }) {
  const { appUser } = useAppUser();
  const router = useRouter();
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();

  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  const handleEndCallForEveryone = async () => {
    console.log("handling call end");
    if (!call) {
      console.log("call not found");
      return;
    }
    try {
      await call.endCall(); // End Stream call first
      console.log("stream call ended");

      console.log("updating meeting for endcall");

      // updat meeting status in DB
      const res = await axios.patch(`/api/meeting/${meetingId}/update`, {
        type: "end-call-for-everyone",
      });

      console.log("update res", res);
      if (!res.data.success) {
        toast.error("Failed to end meeting in database");
        return;
      }
      toast.success("Meeting ended successfully");
      router.push("/");
    } catch (error) {
      console.error("Error ending call or updating DB:", error);
    }
  };

  if (!isMeetingOwner) {
    return null;
  }

  return (
    <Button
      onClick={handleEndCallForEveryone}
      className="bg-red-500 hover:bg-red-700 transition duration-300 ease-out"
    >
      End Call for everyone
    </Button>
  );
}

export default EndCallButton;
