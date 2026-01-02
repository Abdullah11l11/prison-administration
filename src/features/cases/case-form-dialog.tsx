import type { Case } from "@/types";
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
import { caseStatusOptions } from "@/schema/case-schema";
import { useCaseForm } from "@/hooks/use-case-form";

interface CaseFormDialogProps {
  open: boolean;
  mode: "create" | "edit";
  currentCase: Case | null;
  onClose: () => void;
}

export function CaseFormDialog({
  open,
  mode,
  currentCase,
  onClose,
}: CaseFormDialogProps) {
  const {
    register,
    handleSubmit,
    errors,
    submitError,
    isSubmitting,
    onSubmit,
  } = useCaseForm({ open, mode, currentCase, onClose });

  const title = mode === "create" ? "Add Case" : "Update Case";
  const description =
    mode === "create"
      ? "Add a new legal case to the system."
      : "Update the selected case details.";

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
            <FormField label="Case ID" error={errors.caseId?.message}>
              <Input
                id="caseId"
                type="number"
                inputMode="numeric"
                placeholder="Enter case ID"
                {...register("caseId", { valueAsNumber: true })}
                aria-invalid={!!errors.caseId}
              />
            </FormField>

            <FormField
              label="Case number"
              error={errors.caseNumber?.message}
            >
              <Input
                id="caseNumber"
                placeholder="e.g. C-2025-0108"
                {...register("caseNumber")}
                aria-invalid={!!errors.caseNumber}
              />
            </FormField>

            <FormField label="Court name" error={errors.courtName?.message}>
              <Input
                id="courtName"
                placeholder="Court name"
                {...register("courtName")}
                aria-invalid={!!errors.courtName}
              />
            </FormField>

            <FormField label="Case type" error={errors.caseType?.message}>
              <Input
                id="caseType"
                placeholder="Case type"
                {...register("caseType")}
                aria-invalid={!!errors.caseType}
              />
            </FormField>

            <SelectField
              id="status"
              label="Status"
              options={caseStatusOptions}
              error={errors.status?.message}
              {...register("status")}
              aria-invalid={!!errors.status}
            />

            <FormField label="Open date" error={errors.openDate?.message}>
              <Input
                id="openDate"
                type="date"
                {...register("openDate")}
                aria-invalid={!!errors.openDate}
              />
            </FormField>

            <FormField label="Close date" error={errors.closeDate?.message}>
              <Input
                id="closeDate"
                type="date"
                {...register("closeDate")}
                aria-invalid={!!errors.closeDate}
              />
            </FormField>
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
              {mode === "create" ? "Add case" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
