// POST: /api/meeting/join

import connectDB from "@/lib/config/db";
import { Meeting, MeetingStatus } from "@/models/meeting.model";
import { User, Role } from "@/models/user.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const candidateId = url.searchParams.get("candidateId");

    if (!candidateId || !mongoose.Types.ObjectId.isValid(candidateId)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing candidateId." },
        { status: 400 }
      );
    }

    const { meetingId } = await req.json();
    if (!meetingId || !mongoose.Types.ObjectId.isValid(meetingId)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing meetingId." },
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

    // Validate candidate
    if (meeting.candidate._id.toString() !== candidateId) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to join this meeting.",
        },
        { status: 403 }
      );
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

    // If scheduled, mark as ongoing
    if (meeting.status === MeetingStatus.Scheduled) {
      meeting.status = MeetingStatus.Ongoing;
      await meeting.save();
    }

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
