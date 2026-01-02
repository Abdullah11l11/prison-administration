// prisoner-form-dialog.tsx
import type { Prisoner } from "@/types";
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
  genderOptions,
  riskOptions,
  statusOptions,
} from "@/schema/prisoner-schema";
import { usePrisonerForm } from "@/hooks/use-prisoner-form";

interface PrisonerFormDialogProps {
  open: boolean;
  mode: "create" | "edit";
  prisoner: Prisoner | null;
  onClose: () => void;
}

export function PrisonerFormDialog({
  open,
  mode,
  prisoner,
  onClose,
}: PrisonerFormDialogProps) {
  const {
    register,
    handleSubmit,
    errors,
    submitError,
    isSubmitting,
    onSubmit,
  } = usePrisonerForm({ open, mode, prisoner, onClose });

  const title = mode === "create" ? "Add Prisoner" : "Update Prisoner";
  const description =
    mode === "create"
      ? "Add a new prisoner record to the system."
      : "Update the selected prisoner details.";

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
          className="space-y-4 max-h-[80vh]"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Prisoner ID" error={errors.prisonerId?.message}>
              <Input
                id="prisonerId"
                type="number"
                placeholder="Enter prisoner ID"
                inputMode="numeric"
                {...register("prisonerId", { valueAsNumber: true })}
                aria-invalid={!!errors.prisonerId}
              />
            </FormField>

            <FormField label="National ID" error={errors.nationalId?.message}>
              <Input
                id="nationalId"
                placeholder="e.g. P-100006"
                {...register("nationalId")}
                aria-invalid={!!errors.nationalId}
              />
            </FormField>

            <div className="sm:col-span-2">
              <FormField label="Full name" error={errors.fullName?.message}>
                <Input
                  id="fullName"
                  placeholder="Full name"
                  {...register("fullName")}
                  aria-invalid={!!errors.fullName}
                />
              </FormField>
            </div>

            <SelectField
              id="gender"
              label="Gender"
              options={genderOptions}
              error={errors.gender?.message}
              {...register("gender")}
              aria-invalid={!!errors.gender}
            />

            <SelectField
              id="riskLevel"
              label="Risk level"
              options={riskOptions}
              error={errors.riskLevel?.message}
              {...register("riskLevel")}
              aria-invalid={!!errors.riskLevel}
            />

            <FormField
              label="Date of birth"
              error={errors.dateOfBirth?.message}
            >
              <Input
                id="dateOfBirth"
                type="date"
                {...register("dateOfBirth")}
                aria-invalid={!!errors.dateOfBirth}
              />
            </FormField>

            <FormField
              label="Admission date"
              error={errors.admissionDate?.message}
            >
              <Input
                id="admissionDate"
                type="date"
                {...register("admissionDate")}
                aria-invalid={!!errors.admissionDate}
              />
            </FormField>

            <SelectField
              id="status"
              label="Status"
              options={statusOptions}
              error={errors.status?.message}
              {...register("status")}
              aria-invalid={!!errors.status}
            />

            <FormField
              label="Current cell"
              error={errors.currentCellId?.message}
            >
              <Input
                id="currentCellId"
                type="number"
                placeholder="e.g. 4"
                inputMode="numeric"
                {...register("currentCellId", { valueAsNumber: true })}
                aria-invalid={!!errors.currentCellId}
              />
            </FormField>

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
              {mode === "create" ? "Add prisoner" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
