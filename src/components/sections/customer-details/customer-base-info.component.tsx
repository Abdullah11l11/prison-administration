import {
  DetailsContainer,
  DetailsContent,
  DetailsHeader,
  DetailsItem,
} from "@/components/layout/details-container.layout";
import CustomImage from "@/components/shared/custom-image.component";
import { Field } from "@/components/shared/field.component";
import { Button } from "@/components/ui/button/button";
import customerSkeleton from "@/assets/skeletons/customer-skeleton.png";

const CustomerBaseInfo = () => {
  return (
    <DetailsContainer>
      <DetailsHeader>صور العميل</DetailsHeader>
      <DetailsContent>
        <div className="flex py-4 border-b items-center gap-4">
          <p className="flex-1 text-body-small text-primary-hover">
            الصورة المصغرة
          </p>
          <CustomImage
            src={customerSkeleton}
            alt="customer"
            width={56}
            height={56}
            className="**:rounded-full"
          />
        </div>
        <div className="border-b" />
      </DetailsContent>
      <DetailsHeader>معلومات العميل</DetailsHeader>
      <DetailsContent>
        <DetailsItem title="الاسم الأول">أحمد</DetailsItem>
        <DetailsItem title="الاسم الاخير">الخطيب</DetailsItem>
        <DetailsItem title="رقم الهاتف">449-466-8664</DetailsItem>
        <DetailsItem className="border-b" title="الجنس">
          ذكر
        </DetailsItem>
      </DetailsContent>
      <DetailsHeader className="mb-3.5">تحديث كلمة المرور</DetailsHeader>
      <form className="flex gap-2.5 flex-col max-w-[562px] w-full">
        <Field
          label="كلمة المرور الجديدة"
          inputProps={{
            type: "password",
            placeholder: "ادخل كلمة المرور الجديدة",
          }}
        />
        <Field
          label="اعادة كلمة المرور الجديدة"
          inputProps={{
            type: "password",
            placeholder: "اعد ادخال كلمة المرور الجديدة",
          }}
        />
        <Button className="w-40 mt-9">تأكيد</Button>
      </form>
    </DetailsContainer>
  );
};

export default CustomerBaseInfo;
