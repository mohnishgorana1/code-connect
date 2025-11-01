// POST : /api/users/become-instructor

import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import { User } from "@/models/user.model";
import {
  InterviewerRequest,
  InterviewerRequestStatus,
} from "@/models/interviewer-request.model";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      appUserId,
      bio,
      primarySkills,
      yearsOfExperience,
      interviewDomains,
      ratePerHour,
    } = body;

    if (!appUserId) {
      console.log("Not authenticated: Clerk User ID missing.");
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required (clerkUserId missing).",
        },
        { status: 401 }
      );
    }

    const user = await User.findById(appUserId).select("_id").lean();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found in database." },
        { status: 403 }
      );
    }

    // 2. Process primarySkills: Convert comma-separated string to an array of trimmed, non-empty strings
    let skillsArray: string[] = [];
    if (typeof primarySkills === "string" && primarySkills.trim() !== "") {
      skillsArray = primarySkills
        .split(",")
        .map((skill: string) => skill.trim())
        .filter((skill: string) => skill.length > 0);
    }
    const updateData = {
      bio,
      primarySkills: skillsArray,
      yearsOfExperience: Number(yearsOfExperience),
      interviewDomains,
      ratePerHour: ratePerHour ? Number(ratePerHour) : undefined,
      status: InterviewerRequestStatus.PendingReview,
    };

    const interviewerRequest = await InterviewerRequest.findOneAndUpdate(
      { candidateId: appUserId },
      updateData,
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Interviewer application submitted successfully for review.",
        data: interviewerRequest,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error submitting interviewer application:", error);

    // Detailed error message for validation failures or missing fields
    let errorMessage = "Internal server error";
    if (error.name === "ValidationError") {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { success: false, message: error?.message || errorMessage },
      { status: 500 }
    );
  }
}
