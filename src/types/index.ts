import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { PropsWithChildren, ReactNode } from "react";

export interface UIProps extends PropsWithChildren {
  className?: string;
}

export type IconType = React.ComponentType<{ size?: number }>;

export interface DialogProps {
  button?: ReactNode;
  title: string;
  description: string;
}

export type InputProps = React.ComponentProps<typeof Input>;
type TextareaProps = React.ComponentProps<typeof Textarea>;

interface BaseFieldProps {
  label: string;
  error?: string;
}

interface InputFieldProps extends BaseFieldProps {
  asTextArea?: false;
  inputProps?: InputProps;
}

interface TextareaFieldProps extends BaseFieldProps {
  asTextArea: true;
  inputProps?: TextareaProps;
}

export type FieldProps = InputFieldProps | TextareaFieldProps;

export interface EditDialogProps<T> {
  isTable?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValues: T;
  onSubmit: (values: T) => void;
}
