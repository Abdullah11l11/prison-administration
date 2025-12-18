import { useState, useMemo } from "react";
import { type Column, Table } from "@/components/ui/table";
import Pagination from "@/components/shared/pagination.component";
import ActionsMenu from "@/components/shared/actions-menu.component";
import SectionTitle from "@/components/shared/section-title.component";
import SectorAddDialog from "./sector-add-dialog.component";

const sectors = [
  {
    id: "1",
    lastUpdated: "2024-10-22",
    sectorName: "المحافظة",
    city: "حلب",
  },
  {
    id: "2",
    lastUpdated: "2024-09-11",
    sectorName: "المحافظة",
    city: "حلب",
  },
  {
    id: "3",
    lastUpdated: "2024-08-02",
    sectorName: "المحافظة",
    city: "حلب",
  },
  {
    id: "4",
    lastUpdated: "2024-08-02",
    sectorName: "المحافظة",
    city: "حلب",
  },
  {
    id: "5",
    lastUpdated: "2024-09-11",
    sectorName: "المحافظة",
    city: "حلب",
  },
  {
    id: "6",
    lastUpdated: "2024-08-02",
    sectorName: "حلب",
    city: "حلب",
  },
  {
    id: "7",
    lastUpdated: "2024-08-02",
    sectorName: "حلب",
    city: "حلب",
  },
  {
    id: "8",
    lastUpdated: "2024-09-11",
    sectorName: "حلب",
    city: "حلب",
  },
  {
    id: "9",
    lastUpdated: "2024-08-02",
    sectorName: "حلب",
    city: "حلب",
  },
  {
    id: "10",
    lastUpdated: "2024-10-22",
    sectorName: "حلب",
    city: "حلب",
  },
  {
    id: "11",
    lastUpdated: "2024-10-22",
    sectorName: "حلب",
    city: "حلب",
  },
  {
    id: "12",
    lastUpdated: "2024-08-02",
    sectorName: "حلب",
    city: "حلب",
  },
  {
    id: "13",
    lastUpdated: "2024-09-11",
    sectorName: "حلب",
    city: "حلب",
  },
];

const columns: Column<(typeof sectors)[0]>[] = [
  {
    key: "lastUpdated",
    title: "آخر تحديث",
  },
  {
    key: "sectorName",
    title: "اسم القطاع",
  },
  {
    key: "city",
    title: "المدينة",
  },
  {
    key: "__display",
    title: "",
    render: (row) => (
      <ActionsMenu
        showView={false}
        showEdit={false}
        title="حذف القطاع"
        description="هل أنت متأكد من حذف هذا القطاع ؟"
        onDelete={() => console.log("delete sector", row.id)}
      />
    ),
  },
];

const SectorsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | "all">(25);

  const totalPages = useMemo(() => {
    if (pageSize === "all") return 1;
    return Math.ceil(sectors.length / pageSize);
  }, [pageSize]);

  const paginatedData = useMemo(() => {
    if (pageSize === "all") return sectors;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return sectors.slice(start, end);
  }, [currentPage, pageSize]);

  return (
    <>
      <div className="flex-between mt-5 mb-4.5">
        <SectionTitle className="text-text-primary-500">القطاعات</SectionTitle>
        <SectorAddDialog />
      </div>
      <Table
        columns={columns}
        data={paginatedData}
        getRowKey={(row) => row.id}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />
    </>
  );
};

export default SectorsTable;
