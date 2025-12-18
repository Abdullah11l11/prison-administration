import CustomDialog from "@/components/shared/dialog.component";
import { Field } from "@/components/shared/field.component";
import { Button } from "@/components/ui/button/button";
import { serviceSchema, type ServiceFormValues } from "@/schema/service.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

const ServiceAddDialog = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
  });

  const onSubmit = (values: ServiceFormValues) => {
    console.log(values);

    reset();
  };

  return (
    <CustomDialog
      description="إضافة خدمة جديد"
      title="اضف خدمة جديد"
      submitButtonText="إضافة"
      button={
        <Button type="button">
          <span>اضافة خدمة</span>
          <Plus />
        </Button>
      }
      onSubmit={handleSubmit(onSubmit)}
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

export default ServiceAddDialog;
