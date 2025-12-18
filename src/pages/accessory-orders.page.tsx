import AccessoriesOrdersTable from "@/components/sections/accessory-orders/accessories-orders-table.component";
import SearchInput from "@/components/shared/search-input.component";

const AccessoryPage = () => {
  return (
    <>
      <SearchInput placeholder="ابحث عن الطلبات ..." />
      <AccessoriesOrdersTable />
    </>
  );
};

export default AccessoryPage;
