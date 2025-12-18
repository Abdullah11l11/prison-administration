import { CardContent } from "@/components/shared/card.component";
import { Button } from "@/components/ui/button/button";
import { AlertTriangle, RotateCcw } from "lucide-react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div
      className="flex items-center justify-center px-4 py-12"
      aria-live="assertive"
    >
      <CardContent className="w-full max-w-lg text-center border-card-border/25 bg-background shadow-[0_22px_80px_-55px_rgba(231,76,60,0.25)]">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-100 text-primary-500">
          <AlertTriangle className="size-7" aria-hidden />
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-heading-h3 font-bold text-text-primary-500">
            لقد حدث خطأ ما
          </p>
          <p className="text-body-small text-text-secondary">
            لم نتمكن من تحميل هذه الصفحة. يُرجى المحاولة مرة أخرى.{" "}
          </p>
          {error?.message ? (
            <p className="rounded-lg border border-card-border/30 bg-background-150/80 px-3 py-2 text-caption-small text-text-primary-800">
              {error.message}
            </p>
          ) : null}
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset} className="w-full sm:w-auto">
            <RotateCcw className="size-4" />
            Try again
          </Button>
        </div>
      </CardContent>
    </div>
  );
};

export default ErrorPage;
