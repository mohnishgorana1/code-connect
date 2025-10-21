import mongoose from "mongoose";

export enum Role {
  Candidate = "candidate",
  Interviewer = "interviewer",
}

export interface IUser {
  clerkUserId: string;
  name: string;
  email: string;
  phone?: string;
  dob: Date;
  role: Role;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
