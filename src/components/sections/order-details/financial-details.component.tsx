import {
  DetailsContainer,
  DetailsContent,
  DetailsHeader,
  DetailsItem,
} from "@/components/layout/details-container.layout";

const FinancialDetails = () => {
  return (
    <DetailsContainer>
      <DetailsHeader>التفاصيل المالية</DetailsHeader>
      <DetailsContent>
        <DetailsItem title="سعر الخدمة الأساسية">100$</DetailsItem>
        <DetailsItem title="رسوم إضافية">20$</DetailsItem>
        <DetailsItem className="col-span-2" title="خصم">
          10%
        </DetailsItem>
        <DetailsItem title="الإجمالي النهائي">90$</DetailsItem>
      </DetailsContent>
    </DetailsContainer>
  );
};

export default FinancialDetails;
