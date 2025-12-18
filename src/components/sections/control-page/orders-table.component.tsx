import ActionsMenu from "@/components/shared/actions-menu.component";
import { GetStatusBadge } from "@/components/shared/get-status-badge.util";
import SectionTitle from "@/components/shared/section-title.component";
import { type Column, Table } from "@/components/ui/table";

const orders = [
  {
    status: "قيد الانتظار",
    date: "Sun Dec 01 2024",
    price: "$50",
    service: "غسيل سيارة",
    customer: "ابو فتحي",
    orderId: "GCABC92123",
  },
  {
    status: "قيد التسليم",
    date: "Sun Sep 21 2025",
    price: "$50",
    service: "غسيل سيارة",
    customer: "ابو محمد",
    orderId: "GCABC92123",
  },
  {
    status: "تم التسليم",
    date: "Sun Aug 03 2025",
    price: "$50",
    service: "غسيل سيارة",
    customer: "ابو احمد",
    orderId: "GCABC92123",
  },
  {
    status: "تم التسليم",
    date: "Wed Sep 03 2025",
    price: "$50",
    service: "غسيل سيارة",
    customer: "ابو فتحي",
    orderId: "GCABC92123",
  },
  {
    status: "تم التسليم",
    date: "Wed Sep 03 2025",
    price: "$50",
    service: "غسيل سيارة",
    customer: "ابو فتحي",
    orderId: "GCABC92123",
  },
];

const columns: Column<(typeof orders)[0]>[] = [
  { key: "orderId", title: "رقم الطلب" },
  { key: "customer", title: "اسم الزبون" },
  { key: "service", title: "نوع الخدمة" },
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
        viewHref={`/orders/${row.orderId}`}
        title="حذف الطلب"
        description="هل انت متأكد من حذف هذا الطلب ؟"
        onDelete={() => console.log(row.orderId)}
        onEdit={() => console.log(row.orderId)}
      />
    ),
  },
];

const OrdersTable = () => {
  return (
    <div className=" sm:col-span-2 xl:col-span-4!">
      <SectionTitle>الطلبات</SectionTitle>
      <Table
        columns={columns}
        data={orders}
        getRowKey={(row) => row.orderId + row.date}
      />
    </div>
  );
};

export default OrdersTable;
