"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useAppUser } from "@/contexts/UserContext";
import { Role } from "@/models/user.model";
import axios from "axios";
import { Briefcase, CalendarDays, Clock, User, Video } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

function CandidateDashboardPage() {
  const { appUser, loading } = useAppUser();
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

  if (loading || isDataLoading) {
    return <Loader />;
  }

  return (
    <section className="min-h-[80vh] text-gray-100 flex flex-col gap-10">
      <button onClick={fetchAllData}>FetcData</button>
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          icon={<CalendarDays className="text-cyan-400 w-6 h-6" />}
          label="Upcoming Interviews"
          value={upcomingMeetings.length.toString()}
          desc="This week"
        />
        <StatCard
          icon={<Video className="text-purple-400 w-6 h-6" />}
          label="Completed"
          value={previousMeetings.length.toString()}
          desc="Past sessions"
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
                date={new Date(m.startTime).toLocaleDateString()}
                time={new Date(m.startTime).toLocaleTimeString()}
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

export default CandidateDashboardPage;

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
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col items-start gap-3 hover:border-cyan-500 transition">
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
  date,
  time,
}: {
  title: string;
  date: string;
  time: string;
}) {
  return (
    <div className="p-4 flex justify-between items-center">
      <div>
        <p className="font-medium text-gray-100">{title}</p>
        <p className="text-sm text-gray-400">
          {date} • {time}
        </p>
      </div>
      <button className="bg-cyan-700 hover:bg-cyan-800 text-white text-sm px-4 py-1.5 rounded-md transition">
        Join
      </button>
    </div>
  );
}
