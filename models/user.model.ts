import { IUser, Role } from "../types/models.types";
import { Schema, model, models, Document } from "mongoose";

interface IUserDoc extends IUser, Document {}

const userSchema = new Schema<IUserDoc>(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
    },
    dob: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.Candidate,
    },
    avatar: {
      type: String, // optional
    },
  },
  { timestamps: true }
);

export const User = models.User || model<IUserDoc>("User", userSchema);
