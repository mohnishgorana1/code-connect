"use client";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { MoreHorizontal } from "lucide-react";

function MeetingSetup({
  setIsSetupComplete,
  meetingData,
  meetingLink,
}: {
  setIsSetupComplete: (value: boolean) => void;
  meetingData: any;
  meetingLink: any;
}) {
  const [copied, setCopied] = useState(false);

  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
  const call = useCall(); // Call Context Access: It uses useCall(); to retrieve the active call object provided by the parent <StreamCall> ie. in the component (<MeetingStream />).

  if (!call) {
    throw new Error("use call must be used with stream call component");
  }
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

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);
  return (
    <div className="h-screen w-full text-white ">
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
                  <span className="font-mono text-cyan-400">
                    {meetingData?._id}
                  </span>
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
      <div className="flex flex-col justify-center items-center py-2">
        <h1 className="text-2xl font-bold">Setup</h1>
        <VideoPreview />
        <div className="flex h-16 items-center justify-center gap-3">
          <label
            htmlFor=""
            className="flex items-center justify-center gap-2 font-medium"
          >
            <input
              type="checkbox"
              checked={isMicCamToggledOn}
              onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
              className=""
            />
            Join with mic and camera off
          </label>
          <DeviceSettings />
          <Button
            className="rounded-md bg-green-500 px-4 py-2.5 cursor-pointer"
            onClick={() => {
              call.join();
              setIsSetupComplete(true);
            }}
          >
            Join meeting
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MeetingSetup;
