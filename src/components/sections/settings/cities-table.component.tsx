import { type Column, Table } from "@/components/ui/table";
// import Pagination from "@/components/shared/pagination.component";
import ActionsMenu from "@/components/shared/actions-menu.component";
import SectionTitle from "@/components/shared/section-title.component";
import CityAddDialog from "./city-add-dialog.component";

const cities = [
  {
    id: "1",
    lastUpdated: "2024-10-22",
    country: "سوريا",
    cityName: "حلب",
  },
  {
    id: "2",
    lastUpdated: "2024-09-11",
    country: "سوريا",
    cityName: "حلب",
  },
  {
    id: "3",
    lastUpdated: "2024-08-02",
    country: "سوريا",
    cityName: "حلب",
  },
  {
    id: "4",
    lastUpdated: "2024-08-02",
    country: "سوريا",
    cityName: "حلب",
  },
  {
    id: "5",
    lastUpdated: "2024-09-11",
    country: "سوريا",
    cityName: "حلب",
  },
  {
    id: "6",
    lastUpdated: "2024-08-02",
    country: "سوريا",
    cityName: "حلب",
  },
  {
    id: "7",
    lastUpdated: "2024-08-02",
    country: "سوريا",
    cityName: "حلب",
  },
  {
    id: "8",
    lastUpdated: "2024-09-11",
    country: "سوريا",
    cityName: "حلب",
  },
  {
    id: "9",
    lastUpdated: "2024-08-02",
    country: "سوريا",
    cityName: "حلب",
  },
  {
    id: "10",
    lastUpdated: "2024-10-22",
    country: "سوريا",
    cityName: "حلب",
  },
  {
    id: "11",
    lastUpdated: "2024-10-22",
    country: "سوريا",
    cityName: "حلب",
  },
  {
    id: "12",
    lastUpdated: "2024-08-02",
    country: "سوريا",
    cityName: "حلب",
  },
  {
    id: "13",
    lastUpdated: "2024-09-11",
    country: "سوريا",
    cityName: "حلب",
  },
];

const columns: Column<(typeof cities)[0]>[] = [
  {
    key: "cityName",
    title: "اسم المدينة",
  },
  {
    key: "lastUpdated",
    title: "آخر تحديث",
  },

  {
    key: "__display",
    title: "",
    render: (row) => (
      <ActionsMenu
        showView={false}
        showEdit={false}
        title="حذف المدينة"
        description="هل أنت متأكد من حذف هذه المدينة ؟"
        onDelete={() => console.log("delete city", row.id)}
      />
    ),
  },
];

const CitiesTable = () => {
  return (
    <>
      <div className="flex-between mt-6.5 mb-4.5">
        <SectionTitle className="text-text-primary-500">المدن</SectionTitle>
        <CityAddDialog />
      </div>
      <Table columns={columns} data={cities} getRowKey={(row) => row.id} />

      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      /> */}
    </>
  );
};

export default CitiesTable;
