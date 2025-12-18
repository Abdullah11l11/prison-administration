import { cn } from "@/lib/utils";
import type { UIProps } from "@/types";

export const CardContent = ({
  children,
  className,
  ...props
}: UIProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "border border-text-secondary/40 p-6 rounded-3xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }: UIProps) => {
  return (
    <h3
      className={cn("text-heading-h3 font-bold text-text-secondary", className)}
    >
      {children}
    </h3>
  );
};
