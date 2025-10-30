import AnimatedCodeLine from "./AnimatedCodeLine";
import { motion } from "framer-motion";
import {
  Phone,
  Mic,
  Video,
  Users,
  MessageSquare,
  Play,
  Loader2,
} from "lucide-react"; // For icons
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const VideoCallScreen = () => (
  // Height is set to h-full to match the grid cell height
  <div className="flex flex-col h-full bg-gray-800 rounded-xl p-4 shadow-xl ">
    <div className="grid grid-cols-1 gap-2 grow">
      {/* Interviewer Card */}
      <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-lg aspect-video min-h-[150px]">
        {/* Simulated Video Feed */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage: "url('https://picsum.photos/400/200?random=1')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
          <span className="text-sm font-semibold text-white bg-blue-600 px-2 py-0.5 rounded-md">
            Interviewer (Lead Engineer)
          </span>
        </div>
        <div className="absolute top-4 right-3 p-1 bg-red-500 rounded-full animate-ping duration-300"></div>
        <Video className="absolute top-3 right-3 text-white" size={20} />
      </div>

      {/* Candidate Card */}
      <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-lg aspect-video min-h-[150px]">
        {/* Simulated Video Feed */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage: "url('https://picsum.photos/400/200?random=2')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
          <span className="text-sm font-semibold text-white bg-purple-600 px-2 py-0.5 rounded-md">
            Candidate (You)
          </span>
        </div>
        <Mic className="absolute top-3 right-3 text-white" size={20} />
      </div>
    </div>

    {/* Calling Controls */}
    {/* Added margin-top to separate controls from video windows */}
    <div className="flex justify-center space-x-4 mt-2 p-3 bg-gray-900 rounded-lg">
      <button className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors">
        <Phone size={24} />
      </button>
      <button className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors">
        <Mic size={24} />
      </button>
      <button className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors">
        <Video size={24} />
      </button>
      <button className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors hidden sm:inline-flex">
        <Users size={24} />
      </button>
      <button className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors hidden sm:inline-flex">
        <MessageSquare size={24} />
      </button>
    </div>
  </div>
);

const CodeEditorMockup = () => {
  const [output, setOutput] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [isCodeExecuting, setIsCodeExecuting] = useState(false);

  // Simulated Code Runner Function
  const handleRunCode = async () => {
    // 1. Dialog Open & Start Execution State
    setOpenDialog(true);
    setIsCodeExecuting(true);
    setOutput(""); // Clear previous output

    // 2. Simulate Delay (2 seconds as requested)
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 🚨 2 Second Delay

    // 3. Simulated Output (Based on input: [10, 2, 10, 5, 2] -> Unique is 5)
    const simulatedOutput = `✅ Success: Code executed successfully.

--- Output ---
      5

Test Case: findUnique([10, 2, 10, 5, 2]) -> 5`;

    setOutput(simulatedOutput);
    setIsCodeExecuting(false);
  };
  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-2xl p-6 shadow-3xl ">
      <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4 shrink-0">
        <span className="text-lg font-mono text-cyan-400">/src/task.js</span>

        <div className="flex space-x-2">
          {/* Existing traffic light dots */}
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Mock Code Lines - Added function call and input array */}
      <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap grow overflow-y-auto pr-2 custom-scrollbar">
        <AnimatedCodeLine delay={0.8}>
          <span className="text-pink-400">function</span>{" "}
          <span className="text-yellow-300">findUnique</span>(arr) {"{"}
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={1.2} className="pl-4">
          <span className="text-blue-400">const</span> counts ={" "}
          <span className="text-pink-400">new</span>{" "}
          <span className="text-yellow-300">Map</span>();
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={1.6} className="pl-4">
          <span className="text-blue-400">for</span> (
          <span className="text-blue-400">const</span> item{" "}
          <span className="text-pink-400">of</span> arr) {"{"}
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={2.0} className="pl-8">
          counts.
          <span className="text-yellow-300">set</span>(item, (counts.
          <span className="text-yellow-300">get</span>(item) ||{" "}
          <span className="text-green-400">0</span>) +{" "}
          <span className="text-green-400">1</span>);
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={2.4} className="pl-4">
          {"}"}
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={2.8} className="pl-4">
          <span className="text-pink-400">for</span> (
          <span className="text-blue-400">const</span> [item, count]{" "}
          <span className="text-pink-400">of</span> counts) {"{"}
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={3.2} className="pl-8">
          <span className="text-blue-400">if</span> (count ==={" "}
          <span className="text-green-400">1</span>) {"{"}
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={3.6} className="pl-12">
          <span className="text-pink-400">return</span> item;
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={4.0} className="pl-8">
          {"}"}
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={4.4} className="pl-4">
          {"}"}
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={4.8}>{"}"}</AnimatedCodeLine>

        {/* 🚨 New Code Lines for Execution / Function Call */}
        <AnimatedCodeLine delay={5.2} className="pt-3">
          <span className="text-gray-500">{`// --- Test Case ---`}</span>
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={5.6}>
          <span className="text-blue-400">const</span> input = [
          <span className="text-green-400">10</span>,{" "}
          <span className="text-green-400">2</span>,{" "}
          <span className="text-green-400">10</span>,{" "}
          <span className="text-green-400">5</span>,{" "}
          <span className="text-green-400">2</span>
          ];
        </AnimatedCodeLine>

        <AnimatedCodeLine delay={6.0}>
          <span className="text-yellow-300">console</span>.
          <span className="text-yellow-300">log</span>(
          <span className="text-yellow-300">findUnique</span>(input) );
        </AnimatedCodeLine>

        {/* Added some extra lines to ensure scrolling on smaller 90vh view */}
        <div className="h-4"></div>
        <AnimatedCodeLine
          delay={6.4}
          className="pl-4 text-gray-700"
        >{`/* End of File */`}</AnimatedCodeLine>
      </div>

      {/* Play Button with Handler and Disabled State */}
      <div className="shrink-0 flex justify-end mt-4 pt-4 border-t border-gray-700">
        <Button
          onClick={handleRunCode}
          disabled={isCodeExecuting}
          className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 disabled:bg-green-800 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isCodeExecuting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Running...</span>
            </>
          ) : (
            <>
              <Play size={20} />
              <span>Run Code</span>
            </>
          )}
        </Button>
      </div>

      {/* 🚨 Shadcn Code Execution Output Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {/* Custom styling for dark theme consistency */}
        <DialogContent className="sm:max-w-md md:max-w-2xl bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">
              Code Execution Result
            </DialogTitle>
            <DialogDescription className="text-gray-400">
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
              className="bg-slate-700 hover:bg-slate-800 text-white font-medium"
              disabled={isCodeExecuting}
            >
              Close Result
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
// --- Main CodeDemoSection Component ---
export const CodeDemoSection = () => (
  <section className="bg-gray-900 pt-10 pb-8">
    <motion.h2
      className="text-4xl font-extrabold text-center text-white mb-12 tracking-wider"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.1 }}
      transition={{ delay: 0.2 }}
    >
      Experience the <span className="text-cyan-400">Virtual Interview</span>{" "}
      Synergy 💻
    </motion.h2>

    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2"
      initial={{ scaleY: 0.8, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ amount: 0.3 }}
      transition={{ type: "spring", stiffness: 80, delay: 0.4 }}
    >
      {/* Main container now uses min-h-[90vh] to ensure a full-screen, meeting-room feel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[80vh] gap-2">
        {/* Left Side: Video Call Screen (1/3 width, full height) */}
        <div className="lg:col-span-1">
          <VideoCallScreen />
        </div>

        {/* Right Side: Animated Code Editor (2/3 width, full height) */}
        <div className="lg:col-span-2">
          <CodeEditorMockup />
        </div>
      </div>
    </motion.div>
  </section>
);
