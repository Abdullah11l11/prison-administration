import z from "zod";

export const bannerSchema = z
  .object({
    campaignName: z.string().min(1, "حقل اسم الحملة مطلوب"),
    campaignNameEn: z.string().min(1, "حقل الأسم بالإنكليزي مطلوب"),
    url: z
      .string()
      .min(1, "حقل رابط (URL) مطلوب")
      .url("الرجاء إدخال رابط (URL) صالح"),
    image: z.instanceof(File).nullable().optional(),
    startDate: z.date({ error: "حقل تاريخ البداية مطلوب" }),
    endDate: z.date({ error: "حقل تاريخ الانتهاء مطلوب" }),
  })
  .refine(
    (data) =>
      !data.startDate || !data.endDate || data.endDate >= data.startDate,
    {
      message: "تاريخ الانتهاء يجب أن يكون بعد تاريخ البداية",
      path: ["endDate"],
    }
  );

export type BannerFormValues = z.infer<typeof bannerSchema>;
