import {
  DetailsContainer,
  DetailsContent,
  DetailsHeader,
  DetailsItem,
} from "@/components/layout/details-container.layout";
import ImageFileInput from "@/components/shared/image-file-input.component";

const ServiceBaseInfo = () => {
  return (
    <DetailsContainer>
      <DetailsHeader>صور الخدمة</DetailsHeader>
      <DetailsContent>
        <DetailsItem title="الصورة المصغرة">
          <ImageFileInput className="**:border-none!" />
        </DetailsItem>
      </DetailsContent>
      <DetailsHeader>معلومات الخدمة</DetailsHeader>
      <DetailsContent className="sm:grid-cols-6">
        <DetailsItem className="sm:col-span-2!" title="رقم الخدمة">
          #12345
        </DetailsItem>
        <DetailsItem className="sm:col-span-2!" title="الاسم">
          ملمّع الزجاج الفاخر
        </DetailsItem>
        <DetailsItem className="sm:col-span-2!" title="الاسم بالإنكليزي">
          luxury glass polish
        </DetailsItem>
        <DetailsItem className="sm:col-span-3!" title="الوصف">
          <p>
            ملمّع زجاج يمنح شفافية ولمعان طويل الأمد، مناسب لجميع أنواع
            السيارات.
          </p>
        </DetailsItem>
        <DetailsItem className="sm:col-span-3!" title="الوصف بالإنكليزي">
          <p>
            Glass polish that provides long-lasting transparency and shine,
            suitable for all types of cars.
          </p>
        </DetailsItem>
      </DetailsContent>
    </DetailsContainer>
  );
};

export default ServiceBaseInfo;
