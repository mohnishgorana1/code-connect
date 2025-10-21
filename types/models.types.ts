import mongoose from "mongoose";

export interface IUser {
  clerkUserId: string;
  name: string;
  email: string;
  phone?: string;
  dob: Date;
  role: "candidate" | "interviewer";
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
