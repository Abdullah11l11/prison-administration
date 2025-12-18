import CustomDialog from "@/components/shared/dialog.component";
import FieldSelect from "@/components/shared/field-select";
import { Field } from "@/components/shared/field.component";
import { Button } from "@/components/ui/button/button";
import { SelectItem } from "@/components/ui/select";
import {
  type CustomerFormValues,
  customerSchema,
} from "@/schema/customer.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

const CustomerAddDialog = () => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
  });

  const onSubmit = (values: CustomerFormValues) => {
    console.log(values);
    reset();
  };

  return (
    <CustomDialog
      description="إضافة عميل جديد"
      title="اضف عميل جديد"
      submitButtonText="إضافة"
      button={
        <Button type="button">
          <span>اضف عميل </span>
          <Plus />
        </Button>
      }
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <Field
          label="الاسم الأول"
          inputProps={{
            placeholder: "ادخل الاسم الأول",
            ...register("firstName"),
          }}
          error={errors.firstName?.message}
        />

        <Field
          label="الاسم الأخير"
          inputProps={{
            placeholder: "ادخل الاسم الأخير",
            ...register("lastName"),
          }}
          error={errors.lastName?.message}
        />

        <Field
          label="رقم الهاتف"
          inputProps={{
            placeholder: "ادخل رقم الهاتف",
            ...register("phone"),
          }}
          error={errors.phone?.message}
        />

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <FieldSelect
              label="الجنس"
              placeholder="اختر الجنس"
              value={field.value || ""}
              onValueChange={field.onChange}
              error={errors.gender?.message}
            >
              <SelectItem value="male">ذكر</SelectItem>
              <SelectItem value="female">أنثى</SelectItem>
            </FieldSelect>
          )}
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

export default CustomerAddDialog;
