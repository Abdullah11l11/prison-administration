import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Staff } from "@/types";
import { useCreateStaff, useUpdateStaff } from "@/features/staff/hooks";
import {
  staffFormSchema,
  staffStatusOptions,
  type StaffFormValues,
} from "@/schema/staff-schema";

interface UseStaffFormOptions {
  open: boolean;
  mode: "create" | "edit";
  staff: Staff | null;
  onClose: () => void;
}

const getDefaultValues = (staff: Staff | null): StaffFormValues => ({
  staffId: staff?.staffId ?? 0,
  fullName: staff?.fullName ?? "",
  nationalId: staff?.nationalId ?? "",
  position: staff?.position ?? "",
  phone: staff?.phone ?? "",
  email: staff?.email ?? "",
  status: (staff?.status as (typeof staffStatusOptions)[number]) ?? "Active",
  notes: staff?.notes ?? "",
});

export function useStaffForm({
  open,
  mode,
  staff,
  onClose,
}: UseStaffFormOptions) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const defaultValues = useMemo(() => getDefaultValues(staff), [staff]);

  const form = useForm<StaffFormValues, unknown, StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues,
  });

  const { mutateAsync: createStaff, isPending: isCreating } =
    useCreateStaff();
  const { mutateAsync: updateStaff, isPending: isUpdating } =
    useUpdateStaff();

  useEffect(() => {
    if (open) {
      form.reset(defaultValues);
      setSubmitError(null);
    }
  }, [open, defaultValues, form]);

  const onSubmit = async (values: StaffFormValues) => {
    setSubmitError(null);
    const payload = { ...values, notes: values.notes ?? "" };

    try {
      if (mode === "create") {
        await createStaff(payload);
      } else if (staff) {
        await updateStaff({ id: staff.id, data: payload });
      }
      onClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to save staff";
      setSubmitError(message);
    }
  };

  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    errors: form.formState.errors,
    isSubmitting: isCreating || isUpdating,
    submitError,
    onSubmit,
  };
}
