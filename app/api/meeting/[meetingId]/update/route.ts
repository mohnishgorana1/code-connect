// /api/meeting/[meetingId]/update

import connectDB from "@/lib/config/db";
import { Meeting, MeetingStatus } from "@/models/meeting.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { meetingId: string } }
) {
  try {
    await connectDB();

    const { meetingId } = params;
    if (!mongoose.Types.ObjectId.isValid(meetingId)) {
      return NextResponse.json(
        { success: false, message: "Invalid meeting ID format." },
        { status: 400 }
      );
    }

    const body = await req.json();

    const { type, payload } = body;
    if (!type) {
      return NextResponse.json(
        { success: false, message: "Update type is required." },
        { status: 400 }
      );
    }

    let update: any = {};

    // 🎯 Modular handling based on "type"
    switch (type) {
      case "end-call-for-everyone":
        update = {
          status: MeetingStatus.Completed,
          endTime: new Date(),
          isInterviewerOnline: false,
          isCandidateOnline: false,
        };
        break;

      case "update-start-time":
        if (!payload?.newStartTime) {
          return NextResponse.json(
            { success: false, message: "newStartTime is required." },
            { status: 400 }
          );
        }


        const newStart = new Date(payload.newStartTime);
        if (isNaN(newStart.getTime())) {
          return NextResponse.json(
            {
              success: false,
              message: "Invalid date format for newStartTime.",
            },
            { status: 400 }
          );
        }
        console.log("updating start time", newStart)
        update = { startTime: newStart };
        break;

      case "set-interviewer-online":
        update = { isInterviewerOnline: true };
        break;

      case "set-candidate-online":
        update = { isCandidateOnline: true };
        break;

      case "set-interviewer-offline":
        update = { isInterviewerOnline: false };
        break;

      case "set-candidate-offline":
        update = { isCandidateOnline: false };
        break;

      case "custom-update":
        // For flexible future updates
        if (!payload || typeof payload !== "object") {
          return NextResponse.json(
            { success: false, message: "Payload required for custom update." },
            { status: 400 }
          );
        }
        update = payload;
        break;

      default:
        return NextResponse.json(
          { success: false, message: "Invalid update type provided." },
          { status: 400 }
        );
    }
    const meeting = await Meeting.findByIdAndUpdate(meetingId, update, {
      new: true,
    });

    if (!meeting) {
      return NextResponse.json(
        { success: false, message: "Meeting not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Meeting updated successfully for type: ${type}`,
        data: { meeting },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error updating meeting status:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
