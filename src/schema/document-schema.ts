import { z } from "zod";

export const documentTypeOptions = ["Sentence", "Medical", "Legal", "Other"] as const;

export const documentFormSchema = z.object({
  documentId: z
    .number({ message: "Document ID is required" })
    .int("Document ID must be a whole number")
    .min(1, "Document ID is required"),
  prisonerId: z
    .number({ message: "Prisoner ID is required" })
    .int("Prisoner ID must be a whole number")
    .min(1, "Prisoner ID is required"),
  caseId: z.number({ message: "Case ID is required" }).int("Case ID must be a whole number"),
  documentType: z.enum(documentTypeOptions, { message: "Document type is required" }),
  filePath: z.string().min(2, "File path is required"),
  uploadedBy: z
    .number({ message: "Uploader ID is required" })
    .int("Uploader ID must be a whole number")
    .min(1, "Uploader ID is required"),
  uploadedAt: z.string().min(1, "Upload date is required"),
  notes: z.string().optional(),
});

export type DocumentFormValues = z.infer<typeof documentFormSchema>;
