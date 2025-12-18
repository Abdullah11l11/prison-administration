import CustomDialog from "@/components/shared/dialog.component";
import { Field } from "@/components/shared/field.component";
import { Button } from "@/components/ui/button/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const stationSchema = z.object({
  firstName: z.string().min(1, "حقل الأسم الاول مطلوب"),
  firstNameEn: z.string().min(1, "حقل الأسم الاول بالإنكليزي مطلوب"),
  lastName: z.string().min(1, "حقل الأسم الأخير مطلوب"),
  lastNameEn: z.string().min(1, "حقل الأسم الأخير بالإنكليزي مطلوب"),
  sector: z.string().min(1, "حقل القطاع مطلوب"),
  phone: z.string().min(1, "حقل رقم الهاتف مطلوب"),
  password: z.string().min(6, "حقل كلمة المرور مطلوب (6 أحرف على الأقل)"),
});

type StationFormValues = z.infer<typeof stationSchema>;

const StationAddDialog = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<StationFormValues>({
    resolver: zodResolver(stationSchema),
  });

  const onSubmit = (values: StationFormValues) => {
    console.log(values);
    reset();
  };

  return (
    <CustomDialog
      description="إضافة محطة جديدة"
      title="اضف محطة جديد"
      submitButtonText="إضافة"
      button={
        <Button type="button">
          <span>اضف محطة </span>
          <Plus />
        </Button>
      }
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <Field
          label="الأسم الاول"
          inputProps={{
            placeholder: "ادخل الأسم الاول",
            ...register("firstName"),
          }}
          error={errors.firstName?.message}
        />

        <Field
          label="الأسم الاول بالإنكليزي"
          inputProps={{
            placeholder: "ادخل الأسم الاول بالإنكليزي",
            ...register("firstNameEn"),
          }}
          error={errors.firstNameEn?.message}
        />

        <Field
          label="الأسم الأخير"
          inputProps={{
            placeholder: "ادخل الأسم الأخير",
            ...register("lastName"),
          }}
          error={errors.lastName?.message}
        />

        <Field
          label="الأسم الأخير بالإنكليزي"
          inputProps={{
            placeholder: "ادخل الأسم الأخير بالإنكليزي",
            ...register("lastNameEn"),
          }}
          error={errors.lastNameEn?.message}
        />

        <Field
          label="القطاع"
          inputProps={{
            placeholder: "القطاع",
            ...register("sector"),
          }}
          error={errors.sector?.message}
        />

        <Field
          label="رقم الهاتف"
          inputProps={{
            placeholder: "ادخل رقم الهاتف",
            ...register("phone"),
          }}
          error={errors.phone?.message}
        />

        <Field
          label="كلمة المرور"
          inputProps={{
            placeholder: "ادخل كلمة المرور",
            type: "password",
            ...register("password"),
          }}
          error={errors.password?.message}
        />
      </div>
    </CustomDialog>
  );
};

export default StationAddDialog;
