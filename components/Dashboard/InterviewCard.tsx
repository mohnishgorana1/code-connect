"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export default function InterviewCard({
  title,
  isInterviewer = false,
  interviewerName,
  candidateName,
  date,
  time,
  meetingId,
  isMissed = false,
  isCompleted = false,
  onRescheduleClick,
}: {
  title: string;
  isInterviewer?: boolean;
  interviewerName?: string;
  candidateName?: string;
  date: string;
  time: string;
  meetingId?: string;
  isMissed?: boolean;
  isCompleted?: boolean;
  onRescheduleClick?: () => void;
}) {
  const cardClasses = `p-4 flex justify-between items-center ${
    isMissed
      ? "bg-gray-800/20 hover:bg-gray-800/40 border-l-2 border-gray-500"
      : isCompleted
      ? "hover:bg-gray-800/50 opacity-75"
      : "hover:bg-gray-800/50"
  }`;

  const textClasses = isMissed
    ? "text-gray-300 font-semibold"
    : "text-gray-400";

  return (
    <div className={cardClasses}>
      <div>
        <p className="font-medium text-gray-100">{title}</p>
        <p className={`text-sm ${textClasses}`}>
          {isInterviewer
            ? `With Candidate: ${candidateName} • ${date} • ${time}`
            : `With Interviewer: ${interviewerName} • ${date} • ${time}`}
          {isMissed && (
            <span className="ml-2 text-gray-400 font-bold"> (Missed)</span>
          )}
          {isCompleted && (
            <span className="ml-2 text-gray-500"> (Completed)</span>
          )}
        </p>
      </div>

      {/* Action Buttons */}
      {!isMissed && !isCompleted && meetingId && (
        <div className="flex gap-2">
          {/* Join Button */}
          <Link href={`/meeting/join?meetingId=${meetingId}`}>
            <Button
              className={`${
                isInterviewer
                  ? "bg-purple-700 hover:bg-purple-800"
                  : "bg-cyan-700 hover:bg-cyan-800"
              } text-white text-sm px-4 rounded-md transition`}
            >
              {isInterviewer ? "Start Meeting" : "Join Meeting"}
            </Button>
          </Link>
          {/* Reschedule Button: Only visible to Interviewer */}
          {isInterviewer && onRescheduleClick && (
            <Button
              onClick={onRescheduleClick}
              className="text-sm px-4 py-1.5 text-gray-300 bg-gray-700 hover:bg-gray-800 hover:ring-1 hover:ring-gray-300  ease-in duration-300"
            >
              Reschedule
            </Button>
          )}
        </div>
      )}

      {isCompleted && (
        <Button className="bg-gray-700 hover:bg-gray-800 duration-300 ease-in hover:ring-2 hover:ring-gray-500">
          Review Meeting
        </Button>
      )}

      {/* Action Button: Show status for others */}
      {isMissed && (
        <Button className="font-medium text-sm bg-gray-950 border border-gray-500 hover:border-transparent hover:ring-1 hover:ring-white hover:bg-gray-950/50 ease-out duration-300">
          {isInterviewer ? "Follow Up/Close" : "Follow Up"}
        </Button>
      )}
    </div>
  );
}
