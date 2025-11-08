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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

function InterviewerDashboardPage() {
  const { appUser, loading } = useAppUser();
  const router = useRouter();
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [upcomingMeetings, setUpcomingMeetings] = useState<any[]>([]);
  const [previousMeetings, setPreviousMeetings] = useState<any[]>([]);

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
      }
    } catch (error) {
      console.error("Error fetching meetings:", error);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          icon={<CalendarDays className="text-cyan-400 w-6 h-6" />}
          label="Upcoming Interviews"
          value={upcomingMeetings.length.toString()}
          desc="Scheduled sessions"
        />
        <StatCard
          icon={<Video className="text-purple-400 w-6 h-6" />}
          label="Completed"
          value={previousMeetings.length.toString()}
          desc="Finished interviews"
        />
        <StatCard
          icon={<Clock className="text-pink-400 w-6 h-6" />}
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
                candidateName={m.candidate?.name}
                date={new Date(m.startTime).toLocaleDateString()}
                time={new Date(m.startTime).toLocaleTimeString()}
                meetingId={m._id}
                onUpdated={fetchAllData}
              />
            ))
          ) : (
            <p className="p-4 text-gray-400 text-sm">No upcoming interviews</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default InterviewerDashboardPage;

// --- Reusable Components ---
function StatCard({
  icon,
  label,
  value,
  desc,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  desc: string;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col items-start gap-3 hover:border-purple-500 transition">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="text-lg font-semibold">{label}</h3>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}

function InterviewCard({
  title,
  candidateName,
  date,
  time,
  meetingId,
  onUpdated,
}: {
  title: string;
  candidateName?: string;
  date: string;
  time: string;
  meetingId: string;
  onUpdated: () => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [newTime, setNewTime] = useState("");
  const [initialTime, setInitialTime] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // ✅ fetch the meeting time when dialog opens
  useEffect(() => {
    if (open) {
      // this value can come directly from the formatted date/time props if available
      const isoTime = new Date(`${date} ${time}`).toISOString().slice(0, 16);
      setNewTime(isoTime);
      setInitialTime(isoTime);
    }
  }, [open]);

  const handleUpdateTime = async () => {
    if (!newTime || newTime === initialTime) return;
    setIsSaving(true);
    try {
      const res = await axios.patch(`/api/meeting/${meetingId}/update`, {
        type: "update-start-time",
        payload: { newStartTime: newTime },
      });
      if (res.data.success) {
        onUpdated();
        setOpen(false);
        toast.success("Meeting time updated successfully!");
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating meeting:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsSaving(false);
    }
  };

  const isDisabled = !newTime || newTime === initialTime || isSaving;

  return (
    <div className="p-4 flex justify-between items-center">
      <div>
        <p className="font-medium text-gray-100">{title}</p>
        <p className="text-sm text-gray-400">
          {candidateName ? `With ${candidateName}` : "Candidate TBD"} • {date} •{" "}
          {time}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => router.push(`/meeting/${meetingId}`)}
          className="bg-purple-700 hover:bg-purple-800 text-white text-sm px-4 py-1.5 rounded-md transition"
        >
          Join
        </button>

        <Button
          variant="outline"
          className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-500 text-sm"
          onClick={() => setOpen(true)}
        >
          Update
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-gray-900 border border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>Reschedule Meeting</DialogTitle>
            </DialogHeader>

            <div className="mt-4 space-y-3">
              <label className="text-sm text-gray-300">New Start Time</label>
              <Input
                type="datetime-local"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <DialogFooter>
              <Button
                onClick={handleUpdateTime}
                disabled={isDisabled}
                className={`${
                  isDisabled
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                } text-white transition`}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
