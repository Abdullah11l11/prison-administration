import AccessoriesTable from "@/components/sections/accessory-orders/accessories-table.component";
import SearchInput from "@/components/shared/search-input.component";

const AccessoriesPage = () => {
  return (
    <>
      <SearchInput placeholder="Search accessories..." />
      <AccessoriesTable />
    </>
  );
};

export default AccessoriesPage;
