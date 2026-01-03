import type { Document } from "@/types";
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
import { documentTypeOptions } from "@/schema/document-schema";
import { useDocumentForm } from "@/hooks/use-document-form";

interface DocumentFormDialogProps {
  open: boolean;
  mode: "create" | "edit";
  document: Document | null;
  onClose: () => void;
}

export function DocumentFormDialog({
  open,
  mode,
  document,
  onClose,
}: DocumentFormDialogProps) {
  const {
    register,
    handleSubmit,
    errors,
    submitError,
    isSubmitting,
    onSubmit,
  } = useDocumentForm({ open, mode, document, onClose });

  const title = mode === "create" ? "Add Document" : "Update Document";
  const description =
    mode === "create"
      ? "Add a new document record."
      : "Update the selected document.";

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
            <FormField label="Document ID" error={errors.documentId?.message}>
              <Input
                id="documentId"
                type="number"
                inputMode="numeric"
                placeholder="Enter document ID"
                {...register("documentId", { valueAsNumber: true })}
                aria-invalid={!!errors.documentId}
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

            <FormField label="Case ID" error={errors.caseId?.message}>
              <Input
                id="caseId"
                type="number"
                inputMode="numeric"
                placeholder="Case ID"
                {...register("caseId", { valueAsNumber: true })}
                aria-invalid={!!errors.caseId}
              />
            </FormField>

            <SelectField
              id="documentType"
              label="Document type"
              options={documentTypeOptions}
              error={errors.documentType?.message}
              {...register("documentType")}
              aria-invalid={!!errors.documentType}
            />

            <div className="sm:col-span-2">
              <FormField label="File path" error={errors.filePath?.message}>
                <Input
                  id="filePath"
                  placeholder="/files/documents/..."
                  {...register("filePath")}
                  aria-invalid={!!errors.filePath}
                />
              </FormField>
            </div>

            <FormField label="Uploaded by" error={errors.uploadedBy?.message}>
              <Input
                id="uploadedBy"
                type="number"
                inputMode="numeric"
                placeholder="Uploader staff ID"
                {...register("uploadedBy", { valueAsNumber: true })}
                aria-invalid={!!errors.uploadedBy}
              />
            </FormField>

            <FormField label="Uploaded at" error={errors.uploadedAt?.message}>
              <Input
                id="uploadedAt"
                type="datetime-local"
                {...register("uploadedAt")}
                aria-invalid={!!errors.uploadedAt}
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
              {mode === "create" ? "Add document" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
