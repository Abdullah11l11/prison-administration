import { z } from "zod";

export const healthStatusOptions = ["Open", "Closed", "Follow-up"] as const;
export const healthRecordTypeOptions = [
  "Checkup",
  "Psych",
  "Dental",
  "Chronic",
  "Other",
] as const;

export const healthRecordFormSchema = z.object({
  healthRecordId: z
    .number({ message: "Record ID is required" })
    .int("Record ID must be a whole number")
    .min(1, "Record ID is required"),
  prisonerId: z
    .number({ message: "Prisoner ID is required" })
    .int("Prisoner ID must be a whole number")
    .min(1, "Prisoner ID is required"),
  recordType: z.enum(healthRecordTypeOptions, { message: "Record type is required" }),
  recordDate: z.string().min(1, "Record date is required"),
  doctorId: z
    .number({ message: "Doctor ID is required" })
    .int("Doctor ID must be a whole number")
    .min(1, "Doctor ID is required"),
  diagnosis: z.string().min(2, "Diagnosis is required"),
  treatment: z.string().min(2, "Treatment is required"),
  status: z.enum(healthStatusOptions, { message: "Status is required" }),
  notes: z.string().optional(),
});

export type HealthRecordFormValues = z.infer<typeof healthRecordFormSchema>;
