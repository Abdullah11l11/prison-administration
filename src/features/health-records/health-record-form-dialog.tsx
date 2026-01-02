import type { HealthRecord } from "@/types";
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
  healthRecordTypeOptions,
  healthStatusOptions,
} from "@/schema/health-record-schema";
import { useHealthRecordForm } from "@/hooks/use-health-record-form";

interface HealthRecordFormDialogProps {
  open: boolean;
  mode: "create" | "edit";
  record: HealthRecord | null;
  onClose: () => void;
}

export function HealthRecordFormDialog({
  open,
  mode,
  record,
  onClose,
}: HealthRecordFormDialogProps) {
  const {
    register,
    handleSubmit,
    errors,
    submitError,
    isSubmitting,
    onSubmit,
  } = useHealthRecordForm({ open, mode, record, onClose });

  const title = mode === "create" ? "Add Health Record" : "Update Health Record";
  const description =
    mode === "create"
      ? "Add a new health record."
      : "Update the selected health record.";

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
            <FormField
              label="Record ID"
              error={errors.healthRecordId?.message}
            >
              <Input
                id="healthRecordId"
                type="number"
                inputMode="numeric"
                placeholder="Enter record ID"
                {...register("healthRecordId", { valueAsNumber: true })}
                aria-invalid={!!errors.healthRecordId}
              />
            </FormField>

            <FormField label="Prisoner ID" error={errors.prisonerId?.message}>
              <Input
                id="prisonerId"
                type="number"
                inputMode="numeric"
                placeholder="Prisoner ID"
                {...register("prisonerId", { valueAsNumber: true })}
                aria-invalid={!!errors.prisonerId}
              />
            </FormField>

            <SelectField
              id="recordType"
              label="Record type"
              options={healthRecordTypeOptions}
              error={errors.recordType?.message}
              {...register("recordType")}
              aria-invalid={!!errors.recordType}
            />

            <SelectField
              id="status"
              label="Status"
              options={healthStatusOptions}
              error={errors.status?.message}
              {...register("status")}
              aria-invalid={!!errors.status}
            />

            <FormField label="Record date" error={errors.recordDate?.message}>
              <Input
                id="recordDate"
                type="datetime-local"
                {...register("recordDate")}
                aria-invalid={!!errors.recordDate}
              />
            </FormField>

            <FormField label="Doctor ID" error={errors.doctorId?.message}>
              <Input
                id="doctorId"
                type="number"
                inputMode="numeric"
                placeholder="Doctor ID"
                {...register("doctorId", { valueAsNumber: true })}
                aria-invalid={!!errors.doctorId}
              />
            </FormField>

            <div className="sm:col-span-2">
              <FormField label="Diagnosis" error={errors.diagnosis?.message}>
                <Input
                  id="diagnosis"
                  placeholder="Diagnosis"
                  {...register("diagnosis")}
                  aria-invalid={!!errors.diagnosis}
                />
              </FormField>
            </div>

            <div className="sm:col-span-2">
              <FormField label="Treatment" error={errors.treatment?.message}>
                <Input
                  id="treatment"
                  placeholder="Treatment"
                  {...register("treatment")}
                  aria-invalid={!!errors.treatment}
                />
              </FormField>
            </div>

            <div className="sm:col-span-2">
              <FormField label="Notes" error={errors.notes?.message}>
                <textarea
                  id="notes"
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Additional context"
                  {...register("notes")}
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
              {mode === "create" ? "Add record" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
