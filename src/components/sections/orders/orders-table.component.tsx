import { useState, useMemo } from "react";
import EditDeleteMenu from "@/components/shared/actions-menu.component";
import { GetStatusBadge } from "@/components/shared/get-status-badge.util";
import Pagination from "@/components/shared/pagination.component";
import { type Column, Table } from "@/components/ui/table";

const orders = [
  {
    status: "قيد الانتظار",
    date: "Sun Dec 01 2024",
    paymentStatus: "مدفوع",
    price: "$50",
    service: "غسيل سيارة",
    address: "المحافظة",
    phone: "449-466-8664",
    customer: "ابو فتحي",
    orderId: "GCABC92123",
  },
  {
    status: "قيد التسليم",
    date: "Sun Sep 21 2025",
    paymentStatus: "غير مدفوع",
    price: "$50",
    service: "غسيل سيارة",
    address: "الفرقان",
    phone: "992-859-1963",
    customer: "ابو محمد",
    orderId: "GCABC92123",
  },
  {
    status: "تم التسليم",
    date: "Sun Aug 03 2025",
    paymentStatus: "مدفوع",
    price: "$50",
    service: "غسيل سيارة",
    address: "المحافظة",
    phone: "919-363-5902",
    customer: "ابو احمد",
    orderId: "GCABC92123",
  },
  {
    status: "تم التسليم",
    date: "Wed Sep 03 2025",
    paymentStatus: "غير مدفوع",
    price: "$50",
    service: "غسيل سيارة",
    address: "الفرقان",
    phone: "657-529-9138",
    customer: "ابو فتحي",
    orderId: "GCABC92123",
  },
  {
    status: "ملغي",
    date: "Sun Dec 01 2024",
    paymentStatus: "غير مدفوع",
    price: "$50",
    service: "غسيل سيارة",
    address: "المحافظة",
    phone: "639-380-0514",
    customer: "ابو فتحي",
    orderId: "GCABC92123",
  },
  {
    status: "تتم الآن",
    date: "Wed Sep 03 2025",
    paymentStatus: "مدفوع",
    price: "$50",
    service: "غسيل سيارة",
    address: "الفرقان",
    phone: "821-473-9938",
    customer: "ابو فتحي",
    orderId: "GCABC92123",
  },
  {
    status: "ملغي",
    date: "Wed Sep 03 2025",
    paymentStatus: "مدفوع",
    price: "$50",
    service: "غسيل سيارة",
    address: "المحافظة",
    phone: "937-697-7999",
    customer: "ابو فتحي",
    orderId: "GCABC92123",
  },
  {
    status: "قيد الانتظار",
    date: "Sun Dec 01 2024",
    paymentStatus: "غير مدفوع",
    price: "$50",
    service: "غسيل سيارة",
    address: "الفرقان",
    phone: "617-335-6130",
    customer: "ابو فتحي",
    orderId: "GCABC92123",
  },
  {
    status: "تتم الآن",
    date: "Wed Sep 03 2025",
    paymentStatus: "غير مدفوع",
    price: "$50",
    service: "غسيل سيارة",
    address: "المحافظة",
    phone: "791-747-6345",
    customer: "ابو فتحي",
    orderId: "GCABC92123",
  },
  {
    status: "تم التسليم",
    date: "Sun Aug 03 2025",
    paymentStatus: "مدفوع",
    price: "$50",
    service: "غسيل سيارة",
    address: "الفرقان",
    phone: "599-839-3371",
    customer: "ابو احمد",
    orderId: "GCABC92123",
  },
  {
    status: "تم التسليم",
    date: "Sun Aug 03 2025",
    paymentStatus: "غير مدفوع",
    price: "$50",
    service: "غسيل سيارة",
    address: "المحافظة",
    phone: "872-348-2422",
    customer: "ابو احمد",
    orderId: "GCABC92123",
  },
  {
    status: "تم التسليم",
    date: "Sun Aug 03 2025",
    paymentStatus: "مدفوع",
    price: "$50",
    service: "غسيل سيارة",
    address: "الفرقان",
    phone: "731-263-6708",
    customer: "ابو احمد",
    orderId: "GCABC92123",
  },
  {
    status: "قيد الانتظار",
    date: "Sun Dec 01 2024",
    paymentStatus: "غير مدفوع",
    price: "$50",
    service: "غسيل سيارة",
    address: "الفرقان",
    phone: "501-298-3969",
    customer: "ابو فتحي",
    orderId: "GCABC92123",
  },
];

const columns: Column<(typeof orders)[0]>[] = [
  {
    key: "orderId",
    title: "رقم الطلب",
  },
  { key: "customer", title: "اسم الزبون" },
  {
    key: "phone",
    title: "رقم الهاتف",
  },
  {
    key: "address",
    title: " العنوان",
  },
  { key: "service", title: "نوع الخدمة" },
  { key: "price", title: "السعر" },
  {
    key: "paymentStatus",
    title: "حالة الدفع",
    render: (row) => <GetStatusBadge status={row.paymentStatus} />,
  },
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
      <EditDeleteMenu
        viewHref={`orders/${row.orderId}`}
        title="حذف الطلب"
        description="هل انت متأكد من حذف هذا الطلب ؟"
        onDelete={() => console.log(row.orderId)}
        onEdit={() => console.log(row.orderId)}
      />
    ),
  },
];

const OrdersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | "all">(10);

  const totalPages = useMemo(() => {
    if (pageSize === "all") return 1;
    return Math.ceil(orders.length / pageSize);
  }, [pageSize]);

  const paginatedData = useMemo(() => {
    if (pageSize === "all") return orders;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return orders.slice(start, end);
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

export default OrdersTable;
