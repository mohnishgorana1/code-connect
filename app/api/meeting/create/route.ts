// POST : /api/meeting/create

import { Meeting, IMeeting, MeetingStatus } from "@/models/meeting.model";
import { User, Role } from "@/models/user.model";
import { NextResponse } from "next/server";
import { createMeetingSchema } from "@/validations/meeting.schema";
import { z } from "zod";
import mongoose from "mongoose";
import connectDB from "@/lib/config/db";

export async function POST(req: Request) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const interviewerId = url.searchParams.get("interviewerId");

    if (!interviewerId) {
      return NextResponse.json(
        {
          success: false,
          message: "Interviewer ID is missing from URL query.",
        },
        { status: 400 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(interviewerId)) {
      return NextResponse.json(
        { success: false, message: "Invalid Interviewer ID format." },
        { status: 400 }
      );
    }

    // --- 2. Parse and Validate Request Body ---
    const body = await req.json();
    let validatedClientData;

    try {
      validatedClientData = createMeetingSchema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: "Validation Error on form data.",
            errors: error.issues.map((issue) => ({
              path: issue.path.join("."),
              message: issue.message,
            })),
          },
          { status: 400 }
        );
      }
      throw error;
    }

    const { title, description, candidateEmail, startTime } =
      validatedClientData; 
    // const startTimeDate = new Date(startTime);  // to convert into UTC
    console.log("req: startTime", startTime);
    // console.log("db: startTimeDate", startTimeDate);

    // A. Interviewer Validation
    const interviewer = await User.findById(interviewerId);

    if (!interviewer) {
      return NextResponse.json(
        { success: false, message: "Interviewer not found." },
        { status: 404 }
      );
    }
    if (interviewer.role !== Role.Interviewer) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Authorization failed. Only Interviewers can schedule meetings.",
        },
        { status: 403 } // Forbidden
      );
    }

    // B. Candidate Lookup (by email)
    const candidate = await User.findOne({ email: candidateEmail });

    if (!candidate) {
      return NextResponse.json(
        {
          success: false,
          message: `Candidate with email '${candidateEmail}' not found in the system.`,
        },
        { status: 404 }
      );
    }

    // Check if the candidate and interviewer are the same person (optional check)
    if (interviewer._id.equals(candidate._id)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Cannot schedule a meeting between an interviewer and themselves.",
        },
        { status: 400 }
      );
    }

    // --- 4. Create New Meeting Document ---
    const newMeetingData: Partial<IMeeting> = {
      title: title,
      description: description,
      interviewer: interviewer._id,
      candidate: candidate._id,
      isInterviewerOnline: false,
      isCandidateOnline: false,
      status: MeetingStatus.Scheduled,
      startTime: startTime,
    };

    const newMeeting = new Meeting(newMeetingData);
    await newMeeting.save();

    // --- 5. Success Response ---
    console.log("meeting scheduled", newMeeting);

    return NextResponse.json(
      {
        success: true,
        message: "Meeting scheduled successfully",
        data: {
          meeting: newMeeting,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Internal Server Error creating meeting:", error);
    return NextResponse.json(
      { success: false, message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
