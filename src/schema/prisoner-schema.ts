import { z } from "zod";

export const genderOptions = ["Male", "Female", "Other"] as const;
export const riskOptions = ["Low", "Medium", "High"] as const;
export const statusOptions = [
  "Incarcerated",
  "Released",
  "Transferred",
  "Parole",
] as const;

export const prisonerFormSchema = z.object({
  prisonerId: z
    .number("Prisoner ID is required")
    .int("Prisoner ID must be a whole number")
    .min(1, "Prisoner ID is required"),
  fullName: z.string().min(2, "Full name is required"),
  nationalId: z.string().min(3, "National ID is required"),
  gender: z.enum(genderOptions, { message: "Gender is required" }),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  admissionDate: z.string().min(1, "Admission date is required"),
  status: z.enum(statusOptions, { message: "Status is required" }),
  riskLevel: z.enum(riskOptions, { message: "Risk level is required" }),
  currentCellId: z
    .number("Current cell is required")
    .int("Current cell must be a whole number")
    .min(1, "Current cell is required"),
  notes: z.string().optional(),
});

export type PrisonerFormValues = z.infer<typeof prisonerFormSchema>;
