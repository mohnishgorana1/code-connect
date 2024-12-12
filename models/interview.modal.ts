import mongoose, { Schema } from "mongoose";

export enum Role {
  INTERVIEWER = "INTERVIEWER",
  CANDIDATE = "CANDIDATE",
}

export interface IMeeting extends Document {
  interviewer: mongoose.Schema.Types.ObjectId | null;
  candidate: mongoose.Schema.Types.ObjectId | null;
  date: Date; // date for which interview held
  time: string; // Store in ISO 8601 or hh:mm:ss format
  duration: number; // Duration in minutes , this is duration of meeting held (updated at end of meeting)
  passcode: string; // Unique passcode for the meeting
  status: "SCHEDULED" | "ONGOING" | "COMPLETED"; // Meeting status
  meetingLink: string; // Video conferencing link // that will like : /meeting/${id}
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const meetingSchema = new mongoose.Schema<IMeeting>({
  interviewer: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  candidate: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    default: null,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  passcode: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["SCHEDULED", "ONGOING", "COMPLETED"],
    default: "SCHEDULED",
  },
  meetingLink: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

const Meeting = mongoose.models.Meeting || mongoose.model("Meeting", meetingSchema);

export default Meeting;
