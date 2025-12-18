import StationAddDialog from "@/components/sections/stations/station-add-dialog.component";
import StationsTable from "@/components/sections/stations/stations-table.component";
import SearchInput from "@/components/shared/search-input.component";

const StationsPage = () => {
  return (
    <>
      <div className="mb-6 flex-between my-4 gap-4">
        <SearchInput className="mb-0" placeholder="ابحث عن عملاء ..." />
        <StationAddDialog />
      </div>
      <StationsTable />
    </>
  );
};

export default StationsPage;
