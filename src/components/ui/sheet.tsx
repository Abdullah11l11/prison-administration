import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Sheet = ({ open, onClose, children }: SheetProps) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/80"
        onClick={onClose}
      />
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-50 h-full w-full gap-4 border-l bg-background p-6 shadow-lg transition ease-in-out sm:max-w-xl',
          'animate-in slide-in-from-right'
        )}
      >
        {children}
      </div>
    </>
  );
};

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-2 text-center sm:text-left', className)}
    {...props}
  />
);

const SheetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
));
SheetTitle.displayName = 'SheetTitle';

const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
SheetDescription.displayName = 'SheetDescription';

const SheetClose = ({ onClose }: { onClose: () => void }) => (
  <div className="absolute right-4 top-4">
    <Button
      variant="ghost"
      size="icon"
      onClick={onClose}
    >
      <X className="h-4 w-4" />
    </Button>
  </div>
);

export { Sheet, SheetHeader, SheetTitle, SheetDescription, SheetClose };
