import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomDialog from "@/components/shared/dialog.component";
import { Field } from "@/components/shared/field.component";
import FieldSelect from "@/components/shared/field-select";
import { SelectItem } from "@/components/ui/select";
import FieldFile from "@/components/shared/field-file.component";
import { type EditDialogProps } from "@/types";
import { DocumentTickIcon } from "@/assets";
import { Button } from "@/components/ui/button/button";
import { type CarFormValues, carSchema } from "@/schema/car.schema";

const CarEditDialog = ({
  isTable,
  open,
  setOpen,
  initialValues,
}: EditDialogProps<CarFormValues>) => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CarFormValues>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      carName: initialValues.carName || "",
      brand: initialValues.brand || "",
      bodyType: initialValues.bodyType || "",
      plateNumber: initialValues.plateNumber || "",
      file: null,
    },
  });

  useEffect(() => {
    reset({
      carName: initialValues.carName || "",
      brand: initialValues.brand || "",
      bodyType: initialValues.bodyType || "",
      plateNumber: initialValues.plateNumber || "",
      file: null,
    });
  }, [initialValues, reset]);

  const onSubmit = (_values: CarFormValues) => {
    setOpen(false);
  };

  return (
    <CustomDialog
      button={
        !isTable && (
          <Button>
            <span>تعديل</span>
            <DocumentTickIcon color="white" />
          </Button>
        )
      }
      open={open}
      setOpen={setOpen}
      submitButtonText="حفظ"
      title="تعديل بيانات السيارة"
      description='قم بتعديل بيانات السيارة ثم اضغط على زر "حفظ"'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Field
        label="اسم السيارة"
        inputProps={{
          placeholder: "أدخل اسم السيارة",
          ...register("carName"),
        }}
        error={errors.carName?.message}
      />

      <Controller
        name="brand"
        control={control}
        render={({ field }) => (
          <FieldSelect
            label="الماركة"
            placeholder="اختر الماركة"
            value={field.value || ""}
            onValueChange={field.onChange}
            error={errors.brand?.message}
          >
            <SelectItem value="تويوتا">تويوتا</SelectItem>
            <SelectItem value="مرسيدس">مرسيدس</SelectItem>
            <SelectItem value="هيونداي">هيونداي</SelectItem>
            <SelectItem value="بي إم دبليو">بي إم دبليو</SelectItem>
          </FieldSelect>
        )}
      />

      <Controller
        name="file"
        control={control}
        render={({ field }) => (
          <FieldFile
            key={"file-car"}
            label="صورة السيارة"
            inputProps={{
              onChange: (file) => field.onChange(file ?? null),
            }}
            error={errors.file?.message}
          />
        )}
      />

      <Field
        label="رقم اللوحة"
        inputProps={{
          placeholder: "أدخل رقم اللوحة",
          ...register("plateNumber"),
        }}
        error={errors.plateNumber?.message}
      />

      <Controller
        name="bodyType"
        control={control}
        render={({ field }) => (
          <FieldSelect
            label="نوع السيارة"
            placeholder="اختر نوع السيارة"
            value={field.value || ""}
            onValueChange={field.onChange}
            error={errors.bodyType?.message}
          >
            <SelectItem value="سيدان">سيدان</SelectItem>
            <SelectItem value="SUV">SUV</SelectItem>
            <SelectItem value="هاتشباك">هاتشباك</SelectItem>
          </FieldSelect>
        )}
      />

      <Field
        label="العميل"
        inputProps={{
          placeholder: "اسم العميل",
          value: initialValues.customer,
          disabled: true,
        }}
      />
    </CustomDialog>
  );
};

export default CarEditDialog;
