import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Incident } from "@/types";
import {
  useCreateIncident,
  useUpdateIncident,
} from "@/features/incidents/hooks";
import {
  incidentFormSchema,
  incidentSeverityOptions,
  incidentStatusOptions,
  type IncidentFormValues,
} from "@/schema/incident-schema";

interface UseIncidentFormOptions {
  open: boolean;
  mode: "create" | "edit";
  incident: Incident | null;
  onClose: () => void;
}

const getDefaultValues = (incident: Incident | null): IncidentFormValues => ({
  incidentId: incident?.incidentId ?? 0,
  prisonerId: incident?.prisonerId ?? 0,
  reportedByStaffId: incident?.reportedByStaffId ?? 0,
  incidentType: incident?.incidentType ?? "",
  incidentDate: incident?.incidentDate ?? "",
  description: incident?.description ?? "",
  severity:
    (incident?.severity as (typeof incidentSeverityOptions)[number]) ?? "Medium",
  actionTaken: incident?.actionTaken ?? "",
  status:
    (incident?.status as (typeof incidentStatusOptions)[number]) ?? "Open",
});

export function useIncidentForm({
  open,
  mode,
  incident,
  onClose,
}: UseIncidentFormOptions) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const defaultValues = useMemo(() => getDefaultValues(incident), [incident]);

  const form = useForm<IncidentFormValues, unknown, IncidentFormValues>({
    resolver: zodResolver(incidentFormSchema),
    defaultValues,
  });

  const { mutateAsync: createIncident, isPending: isCreating } =
    useCreateIncident();
  const { mutateAsync: updateIncident, isPending: isUpdating } =
    useUpdateIncident();

  useEffect(() => {
    if (open) {
      form.reset(defaultValues);
      setSubmitError(null);
    }
  }, [open, defaultValues, form]);

  const onSubmit = async (values: IncidentFormValues) => {
    setSubmitError(null);
    const payload = { ...values };

    try {
      if (mode === "create") {
        await createIncident(payload);
      } else if (incident) {
        await updateIncident({ id: incident.id, data: payload });
      }
      onClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to save incident";
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
