import { CardContent } from "@/components/shared/card.component";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UIProps } from "@/types";

const AccessoryOrderBox = ({
  title,
  children,
}: UIProps & { title: string }) => {
  return (
    <div className="text-body-small text-text-primary-500">
      <p className="text-caption-small text-card-border">{title}</p>
      {children}
    </div>
  );
};

const AccessoryOrderBaseInfo = () => {
  return (
    <CardContent className="grid my-9 rounded-md gap-6 sm:grid-cols-5 *:space-y-4 justify-between">
      <AccessoryOrderBox title="رقم الطلب">
        <p className="text-body-small text-text-primary-600">GCABC92123</p>
      </AccessoryOrderBox>
      <AccessoryOrderBox title="المحطة">
        <Select>
          <SelectTrigger
            size="sm"
            variant="ghost"
            className="w-24 h-fit! **:text-body-small"
          >
            <SelectValue placeholder="اختر المحطة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </AccessoryOrderBox>
      <AccessoryOrderBox title="عدد الاكسسوارات">
        <p>10</p>
      </AccessoryOrderBox>
      <AccessoryOrderBox title="اسم الزبون">
        <p>الكبتن سمير</p>
      </AccessoryOrderBox>
      <AccessoryOrderBox title="تاريخ الطلب">
        <p>Sun Dec 01 2024 </p>
      </AccessoryOrderBox>
      <AccessoryOrderBox title="السعر الأجمالي">
        <p>99.99 $</p>
      </AccessoryOrderBox>
      <AccessoryOrderBox title="الحالة">
        <Select>
          <SelectTrigger
            size="sm"
            variant="ghost"
            className="w-24 h-fit! **:text-body-small"
          >
            <SelectValue placeholder="اختر الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </AccessoryOrderBox>
      <AccessoryOrderBox title="القطاع">
        <p>الحمدانية</p>
      </AccessoryOrderBox>
      <AccessoryOrderBox title="منطقة التوصيل">
        <p>دوار ما</p>
      </AccessoryOrderBox>
    </CardContent>
  );
};

export default AccessoryOrderBaseInfo;
