import SearchInput from "@/components/shared/search-input.component";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OrderFilterBar = () => {
  return (
    <div className="mb-6 flex-col sm:flex-row flex gap-4">
      <SearchInput className="mb-0" placeholder="ابحث عن الطلبات ..." />
      <div className="flex gap-4">
        <Select>
          <SelectTrigger size="sm" className="w-26">
            <SelectValue placeholder="نوع الخدمة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-20">
            <SelectValue placeholder="الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default OrderFilterBar;
