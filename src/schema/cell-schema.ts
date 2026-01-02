import { z } from "zod";

export const securityLevelOptions = ["High", "Medium", "Low"] as const;
export const cellTypeOptions = ["Standard", "Isolation", "Dorm"] as const;

export const cellFormSchema = z.object({
  cellId: z
    .number({ message: "Cell ID is required" })
    .int("Cell ID must be a whole number")
    .min(1, "Cell ID is required"),
  blockName: z.string().min(1, "Block name is required"),
  cellNumber: z.string().min(1, "Cell number is required"),
  securityLevel: z.enum(securityLevelOptions, {
    message: "Security level is required",
  }),
  capacity: z
    .number({ message: "Capacity is required" })
    .int("Capacity must be a whole number")
    .min(1, "Capacity must be at least 1"),
  currentOccupancy: z
    .number({ message: "Current occupancy is required" })
    .int("Current occupancy must be a whole number")
    .min(0, "Current occupancy cannot be negative"),
  cellType: z.enum(cellTypeOptions, { message: "Cell type is required" }),
  notes: z.string().optional(),
});

export type CellFormValues = z.infer<typeof cellFormSchema>;
