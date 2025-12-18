import { LocationIcon } from "@/assets";
import {
  DetailsContainer,
  DetailsContent,
  DetailsHeader,
  DetailsItem,
} from "@/components/layout/details-container.layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OrderInfo = () => {
  return (
    <DetailsContainer>
      <DetailsHeader>معلومات الطلب</DetailsHeader>
      <DetailsContent>
        <DetailsItem title="رقم الطلب">#12345</DetailsItem>
        <DetailsItem title="الحالة الحالية">
          <Select>
            <SelectTrigger variant="secondary" className="w-37">
              <SelectValue placeholder="الحالة الحالية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </DetailsItem>
        <DetailsItem title="المحطة المنفذة">
          <Select>
            <SelectTrigger variant="secondary" className="w-37">
              <SelectValue placeholder="المحطة المنفذة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </DetailsItem>
        <DetailsItem title="عنوان الطلب">
          <div className="flex-between w-full max-w-2xs">
            <p className="text-body-small underline">حلب- الفرقان</p>
            <LocationIcon />
          </div>
        </DetailsItem>
        <DetailsItem title=" اسم الزبون">أحمد الخطيب</DetailsItem>
        <DetailsItem title="رقم الهاتف">0501234567</DetailsItem>
        <DetailsItem title="السيارة">
          <p className="underline">تويوتا كامري 2021</p>
        </DetailsItem>
        <DetailsItem title="موديل هيكل السيارة">سيدان</DetailsItem>
        <DetailsItem title="موعد الغسلة">
          10:30 صباحًا – 11:15 صباحًا
        </DetailsItem>
        <DetailsItem title=" نوع الغسلة">غسيل شامل بالبخار</DetailsItem>
        <DetailsItem title="ملاحظات إضافية">
          يرجى الانتباه إلى الزجاج الأمامي أثناء الغسيل.
        </DetailsItem>
        <DetailsItem title="تاريخ الطلب">2025-11-12</DetailsItem>
        <DetailsItem title="موعد الغسلة">مجدول</DetailsItem>
      </DetailsContent>
    </DetailsContainer>
  );
};

export default OrderInfo;
