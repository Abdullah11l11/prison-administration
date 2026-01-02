import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { HealthRecord } from "@/types";
import {
  useCreateHealthRecord,
  useUpdateHealthRecord,
} from "@/features/health-records/hooks";
import {
  healthRecordFormSchema,
  healthRecordTypeOptions,
  healthStatusOptions,
  type HealthRecordFormValues,
} from "@/schema/health-record-schema";

interface UseHealthRecordFormOptions {
  open: boolean;
  mode: "create" | "edit";
  record: HealthRecord | null;
  onClose: () => void;
}

const getDefaultValues = (
  record: HealthRecord | null
): HealthRecordFormValues => ({
  healthRecordId: record?.healthRecordId ?? 0,
  prisonerId: record?.prisonerId ?? 0,
  recordType:
    (record?.recordType as (typeof healthRecordTypeOptions)[number]) ??
    "Checkup",
  recordDate: record?.recordDate ?? "",
  doctorId: record?.doctorId ?? 0,
  diagnosis: record?.diagnosis ?? "",
  treatment: record?.treatment ?? "",
  status:
    (record?.status as (typeof healthStatusOptions)[number]) ?? "Open",
  notes: record?.notes ?? "",
});

export function useHealthRecordForm({
  open,
  mode,
  record,
  onClose,
}: UseHealthRecordFormOptions) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const defaultValues = useMemo(() => getDefaultValues(record), [record]);

  const form = useForm<HealthRecordFormValues, unknown, HealthRecordFormValues>({
    resolver: zodResolver(healthRecordFormSchema),
    defaultValues,
  });

  const { mutateAsync: createRecord, isPending: isCreating } =
    useCreateHealthRecord();
  const { mutateAsync: updateRecord, isPending: isUpdating } =
    useUpdateHealthRecord();

  useEffect(() => {
    if (open) {
      form.reset(defaultValues);
      setSubmitError(null);
    }
  }, [open, defaultValues, form]);

  const onSubmit = async (values: HealthRecordFormValues) => {
    setSubmitError(null);
    const payload = { ...values, notes: values.notes ?? "" };

    try {
      if (mode === "create") {
        await createRecord(payload);
      } else if (record) {
        await updateRecord({ id: record.id, data: payload });
      }
      onClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to save health record";
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
