import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-text-primary-500 placeholder:text-text-secondary border-card-border/20 h-8.5 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-caption-small transition-[color,box-shadow,border] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-primary-500",
        "aria-invalid:border-error",
        className
      )}
      {...props}
    />
  );
}

export { Input };
