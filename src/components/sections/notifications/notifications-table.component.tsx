import { useState, useMemo } from "react";
import { type Column, Table } from "@/components/ui/table";
import Pagination from "@/components/shared/pagination.component";
import ActionsMenu from "@/components/shared/actions-menu.component";

const notifications = [
  {
    id: "1",
    date: "2024-10-22",
    text: "استمتع بخصم 20% على غسيل سيارتك هذا الأسبوع فقط!",
    title: "خصم 20% هذا الأسبوع",
  },
  {
    id: "2",
    date: "2024-09-11",
    text: "تم إصدار نسخة جديدة من تطبيق Evowash",
    title: "تحديث التطبيق",
  },
  {
    id: "3",
    date: "2024-08-02",
    text: "استمتع بخصم 20% على غسيل سيارتك هذا الأسبوع فقط!",
    title: "خصم 20% هذا الأسبوع",
  },
  {
    id: "4",
    date: "2024-08-02",
    text: "استمتع بخصم 20% على غسيل سيارتك هذا الأسبوع فقط!",
    title: "خصم 20% هذا الأسبوع",
  },
  {
    id: "5",
    date: "2024-09-11",
    text: "تم إصدار نسخة جديدة من تطبيق Evowash",
    title: "تحديث التطبيق",
  },
  {
    id: "6",
    date: "2024-08-02",
    text: "استمتع بخصم 20% على غسيل سيارتك هذا الأسبوع فقط!",
    title: "خصم 20% هذا الأسبوع",
  },
  {
    id: "7",
    date: "2024-08-02",
    text: "استمتع بخصم 20% على غسيل سيارتك هذا الأسبوع فقط!",
    title: "خصم 20% هذا الأسبوع",
  },
  {
    id: "8",
    date: "2024-09-11",
    text: "تم إصدار نسخة جديدة من تطبيق Evowash",
    title: "تحديث التطبيق",
  },
  {
    id: "9",
    date: "2024-08-02",
    text: "استمتع بخصم 20% على غسيل سيارتك هذا الأسبوع فقط!",
    title: "خصم 20% هذا الأسبوع",
  },
  {
    id: "10",
    date: "2024-10-22",
    text: "استمتع بخصم 20% على غسيل سيارتك هذا الأسبوع فقط!",
    title: "خصم 20% هذا الأسبوع",
  },
  {
    id: "11",
    date: "2024-10-22",
    text: "تم إصدار نسخة جديدة من تطبيق Evowash",
    title: "تحديث التطبيق",
  },
  {
    id: "12",
    date: "2024-08-02",
    text: "تم إصدار نسخة جديدة من تطبيق Evowash",
    title: "تحديث التطبيق",
  },
  {
    id: "13",
    date: "2024-09-11",
    text: "تم إصدار نسخة جديدة من تطبيق Evowash",
    title: "تحديث التطبيق",
  },
];

const columns: Column<(typeof notifications)[0]>[] = [
  {
    key: "title",
    title: "عنوان الإشعار",
  },
  {
    key: "text",
    title: "النص",
  },

  {
    key: "date",
    title: "تاريخ",
  },
  {
    key: "__display",
    title: "",
    render: (row) => (
      <ActionsMenu
        showView={false}
        title="حذف الإشعار"
        description="هل أنت متأكد من حذف هذا الإشعار؟"
        onDelete={() => console.log("delete notification", row.id)}
        showEdit={false}
      />
    ),
  },
];

const NotificationsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | "all">(25);

  const totalPages = useMemo(() => {
    if (pageSize === "all") return 1;
    return Math.ceil(notifications.length / pageSize);
  }, [pageSize]);

  const paginatedData = useMemo(() => {
    if (pageSize === "all") return notifications;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return notifications.slice(start, end);
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

export default NotificationsTable;
