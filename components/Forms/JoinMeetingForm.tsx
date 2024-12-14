"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { formatToDDMMYYYY } from "@/utility";
import { joinMeetingAction } from "@/lib/actions/meeting.action";
import { Loader2 } from "lucide-react";

function JoinMeetingForm({
  currentProfile,
  currentMeeting,
  isJoined,
  setIsJoined,
}: {
  currentMeeting: any;
  currentProfile: any;
  isJoined: boolean;
  setIsJoined: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState("");

  const joinMeeting = async () => {
    if (!passcode) {
      setError("Please Enter Passcode");
      return;
    }
    
    setError("");
    
    try {
      setIsJoining(true);
      console.log("Joining");
      console.log("Curr profile", currentProfile);
      

      const response = await joinMeetingAction(currentMeeting._id, currentProfile._id, currentProfile.role, passcode)
      console.log("Joining responee", response);
      
      if(!response.success){
        console.log("Can't Join Meeting : ", response.message);
        setIsJoined(false)
      }

      if(response.success){
        const joinedMeeting = response.fetchedMeeting
        console.log("Meeting Joined", response.message);
        setIsJoined(true)
      }


    } catch (error: any) {
      console.error("Error joining meeting:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <main className="md:w-[70%] mx-auto flex flex-col gap-y-8 md:py-8 p-4 md:p-8 bg-neutral-900 rounded-3xl">
      <header className="p-4 my-2">
        <h1 className="text-xl md:text-3xl md:text-center font-bold">
          Join Meeting
        </h1>
      </header>
      <section>
        {currentMeeting ? (
          <>
            <div className="w-full md:w-[60%] mx-auto flex flex-col border-x">
              <span className="px-2 md:px-8 py-1 border-t border-y flex  justify-between  items-center">
                <h1 className="text-lg font-semibold md:col-span-1">Title</h1>
                <p>{currentMeeting.title}</p>
              </span>
              <span className="px-2 md:px-8 py-1 border-t border-y flex  justify-between  items-center">
                <h1 className="text-lg font-semibold md:col-span-1">Date</h1>
                <p>{formatToDDMMYYYY(currentMeeting.date)}</p>
              </span>
              <span className="px-2 md:px-8 py-1 border-b flex  justify-between  items-center">
                <h1 className="text-lg font-semibold md:col-span-1">Time</h1>
                <p>
                  {currentMeeting.time.hour}:{currentMeeting.time.minute}{" "}
                  {currentMeeting.time.period}{" "}
                </p>
              </span>{" "}
              <span className="px-2 md:px-8 py-1 border-b flex  justify-between  items-center">
                <h1 className="text-lg font-semibold md:col-span-1">Status</h1>
                <p>{currentMeeting.status}</p>
              </span>
            </div>
          </>
        ) : (
          "no meet"
        )}
      </section>
      <section className="w-full md:w-[35vw] mx-auto flex flex-col gap-y-5">
        <div className="gap-y-1 items-center">
          <Label className="text-sm md:text-lg col-span-1">Passcode</Label>
          <Input
            type="text"
            name="passcode"
            className="col-span-2 bg-black text-sm"
            placeholder="passcode..."
            value={passcode}
            onChange={(e: any) => setPasscode(e.target.value)}
            required
          />
        </div>
        <Button
          className="w-full bg-green-700 hover:bg-green-800 font-semibold self-center"
          onClick={joinMeeting}
        >
          {
            !isJoining ? "Join Meeting" : <>
              <Loader2 className="animate-spin"/> Joining...
            </>
          }
        </Button>
      </section>
    </main>
  );
}

export default JoinMeetingForm;
