import type { Visit } from "@/types";
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
import { visitStatusOptions, visitTypeOptions } from "@/schema/visit-schema";
import { useVisitForm } from "@/hooks/use-visit-form";

interface VisitFormDialogProps {
  open: boolean;
  mode: "create" | "edit";
  visit: Visit | null;
  onClose: () => void;
}

export function VisitFormDialog({
  open,
  mode,
  visit,
  onClose,
}: VisitFormDialogProps) {
  const {
    register,
    handleSubmit,
    errors,
    submitError,
    isSubmitting,
    onSubmit,
  } = useVisitForm({ open, mode, visit, onClose });

  const title = mode === "create" ? "Add Visit" : "Update Visit";
  const description =
    mode === "create"
      ? "Schedule or log a new visit."
      : "Update the selected visit details.";

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
            <FormField label="Visit ID" error={errors.visitId?.message}>
              <Input
                id="visitId"
                type="number"
                inputMode="numeric"
                placeholder="Enter visit ID"
                {...register("visitId", { valueAsNumber: true })}
                aria-invalid={!!errors.visitId}
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

            <FormField label="Visitor ID" error={errors.visitorId?.message}>
              <Input
                id="visitorId"
                type="number"
                inputMode="numeric"
                placeholder="Visitor ID"
                {...register("visitorId", { valueAsNumber: true })}
                aria-invalid={!!errors.visitorId}
              />
            </FormField>

            <FormField label="Visit date" error={errors.visitDate?.message}>
              <Input
                id="visitDate"
                type="datetime-local"
                {...register("visitDate")}
                aria-invalid={!!errors.visitDate}
              />
            </FormField>

            <SelectField
              id="visitType"
              label="Visit type"
              options={visitTypeOptions}
              error={errors.visitType?.message}
              {...register("visitType")}
              aria-invalid={!!errors.visitType}
            />

            <SelectField
              id="status"
              label="Status"
              options={visitStatusOptions}
              error={errors.status?.message}
              {...register("status")}
              aria-invalid={!!errors.status}
            />

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
              {mode === "create" ? "Add visit" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
