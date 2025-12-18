import { useState, useMemo } from "react";
import { type Column, Table } from "@/components/ui/table";
import Pagination from "@/components/shared/pagination.component";

const accessories = [
  {
    id: "1",
    total: "50.32 $",
    quantity: 20,
    price: "50.32 $",
    name: "رفراف سيارة",
    accessoryNumber: "#TR-2025",
  },
  {
    id: "2",
    total: "99.99 $",
    quantity: 15,
    price: "99.99 $",
    name: "مراية يمين",
    accessoryNumber: "#TR-2025",
  },
  {
    id: "3",
    total: "50.32 $",
    quantity: 2,
    price: "50.32 $",
    name: "معطر سيارات",
    accessoryNumber: "#TR-2025",
  },
  {
    id: "4",
    total: "50.32 $",
    quantity: 41,
    price: "50.32 $",
    name: "مراية يمين",
    accessoryNumber: "#TR-2025",
  },
  {
    id: "5",
    total: "200.00 $",
    quantity: 10,
    price: "200.00 $",
    name: "معطر سيارات",
    accessoryNumber: "#TR-2025",
  },
  {
    id: "6",
    total: "99.99 $",
    quantity: 9,
    price: "99.99 $",
    name: "رفراف سيارة",
    accessoryNumber: "#TR-2025",
  },
  {
    id: "7",
    total: "200.00 $",
    quantity: 45,
    price: "200.00 $",
    name: "مراية يمين",
    accessoryNumber: "#TR-2025",
  },
  {
    id: "8",
    total: "50.32 $",
    quantity: 22,
    price: "50.32 $",
    name: "رفراف سيارة",
    accessoryNumber: "#TR-2025",
  },
  {
    id: "9",
    total: "50.32 $",
    quantity: 12,
    price: "50.32 $",
    name: "مراية يمين",
    accessoryNumber: "#TR-2025",
  },
  {
    id: "10",
    total: "99.99 $",
    quantity: 13,
    price: "99.99 $",
    name: "معطر سيارات",
    accessoryNumber: "#TR-2025",
  },
];

const columns: Column<(typeof accessories)[0]>[] = [
  {
    key: "accessoryNumber",
    title: "رقم الاكسسوار",
  },
  {
    key: "name",
    title: "اسم الإكسسوار",
  },
  {
    key: "price",
    title: "السعر",
  },
  {
    key: "quantity",
    title: "الكمية",
  },
  {
    key: "total",
    title: "المجموع",
  },
];

const AccessoriesTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | "all">(25);

  const totalPages = useMemo(() => {
    if (pageSize === "all") return 1;
    return Math.ceil(accessories.length / pageSize);
  }, [pageSize]);

  const paginatedData = useMemo(() => {
    if (pageSize === "all") return accessories;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return accessories.slice(start, end);
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

export default AccessoriesTable;
