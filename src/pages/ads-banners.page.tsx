import BannerAddDialog from "@/components/sections/banners/banner-add-dialog.component";
import BannersStatsSummary from "@/components/sections/banners/banners-stats-summary.component";
import BannersTable from "@/components/sections/banners/banners-table.component";
import SearchInput from "@/components/shared/search-input.component";

const BannersPage = () => {
  return (
    <>
      <BannersStatsSummary />
      <div className="mb-6 flex-between my-4 gap-4">
        <SearchInput className="mb-0" placeholder="ابحث عن الاعلانات ..." />
        <BannerAddDialog />
      </div>
      <BannersTable />
    </>
  );
};

export default BannersPage;
