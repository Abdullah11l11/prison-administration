import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Document } from "@/types";
import {
  useCreateDocument,
  useUpdateDocument,
} from "@/features/documents/hooks";
import {
  documentFormSchema,
  documentTypeOptions,
  type DocumentFormValues,
} from "@/schema/document-schema";

interface UseDocumentFormOptions {
  open: boolean;
  mode: "create" | "edit";
  document: Document | null;
  onClose: () => void;
}

const getDefaultValues = (doc: Document | null): DocumentFormValues => ({
  documentId: doc?.documentId ?? 0,
  prisonerId: doc?.prisonerId ?? 0,
  caseId: doc?.caseId ?? 0,
  documentType:
    (doc?.documentType as (typeof documentTypeOptions)[number]) ?? "Sentence",
  filePath: doc?.filePath ?? "",
  uploadedBy: doc?.uploadedBy ?? 0,
  uploadedAt: doc?.uploadedAt ?? "",
  notes: doc?.notes ?? "",
});

export function useDocumentForm({
  open,
  mode,
  document,
  onClose,
}: UseDocumentFormOptions) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const defaultValues = useMemo(() => getDefaultValues(document), [document]);

  const form = useForm<DocumentFormValues, unknown, DocumentFormValues>({
    resolver: zodResolver(documentFormSchema),
    defaultValues,
  });

  const { mutateAsync: createDocument, isPending: isCreating } =
    useCreateDocument();
  const { mutateAsync: updateDocument, isPending: isUpdating } =
    useUpdateDocument();

  useEffect(() => {
    if (open) {
      form.reset(defaultValues);
      setSubmitError(null);
    }
  }, [open, defaultValues, form]);

  const onSubmit = async (values: DocumentFormValues) => {
    setSubmitError(null);
    const payload = { ...values, notes: values.notes ?? "" };

    try {
      if (mode === "create") {
        await createDocument(payload);
      } else if (document) {
        await updateDocument({ id: document.id, data: payload });
      }
      onClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to save document";
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
