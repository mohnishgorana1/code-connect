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
import React, { useEffect, useRef, useState } from "react";
import { PanelLeftClose, PanelLeftOpen, Play, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "../Loader";
import { Button } from "../ui/button";
import CollaborativeEditor from "../CodeEditor/CollaborativeEditor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { inputNotes, languageMap } from "@/constants/code-editor-data";
import { executeCode } from "@/lib/judge0";
import { useAppUser } from "@/contexts/UserContext";
import { Role } from "@/models/user.model";

function MeetingRoom({ meetingId }: { meetingId: string }) {
  const { appUser } = useAppUser();
  const router = useRouter();

  // stream state and hooks
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  // video states
  const [showParticipants, setShowParticipants] = useState(false);
  const [showVideoPane, setShowVideoPane] = useState(true);

  // code editor states
  const editorRef = useRef<any>(null);
  const [language, setLanguage] = useState("typescript");
  const [output, setOutput] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [isCodeExecuting, setIsCodeExecuting] = useState(false);

  const handleRunCode = async () => {
    const code = editorRef.current?.getValue();
    if (!code) return;

    setOpenDialog(true);
    setIsCodeExecuting(true);
    setOutput(""); // Clear previous output

    try {
      console.log("Running code:", code);
      const language_id = languageMap[language] || 63;

      const result = await executeCode(language_id, code);

      let outputText = "";

      if (result.stderr) outputText = `❌ Error:\n${result.stderr}`;
      else if (result.compile_output)
        outputText = `⚙️ Compile Output:\n${result.compile_output}`;
      else if (result.stdout) outputText = `✅ Output:\n${result.stdout}`;
      else outputText = "⚠️ No output received.";

      setOutput(outputText);
    } catch (error: any) {
      setOutput(`❌ Execution Failed:\n${error.message || "Unknown Error"}`);
    } finally {
      setIsCodeExecuting(false);
    }
  };

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      console.log("Call disconnected, redirecting to home.");
      if (window.location.pathname !== "/") {
        router.push("/");
      }
    }
  }, [callingState, router]);

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
                {appUser?.role === Role.Interviewer && (
                  <EndCallButton meetingId={meetingId} />
                )}
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
          {/* ⚠️ Note section */}
          <p className="text-sm text-yellow-700 border border-yellow-700/50 rounded-md px-3 py-2 mt-1 w-fit transition-all">
            {inputNotes[language]}
          </p>
          <div className="flex items-center justify-between">
            <select
              className="bg-gray-800 text-white rounded-md px-3 py-1 w-44"
              value={language}
              onChange={(e) => {
                if (e.target.value === "c") {
                  setLanguage("c");
                } else {
                  setLanguage(e.target.value);
                }
              }}
            >
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="python">Python</option>
            </select>
            <Button
              onClick={handleRunCode}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium"
            >
              <Play size={18} /> Run Code
            </Button>
            {/** this will open a dialog and then there will be loading and after code successfully compiles it shows output */}
          </div>
          <div className="">
            <CollaborativeEditor ref={editorRef} language={language} />
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

      {/* Code Execution Output Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="mx-auto  min-w-full  md:min-w-3xl">
          <DialogHeader>
            <DialogTitle>Code Execution Result</DialogTitle>
            <DialogDescription>
              {isCodeExecuting
                ? "The code is running in a simulated environment..."
                : "Execution completed. Check the output below."}
            </DialogDescription>
          </DialogHeader>

          {isCodeExecuting ? (
            <div className="flex items-center justify-center space-x-3 py-12 text-blue-400">
              <Loader2 className="animate-spin h-8 w-8" />
              <span className="text-xl font-medium">Executing Code...</span>
            </div>
          ) : (
            <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg max-h-80 overflow-y-auto shadow-inner">
              <pre className="whitespace-pre-wrap text-sm text-gray-200 font-mono">
                {output || "No output received."}
              </pre>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button
              onClick={() => setOpenDialog(false)}
              className="bg-slate-700 hover:bg-slate-800 text-white font-medium px-4 py-2"
              disabled={isCodeExecuting}
            >
              Close Result
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default MeetingRoom;
