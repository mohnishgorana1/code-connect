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
import { Label } from "@/components/ui/label";

export default function InterviewerDashboardPage() {
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

        <RescheduleMeetingDialog
          meetingId={meetingId}
          currentDate={date} // Pass current formatted date
          currentTime={time} // Pass current formatted time
          open={open}
          onOpenChange={setOpen}
          onUpdated={onUpdated}
        />
      </div>
    </div>
  );
}

function RescheduleMeetingDialog({
  meetingId,
  currentDate, // e.g., "11/10/2025"
  currentTime, // e.g., "10:30 PM" or "10:30:00 PM" (Locale time string)
  open,
  onOpenChange,
  onUpdated,
}: {
  meetingId: string;
  currentDate: string;
  currentTime: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: () => void;
}) {
  const [datePart, setDatePart] = useState("");
  const [hour12, setHour12] = useState("12");
  const [minute, setMinute] = useState("00");
  const [ampm, setAMPM] = useState("AM");
  const [initialUTC, setInitialUTC] = useState(""); // To check if time changed
  const [isSaving, setIsSaving] = useState(false);

  // Utility function to parse the locale time string and initialize state
  const initializeTimeParts = (dateStr: string, timeStr: string) => {
    // Combine to get a standard format date object based on local time zone
    const localDateObject = new Date(`${dateStr} ${timeStr}`);
    if (isNaN(localDateObject.getTime())) {
      console.error("Invalid date string passed to initializeTimeParts");
      return;
    }

    // Get the UTC time from the date object (which is the time stored in DB)
    setInitialUTC(localDateObject.toISOString());

    const hour24 = localDateObject.getHours();
    const min = localDateObject.getMinutes();

    // Convert to 12hr format
    const h12 = hour24 % 12 || 12; // 0 becomes 12, 13 becomes 1
    const ap = hour24 >= 12 ? "PM" : "AM";

    // Set state
    setDatePart(localDateObject.toISOString().substring(0, 10)); // YYYY-MM-DD
    setHour12(String(h12).padStart(2, "0"));
    setMinute(String(Math.floor(min / 5) * 5).padStart(2, "0")); // Round down to nearest 5 min
    setAMPM(ap);
  };

  useEffect(() => {
    if (open) {
      // Initialize state when dialog opens
      initializeTimeParts(currentDate, currentTime);
    }
  }, [open, currentDate, currentTime]);

  const handleUpdateTime = async () => {
    // 1. Convert 12hr parts back to 24hr format
    let h24 = parseInt(hour12, 10);
    if (ampm === "PM" && h24 !== 12) {
      h24 += 12;
    } else if (ampm === "AM" && h24 === 12) {
      h24 = 0; // Midnight (12 AM) is hour 0
    }

    const h24Str = String(h24).padStart(2, "0");

    // 2. Combine date, 24hr local time string
    // This string is interpreted as Local Time (IST)
    const localDateTimeString = `${datePart}T${h24Str}:${minute}:00`;
    const localDateObject = new Date(localDateTimeString);

    if (isNaN(localDateObject.getTime())) {
      toast.error("Invalid date or time selected.");
      return;
    }

    // 3. Convert Local Date object to UTC ISO string for the backend
    const newStartTimeUTC = localDateObject.toISOString();

    // Check if time has actually changed before submitting
    if (newStartTimeUTC === initialUTC) {
      toast("No changes detected.", {
        description: "Please select a different time to update.",
      });
      onOpenChange(false);
      return;
    }

    setIsSaving(true);
    try {
      const res = await axios.patch(`/api/meeting/${meetingId}/update`, {
        type: "update-start-time",
        payload: { newStartTime: newStartTimeUTC },
      });
      if (res.data.success) {
        onUpdated(); // Refetch meetings on dashboard
        onOpenChange(false);
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

  const isDisabled = isSaving;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>Reschedule Interview</DialogTitle>
          <p className="text-sm text-gray-400">
            Current Time: {currentDate} @ {currentTime} (IST)
          </p>
        </DialogHeader>

        {/* Date and Time Pickers */}
        <div className="space-y-4 pt-2">
          {/* 1. Date Picker */}
          <div>
            <Label
              htmlFor="rescheduleDate"
              className="block text-sm font-medium text-gray-300"
            >
              New Start Date (IST)
            </Label>
            <Input
              id="rescheduleDate"
              type="date"
              value={datePart}
              onChange={(e) => setDatePart(e.target.value)}
              className="mt-1 bg-gray-800 border-gray-700 text-white"
            />
          </div>

          {/* 2. Time Pickers (12hr Format - Dropdowns) */}
          <div>
            <Label className="block text-sm font-medium text-gray-300">
              New Start Time (IST - 12hr)
            </Label>
            <div className="flex gap-2 mt-1">
              {/* Hour */}
              <select
                value={hour12}
                onChange={(e) => setHour12(e.target.value)}
                disabled={isDisabled}
                className="flex w-1/3 rounded-md border border-gray-600 bg-gray-800 px-2 py-2 text-sm text-gray-100 focus:border-cyan-500 transition-colors h-10"
              >
                {/* Hours 01 to 12 */}
                {[...Array(12)].map((_, i) => {
                  const h = String((i % 12) + 1).padStart(2, "0");
                  return (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  );
                })}
              </select>

              {/* Minute (in 5-minute increments) */}
              <select
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                disabled={isDisabled}
                className="flex w-1/3 rounded-md border border-gray-600 bg-gray-800 px-2 py-2 text-sm text-gray-100 focus:border-cyan-500 transition-colors h-10"
              >
                {/* Minutes 00, 05, 10, ... 55 */}
                {[...Array(12)].map((_, i) => {
                  const m = String(i * 5).padStart(2, "0");
                  return (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  );
                })}
              </select>

              {/* AM/PM */}
              <select
                value={ampm}
                onChange={(e) => setAMPM(e.target.value)}
                disabled={isDisabled}
                className="flex w-1/3 rounded-md border border-gray-600 bg-gray-800 px-2 py-2 text-sm text-gray-100 focus:border-cyan-500 transition-colors h-10"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
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
  );
}
