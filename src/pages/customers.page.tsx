import CustomerAddDialog from "@/components/sections/customers/customer-add-dialog.component";
import CustomersTable from "@/components/sections/customers/customer-table.component";
import SearchInput from "@/components/shared/search-input.component";

const CustomersPage = () => {
  return (
    <>
      <div className="mb-6 flex-between my-4 gap-4">
        <SearchInput className="mb-0" placeholder="ابحث عن عملاء ..." />
        <CustomerAddDialog />
      </div>
      <CustomersTable />
    </>
  );
};

export default CustomersPage;
