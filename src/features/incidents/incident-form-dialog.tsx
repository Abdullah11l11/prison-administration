import type { Incident } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import FormField from "@/components/shared/form-field";
import SelectField from "@/components/shared/select-field";
import {
  incidentSeverityOptions,
  incidentStatusOptions,
} from "@/schema/incident-schema";
import { useIncidentForm } from "@/hooks/use-incident-form";

interface IncidentFormDialogProps {
  open: boolean;
  mode: "create" | "edit";
  incident: Incident | null;
  onClose: () => void;
}

export function IncidentFormDialog({
  open,
  mode,
  incident,
  onClose,
}: IncidentFormDialogProps) {
  const {
    register,
    handleSubmit,
    errors,
    submitError,
    isSubmitting,
    onSubmit,
  } = useIncidentForm({ open, mode, incident, onClose });

  const title = mode === "create" ? "Add Incident" : "Update Incident";
  const description =
    mode === "create"
      ? "Log a new incident."
      : "Update the selected incident details.";

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Incident ID" error={errors.incidentId?.message}>
              <Input
                id="incidentId"
                type="number"
                inputMode="numeric"
                placeholder="Enter incident ID"
                {...register("incidentId", { valueAsNumber: true })}
                aria-invalid={!!errors.incidentId}
              />
            </FormField>

            <FormField
              label="Prisoner ID"
              error={errors.prisonerId?.message}
            >
              <Input
                id="prisonerId"
                type="number"
                inputMode="numeric"
                placeholder="Prisoner ID"
                {...register("prisonerId", { valueAsNumber: true })}
                aria-invalid={!!errors.prisonerId}
              />
            </FormField>

            <FormField
              label="Reported by Staff ID"
              error={errors.reportedByStaffId?.message}
            >
              <Input
                id="reportedByStaffId"
                type="number"
                inputMode="numeric"
                placeholder="Reporter Staff ID"
                {...register("reportedByStaffId", { valueAsNumber: true })}
                aria-invalid={!!errors.reportedByStaffId}
              />
            </FormField>

            <FormField
              label="Incident type"
              error={errors.incidentType?.message}
            >
              <Input
                id="incidentType"
                placeholder="Incident type"
                {...register("incidentType")}
                aria-invalid={!!errors.incidentType}
              />
            </FormField>

            <FormField
              label="Incident date"
              error={errors.incidentDate?.message}
            >
              <Input
                id="incidentDate"
                type="datetime-local"
                {...register("incidentDate")}
                aria-invalid={!!errors.incidentDate}
              />
            </FormField>

            <SelectField
              id="severity"
              label="Severity"
              options={incidentSeverityOptions}
              error={errors.severity?.message}
              {...register("severity")}
              aria-invalid={!!errors.severity}
            />

            <SelectField
              id="status"
              label="Status"
              options={incidentStatusOptions}
              error={errors.status?.message}
              {...register("status")}
              aria-invalid={!!errors.status}
            />

            <div className="sm:col-span-2">
              <FormField label="Description" error={errors.description?.message}>
                <textarea
                  id="description"
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Describe the incident"
                  {...register("description")}
                />
              </FormField>
            </div>

            <div className="sm:col-span-2">
              <FormField label="Action taken" error={errors.actionTaken?.message}>
                <textarea
                  id="actionTaken"
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Actions taken in response"
                  {...register("actionTaken")}
                />
              </FormField>
            </div>
          </div>

          {submitError && (
            <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {submitError}
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
              )}
              {mode === "create" ? "Add incident" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
