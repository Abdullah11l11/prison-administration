import { z } from "zod";

export const staffStatusOptions = ["Active", "Inactive", "On Leave"] as const;

export const staffFormSchema = z.object({
  staffId: z
    .number({ message: "Staff ID is required" })
    .int("Staff ID must be a whole number")
    .min(1, "Staff ID is required"),
  fullName: z.string().min(2, "Full name is required"),
  nationalId: z.string().min(3, "National ID is required"),
  position: z.string().min(2, "Position is required"),
  phone: z.string().min(6, "Phone is required"),
  email: z.string().email("Enter a valid email"),
  status: z.enum(staffStatusOptions, { message: "Status is required" }),
  notes: z.string().optional(),
});

export type StaffFormValues = z.infer<typeof staffFormSchema>;
