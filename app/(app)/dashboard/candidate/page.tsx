"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useAppUser } from "@/contexts/UserContext";
import { Role } from "@/models/user.model";
import axios from "axios";
import { Briefcase, CalendarDays, Clock, User, Video } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link"; // Link is needed for join button
import InterviewCard from "@/components/Dashboard/InterviewCard";
import StatCard from "@/components/Dashboard/StatCard";

export default function CandidateDashboardPage() {
  // Changed to default export
  const { appUser, loading } = useAppUser();
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [upcomingMeetings, setUpcomingMeetings] = useState<any[]>([]);
  const [previousMeetings, setPreviousMeetings] = useState<any[]>([]);
  // ⭐ NEW STATE: Missed/Pending Meetings
  const [missedOrPendingMeetings, setMissedOrPendingMeetings] = useState<any[]>(
    []
  );

  const fetchAllData = async () => {
    if (!appUser?._id) return;
    setIsDataLoading(true);
    try {
      const res = await axios.get(
        // API endpoint is the same, but role is "candidate"
        `/api/dashboard/${appUser?._id}/meetings?role=${appUser?.role}`
      );

      const data = await res.data;

      if (data.success) {
        setUpcomingMeetings(data.data.upcomingMeetings || []);
        setPreviousMeetings(data.data.previousMeetings || []);
        // ⭐ Update new state
        setMissedOrPendingMeetings(data.data.missedOrPendingMeetings || []);
      }
    } catch (error) {
      console.error("Error fetching meetings:", error);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    if (appUser?._id) {
      // Ensure user ID exists before fetching
      fetchAllData();
    }
  }, [appUser?._id]); // Dependency on appUser?._id ensures refetch after login/load

  if (!loading && appUser?.role !== Role.Candidate) {
    redirect("/");
  }

  if (loading || isDataLoading) {
    return <Loader />;
  }

  return (
    <section className="min-h-[80vh] text-gray-100 flex flex-col gap-10">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-500 capitalize">
          Welcome back, {appUser?.name?.split(" ")[0] || "Candidate"} 👋
        </h1>
        <p className="text-gray-400 max-w-2xl mt-2">
          Here&apos;s a quick overview of your interview activity and progress.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <StatCard
          icon={<CalendarDays className="text-cyan-400 w-6 h-6" />}
          label="Upcoming Interviews"
          value={upcomingMeetings.length.toString()}
          desc="Scheduled sessions"
        />
        <StatCard
          icon={<Clock className="text-pink-400 w-6 h-6" />}
          label="Missed/Pending"
          value={missedOrPendingMeetings.length.toString()}
          desc="Follow up needed"
        />
        <StatCard
          icon={<Video className="text-purple-400 w-6 h-6" />}
          label="Completed"
          value={previousMeetings.length.toString()}
          desc="Finished sessions"
        />
        <StatCard
          icon={<Clock className="text-gray-400 w-6 h-6" />}
          label="Next Interview"
          value={
            upcomingMeetings[0]
              ? new Date(upcomingMeetings[0].startTime).toLocaleDateString()
              : "-"
          }
          desc={
            upcomingMeetings[0]
              ? new Date(upcomingMeetings[0].startTime).toLocaleTimeString()
              : "No upcoming"
          }
        />
      </div>

      {/* Profile Overview (Remains the same) */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">
          Profile Overview
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-cyan-600 flex items-center justify-center text-xl font-bold">
              {appUser?.name?.[0]?.toUpperCase() || "C"}
            </div>
            <div>
              <p className="font-semibold text-lg">{appUser?.name}</p>
              <p className="text-sm text-gray-400">Candidate</p>
            </div>
          </div>
          <div className="flex gap-6 text-sm text-gray-400 flex-wrap">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span>{appUser?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-500" />
              <span>Software Developer Role</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Interviews Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-200 mb-4">
          Upcoming Interviews
        </h2>
        <div className="bg-gray-900 border border-gray-800 rounded-xl divide-y divide-gray-800">
          {upcomingMeetings.length > 0 ? (
            upcomingMeetings.map((m, idx) => (
              <InterviewCard
                key={idx}
                title={m.title}
                isInterviewer={false}
                interviewerName={m.interviewer?.name}
                candidateName={m.candidate?.name}
                date={new Date(m.startTime).toLocaleDateString()}
                time={new Date(m.startTime).toLocaleTimeString()}
                meetingId={m._id} // Pass meeting ID for join link
              />
            ))
          ) : (
            <p className="p-4 text-gray-400 text-sm">No upcoming interviews</p>
          )}
        </div>
      </div>

      {/* Previous/Completed Interviews Section */}
      {previousMeetings.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-200 mb-4 mt-6">
            Completed Interviews
          </h2>
          <div className="bg-gray-900 border border-gray-800 rounded-xl divide-y divide-gray-800">
            {previousMeetings.map((m, idx) => (
              <InterviewCard
                key={`previous-${idx}`}
                title={m.title}
                interviewerName={m.interviewer?.name}
                candidateName={m.candidate?.name}
                date={new Date(m.startTime).toLocaleDateString()}
                time={new Date(m.startTime).toLocaleTimeString()}
                isCompleted={true}
              />
            ))}
          </div>
        </div>
      )}

      {missedOrPendingMeetings.length > 0 && (
        <div className="border border-gray-700 rounded-xl p-4 bg-gray-900">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" /> Missed or Pending Review 🔴
          </h2>
          <p className="text-sm text-gray-400 mb-4 font-bold">
            The scheduled time for these interviews has passed, but the status
            is not marked as completed. Please contact your interviewer/HR for
            the next steps or to reschedule.
          </p>
          <div className="divide-y divide-gray-500">
            {missedOrPendingMeetings.map((m, idx) => (
              <InterviewCard
                key={`missed-${idx}`}
                title={m.title}
                interviewerName={m.interviewer?.name}
                candidateName={m.candidate?.name}
                date={new Date(m.startTime).toLocaleDateString()}
                time={new Date(m.startTime).toLocaleTimeString()}
                isMissed={true} // Add a prop to highlight
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
