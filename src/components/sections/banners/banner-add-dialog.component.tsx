import CustomCalendar from "@/components/shared/custom-calender.component";
import CustomDialog from "@/components/shared/dialog.component";
import FieldFile from "@/components/shared/field-file.component";
import { Field } from "@/components/shared/field.component";
import { Button } from "@/components/ui/button/button";
import { type BannerFormValues, bannerSchema } from "@/schema/banner.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

const BannerAddDialog = () => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema),
  });

  const onSubmit = (values: BannerFormValues) => {
    console.log(values);

    reset();
  };

  return (
    <CustomDialog
      description="اضف بنر جديد"
      title="اضف بنر جديد"
      submitButtonText="اضف بنرات"
      button={
        <Button type="button">
          <span>اضف حملة</span>
          <Plus />
        </Button>
      }
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <Field
          label="اسم الحملة"
          inputProps={{
            placeholder: "ادخل اسم الحملة",
            ...register("campaignName"),
          }}
          error={errors.campaignName?.message}
        />

        <Field
          label="الأسم بالإنكليزي"
          inputProps={{
            placeholder: "ادخل الأسم بالإنكليزي",
            ...register("campaignNameEn"),
          }}
          error={errors.campaignNameEn?.message}
        />

        <Field
          label="رابط (URL)"
          inputProps={{
            placeholder: "ادخل رابط (URL)",
            ...register("url"),
          }}
          error={errors.url?.message}
        />

        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <FieldFile
              label="صورة"
              inputProps={{
                onChange: (file) => field.onChange(file ?? null),
              }}
              error={errors.image?.message}
            />
          )}
        />

        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <CustomCalendar
              label="تاريخ البداية"
              placeholder="ادخل تاريخ البداية"
              error={errors.startDate?.message}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <CustomCalendar
              label="تاريخ الانتهاء"
              placeholder="ادخل تاريخ الانتهاء"
              error={errors.endDate?.message}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </CustomDialog>
  );
};

export default BannerAddDialog;
