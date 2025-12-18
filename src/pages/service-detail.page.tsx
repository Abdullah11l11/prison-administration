import ServiceBaseInfo from "@/components/sections/service-details/service-base-info-component";
import ServicePricesTable from "@/components/sections/service-details/services-pricing-table.component";

const ServiceDetailsPage = () => {
  return (
    <>
      <ServiceBaseInfo />
      <ServicePricesTable />
    </>
  );
};

export default ServiceDetailsPage;
