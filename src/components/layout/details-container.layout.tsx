import { cn } from "@/lib/utils";
import type { UIProps } from "@/types";

interface DetailsItemProps extends UIProps {
  title: string;
}

const DetailsContainer = ({ children, className }: UIProps) => {
  return (
    <div className={cn("max-w-4xl my-6 space-y-8.5", className)}>
      {children}
    </div>
  );
};

const DetailsContent = ({ children, className }: UIProps) => {
  return (
    <div
      className={cn(
        "grid divide-y m-4 last:border-b border-t *:border-background-125 sm:grid-cols-2",
        className
      )}
    >
      {children}
    </div>
  );
};

const DetailsHeader = ({ children, className }: UIProps) => {
  return (
    <h3
      className={cn(
        "font-bold text-heading-h3 text-text-primary-500",
        className
      )}
    >
      {children}
    </h3>
  );
};

const DetailsItem = ({ className, title, children }: DetailsItemProps) => {
  return (
    <div className={cn("space-y-1 text-body-small py-4 px-2", className)}>
      <h5 className="text-primary-hover">{title}</h5>
      <div className="text-text-primary-500 flex justify-between  items-center">
        {children}
      </div>
    </div>
  );
};

export { DetailsContainer, DetailsContent, DetailsHeader, DetailsItem };
