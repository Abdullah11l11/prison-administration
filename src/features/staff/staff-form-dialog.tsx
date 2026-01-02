import type { Staff } from "@/types";
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
import { staffStatusOptions } from "@/schema/staff-schema";
import { useStaffForm } from "@/hooks/use-staff-form";

interface StaffFormDialogProps {
  open: boolean;
  mode: "create" | "edit";
  staff: Staff | null;
  onClose: () => void;
}

export function StaffFormDialog({
  open,
  mode,
  staff,
  onClose,
}: StaffFormDialogProps) {
  const {
    register,
    handleSubmit,
    errors,
    submitError,
    isSubmitting,
    onSubmit,
  } = useStaffForm({ open, mode, staff, onClose });

  const title = mode === "create" ? "Add Staff" : "Update Staff";
  const description =
    mode === "create"
      ? "Add a new staff member to the system."
      : "Update the selected staff member details.";

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
            <FormField label="Staff ID" error={errors.staffId?.message}>
              <Input
                id="staffId"
                type="number"
                placeholder="Enter staff ID"
                inputMode="numeric"
                {...register("staffId", { valueAsNumber: true })}
                aria-invalid={!!errors.staffId}
              />
            </FormField>

            <FormField label="National ID" error={errors.nationalId?.message}>
              <Input
                id="nationalId"
                placeholder="e.g. STF-0001"
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

            <FormField label="Position" error={errors.position?.message}>
              <Input
                id="position"
                placeholder="Position"
                {...register("position")}
                aria-invalid={!!errors.position}
              />
            </FormField>

            <FormField label="Phone" error={errors.phone?.message}>
              <Input
                id="phone"
                placeholder="+31-6-1000-0000"
                {...register("phone")}
                aria-invalid={!!errors.phone}
              />
            </FormField>

            <FormField label="Email" error={errors.email?.message}>
              <Input
                id="email"
                type="email"
                placeholder="name@prison.local"
                autoComplete="email"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
            </FormField>

            <SelectField
              id="status"
              label="Status"
              options={staffStatusOptions}
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
              {mode === "create" ? "Add staff" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
