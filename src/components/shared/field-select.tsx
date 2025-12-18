import { cn } from "@/lib/utils";
import type { UIProps } from "@/types";
import { FieldErrorMessage, FieldLabel } from "./field.component";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FieldSelectProps extends UIProps {
  label: string;
  error?: string;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const FieldSelect = ({
  label,
  error,
  placeholder,
  value,
  onValueChange,
  children,
  className,
}: FieldSelectProps) => {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-center gap-3 justify-between">
        <FieldLabel>{label}</FieldLabel>

        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger
            className={cn(
              "w-78",
              error && "border-destructive text-destructive"
            )}
            aria-invalid={!!error}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent>{children}</SelectContent>
        </Select>
      </div>

      {error && <FieldErrorMessage error={error} />}
    </div>
  );
};

export default FieldSelect;
