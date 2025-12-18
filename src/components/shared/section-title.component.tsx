import { cn } from "@/lib/utils";
import type { UIProps } from "@/types";

const SectionTitle = ({ children, className }: UIProps) => {
  return (
    <h3
      className={cn(
        "text-heading-h3 mb-2.5 font-bold text-primary-500",
        className
      )}
    >
      {children}
    </h3>
  );
};

export default SectionTitle;
