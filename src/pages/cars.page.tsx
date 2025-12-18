import CarsTable from "@/components/sections/cars/cars-tables.component";
import SearchInput from "@/components/shared/search-input.component";

const CarsPage = () => {
  return (
    <>
      <SearchInput placeholder="ابحث عن السيارات ..." />
      <CarsTable />
    </>
  );
};

export default CarsPage;
