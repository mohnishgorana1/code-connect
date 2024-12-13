"use server";
import Meeting from "@/models/meeting.modal";
import dbConnect from "../dbConnect";

export const createMeetingAction = async (
  date: Date,
  time: { hour: string; minute: string; period: "AM" | "PM" },
  passcode: string,
  interviewer: string
) => {
  await dbConnect();
  console.log(
    "Data received for meeting creation:",
    date,
    time,
    passcode,
    interviewer
  );

  try {
    console.log("Creating new Meeting");
    
    const newMeeting = await Meeting.create({
      interviewer,
      candidate: null, // Assuming no candidate initially
      date,
      time,
      passcode,
      duration: 0, // Default duration
      status: "SCHEDULED",
      meetingLink: "/meeting/", // Temporary, to be updated after creation
    });
    if (!newMeeting) {
      return {
        success: false,
        message: "Unable to Schedule Meeting : Database ERROR",
      };
    }

    newMeeting.meetingLink = `/meeting/${newMeeting._id}`;
    await newMeeting.save();

    console.log("new meeting", newMeeting);
    

    return {
      success: true,
      message: "Meeting successfully Scheduled.",
      data: JSON.parse(JSON.stringify(newMeeting)),
    };
  } catch (error: any) {
    console.log("Error Scheduling Meeting", error);
    return {
      success: false,
      message: "An error occurred while scheduling the meeting.",
      error: error.message,
    };
  }
};
