import mongoose, { model, models, Schema } from "mongoose";

export enum InterviewerRequestStatus {
  Draft = "draft", // Application started but not submitted
  PendingReview = "pending_review", // Submitted and waiting for verification
  Approved = "approved", // Fully approved interviewer
  Rejected = "rejected", // Application rejected
  Suspended = "suspended", // Active interviewer who has been temporarily disabled
}
interface IInterviewDomain {
  domain: string; // e.g., "Frontend", "Backend", "Mobile", "DevOps"
  proficiencyLevel: "junior" | "mid" | "senior" | "principal";
}
export interface IInterviewerRequest {
  candidateId: mongoose.Types.ObjectId;
  status: InterviewerRequestStatus;
  interviewDomains: IInterviewDomain[];
  bio: string;
  primarySkills: string[];
  yearsOfExperience: number;
  ratePerHour?: number;

  approvedBy?: mongoose.Types.ObjectId; // admin user id  _id
  approvedAt?: Date;
  adminNotes?: string;

  createdAt: Date;
  updatedAt: Date;
}

interface IInterviewerRequestDoc extends IInterviewerRequest, Document {}

const InterviewDomainSchema = new Schema<IInterviewDomain>(
  {
    domain: { type: String, required: true },
    proficiencyLevel: {
      type: String,
      enum: ["junior", "mid", "senior", "principal"],
      required: true,
    },
  },
  { _id: false } // Prevents Mongoose from creating an _id for each sub-document
);

// --- Mongoose Main Schema Definition ---
const interviewerRequestSchema = new Schema<IInterviewerRequestDoc>(
  {
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Ensures a user can only have one application/profile document
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(InterviewerRequestStatus),
      default: InterviewerRequestStatus.Draft,
      required: true,
    },
    bio: {
      type: String,
      required: true,
      maxlength: 1000,
      trim: true,
    },
    primarySkills: {
      type: [String],
      required: true,
      default: [],
    },
    yearsOfExperience: {
      type: Number,
      required: true,
      min: 0, // Cannot be negative
    },
    interviewDomains: {
      type: [InterviewDomainSchema], // Array of the sub-schema for detailed domains
      required: true,
      default: [],
    },
    ratePerHour: {
      type: Number,
      min: 0, // Cannot be negative
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    approvedAt: {
      type: Date,
    },
    adminNotes: {
      type: String,
    },
  },
  { timestamps: true }
);

export const InterviewerRequest =
  (models.InterviewerRequest as mongoose.Model<IInterviewerRequestDoc>) ||
  model<IInterviewerRequestDoc>("InterviewerRequest", interviewerRequestSchema);
