import z from "zod";

export const customerSchema = z.object({
  firstName: z.string().min(1, "حقل الاسم الأول مطلوب"),
  lastName: z.string().min(1, "حقل الاسم الأخير مطلوب"),
  phone: z.string().min(1, "حقل رقم الهاتف مطلوب"),
  gender: z.string().min(1, "حقل الجنس مطلوب"),
  password: z.string().min(6, "حقل كلمة المرور مطلوب (6 أحرف على الأقل)"),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;
