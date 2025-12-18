import SmallArrowIcon from "@/assets/icons/arrow.icon";
import { useMemo } from "react";
import { Button } from "../ui/button/button";

type PageSizeOption = number | "all";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  pageSize: PageSizeOption;
  pageSizeOptions?: PageSizeOption[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions = [10, 25, 100, "all"],
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const clampedCurrentPage = useMemo(
    () => Math.min(Math.max(currentPage, 1), totalPages || 1),
    [currentPage, totalPages]
  );

  const handlePrev = () => {
    if (clampedCurrentPage > 1) onPageChange(clampedCurrentPage - 1);
  };

  const handleNext = () => {
    if (clampedCurrentPage < totalPages) onPageChange(clampedCurrentPage + 1);
  };

  return (
    <div
      className="flex-between flex-col-reverse sm:flex-row gap-6 border-t border-card-border/20 px-4 py-3 text-xs  "
      dir="rtl"
    >
      {/* Right side: page navigation */}
      <div className="flex items-center gap-3">
        <div className="flex shadow-[inset_1px_-1px_9.9px_0px_#00000040] border border-primary-500 rounded-sm w-20 items-center px-2 h-5.5 py-1 justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={clampedCurrentPage === 1}
            className={
              clampedCurrentPage === 1
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-100 cursor-pointer"
            }
          >
            <SmallArrowIcon />
          </button>
          <span>{clampedCurrentPage}</span>
          <button
            type="button"
            onClick={handleNext}
            disabled={clampedCurrentPage === totalPages}
            className={
              clampedCurrentPage === totalPages || totalPages === 0
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-100 cursor-pointer"
            }
          >
            <SmallArrowIcon className="rotate-180" />
          </button>
        </div>
        <span className="text-text-primary-500 whitespace-nowrap">
          من <span className="inline-block mr-3">{totalPages || 1}</span>
        </span>
      </div>
      {/* Left side: rows per page */}
      <div className="flex items-center gap-2">
        <span className="ml-1 text-text-primary-500">صفوف في الصفحة</span>
        {pageSizeOptions.map((option) => {
          const isActive = option === pageSize;
          const label = option === "all" ? "الكل" : option.toString();

          return (
            <Button
              size={"icon"}
              key={label}
              className="w-fit! px-2"
              variant={isActive ? "default" : "secondary"}
              type="button"
              onClick={() => onPageSizeChange(option)}
            >
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
