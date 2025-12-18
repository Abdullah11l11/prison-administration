import { cn } from "@/lib/utils";
import type { FieldProps } from "@/types";
import { FieldErrorMessage, FieldLabel } from "./field.component";
import ImageFileInput from "./image-file-input.component";

const FieldFile = ({ label, inputProps, error }: FieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3 justify-between">
        <FieldLabel>{label}</FieldLabel>
        <ImageFileInput
          className={cn(
            "w-78!",
            error && "border-destructive text-destructive"
          )}
          {...inputProps}
        />
      </div>
      {error && <FieldErrorMessage error={error} />}
    </div>
  );
};

export default FieldFile;
