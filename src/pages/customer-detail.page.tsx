import CustomerBaseInfo from "@/components/sections/customer-details/customer-base-info.component";
import CustomerCarsTable from "@/components/sections/customer-details/customer-cars-table.component";

const CustomerDetailsPage = () => {
  return (
    <>
      <CustomerBaseInfo />
      <CustomerCarsTable />
    </>
  );
};

export default CustomerDetailsPage;
