"use client";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import MeetingRoom from "./MeetingRoom";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import MeetingSetup from "./MeetingSetup";
import Loader from "../Loader";

function MeetingStream({
  meetingId,
  meetingData,
  meetingLink,
}: {
  meetingId: string;
  meetingData: any;
  meetingLink: any;
}) {
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const { call, isCallLoading } = useGetCallById(meetingId);

  if (!isLoaded || isCallLoading) {
    return <Loader />;
  }

  // Double-check: If we get here, 'call' MUST be defined, but let's add a final safety check
  console.log("call", call);
  if (!call) {
    console.error(
      "Call is undefined after loading finished. Check API key/data."
    );
    return <div>Error loading meeting data.</div>;
  }
  return (
    // Stream Call Context: It renders the <StreamCall call={call}>.
    // This is critical as it passes the retrieved Stream call object to the entire sub-tree, enabling components like MeetingSetup to interact with the call.
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete ? (
          <MeetingSetup
            setIsSetupComplete={setIsSetupComplete}
            meetingData={meetingData}
            meetingLink = {meetingLink}
          />
        ) : (
          <MeetingRoom meetingId={meetingId}/>
        )}
      </StreamTheme>
    </StreamCall>
  );
}

export default MeetingStream;
