import z from "zod";

export const notificationSchema = z.object({
  notificationTitle: z.string().min(1, "حقل عنوان الإشعار مطلوب"),
  notificationTitleEn: z.string().min(1, "حقل عنوان الإشعار بالإنكليزي مطلوب"),
  fullText: z.string().min(1, "حقل النص الكامل مطلوب"),
  fullTextEn: z.string().min(1, "حقل النص الكامل بالإنكليزي مطلوب"),
});

export type NotificationFormValues = z.infer<typeof notificationSchema>;
