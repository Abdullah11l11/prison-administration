import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Cell } from "@/types";
import { useCreateCell, useUpdateCell } from "@/features/cells/hooks";
import {
  cellFormSchema,
  cellTypeOptions,
  securityLevelOptions,
  type CellFormValues,
} from "@/schema/cell-schema";

interface UseCellFormOptions {
  open: boolean;
  mode: "create" | "edit";
  cell: Cell | null;
  onClose: () => void;
}

const getDefaultValues = (cell: Cell | null): CellFormValues => ({
  cellId: cell?.cellId ?? 0,
  blockName: cell?.blockName ?? "",
  securityLevel:
    (cell?.securityLevel as (typeof securityLevelOptions)[number]) ?? "Medium",
  cellNumber: cell?.cellNumber ?? "",
  capacity: cell?.capacity ?? 1,
  currentOccupancy: cell?.currentOccupancy ?? 0,
  cellType: (cell?.cellType as (typeof cellTypeOptions)[number]) ?? "Standard",
  notes: cell?.notes ?? "",
});

export function useCellForm({ open, mode, cell, onClose }: UseCellFormOptions) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const defaultValues = useMemo(() => getDefaultValues(cell), [cell]);

  const form = useForm<CellFormValues, unknown, CellFormValues>({
    resolver: zodResolver(cellFormSchema),
    defaultValues,
  });

  const { mutateAsync: createCell, isPending: isCreating } = useCreateCell();
  const { mutateAsync: updateCell, isPending: isUpdating } = useUpdateCell();

  useEffect(() => {
    if (open) {
      form.reset(defaultValues);
      setSubmitError(null);
    }
  }, [open, defaultValues, form]);

  const onSubmit = async (values: CellFormValues) => {
    setSubmitError(null);
    const payload = { ...values, notes: values.notes ?? "" };

    try {
      if (mode === "create") {
        await createCell(payload);
      } else if (cell) {
        await updateCell({ id: cell.id, data: payload });
      }
      onClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to save cell";
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
