import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-text-secondary resize-none border-card-border/20 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-caption-small transition-[color,box-shadow,border] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-primary-500",
        "aria-invalid:border-error",
        "min-h-20",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
