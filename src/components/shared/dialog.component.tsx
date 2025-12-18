import { FieldForm } from "@/components/shared/field.component";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { DialogProps, UIProps } from "@/types";
import type { FormEventHandler } from "react";

interface CustomDialogProps extends DialogProps, UIProps {
  submitButtonText: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const CustomDialog = ({
  title,
  description,
  children,
  className,
  button,
  submitButtonText,
  onSubmit,
  open,
  setOpen,
}: CustomDialogProps) => {
  const handleOpenChange = (value: boolean) => {
    if (setOpen) {
      setOpen(value);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {button && <DialogTrigger asChild>{button}</DialogTrigger>}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <FieldForm
          className={className}
          submitButtonText={submitButtonText}
          onSubmit={onSubmit}
        >
          {children}
        </FieldForm>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
