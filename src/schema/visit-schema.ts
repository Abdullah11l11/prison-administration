import { z } from "zod";

export const visitStatusOptions = ["Scheduled", "Completed", "Cancelled"] as const;
export const visitTypeOptions = ["In-person", "Virtual", "Phone"] as const;

export const visitFormSchema = z.object({
  visitId: z
    .number({ message: "Visit ID is required" })
    .int("Visit ID must be a whole number")
    .min(1, "Visit ID is required"),
  prisonerId: z
    .number({ message: "Prisoner ID is required" })
    .int("Prisoner ID must be a whole number")
    .min(1, "Prisoner ID is required"),
  visitorId: z
    .number({ message: "Visitor ID is required" })
    .int("Visitor ID must be a whole number")
    .min(1, "Visitor ID is required"),
  visitDate: z.string().min(1, "Visit date is required"),
  visitType: z.enum(visitTypeOptions, { message: "Visit type is required" }),
  status: z.enum(visitStatusOptions, { message: "Status is required" }),
  notes: z.string().optional(),
});

export type VisitFormValues = z.infer<typeof visitFormSchema>;
