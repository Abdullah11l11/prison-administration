import z from "zod";

export const serviceSchema = z.object({
  serviceName: z.string().min(1, "حقل اسم الخدمة مطلوب"),
  serviceNameEn: z.string().min(1, "حقل الاسم بالإنكليزي مطلوب"),
  description: z.string().min(1, "حقل وصف الخدمة مطلوب"),
  descriptionEn: z.string().min(1, "حقل الوصف بالإنكليزي مطلوب"),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
