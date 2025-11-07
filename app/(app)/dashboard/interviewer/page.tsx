"use client";
import Loader from "@/components/Loader";
import { useAppUser } from "@/contexts/UserContext";
import { Role } from "@/models/user.model";
import { redirect } from "next/navigation";
import React from "react";

function InterviewerDashboardPage() {
  const { appUser, loading } = useAppUser();

  if (!loading && appUser?.role !== Role.Interviewer) {
    redirect("/");
  }


  return <main className="min-h-screen bg-gray-950">
    Interview Dashboard
  </main>;
}

export default InterviewerDashboardPage;
