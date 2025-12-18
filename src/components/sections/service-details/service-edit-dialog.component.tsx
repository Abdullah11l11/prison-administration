import { useEffect } from "react";

import CustomDialog from "@/components/shared/dialog.component";
import { Field } from "@/components/shared/field.component";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button/button";
import { DocumentTickIcon } from "@/assets";
import { type EditDialogProps } from "@/types";
import { type ServiceFormValues, serviceSchema } from "@/schema/service.schema";

const ServiceEditDialog = ({
  open,
  setOpen,
  isTable,
  initialValues,
  onSubmit,
}: EditDialogProps<ServiceFormValues>) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (open) {
      reset(initialValues);
    }
  }, [initialValues, open, reset]);

  const handleFormSubmit = (values: ServiceFormValues) => {
    onSubmit(values);
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
      description="تعديل الخدمة"
      title="تعديل الخدمة"
      submitButtonText="حفظ التغييرات"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="flex flex-col gap-4">
        <Field
          label="اسم الخدمة"
          inputProps={{
            placeholder: "ادخل اسم الخدمة",
            ...register("serviceName"),
          }}
          error={errors.serviceName?.message}
        />

        <Field
          label="الاسم بالإنكليزي"
          inputProps={{
            placeholder: "ادخل الاسم بالإنكليزي",
            ...register("serviceNameEn"),
          }}
          error={errors.serviceNameEn?.message}
        />

        <Field
          asTextArea
          label="وصف الخدمة"
          inputProps={{
            placeholder: "ادخل وصف الخدمة",
            ...register("description"),
          }}
          error={errors.description?.message}
        />

        <Field
          asTextArea
          label="الوصف بالإنكليزي"
          inputProps={{
            placeholder: "ادخل الوصف بالإنكليزي",
            ...register("descriptionEn"),
          }}
          error={errors.descriptionEn?.message}
        />
      </div>
    </CustomDialog>
  );
};

export default ServiceEditDialog;
