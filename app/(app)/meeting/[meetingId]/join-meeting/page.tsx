import JoinMeetingForm from "@/components/Forms/JoinMeetingForm";
import { fetchProfileAction } from "@/lib/actions/profile.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

async function JoinMeetingPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-up");
  }
  const profileInfo = await fetchProfileAction(user?.id);
  return (
    <>
      <div className="min-h-screen ">
        {/* Form */}
        <JoinMeetingForm currentProfile={profileInfo} />
      </div>
    </>
  );
}

export default JoinMeetingPage;
