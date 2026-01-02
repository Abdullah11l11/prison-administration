import { z } from "zod";

export const incidentSeverityOptions = ["High", "Medium", "Low"] as const;
export const incidentStatusOptions = ["Open", "In Progress", "Closed"] as const;

export const incidentFormSchema = z.object({
  incidentId: z
    .number({ message: "Incident ID is required" })
    .int("Incident ID must be a whole number")
    .min(1, "Incident ID is required"),
  prisonerId: z
    .number({ message: "Prisoner ID is required" })
    .int("Prisoner ID must be a whole number")
    .min(1, "Prisoner ID is required"),
  reportedByStaffId: z
    .number({ message: "Reporter Staff ID is required" })
    .int("Reporter Staff ID must be a whole number")
    .min(1, "Reporter Staff ID is required"),
  incidentType: z.string().min(2, "Incident type is required"),
  incidentDate: z.string().min(1, "Incident date is required"),
  description: z.string().min(2, "Description is required"),
  severity: z.enum(incidentSeverityOptions, { message: "Severity is required" }),
  actionTaken: z.string().min(2, "Action taken is required"),
  status: z.enum(incidentStatusOptions, { message: "Status is required" }),
});

export type IncidentFormValues = z.infer<typeof incidentFormSchema>;
