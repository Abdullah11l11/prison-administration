import ServiceAddDialog from "@/components/sections/services/service-add-dialog.component";
import ServicesTable from "@/components/sections/services/services-table.component";
import SearchInput from "@/components/shared/search-input.component";

const ServicesPage = () => {
  return (
    <>
      <div className="flex-between mb-6">
        <SearchInput className="mb-0" placeholder="ابحث عن الخدمات ..." />
        <ServiceAddDialog />
      </div>
      <ServicesTable />
    </>
  );
};

export default ServicesPage;
