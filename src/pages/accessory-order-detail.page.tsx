import AccessoryOrderBaseInfo from "@/components/sections/accessory-order-details/accessory-order-base-info.component";
import AccessoriesTable from "@/components/sections/accessory-orders/accessories-table.component";

const AccessoryOrderDetailsPage = () => {
  return (
    <>
      <AccessoryOrderBaseInfo />
      <AccessoriesTable />
    </>
  );
};

export default AccessoryOrderDetailsPage;
