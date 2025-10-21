import { z } from "zod";

// ++++++++++++++  CREATE MEETING  +++++++++++++++++++

export const ClientMeetingSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  candidateEmail: z
    .string()
    .email("A valid candidate email address is required")
    .nonempty("Candidate email is required"),
  startTime: z.string().nonempty("Start time is required"),
});

export type CreateMeetingFormValues = z.infer<typeof ClientMeetingSchema>;

export const createMeetingSchema = ClientMeetingSchema.extend({
  startTime: z
    .string()
    .pipe(z.coerce.date())
    .refine((date) => date > new Date(), {
      message: "Start time must be in the future",
    }),
});


//  ++++++++++++  JOIN MEETING  +++++++++++++++++++++
export const joinMeetingSchema = z.object({
  meetingId: z
    .string()
    .min(5, "Meeting ID is required")
    .regex(/^[a-f\d]{24}$/i, "Invalid meeting ID format"),
});

export type JoinMeetingFormValues = z.infer<typeof joinMeetingSchema>;
