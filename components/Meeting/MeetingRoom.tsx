"use client";
import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import { PanelLeftClose, PanelLeftOpen, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "../Loader";
import { Button } from "../ui/button";
import CollaborativeEditor from "../CodeEditor/CollaborativeEditor";

function MeetingRoom() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isPersonalRoom = !!searchParams.get("personal");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const [showVideoPane, setShowVideoPane] = useState(true);
  const [language, setLanguage] = useState("typescript");

  if (callingState !== CallingState.JOINED) return <Loader />;

  return (
    <section className="w-full flex items-stretch gap-1 px-2 mb-2 min-h-[89vh]">
      {/* Left video panels with call controls collapsible */}
      <aside
        className={cn(
          "bg-gray-900 rounded-md transition-all duration-200 ease-linear overflow-hidden shrink-0",
          {
            "w-[30%] border-r": showVideoPane,
            "w-0": !showVideoPane,
          }
        )}
      >
        {showVideoPane && (
          <div className="p-2 flex flex-col justify-between h-full">
            <div className="flex-1">
              <SpeakerLayout participantsBarPosition={"bottom"} />
            </div>

            <div className="flex flex-col flex-wrap px-4 bg-gray-700/20 rounded-xl mt-2">
              <div className="flex justify-center items-center w-full gap-2 flex-wrap pb-3">
                <CallControls onLeave={() => router.push("/")} />
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
                {!isPersonalRoom && <EndCallButton />}
              </div>
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

      {/* Right coding interface */}
      <main
        className={cn(
          "overflow-y-auto bg-gray-900 border px-2 md:px-4 rounded-md transition-all duration-200 ease-linear grow",
          {
            "w-[70%]": showVideoPane,
            "w-full": !showVideoPane,
          }
        )}
      >
        <div className="w-full h-full text-white flex flex-col gap-y-3">
          <p className="text-xl font-semibold">
            Collaborative Code Editor
            <span className="opacity-60 text-sm ml-2">({language})</span>
          </p>
          <select
            className="bg-gray-800 text-white rounded-md px-3 py-1 w-44"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="typescript">TypeScript</option>
            <option value="javascript">JavaScript</option>
            <option value="cpp">C++</option>
             <option value="cpp">C</option>
            <option value="python">Python</option>
          </select>
          <div className="">
            <CollaborativeEditor language={language}/>
          </div>
        </div>
      </main>

      {/* Floating Participant list */}
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
