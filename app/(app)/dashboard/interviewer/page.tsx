"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useAppUser } from "@/contexts/UserContext";
import { Role } from "@/models/user.model";
import axios from "axios";
import {
  Briefcase,
  CalendarDays,
  Clock,
  PlusCircle,
  User,
  Video,
} from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import InterviewCard from "@/components/Dashboard/InterviewCard";
import StatCard from "@/components/Dashboard/StatCard";
import RescheduleMeetingDialog from "@/components/Dashboard/RescheduleMeetingDialog";

export default function InterviewerDashboardPage() {
  const { appUser, loading } = useAppUser();
  const router = useRouter();
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [upcomingMeetings, setUpcomingMeetings] = useState<any[]>([]);
  const [previousMeetings, setPreviousMeetings] = useState<any[]>([]);
  const [missedOrPendingMeetings, setMissedOrPendingMeetings] = useState<any[]>(
    []
  );
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<any | null>(null);

  const fetchAllData = async () => {
    if (!appUser?._id) return;
    setIsDataLoading(true);
    try {
      const res = await axios.get(
        `/api/dashboard/${appUser?._id}/meetings?role=${appUser?.role}`
      );
      const data = await res.data;
      if (data.success) {
        setUpcomingMeetings(data.data.upcomingMeetings || []);
        setPreviousMeetings(data.data.previousMeetings || []);
        setMissedOrPendingMeetings(data.data.missedOrPendingMeetings || []);
      }
    } catch (error) {
      console.error("Error fetching meetings:", error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleRescheduleClick = (meeting: any) => {
    setSelectedMeeting(meeting);
    setIsRescheduleDialogOpen(true);
  };

  useEffect(() => {
    if (appUser?._id) {
      fetchAllData();
    }
  }, [appUser?._id]);

  if (!loading && appUser?.role !== Role.Interviewer) {
    redirect("/");
  }

  if (loading || isDataLoading) {
    return <Loader />;
  }

  return (
    <section className="min-h-[80vh] text-gray-100 flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-purple-400 capitalize">
            Welcome back, {appUser?.name?.split(" ")[0] || "Interviewer"} 🎯
          </h1>
          <p className="text-gray-400 max-w-2xl mt-2">
            Manage your scheduled interviews, monitor candidates, and stay on
            top of your upcoming sessions.
          </p>
        </div>

        <Button
          onClick={() => router.push("/dashboard/interviewer/create-meeting")}
          className="bg-linear-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold rounded-md h-10 flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Create Meeting
        </Button>
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
          icon={<Clock className="text-gray-400 w-6 h-6" />}
          label="Missed / Pending"
          value={missedOrPendingMeetings.length.toString()}
          desc="Action required"
        />
        <StatCard
          icon={<Video className="text-purple-400 w-6 h-6" />}
          label="Completed"
          value={previousMeetings.length.toString()}
          desc="Finished interviews"
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

      {/* Profile Overview */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">
          Profile Overview
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-purple-600 flex items-center justify-center text-xl font-bold">
              {appUser?.name?.[0]?.toUpperCase() || "I"}
            </div>
            <div>
              <p className="font-semibold text-lg">{appUser?.name}</p>
              <p className="text-sm text-gray-400">Interviewer</p>
            </div>
          </div>
          <div className="flex gap-6 text-sm text-gray-400 flex-wrap">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span>{appUser?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-500" />
              <span>Hiring Specialist</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Meetings */}
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
                isInterviewer={true} // ⭐ Pass isInterviewer prop
                interviewerName={m.interviewer?.name}
                candidateName={m.candidate?.name}
                date={new Date(m.startTime).toLocaleDateString()}
                time={new Date(m.startTime).toLocaleTimeString()}
                meetingId={m._id}
                onRescheduleClick={() => handleRescheduleClick(m)}
              />
            ))
          ) : (
            <p className="p-4 text-gray-400 text-sm">No upcoming interviews</p>
          )}
        </div>
      </div>

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
                isInterviewer={true}
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
        <div className="border border-gray-700 rounded-xl p-4 bg-gray-900/20">
          <h2 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
            <Clock className="w-5 h-5" /> Missed/Pending Interviews (Action
            Required)
          </h2>
          <div className="divide-y divide-gray-500">
            {missedOrPendingMeetings.map((m, idx) => (
              <InterviewCard
                key={`missed-${idx}`}
                title={m.title}
                isInterviewer={true}
                interviewerName={m.interviewer?.name} 
                candidateName={m.candidate?.name}
                date={new Date(m.startTime).toLocaleDateString()}
                time={new Date(m.startTime).toLocaleTimeString()}
                meetingId={m._id}
                isMissed={true}
                onRescheduleClick={() => handleRescheduleClick(m)} // ⭐ Pass Reschedule Handler
              />
            ))}
          </div>
        </div>
      )}

      {selectedMeeting && (
        <RescheduleMeetingDialog
          meetingId={selectedMeeting._id}
          currentDate={new Date(selectedMeeting.startTime).toLocaleDateString()}
          currentTime={new Date(selectedMeeting.startTime).toLocaleTimeString()}
          open={isRescheduleDialogOpen}
          onOpenChange={setIsRescheduleDialogOpen}
          onUpdated={() => {
            fetchAllData(); // Refetch data on successful update
            setSelectedMeeting(null);
          }}
        />
      )}
    </section>
  );
}
