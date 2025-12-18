import { useState, useMemo } from "react";
import { type Column, Table } from "@/components/ui/table";
import Pagination from "@/components/shared/pagination.component";
import { Switch } from "@/components/ui/switch";
import ActionsMenu from "@/components/shared/actions-menu.component";

const stations = [
  {
    id: "1",
    isActive: true,
    lastUpdated: "2024-10-22",
    phone: "449-466-8664",
    area: "المحافظة",
    city: "حلب",
    stationName: "أحمد الخطيب",
  },
  {
    id: "2",
    isActive: false,
    lastUpdated: "2024-09-11",
    phone: "992-859-1963",
    area: "العزيزية",
    city: "حلب",
    stationName: "أحمد الخطيب",
  },
  {
    id: "3",
    isActive: true,
    lastUpdated: "2024-08-02",
    phone: "919-363-5902",
    area: "الاكرمية",
    city: "حلب",
    stationName: "أحمد الخطيب",
  },
  {
    id: "4",
    isActive: true,
    lastUpdated: "2024-08-02",
    phone: "992-859-1963",
    area: "العزيزية",
    city: "حلب",
    stationName: "أحمد الخطيب",
  },
  {
    id: "5",
    isActive: false,
    lastUpdated: "2024-09-11",
    phone: "992-859-1963",
    area: "العزيزية",
    city: "حلب",
    stationName: "أحمد الخطيب",
  },
  {
    id: "6",
    isActive: true,
    lastUpdated: "2024-08-02",
    phone: "919-363-5902",
    area: "الاكرمية",
    city: "حلب",
    stationName: "أحمد الخطيب",
  },
  {
    id: "7",
    isActive: true,
    lastUpdated: "2024-08-02",
    phone: "992-859-1963",
    area: "العزيزية",
    city: "حلب",
    stationName: "أحمد الخطيب",
  },
  {
    id: "8",
    isActive: false,
    lastUpdated: "2024-09-11",
    phone: "919-363-5902",
    area: "الاكرمية",
    city: "حلب",
    stationName: "أحمد الخطيب",
  },
  {
    id: "9",
    isActive: true,
    lastUpdated: "2024-08-02",
    phone: "919-363-5902",
    area: "الاكرمية",
    city: "حلب",
    stationName: "أحمد الخطيب",
  },
  {
    id: "10",
    isActive: true,
    lastUpdated: "2024-10-22",
    phone: "449-466-8664",
    area: "المحافظة",
    city: "حلب",
    stationName: "أحمد الخطيب",
  },
  {
    id: "11",
    isActive: false,
    lastUpdated: "2024-10-22",
    phone: "449-466-8664",
    area: "المحافظة",
    city: "حلب",
    stationName: "أحمد الخطيب",
  },
  {
    id: "12",
    isActive: true,
    lastUpdated: "2024-08-02",
    phone: "992-859-1963",
    area: "المحافظة",
    city: "حلب",
    stationName: "أحمد الخطيب",
  },
  {
    id: "13",
    isActive: false,
    lastUpdated: "2024-09-11",
    phone: "992-859-1963",
    area: "المحافظة",
    city: "حلب",
    stationName: "أحمد الخطيب",
  },
];

type Station = (typeof stations)[0];

const columns: Column<Station>[] = [
  {
    key: "stationName",
    title: "اسم المحطة",
  },
  {
    key: "city",
    title: "المدينة",
  },
  {
    key: "area",
    title: "المناطق المخدمة",
  },
  {
    key: "phone",
    title: "رقم الهاتف",
  },
  {
    key: "lastUpdated",
    title: "آخر تحديث",
  },
  {
    key: "isActive",
    title: "الحالة",
    render: (row) => (
      <Switch
        defaultChecked={row.isActive}
        aria-label={`تغيير حالة المحطة ${row.stationName}`}
      />
    ),
  },

  {
    key: "__display",
    title: "",
    render: (row) => (
      <ActionsMenu
        viewHref={`stations/${row.id}`}
        title="حذف المحطة"
        description="هل أنت متأكد من حذف هذه المحطة ؟"
        onDelete={() => console.log("delete station", row.id)}
        onEdit={() => console.log("edit station", row.id)}
      />
    ),
  },
];

const StationsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | "all">(25);

  const totalPages = useMemo(() => {
    if (pageSize === "all") return 1;
    return Math.ceil(stations.length / pageSize);
  }, [pageSize]);

  const paginatedData = useMemo(() => {
    if (pageSize === "all") return stations;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return stations.slice(start, end);
  }, [currentPage, pageSize]);

  return (
    <>
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

export default StationsTable;
