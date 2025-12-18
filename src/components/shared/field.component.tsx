import { cn } from "@/lib/utils";
import type { FieldProps, UIProps } from "@/types";
import { Input } from "../ui/input";
import React from "react";
import { Button } from "../ui/button/button";
import { Textarea } from "../ui/textarea";

interface FieldFormProps extends UIProps {
  submitButtonText: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

const FieldForm = ({
  onSubmit,
  submitButtonText,
  children,
  className,
}: FieldFormProps) => {
  return (
    <form className={cn("space-y-9.5", className)} onSubmit={onSubmit}>
      <div className="space-y-3">{children}</div>
      <div className="flex justify-end">
        <Button className="w-40">{submitButtonText}</Button>
      </div>
    </form>
  );
};

const Field = ({ label, inputProps, error, asTextArea }: FieldProps) => {
  const commonClassName = cn(
    "w-78",
    error && "border-destructive text-destructive",
    inputProps?.className
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3 justify-between">
        <FieldLabel>{label}</FieldLabel>

        {asTextArea ? (
          <Textarea {...inputProps} className={commonClassName} />
        ) : (
          <Input {...inputProps} className={commonClassName} />
        )}
      </div>
      {error && <FieldErrorMessage error={error} />}
    </div>
  );
};

const FieldLabel = ({ children, className }: UIProps) => {
  return (
    <label
      className={cn(
        "font-bold text-nowrap text-sm text-text-primary-500",
        className
      )}
    >
      {children}
    </label>
  );
};

const FieldErrorMessage = ({ error }: { error?: string }) => {
  return <p className="text-xs font-medium text-error px-1">{error}</p>;
};

export { FieldForm, Field, FieldLabel, FieldErrorMessage };
