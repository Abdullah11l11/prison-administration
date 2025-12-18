import { Input } from "../ui/input";
import type { InputProps } from "@/types";
import { cn } from "@/lib/utils";

const SearchInput = ({ placeholder, className }: InputProps) => {
  return (
    <div className={cn("mb-6 flex gap-4", className)}>
      <Input type="search" placeholder={placeholder} className="sm:w-67" />
    </div>
  );
};

export default SearchInput;
