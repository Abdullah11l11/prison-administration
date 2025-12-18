import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer rounded text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-background hover:bg-primary-hover",
        secondary: "bg-background-150 text-text-muted border-text-muted",
        outline:
          "bg-transparent border border-card-border/20 hover:bg-card-border/20 ",
        cancel:
          "bg-transparent border border-text-primary-500 text-text-primary-500 hover:bg-text-primary-500/20 ",
        ghost: "",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded gap-1.5 px-4 has-[>svg]:px-2.5",
        lg: "h-11 rounded px-3 has-[>svg]:px-3",
        icon: "size-8 p-1",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
