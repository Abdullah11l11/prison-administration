import CustomDialog from "@/components/shared/dialog.component";
import { Field } from "@/components/shared/field.component";
import { Button } from "@/components/ui/button/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const citySchema = z.object({
  cityName: z.string().min(1, "حقل المدينة مطلوب"),
});

type CityFormValues = z.infer<typeof citySchema>;

const CityAddDialog = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CityFormValues>({
    resolver: zodResolver(citySchema),
  });

  const onSubmit = (values: CityFormValues) => {
    console.log(values);
    reset();
  };

  return (
    <CustomDialog
      description="أضف مدينة جديد"
      title="أضف مدينة جديد"
      submitButtonText="إضافة"
      button={
        <Button type="button">
          <span>أضف مدينة جديد</span>
          <Plus />
        </Button>
      }
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <Field
          label="المدينة"
          inputProps={{
            placeholder: "ادخل اسم المدينة",
            ...register("cityName"),
          }}
          error={errors.cityName?.message}
        />
      </div>
    </CustomDialog>
  );
};

export default CityAddDialog;
