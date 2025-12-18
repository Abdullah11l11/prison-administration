import z from "zod";

export const carSchema = z.object({
  carName: z.string().optional(),
  brand: z.string().min(1, "حقل الماركة مطلوب"),
  bodyType: z.string().min(1, "حقل نوع السيارة مطلوب"),
  plateNumber: z.string().optional(),
  file: z.instanceof(File).nullable().optional(),
  customer: z.string(),
});

export type CarFormValues = z.infer<typeof carSchema>;
