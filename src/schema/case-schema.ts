import { z } from "zod";

export const caseStatusOptions = ["Open", "Closed", "Pending", "Appeal"] as const;

export const caseFormSchema = z.object({
  caseId: z
    .number({ message: "Case ID is required" })
    .int("Case ID must be a whole number")
    .min(1, "Case ID is required"),
  caseNumber: z.string().min(2, "Case number is required"),
  courtName: z.string().min(2, "Court name is required"),
  caseType: z.string().min(2, "Case type is required"),
  status: z.enum(caseStatusOptions, { message: "Status is required" }),
  openDate: z.string().min(1, "Open date is required"),
  closeDate: z.string().optional(),
});

export type CaseFormValues = z.infer<typeof caseFormSchema>;
