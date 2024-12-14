import Meeting from "@/components/Meeting";
import { fetchMeetingAction } from "@/lib/actions/meeting.action";
import { fetchProfileAction } from "@/lib/actions/profile.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

async function MeetingPage({ params }: { params: { meetingId: string } }) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-up");
  }
  const profileInfo = await fetchProfileAction(user?.id);

  const meetingId = params.meetingId;
  const {fetchedMeeting} = await fetchMeetingAction(meetingId);

  console.log("Fetched Meeting", fetchedMeeting );

  return (
    <main className="min-h-screen ">
      {fetchedMeeting?.status !== "COMPLETED" ? (
        <>
          <Meeting
            currentMeeting={fetchedMeeting}
            currentProfile={profileInfo}
          />
        </>
      ) : (
        <>
          <div className="md:w-[80%] mx-auto flex items-center justify-center flex-col pt-8 sm:pt-10 md:pt-24 gap-y-3">
            <h1 className="text-lg md:text-2xl lg:text-8xl">OOPS! </h1>
            <h2 className="lg:text-4xl border-b-2 rounded-b-xl px-4 md:px-8 pb-4">
              Meeting is Closed/Completed
            </h2>
          </div>
        </>
      )}
    </main>
  );
}

export default MeetingPage;
