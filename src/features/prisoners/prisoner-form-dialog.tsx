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
import { useCells } from "@/features/cells/hooks";

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
  const { data: cells, isLoading: cellsLoading } = useCells();
  const hasAvailableCell =
    cells?.some((cell) => cell.currentOccupancy < cell.capacity) ?? false;
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
              <select
                id="currentCellId"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register("currentCellId", { valueAsNumber: true })}
                aria-invalid={!!errors.currentCellId}
                disabled={cellsLoading || !cells?.length}
              >
                {cells?.map((cell) => {
                  const isFull = cell.currentOccupancy >= cell.capacity;
                  const isCurrent = prisoner?.currentCellId === cell.cellId;
                  const label = `${cell.cellNumber} (Block ${cell.blockName}) - ${cell.currentOccupancy}/${cell.capacity}${isFull ? " Full" : ""}`;
                  return (
                    <option
                      key={cell.id}
                      value={cell.cellId}
                      disabled={isFull && !isCurrent}
                    >
                      {label}
                    </option>
                  );
                })}
              </select>
              {!cellsLoading && !cells?.length && (
                <p className="text-sm text-destructive">No cells available.</p>
              )}
              {!cellsLoading && !hasAvailableCell && mode === "create" && (
                <p className="text-sm text-destructive">
                  No cells have capacity. Add capacity before assigning a prisoner.
                </p>
              )}
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
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                (!cellsLoading && mode === "create" && !hasAvailableCell)
              }
            >
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
