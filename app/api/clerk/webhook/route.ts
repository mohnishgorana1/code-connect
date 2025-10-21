import { Webhook } from "svix";
import { NextResponse } from "next/server";
import {
  createAccountInDatabase,
  deleteAccountInDatabase,
} from "@/actions/user.actions";
import { clerkClient } from "@clerk/nextjs/server";

/**
 * Clerk Webhook Handler
 * Handles user.created and user.deleted events
 */
export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("❌ Missing Clerk Webhook Secret");
    return new NextResponse("Missing Clerk Webhook Secret", { status: 500 });
  }

  try {
    const payload = await req.text();
    const headers = req.headers;

    const svix_id = headers.get("svix-id");
    const svix_timestamp = headers.get("svix-timestamp");
    const svix_signature = headers.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new NextResponse("Missing svix headers", { status: 400 });
    }

    // Verify the webhook signature
    const wh = new Webhook(WEBHOOK_SECRET);
    const evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as { type: string; data: Record<string, any> };

    const { type, data } = evt;

    // ✅ Handle user.created
    if (type === "user.created") {
      const {
        id,
        email_addresses,
        first_name,
        last_name,
        phone_numbers,
        birthday,
      } = data;

      const fullName = `${first_name || ""} ${last_name || ""}`.trim();
      const email = email_addresses?.[0]?.email_address;
      const phone = phone_numbers?.[0]?.phone_number;
      const dob = birthday ? new Date(birthday) : new Date();

      const result = await createAccountInDatabase(id, fullName, email, phone, dob);

      if (!result.success) {
        if (result.status !== 409) {
          try {
            await clerkClient.users.deleteUser(id);
            console.warn("🧹 Clerk user deleted due to DB failure:", id);
          } catch (cleanupError) {
            console.error("⚠️ Clerk cleanup failed:", cleanupError);
          }
        }

        return NextResponse.json(
          {
            success: false,
            message: "Failed to create user in MongoDB",
            data: result,
          },
          { status: result.status }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "User created successfully in both Clerk and MongoDB",
          data: result.data,
        },
        { status: 201 }
      );
    }

    // 🗑️ Handle user.deleted
    if (type === "user.deleted") {
      const { id } = data;
      if (!id) {
        return new NextResponse("Missing Clerk user ID", { status: 400 });
      }

      const result = await deleteAccountInDatabase(id);

      if (!result.success && result.status !== 404) {
        return NextResponse.json(
          {
            success: false,
            message: "User deletion failed in MongoDB",
          },
          { status: result.status }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "User deleted successfully from MongoDB",
        },
        { status: 200 }
      );
    }

    // 🚫 Ignore unsupported events
    return NextResponse.json(
      { success: true, message: `Event type '${type}' ignored.` },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("❌ Webhook Error:", err);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 500 });
  }
}
