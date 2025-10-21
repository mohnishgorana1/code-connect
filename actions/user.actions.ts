"use server";
import connectDB from "@/lib/config/db";
import { User } from "@/models/user.model";
import { Role } from "@/types/models.types";

/**
 * Create a user in MongoDB when Clerk user is created
 */
export const createAccountInDatabase = async (
  clerkUserId: string,
  name: string,
  email: string,
  phone?: string,
  dob?: Date
): Promise<{
  success: boolean;
  status: number;
  message: string;
  data?: any;
}> => {
  await connectDB();

  try {
    if (!clerkUserId || !email) {
      return {
        success: false,
        status: 400,
        message: "Missing required fields: clerkUserId or email",
      };
    }

    // Check if user already exists
    const existingUser = await User.findOne({ clerkUserId });
    if (existingUser) {
      console.log("⚠️ User already exists in DB:", email);
      return {
        success: false,
        status: 409,
        message: "User already exists",
        data: existingUser,
      };
    }

    // Create new user with default role = candidate
    const newUser = await User.create({
      clerkUserId,
      name,
      email,
      phone,
      dob: dob || new Date(),
      role: Role.Candidate,
    });

    console.log("✅ User created in DB:", email);

    return {
      success: true,
      status: 201,
      message: "User successfully created",
      data: newUser,
    };
  } catch (error: any) {
    console.error("❌ Error creating user in DB:", error);

    return {
      success: false,
      status: 500,
      message: error?.message || "Failed to create user in DB",
    };
  }
};

/**
 * Fetch user by Clerk ID
 */
export const fetchUserAccountDetails = async (clerkUserId: string) => {
  await connectDB();

  try {
    if (!clerkUserId) {
      return { success: false, status: 400, message: "Missing clerkUserId" };
    }

    const user = await User.findOne({ clerkUserId }).lean();

    if (!user) {
      return {
        success: false,
        status: 404,
        message: "User not found in DB",
      };
    }

    return { success: true, status: 200, data: user };
  } catch (error: any) {
    console.error("❌ Error fetching user:", error);
    return {
      success: false,
      status: 500,
      message: error?.message || "Failed to fetch user details",
    };
  }
};

/**
 * Delete user from MongoDB when Clerk user is deleted
 */
export const deleteAccountInDatabase = async (clerkUserId: string) => {
  await connectDB();

  try {
    if (!clerkUserId) {
      return { success: false, status: 400, message: "Missing clerkUserId" };
    }

    const result = await User.deleteOne({ clerkUserId });

    if (result.deletedCount === 0) {
      console.warn(
        "⚠️ User not found or already deleted from DB:",
        clerkUserId
      );
      return {
        success: false,
        status: 404,
        message: "User not found or already deleted",
      };
    }

    console.log("🗑️ User deleted from DB:", clerkUserId);
    return {
      success: true,
      status: 200,
      message: "User successfully deleted from DB",
    };
  } catch (error: any) {
    console.error("❌ Error deleting user from DB:", error);
    return {
      success: false,
      status: 500,
      message: error?.message || "Failed to delete user from DB",
    };
  }
};
