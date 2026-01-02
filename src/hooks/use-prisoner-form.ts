import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Prisoner } from "@/types";
import {
  useCreatePrisoner,
  useUpdatePrisoner,
} from "@/features/prisoners/hooks";
import {
  genderOptions,
  prisonerFormSchema,
  riskOptions,
  statusOptions,
  type PrisonerFormValues,
} from "@/schema/prisoner-schema";

interface UsePrisonerFormOptions {
  open: boolean;
  mode: "create" | "edit";
  prisoner: Prisoner | null;
  onClose: () => void;
}

const getDefaultValues = (prisoner: Prisoner | null) => ({
  prisonerId: prisoner?.prisonerId,
  fullName: prisoner?.fullName ?? "",
  nationalId: prisoner?.nationalId ?? "",
  gender:
    (prisoner?.gender as (typeof genderOptions)[number] | undefined) ?? "Male",
  dateOfBirth: prisoner?.dateOfBirth ?? "",
  admissionDate: prisoner?.admissionDate ?? "",
  status:
    (prisoner?.status as (typeof statusOptions)[number] | undefined) ??
    "Incarcerated",
  riskLevel:
    (prisoner?.riskLevel as (typeof riskOptions)[number] | undefined) ??
    "Medium",
  currentCellId: prisoner?.currentCellId,
  notes: prisoner?.notes ?? "",
});

export function usePrisonerForm({
  open,
  mode,
  prisoner,
  onClose,
}: UsePrisonerFormOptions) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const defaultValues = useMemo(() => getDefaultValues(prisoner), [prisoner]);

  const form = useForm<PrisonerFormValues, unknown, PrisonerFormValues>({
    resolver: zodResolver(prisonerFormSchema),
    defaultValues,
  });

  const { mutateAsync: createPrisoner, isPending: isCreating } =
    useCreatePrisoner();
  const { mutateAsync: updatePrisoner, isPending: isUpdating } =
    useUpdatePrisoner();

  useEffect(() => {
    if (open) {
      form.reset(defaultValues);
      setSubmitError(null);
    }
  }, [open, defaultValues, form]);

  const onSubmit = async (values: PrisonerFormValues) => {
    setSubmitError(null);
    const payload = { ...values, notes: values.notes ?? "" };

    try {
      if (mode === "create") {
        await createPrisoner(payload);
      } else if (prisoner) {
        await updatePrisoner({ id: prisoner.id, data: payload });
      }
      onClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to save prisoner";
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
