import CustomDialog from "@/components/shared/dialog.component";
import FieldSelect from "@/components/shared/field-select";
import { Field } from "@/components/shared/field.component";
import { Button } from "@/components/ui/button/button";
import { SelectItem } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const sectorSchema = z.object({
  sectorName: z.string().min(1, "حقل اسم القطاع مطلوب"),
  city: z.string().min(1, "حقل المدينة مطلوب"),
});

type SectorFormValues = z.infer<typeof sectorSchema>;

const cities = [
  { value: "aleppo", label: "حلب" },
  { value: "damascus", label: "دمشق" },
  { value: "homs", label: "حمص" },
];

const SectorAddDialog = () => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SectorFormValues>({
    resolver: zodResolver(sectorSchema),
  });

  const onSubmit = (values: SectorFormValues) => {
    console.log(values);
    reset();
  };

  return (
    <CustomDialog
      description="أضف قطاع جديد"
      title="أضف قطاع جديد"
      submitButtonText="إضافة"
      button={
        <Button type="button">
          <span>أضف قطاع جديد</span>
          <Plus />
        </Button>
      }
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <Field
          label="اسم القطاع"
          inputProps={{
            placeholder: "أدخل اسم القطاع",
            ...register("sectorName"),
          }}
          error={errors.sectorName?.message}
        />

        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <FieldSelect
              label="المدينة"
              placeholder="أختر المدينة"
              value={field.value || ""}
              onValueChange={field.onChange}
              error={errors.city?.message}
            >
              {cities.map((city) => (
                <SelectItem key={city.value} value={city.value}>
                  {city.label}
                </SelectItem>
              ))}
            </FieldSelect>
          )}
        />
      </div>
    </CustomDialog>
  );
};

export default SectorAddDialog;
