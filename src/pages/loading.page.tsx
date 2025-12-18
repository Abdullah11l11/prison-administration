import { CardContent } from "@/components/shared/card.component";

const Loading = () => {
  return (
    <div className="flex items-center min-h-[50vh] justify-center px-4 py-12">
      <CardContent className="w-full max-w-sm text-center border-card-border/20 bg-background shadow-[0_22px_80px_-50px_rgba(39,147,178,0.35)]">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full border-4 border-primary-100 border-t-primary-500 animate-spin" />
        <div className="mt-4 space-y-2">
          <p className="text-heading-h3 font-bold text-text-primary-500">
            جار التحميل ...
          </p>
        </div>
      </CardContent>
    </div>
  );
};

export default Loading;
