import mongoose, { Schema, model, models, Document } from "mongoose";

export enum MeetingStatus {
  Scheduled = "scheduled",
  Ongoing = "ongoing",
  Completed = "completed",
  Cancelled = "cancelled",
}

export interface IMeeting {
  title: string;
  description?: string;
  interviewer: mongoose.Types.ObjectId; 
  candidate: mongoose.Types.ObjectId;  
  status: MeetingStatus;
  startTime?: Date;
  endTime?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IMeetingDoc extends IMeeting, Document {}

const meetingSchema = new Schema<IMeetingDoc>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    interviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    candidate: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(MeetingStatus),
      default: MeetingStatus.Scheduled,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Meeting = models.Meeting || model<IMeetingDoc>("Meeting", meetingSchema);
