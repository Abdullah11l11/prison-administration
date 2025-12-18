import { useState, useMemo } from "react";
import { GetStatusBadge } from "@/components/shared/get-status-badge.util";
import Pagination from "@/components/shared/pagination.component";
import { type Column, Table } from "@/components/ui/table";
import ActionsMenu from "@/components/shared/actions-menu.component";

const accessoriesOrders = [
  {
    status: "قيد الانتظار",
    date: "Sun Dec 01 2024",
    price: "$50",
    accessoriesCount: 5,
    address: "المحافظة",
    phone: "449-466-8664",
    customer: "ابو فتحي",
    orderId: "GCABC92123",
  },
  {
    status: "قيد التسليم",
    date: "Sun Sep 21 2025",
    price: "$50",
    accessoriesCount: 12,
    address: "الفرقان",
    phone: "992-859-1963",
    customer: "ابو محمد",
    orderId: "GCABC92123",
  },
  {
    status: "تم التسليم",
    date: "Sun Aug 03 2025",
    price: "$50",
    accessoriesCount: 11,
    address: "المحافظة",
    phone: "919-363-5902",
    customer: "ابو احمد",
    orderId: "GCABC92123",
  },
  {
    status: "ملغي",
    date: "Wed Sep 03 2025",
    price: "$50",
    accessoriesCount: 14,
    address: "الفرقان",
    phone: "657-529-9138",
    customer: "ابو فتحي",
    orderId: "GCABC92123",
  },
  {
    status: "قيد الانتظار",
    date: "Sun Dec 01 2024",
    price: "$50",
    accessoriesCount: 14,
    address: "المحافظة",
    phone: "639-380-0514",
    customer: "ابو فتحي",
    orderId: "GCABC92123",
  },
  {
    status: "تتم الآن",
    date: "Wed Sep 03 2025",
    price: "$50",
    accessoriesCount: 8,
    address: "الفرقان",
    phone: "821-473-9938",
    customer: "ابو فتحي",
    orderId: "GCABC92123",
  },
  {
    status: "ملغي",
    date: "Wed Sep 03 2025",
    price: "$50",
    accessoriesCount: 4,
    address: "المحافظة",
    phone: "937-697-7999",
    customer: "ابو فتحي",
    orderId: "GCABC92123",
  },
  {
    status: "قيد الانتظار",
    date: "Sun Dec 01 2024",
    price: "$50",
    accessoriesCount: 9,
    address: "الفرقان",
    phone: "617-335-6130",
    customer: "ابو فتحي",
    orderId: "GCABC92123",
  },
  {
    status: "تتم الآن",
    date: "Wed Sep 03 2025",
    price: "$50",
    accessoriesCount: 7,
    address: "المحافظة",
    phone: "791-747-6345",
    customer: "ابو فتحي",
    orderId: "GCABC92123",
  },
  {
    status: "تم التسليم",
    date: "Sun Aug 03 2025",
    price: "$50",
    accessoriesCount: 56,
    address: "الفرقان",
    phone: "599-839-3371",
    customer: "ابو احمد",
    orderId: "GCABC92123",
  },
  {
    status: "ملغي",
    date: "Sun Aug 03 2025",
    price: "$50",
    accessoriesCount: 4,
    address: "المحافظة",
    phone: "872-348-2422",
    customer: "ابو احمد",
    orderId: "GCABC92123",
  },
  {
    status: "تم التسليم",
    date: "Sun Aug 03 2025",
    price: "$50",
    accessoriesCount: 3,
    address: "الفرقان",
    phone: "731-263-6708",
    customer: "ابو احمد",
    orderId: "GCABC92123",
  },
  {
    status: "قيد الانتظار",
    date: "Sun Dec 01 2024",
    price: "$50",
    accessoriesCount: 23,
    address: "الفرقان",
    phone: "501-298-3969",
    customer: "ابو فتحي",
    orderId: "GCABC92123",
  },
];

const columns: Column<(typeof accessoriesOrders)[0]>[] = [
  {
    key: "orderId",
    title: "رقم الطلب",
  },
  { key: "customer", title: "اسم الزبون" },
  { key: "phone", title: "رقم الهاتف" },
  { key: "address", title: "العنوان" },
  { key: "accessoriesCount", title: "عدد الإكسسوارات" },
  { key: "price", title: "السعر" },
  { key: "date", title: "تاريخ الطلب" },
  {
    key: "status",
    title: "الحالة",
    render: (row) => <GetStatusBadge status={row.status} />,
  },
  {
    key: "__display",
    title: "",
    render: (row) => (
      <ActionsMenu
        viewHref={`/accessory-orders/${row.orderId}`}
        title="حذف الطلب"
        description="هل انت متأكد من حذف هذا الطلب ؟"
        onDelete={() => console.log(row.orderId)}
        onEdit={() => console.log(row.orderId)}
      />
    ),
  },
];

const AccessoriesOrdersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | "all">(10);

  const totalPages = useMemo(() => {
    if (pageSize === "all") return 1;
    return Math.ceil(accessoriesOrders.length / pageSize);
  }, [pageSize]);

  const paginatedData = useMemo(() => {
    if (pageSize === "all") return accessoriesOrders;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return accessoriesOrders.slice(start, end);
  }, [currentPage, pageSize]);

  return (
    <>
      <Table
        columns={columns}
        data={paginatedData}
        getRowKey={(row) => row.orderId + row.date}
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

export default AccessoriesOrdersTable;
