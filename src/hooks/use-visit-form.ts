import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Visit } from "@/types";
import { useCreateVisit, useUpdateVisit } from "@/features/visits/hooks";
import {
  visitFormSchema,
  visitStatusOptions,
  visitTypeOptions,
  type VisitFormValues,
} from "@/schema/visit-schema";

interface UseVisitFormOptions {
  open: boolean;
  mode: "create" | "edit";
  visit: Visit | null;
  onClose: () => void;
}

const getDefaultValues = (visit: Visit | null): VisitFormValues => ({
  visitId: visit?.visitId ?? 0,
  prisonerId: visit?.prisonerId ?? 0,
  visitorId: visit?.visitorId ?? 0,
  visitDate: visit?.visitDate ?? "",
  visitType:
    (visit?.visitType as (typeof visitTypeOptions)[number]) ?? "In-person",
  status:
    (visit?.status as (typeof visitStatusOptions)[number]) ?? "Scheduled",
  notes: visit?.notes ?? "",
});

export function useVisitForm({
  open,
  mode,
  visit,
  onClose,
}: UseVisitFormOptions) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const defaultValues = useMemo(() => getDefaultValues(visit), [visit]);

  const form = useForm<VisitFormValues, unknown, VisitFormValues>({
    resolver: zodResolver(visitFormSchema),
    defaultValues,
  });

  const { mutateAsync: createVisit, isPending: isCreating } = useCreateVisit();
  const { mutateAsync: updateVisit, isPending: isUpdating } =
    useUpdateVisit();

  useEffect(() => {
    if (open) {
      form.reset(defaultValues);
      setSubmitError(null);
    }
  }, [open, defaultValues, form]);

  const onSubmit = async (values: VisitFormValues) => {
    setSubmitError(null);
    const payload = { ...values, notes: values.notes ?? "" };

    try {
      if (mode === "create") {
        await createVisit(payload);
      } else if (visit) {
        await updateVisit({ id: visit.id, data: payload });
      }
      onClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to save visit";
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
