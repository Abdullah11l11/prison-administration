import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Case as CaseType } from "@/types";
import { useCreateCase, useUpdateCase } from "@/features/cases/hooks";
import {
  caseFormSchema,
  caseStatusOptions,
  type CaseFormValues,
} from "@/schema/case-schema";

interface UseCaseFormOptions {
  open: boolean;
  mode: "create" | "edit";
  currentCase: CaseType | null;
  onClose: () => void;
}

const getDefaultValues = (c: CaseType | null): CaseFormValues => ({
  caseId: c?.caseId ?? 0,
  caseNumber: c?.caseNumber ?? "",
  courtName: c?.courtName ?? "",
  caseType: c?.caseType ?? "",
  status: (c?.status as (typeof caseStatusOptions)[number]) ?? "Open",
  openDate: c?.openDate ?? "",
  closeDate: c?.closeDate ?? "",
});

export function useCaseForm({
  open,
  mode,
  currentCase,
  onClose,
}: UseCaseFormOptions) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const defaultValues = useMemo(
    () => getDefaultValues(currentCase),
    [currentCase]
  );

  const form = useForm<CaseFormValues, unknown, CaseFormValues>({
    resolver: zodResolver(caseFormSchema),
    defaultValues,
  });

  const { mutateAsync: createCase, isPending: isCreating } = useCreateCase();
  const { mutateAsync: updateCase, isPending: isUpdating } = useUpdateCase();

  useEffect(() => {
    if (open) {
      form.reset(defaultValues);
      setSubmitError(null);
    }
  }, [open, defaultValues, form]);

  const onSubmit = async (values: CaseFormValues) => {
    setSubmitError(null);
    const payload: Omit<CaseType, "id"> = {
      ...values,
      closeDate: values.closeDate ? values.closeDate : null,
    };

    try {
      if (mode === "create") {
        await createCase(payload);
      } else if (currentCase) {
        await updateCase({ id: currentCase.id, data: payload });
      }
      onClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to save case";
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
