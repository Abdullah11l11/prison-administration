import { useState, useMemo } from "react";
import { type Column, Table } from "@/components/ui/table";
import Pagination from "@/components/shared/pagination.component";
import SectionTitle from "@/components/shared/section-title.component";
import ActionsMenu from "@/components/shared/actions-menu.component";

const servicePrices = [
  {
    id: "1",
    price: "99.99 $",
    bodyType: "سيدان",
    serviceName: "غسيل خارجي",
  },
  {
    id: "2",
    price: "50.32 $",
    bodyType: "سيدان",
    serviceName: "غسيل خارجي",
  },
  {
    id: "3",
    price: "99.99 $",
    bodyType: "سيدان",
    serviceName: "غسيل خارجي",
  },
  {
    id: "4",
    price: "50.32 $",
    bodyType: "سيدان",
    serviceName: "غسيل خارجي",
  },
];

const columns: Column<(typeof servicePrices)[0]>[] = [
  {
    key: "price",
    title: "السعر",
  },
  {
    key: "bodyType",
    title: "نوع الهيكل",
  },
  {
    key: "serviceName",
    title: "اسم الخدمة",
  },
  {
    key: "__display",
    title: "",
    render: (row) => (
      <ActionsMenu
        showView={false}
        title="حذف السعر"
        description="هل أنت متأكد من حذف هذا السعر ؟"
        onDelete={() => console.log("delete price", row.id)}
        onEdit={() => console.log("edit price", row.id)}
      />
    ),
  },
];

const ServicePricesTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | "all">(10);

  const totalPages = useMemo(() => {
    if (pageSize === "all") return 1;
    return Math.ceil(servicePrices.length / pageSize);
  }, [pageSize]);

  const paginatedData = useMemo(() => {
    if (pageSize === "all") return servicePrices;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return servicePrices.slice(start, end);
  }, [currentPage, pageSize]);

  return (
    <>
      <SectionTitle className="text-text-primary-500 ">التسعير</SectionTitle>
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

export default ServicePricesTable;
