"use client";
import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import { PanelLeftClose, PanelLeftOpen, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "../Loader";
import { Button } from "../ui/button";
type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

function MeetingRoom() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isPersonalRoom = !!searchParams.get("personal");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const [showVideoPane, setShowVideoPane] = useState(true);

  if (callingState !== CallingState.JOINED) return <Loader />;

  return (
    <section className="w-full flex gap-1 h-screen px-1 mb-2">
      {/* left video panels with call controls collapsible */}
      <aside
        className={cn("bg-gray-900 rounded-md  transition-all duration-200 ease-linear h-full", {
          "w-[30%] border-r": showVideoPane,
          "w-0": !showVideoPane,
        })}
      >
        {showVideoPane && (
          <div className="pl-0 p-2">
            {/* <PaginatedGridLayout groupSize={10}/> */}
            <div className="max-h-[80vh]">
              <SpeakerLayout participantsBarPosition={"bottom"} />
            </div>

            <div className="flex flex-col flex-wrap px-4 bg-gray-700/20  rounded-xl ml-2">
              <div className="flex justify-center items-center w-full gap-2 flex-wrap">
                <CallControls onLeave={() => router.push("/")} />
              </div>
              <div className="flex flex-wrap gap-2 items-center justify-center">
                <CallStatsButton />
                <Button
                  onClick={() => setShowParticipants((prev) => !prev)}
                  className="cursor-pointer rounded-full p-3 transition-colors duration-150 text-white"
                  style={{
                    backgroundColor: showParticipants ? "#4c535b" : "#25303e",
                  }}
                  title="Toggle Participants List"
                >
                  <Users size={20} />
                </Button>
                <Button
                  onClick={() => setShowVideoPane((prev) => !prev)}
                  className="cursor-pointer rounded-full p-3 bg-blue-700 hover:bg-blue-800 transition-colors duration-150 text-white"
                  title={showVideoPane ? "Hide Videos" : "Show Videos"}
                >
                  <PanelLeftClose size={20} />
                </Button>
              </div>
              <span className="flex items-center justify-center mt-2">
                {!isPersonalRoom && <EndCallButton />}
              </span>
            </div>
          </div>
        )}
        {!showVideoPane && (
          <button
            onClick={() => setShowVideoPane(true)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-40 cursor-pointer rounded-r-full p-3 bg-blue-700 hover:bg-blue-800 transition-colors duration-150 text-white shadow-xl"
            title="Show Videos and Controls"
          >
            <PanelLeftOpen size={20} />
          </button>
        )}
      </aside>

      {/* coding interface */}
      <main
        className={cn(
          "bg-gray-900 border px-2 md:px-4 rounded-md transition-all duration-200 ease-linear",
          {
            "w-[70%]": showVideoPane,
            "w-full": !showVideoPane,
          }
        )}
      >
        <div className="">
          <p>Coding Screen / Whiteboard Interface</p>
        </div>
      </main>

      {/* FLoating Participant list comes from right ride */}
      <div
        className={cn(
          "absolute top-0 right-0 h-full z-20 transition-transform duration-300 ease-linear",
          "bg-gray-900/90 backdrop-blur-sm shadow-xl border-l border-gray-700",
          {
            "translate-x-0 w-[300px]": showParticipants,
            "translate-x-full w-0": !showParticipants,
          }
        )}
      >
        {showParticipants && (
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        )}
      </div>
    </section>
  );
}

export default MeetingRoom;
