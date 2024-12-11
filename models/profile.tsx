import mongoose from "mongoose";

export enum Role {
  INTERVIEWER = "INTERVIEWER",
  CANDIDATE = "CANDIDATE",
}

export interface IProfile extends Document {
  userAuthId: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

const profileSchema = new mongoose.Schema<IProfile>({
  userAuthId: {
    type: String,
    required: [true, "Authenticated UserId is required"],
    trim: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  role: {
    type: String,
    enum: Role,
    default: Role.CANDIDATE,
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

const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default Profile;
