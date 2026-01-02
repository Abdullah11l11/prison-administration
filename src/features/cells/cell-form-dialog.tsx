import type { Cell } from "@/types";
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
  cellTypeOptions,
  securityLevelOptions,
} from "@/schema/cell-schema";
import { useCellForm } from "@/hooks/use-cell-form";

interface CellFormDialogProps {
  open: boolean;
  mode: "create" | "edit";
  cell: Cell | null;
  onClose: () => void;
}

export function CellFormDialog({ open, mode, cell, onClose }: CellFormDialogProps) {
  const {
    register,
    handleSubmit,
    errors,
    submitError,
    isSubmitting,
    onSubmit,
  } = useCellForm({ open, mode, cell, onClose });

  const title = mode === "create" ? "Add Cell" : "Update Cell";
  const description =
    mode === "create"
      ? "Add a new cell to the facility."
      : "Update the selected cell details.";

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
            <FormField label="Cell ID" error={errors.cellId?.message}>
              <Input
                id="cellId"
                type="number"
                placeholder="Enter cell ID"
                inputMode="numeric"
                {...register("cellId", { valueAsNumber: true })}
                aria-invalid={!!errors.cellId}
              />
            </FormField>

            <FormField label="Block" error={errors.blockName?.message}>
              <Input
                id="blockName"
                placeholder="Block name"
                {...register("blockName")}
                aria-invalid={!!errors.blockName}
              />
            </FormField>

            <FormField label="Cell number" error={errors.cellNumber?.message}>
              <Input
                id="cellNumber"
                placeholder="e.g. A-101"
                {...register("cellNumber")}
                aria-invalid={!!errors.cellNumber}
              />
            </FormField>

            <SelectField
              id="securityLevel"
              label="Security level"
              options={securityLevelOptions}
              error={errors.securityLevel?.message}
              {...register("securityLevel")}
              aria-invalid={!!errors.securityLevel}
            />

            <SelectField
              id="cellType"
              label="Cell type"
              options={cellTypeOptions}
              error={errors.cellType?.message}
              {...register("cellType")}
              aria-invalid={!!errors.cellType}
            />

            <FormField label="Capacity" error={errors.capacity?.message}>
              <Input
                id="capacity"
                type="number"
                inputMode="numeric"
                min={1}
                {...register("capacity", { valueAsNumber: true })}
                aria-invalid={!!errors.capacity}
              />
            </FormField>

            <FormField
              label="Current occupancy"
              error={errors.currentOccupancy?.message}
            >
              <Input
                id="currentOccupancy"
                type="number"
                inputMode="numeric"
                min={0}
                {...register("currentOccupancy", { valueAsNumber: true })}
                aria-invalid={!!errors.currentOccupancy}
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
              {mode === "create" ? "Add cell" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
