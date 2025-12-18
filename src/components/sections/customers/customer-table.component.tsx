import { useState, useMemo } from "react";
import Pagination from "@/components/shared/pagination.component";
import { type Column, Table } from "@/components/ui/table";
import ActionsMenu from "@/components/shared/actions-menu.component";

const customers = [
  {
    id: "1",
    gender: "ذكر",
    phone: "449-466-8664",
    lastName: "الخطيب",
    firstName: "أحمد",
  },
  {
    id: "2",
    gender: "أنثى",
    phone: "992-859-1963",
    lastName: "العلي",
    firstName: "سارة",
  },
  {
    id: "3",
    gender: "ذكر",
    phone: "919-363-5902",
    lastName: "المصري",
    firstName: "نادر",
  },
  {
    id: "4",
    gender: "أنثى",
    phone: "992-859-1963",
    lastName: "العلي",
    firstName: "سارة",
  },
  {
    id: "5",
    gender: "أنثى",
    phone: "992-859-1963",
    lastName: "العلي",
    firstName: "سارة",
  },
  {
    id: "6",
    gender: "ذكر",
    phone: "919-363-5902",
    lastName: "المصري",
    firstName: "نادر",
  },
  {
    id: "7",
    gender: "أنثى",
    phone: "992-859-1963",
    lastName: "العلي",
    firstName: "سارة",
  },
  {
    id: "8",
    gender: "ذكر",
    phone: "919-363-5902",
    lastName: "المصري",
    firstName: "نادر",
  },
  {
    id: "9",
    gender: "ذكر",
    phone: "919-363-5902",
    lastName: "المصري",
    firstName: "نادر",
  },
  {
    id: "10",
    gender: "ذكر",
    phone: "449-466-8664",
    lastName: "الخطيب",
    firstName: "أحمد",
  },
  {
    id: "11",
    gender: "ذكر",
    phone: "449-466-8664",
    lastName: "الخطيب",
    firstName: "أحمد",
  },
  {
    id: "12",
    gender: "أنثى",
    phone: "992-859-1963",
    lastName: "العلي",
    firstName: "سارة",
  },
  {
    id: "13",
    gender: "أنثى",
    phone: "992-859-1963",
    lastName: "العلي",
    firstName: "سارة",
  },
];

const columns: Column<(typeof customers)[0]>[] = [
  {
    key: "firstName",
    title: "الاسم الأول",
  },
  {
    key: "lastName",
    title: "الاسم الأخير",
  },
  {
    key: "phone",
    title: "رقم الهاتف",
  },
  {
    key: "gender",
    title: "الجنس",
  },

  {
    key: "__display",
    title: "",
    render: (row) => (
      <ActionsMenu
        viewHref={`/customers/${row.id}`}
        title="حذف الزبون"
        description="هل أنت متأكد من حذف هذا الزبون ؟"
        onDelete={() => console.log("delete customer", row.id)}
        onEdit={() => console.log("edit customer", row.id)}
      />
    ),
  },
];

const CustomersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | "all">(25);

  const totalPages = useMemo(() => {
    if (pageSize === "all") return 1;
    return Math.ceil(customers.length / pageSize);
  }, [pageSize]);

  const paginatedData = useMemo(() => {
    if (pageSize === "all") return customers;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return customers.slice(start, end);
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

export default CustomersTable;
