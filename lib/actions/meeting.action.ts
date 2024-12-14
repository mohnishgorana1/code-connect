"use server";
import Meeting from "@/models/meeting.modal";
import dbConnect from "../dbConnect";

export const createMeetingAction = async (
  title: string,
  date: Date,
  time: { hour: string; minute: string; period: "AM" | "PM" },
  passcode: string,
  interviewer: string
) => {
  await dbConnect();
  console.log(
    "Data received for meeting creation:",
    title,
    date,
    time,
    passcode,
    interviewer
  );

  try {
    console.log("Creating new Meeting");

    const newMeeting = await Meeting.create({
      title,
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

export const fetchMeetingAction = async (meetingId: string) => {
  await dbConnect();
  console.log("Data received for meeting fetch :", meetingId);

  try {
    console.log("fetching Meeting");

    const fetchedMeeting = await Meeting.findById(meetingId);
    if (!fetchedMeeting) {
      return {
        success: false,
        message: "Unable to Fetch Meeting Status : Database ERROR",
      };
    }

    return {
      success: true,
      message: "Meeting Details Fethced Successfully.",
      fetchedMeeting: JSON.parse(JSON.stringify(fetchedMeeting)),
    };
  } catch (error: any) {
    console.log("Error fetching Meeting", error);
    return {
      success: false,
      message: "An error occurred while fetching the meeting.",
      error: error.message,
    };
  }
};

export const joinMeetingAction = async (
  meetingId: string,
  userId: string,
  role: string,
  passcode: string
) => {
  await dbConnect();
  console.log(
    "Data received for meeting fetch :",
    meetingId,
    userId,
    role,
    passcode
  );

  if (!meetingId || !userId || !passcode || !role) {
    console.log("Missing Required Fields");

    return {
      success: false,
      message: "Missing Required Fields",
    };
  }

  try {
    console.log("Joining Meeting");

    const fetchedMeeting = await Meeting.findById(meetingId);
    if (!fetchedMeeting) {
      console.log("Unable to Join Meeting : Database ERROR");

      return {
        success: false,
        message: "Unable to Join Meeting : Database ERROR",
      };
    }

    if (fetchedMeeting.status === "COMPLETED") {
      console.log("Meeting Already Ended");

      return {
        success: false,
        message: "Meeting Already Ended",
      };
    }

    if (fetchedMeeting.passcode !== passcode) {
      console.log("Invalid Passcode");

      return {
        success: false,
        message: "Invalid Passcode",
      };
    }

    console.log("Logic Implementing");

    if (role === "INTERVIEWER") {
      if (fetchedMeeting.isInterviewerJoined) {
        return {
          success: false,
          message: "Already Joined",
        };
      } else {
        fetchedMeeting.isInterviewerJoined = true;
      }
    } else {
      fetchedMeeting.candidate = userId;
      if (fetchedMeeting.isCandidateJoined) {
        return {
          success: false,
          message: "Already Joined",
        };
      } else {
        fetchedMeeting.isCandidateJoined = true;
      }
    }

    if (
      fetchedMeeting.isInterviewerJoined &&
      fetchedMeeting.isCandidateJoined
    ) {
      fetchedMeeting.status = "ONGOING";
    }

    // now add candidate
    await fetchedMeeting.save();
    console.log("JOINED");

    return {
      success: true,
      message: "Meeting Joined Successfully.",
      fetchedMeeting: JSON.parse(JSON.stringify(fetchedMeeting)),
    };
  } catch (error: any) {
    console.log("Error fetching Meeting", error);
    return {
      success: false,
      message: "An error occurred while joining the meeting.",
      error: error.message,
    };
  }
};

export const exitMeetingAction = async (
  meetingId: string,
  userId: string,
  role: string
) => {
  await dbConnect();
  console.log("Data received for exiting meeting  :", meetingId, userId, role);

  if (!meetingId || !userId || !role) {
    console.log("Missing Required Fields");

    return {
      success: false,
      message: "Missing Required Fields",
    };
  }

  try {
    console.log("Exiting Meeting");

    const fetchedMeeting = await Meeting.findById(meetingId);
    if (!fetchedMeeting) {
      console.log("Unable to Exit Meeting : Database ERROR");

      return {
        success: false,
        message: "Unable to Exit Meeting : Database ERROR",
      };
    }

    if (fetchedMeeting.status === "COMPLETED") {
      console.log("Meeting Already Ended");

      return {
        success: false,
        message: "Meeting Already Ended",
      };
    }

    console.log("Logic Implementing");

    if (role === "INTERVIEWER") {
      fetchedMeeting.isInterviewerJoined = false;
    } else {
      fetchedMeeting.isCandidateJoined = false;
    }

    // now add candidate
    await fetchedMeeting.save();
    console.log("Exited Success");

    return {
      success: true,
      message: "Meeting Exits Successfully.",
      fetchedMeeting: JSON.parse(JSON.stringify(fetchedMeeting)),
    };
  } catch (error: any) {
    console.log("Error fetching Meeting", error);
    return {
      success: false,
      message: "An error occurred while joining the meeting.",
      error: error.message,
    };
  }
};
