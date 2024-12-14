"use client";
import React, { useState } from "react";
import JoinMeetingForm from "./Forms/JoinMeetingForm";
import { Button } from "./ui/button";
import { exitMeetingAction } from "@/lib/actions/meeting.action";
import { Loader2 } from "lucide-react";

function Meeting({
  currentMeeting,
  currentProfile,
}: {
  currentMeeting: any;
  currentProfile: any;
}) {
  const [isJoined, setIsJoined] = useState(false);
  const [isExiting, setIsExiting] = useState(false)
  const [isExited, setIsExited] = useState(false);

  const exitMeeting = async () => {
    try {
      console.log("Exiting");
      console.log("Curr profile", currentProfile);
      
      setIsExiting(true)
      const response = await exitMeetingAction(
        currentMeeting._id,
        currentProfile._id,
        currentProfile.role
      );
      console.log("Exiting responee", response);

      if (!response.success) {
        console.log("Can't Exit Meeting : ", response.message);
        setIsJoined(true);
        setIsExited(false);
      }

      if (response.success) {
        const exitedMeeting = response.fetchedMeeting;
        console.log("Meeting Exited", response.message);
        setIsJoined(false);
        setIsExited(true);
      }
    } catch (error: any) {
      console.error("Error Exiting meeting:", error);
    }finally{
      setIsExiting(false)
    }
  };
  return (
    <main>
      {!isJoined ? (
        <>
          <JoinMeetingForm
            currentProfile={currentProfile}
            currentMeeting={currentMeeting}
            isJoined={isJoined}
            setIsJoined={setIsJoined}
          />
        </>
      ) : (
        <>
          <div>Already Joined</div>
          <Button className="bg-red-500 hover:bg-red-600" onClick={exitMeeting}> {
            !isExited ? "Exit Meeting" : <>
              <Loader2 className="animate-spin"/> Exiting...
            </>
          }</Button>
        </>
      )}
    </main>
  );
}

export default Meeting;
