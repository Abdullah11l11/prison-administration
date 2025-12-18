import CustomDialog from "@/components/shared/dialog.component";
import { Field } from "@/components/shared/field.component";
import { Button } from "@/components/ui/button/button";
import {
  type NotificationFormValues,
  notificationSchema,
} from "@/schema/notification.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

const NotificationsAddDialog = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
  });

  const onSubmit = (values: NotificationFormValues) => {
    console.log(values);

    reset();
  };

  return (
    <CustomDialog
      description="اضف إشعار جديد"
      title="اضف إشعار جديد"
      submitButtonText="إضافة"
      button={
        <Button type="button">
          <span>اضف إشعار</span>
          <Plus />
        </Button>
      }
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <Field
          label="عنوان الإشعار"
          inputProps={{
            placeholder: "ادخل عنوان الإشعار",
            ...register("notificationTitle"),
          }}
          error={errors.notificationTitle?.message}
        />

        <Field
          label="عنوان الإشعار بالإنكليزي"
          inputProps={{
            placeholder: "ادخل عنوان الإشعار بالإنكليزي",
            ...register("notificationTitleEn"),
          }}
          error={errors.notificationTitleEn?.message}
        />

        <Field
          asTextArea
          label="النص الكامل"
          inputProps={{
            placeholder: "ادخل النص الكامل",
            ...register("fullText"),
          }}
          error={errors.fullText?.message}
        />

        <Field
          asTextArea
          label="النص الكامل بالإنكليزي"
          inputProps={{
            placeholder: "ادخل النص الكامل بالإنكليزي",
            ...register("fullTextEn"),
          }}
          error={errors.fullTextEn?.message}
        />
      </div>
    </CustomDialog>
  );
};

export default NotificationsAddDialog;
