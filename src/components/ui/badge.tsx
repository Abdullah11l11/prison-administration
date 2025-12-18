import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded border text-xs font-medium w-21.5 h-7.5 whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        pending: "text-pending! border-text-secondary! bg-text-secondary/20!",
        "pending-delivery":
          "bg-primary-500/30 text-primary-500 border-primary-500!",
        done: "bg-done/20 text-done border-success!",
        canceled: "bg-error/20 text-error border-error!",
        "done-now": "text-gold border-gold! bg-gold/20",
      },
    },
    defaultVariants: {
      variant: "done",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
