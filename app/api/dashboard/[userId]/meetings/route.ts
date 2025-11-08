// POST: /api/dashboard/[userId]/meetings?role=""

import connectDB from "@/lib/config/db";
import { Meeting, MeetingStatus } from "@/models/meeting.model";
import { User, Role } from "@/models/user.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const role = url.searchParams.get("role");
    if (!role) {
      return NextResponse.json(
        { success: false, message: "Missing user role in body." },
        { status: 400 }
      );
    }

    const { userId } = await params;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing userId." },
        { status: 400 }
      );
    }

    console.log("userId role", userId, role);

    const query =
      role === "candidate" ? { candidate: userId } : { interviewer: userId };

    console.log("query", query);

    const meetings = await Meeting.find(query)
      .populate("interviewer", "name email")
      .populate("candidate", "name email")
      .sort({ startTime: 1 });

    console.log("meetngs", meetings)

    const now = new Date();

    const upcomingMeetings = meetings.filter(
      (m) =>
        m.startTime &&
        new Date(m.startTime) > now &&
        m.status !== MeetingStatus.Completed &&
        m.status !== MeetingStatus.Cancelled
    );

    const previousMeetings = meetings.filter(
      (m) =>
        m.startTime &&
        new Date(m.startTime) <= now &&
        m.status === MeetingStatus.Completed
    );


    console.log("upcomings", upcomingMeetings)


    return NextResponse.json(
      {
        success: true,
        message: "Meeting Fetched Successfully.",
        data: {
          upcomingMeetings,
          previousMeetings,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Fetching Meetings:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error fetching meetings." },
      { status: 500 }
    );
  }
}
