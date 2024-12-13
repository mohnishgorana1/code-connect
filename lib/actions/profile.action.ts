"use server";

import Profile from "@/models/profile.modal";
import dbConnect from "../dbConnect";
import { revalidatePath } from "next/cache";

export const createProfileAction = async (
  userAuthId: string,
  email: string,
  userName: string,
  role: string,
  pathToRevalidate: string
) => {
  await dbConnect();

  try {
    const profileData = { userName, email, role, userAuthId };
    const newProfile = await Profile.create(profileData);

    if (!newProfile) {
      console.log("Failed to create new Profile");
    }
    console.log("Profile Created SuccessFully", newProfile);

    revalidatePath(pathToRevalidate);
  } catch (error) {
    console.log("Error Creating Profile", error);
  }
};
export const fetchProfileAction = async (id: string) => {
  await dbConnect();

  try {
    const result = await Profile.findOne({ userAuthId: id });

    if (!result) {
      console.log("Profle result cannt find", result);
    }
    // console.log("Profle result", result);

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.log("Error Fetching Profile Details", error);
  }
};
