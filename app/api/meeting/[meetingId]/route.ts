// /api/meeting/[meetingId]
import connectDB from "@/lib/config/db";
import { Meeting } from "@/models/meeting.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: { meetingId: string } }
) {
  try {
    await connectDB();

    const { meetingId } = await params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(meetingId)) {
      return NextResponse.json(
        { success: false, message: "Invalid meeting ID format." },
        { status: 400 }
      );
    }

    const meeting = await Meeting.findById(meetingId)
      .populate("interviewer", "name email")
      .populate("candidate", "name email");

    if (!meeting) {
      return NextResponse.json(
        { success: false, message: "Meeting not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          meeting,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching meeting details:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
