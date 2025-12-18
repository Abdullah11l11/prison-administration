import { useState, useMemo } from "react";
import { GetStatusBadge } from "@/components/shared/get-status-badge.util";
import Pagination from "@/components/shared/pagination.component";
import { type Column, Table } from "@/components/ui/table";
import ActionsMenu from "@/components/shared/actions-menu.component";
import ServiceEditDialog from "../service-details/service-edit-dialog.component";
import { type ServiceFormValues } from "@/schema/service.schema";

const services = [
  {
    id: "1",
    status: "غير متوفر",
    description:
      "غسيل خارجي سريع باستخدام منتجات صديقة للبيئة يمنح السيارة لمعاناً فورياً خلال 15 دقيقة",
    name: "غسيل خارجي",
  },
  {
    id: "2",
    status: "متوفر",
    description:
      "غسيل خارجي سريع باستخدام منتجات صديقة للبيئة يمنح السيارة لمعاناً فورياً خلال 15 دقيقة",
    name: "غسيل خارجي",
  },
];

type ServiceRow = (typeof services)[0];

const ServicesTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | "all">(25);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceRow | null>(null);

  const totalPages = useMemo(() => {
    if (pageSize === "all") return 1;
    return Math.ceil(services.length / pageSize);
  }, [pageSize]);

  const paginatedData = useMemo(() => {
    if (pageSize === "all") return services;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return services.slice(start, end);
  }, [currentPage, pageSize]);

  const columns: Column<ServiceRow>[] = [
    {
      key: "name",
      title: "اسم الخدمة",
    },
    {
      key: "description",
      title: "وصف الخدمة",
    },
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
          viewHref={`services/${row.id}`}
          title="حذف الخدمة"
          description="هل انت متأكد من حذف هذه الخدمة ؟"
          onDelete={() => console.log("delete service", row.id)}
          onEdit={() => {
            setEditingService(row);
            setIsEditOpen(true);
          }}
        />
      ),
    },
  ];

  const handleEditSubmit = (values: ServiceFormValues) => {
    if (!editingService) return;

    console.log("update service", editingService.id, values);

    setIsEditOpen(false);
  };

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

      {editingService && (
        <ServiceEditDialog
          open={isEditOpen}
          isTable={true}
          setOpen={setIsEditOpen}
          initialValues={{
            serviceName: editingService.name,
            serviceNameEn: editingService.name,
            description: editingService.description,
            descriptionEn: editingService.description,
          }}
          onSubmit={handleEditSubmit}
        />
      )}
    </>
  );
};

export default ServicesTable;
