// POST: /api/meeting/join

import connectDB from "@/lib/config/db";
import { Meeting, MeetingStatus } from "@/models/meeting.model";
import { User, Role } from "@/models/user.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { meetingId, userId } = await req.json();
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing userId." },
        { status: 400 }
      );
    }

    if (!meetingId || !mongoose.Types.ObjectId.isValid(meetingId)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing meetingId." },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Missing User Details" },
        { status: 400 }
      );
    }

    // Find meeting
    const meeting = await Meeting.findById(meetingId)
      .populate("interviewer", "name email role")
      .populate("candidate", "name email role");

    if (!meeting) {
      return NextResponse.json(
        { success: false, message: "Meeting not found." },
        { status: 404 }
      );
    }

    if (user?.role === Role.Candidate) {
      // Validate candidate
      console.log("join for user role", user?.role);
      if (meeting.candidate._id.toString() !== userId) {
        return NextResponse.json(
          {
            success: false,
            message: "You are not authorized to join this meeting.",
          },
          { status: 403 }
        );
      }
      meeting.isCandidateOnline = true;
    } else {
      // Validate interviewer
      if (meeting.interviewer._id.toString() !== userId) {
        return NextResponse.json(
          {
            success: false,
            message: "You are not authorized to join this meeting.",
          },
          { status: 403 }
        );
      }
      meeting.isInterviewerOnline = true;
    }

    // Validate meeting status
    if (
      meeting.status === MeetingStatus.Completed ||
      meeting.status === MeetingStatus.Cancelled
    ) {
      return NextResponse.json(
        { success: false, message: `Meeting already ${meeting.status}.` },
        { status: 400 }
      );
    }

    // 🚫 Prevent joining before startTime
    if (meeting.startTime && new Date() < new Date(meeting.startTime)) {
      return NextResponse.json(
        {
          success: false,
          message: `Meeting has not started yet. Scheduled for ${new Date(
            meeting.startTime
          ).toLocaleString()}.`,
        },
        { status: 400 }
      );
    }

    if (meeting.isInterviewerOnline && meeting.isCandidateOnline) {
      if (meeting.status === MeetingStatus.Scheduled) {
        meeting.status = MeetingStatus.Ongoing;
      }
    }
    await meeting.save();

    return NextResponse.json(
      {
        success: true,
        message: "Joined meeting successfully.",
        data: { meeting },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Join meeting error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error joining meeting." },
      { status: 500 }
    );
  }
}
