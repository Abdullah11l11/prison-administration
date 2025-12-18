import { useMemo, useState } from "react";
import { type Column, Table } from "@/components/ui/table";
import Pagination from "@/components/shared/pagination.component";
import { Switch } from "@/components/ui/switch";
import ActionsMenu from "@/components/shared/actions-menu.component";
import { Button } from "@/components/ui/button/button";

const campaigns = [
  {
    id: "1",
    status: true,
    startDate: "2024-10-22",
    endDate: "2025-07-01",
    url: "evowash.com",
    name: "Evowash",
  },
  {
    id: "2",
    status: false,
    startDate: "2024-09-11",
    endDate: "2025-07-01",
    url: "evowash.com",
    name: "Evowash",
  },
  {
    id: "3",
    status: true,
    startDate: "2024-08-02",
    endDate: "2025-07-01",
    url: "evowash.com",
    name: "Evowash",
  },
  {
    id: "4",
    status: false,
    startDate: "2024-08-02",
    endDate: "2025-07-01",
    url: "evowash.com",
    name: "Evowash",
  },
  {
    id: "5",
    status: true,
    startDate: "2024-09-11",
    endDate: "2025-07-01",
    url: "evowash.com",
    name: "Evowash",
  },
  {
    id: "6",
    status: false,
    startDate: "2024-08-02",
    endDate: "2025-07-01",
    url: "evowash.com",
    name: "Evowash",
  },
  {
    id: "7",
    status: true,
    startDate: "2024-08-02",
    endDate: "2025-07-01",
    url: "evowash.com",
    name: "Evowash",
  },
  {
    id: "8",
    status: false,
    startDate: "2024-09-11",
    endDate: "2025-07-01",
    url: "evowash.com",
    name: "Evowash",
  },
  {
    id: "9",
    status: true,
    startDate: "2024-08-02",
    endDate: "2025-07-01",
    url: "evowash.com",
    name: "Evowash",
  },
  {
    id: "10",
    status: false,
    startDate: "2024-10-22",
    endDate: "2025-07-01",
    url: "evowash.com",
    name: "Evowash",
  },
  {
    id: "11",
    status: true,
    startDate: "2024-10-22",
    endDate: "2025-07-01",
    url: "evowash.com",
    name: "Evowash",
  },
  {
    id: "12",
    status: false,
    startDate: "2024-08-02",
    endDate: "2025-07-01",
    url: "evowash.com",
    name: "Evowash",
  },
  {
    id: "13",
    status: true,
    startDate: "2024-09-11",
    endDate: "2025-07-01",
    url: "evowash.com",
    name: "Evowash",
  },
];

type Campaign = (typeof campaigns)[0];

const columns: Column<Campaign>[] = [
  {
    key: "name",
    title: "اسم الحملة",
  },
  {
    key: "url",
    title: "الرابط",
    render: (row) => (
      <Button
        variant={"ghost"}
        to={row.url.startsWith("http") ? row.url : `https://${row.url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {row.url}
      </Button>
    ),
  },
  {
    key: "startDate",
    title: "تاريخ البداية",
  },
  {
    key: "endDate",
    title: "تاريخ الانتهاء",
  },
  {
    key: "status",
    title: "الحالة",
    render: (row) => (
      <Switch
        defaultChecked={row.status}
        aria-label={`تغيير حالة الحملة ${row.name}`}
      />
    ),
  },
  {
    key: "__display",
    title: "",
    render: (row) => (
      <ActionsMenu
        showView={false}
        title="حذف الإعلان"
        description="هل انت متأكد من حذف هذا الإعلان؟"
        onDelete={() => console.log(row.id)}
        showEdit={false}
      />
    ),
  },
];

const BannersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | "all">(10);

  const totalPages = useMemo(() => {
    if (pageSize === "all") return 1;
    return Math.ceil(campaigns.length / pageSize);
  }, [pageSize]);

  const paginatedData = useMemo(() => {
    if (pageSize === "all") return campaigns;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return campaigns.slice(start, end);
  }, [currentPage, pageSize]);

  return (
    <>
      <Table
        columns={columns}
        data={paginatedData}
        getRowKey={(row) => `${row.id}-${row.startDate}-${row.endDate}`}
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

export default BannersTable;
