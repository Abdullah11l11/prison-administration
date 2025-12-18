import { useState, useMemo } from "react";
import { type Column, Table } from "@/components/ui/table";
import Pagination from "@/components/shared/pagination.component";
import ActionsMenu from "@/components/shared/actions-menu.component";
import SectionTitle from "@/components/shared/section-title.component";
import CarEditDialog from "../cars/car-edit-dialog.component";
import { type CarFormValues } from "@/schema/car.schema";

const customerCars = [
  {
    id: "1",
    dateAdded: "2024-10-22",
    customer: "أحمد الخطيب",
    bodyType: "سيدان",
    plateNumber: "449-466-8664",
    brand: "تويوتا",
    carName: "كامري 2021",
  },
  {
    id: "2",
    dateAdded: "2024-09-11",
    customer: "أحمد الخطيب",
    bodyType: "SUV",
    plateNumber: "992-859-1963",
    brand: "هيونداي",
    carName: "توسان 2022",
  },
  {
    id: "3",
    dateAdded: "2024-08-02",
    customer: "أحمد الخطيب",
    bodyType: "SUV",
    plateNumber: "992-859-1963",
    brand: "هيونداي",
    carName: "توسان 2022",
  },
  {
    id: "4",
    dateAdded: "2024-08-02",
    customer: "أحمد الخطيب",
    bodyType: "سيدان",
    plateNumber: "449-466-8664",
    brand: "تويوتا",
    carName: "كامري 2021",
  },
  {
    id: "5",
    dateAdded: "2024-09-11",
    customer: "أحمد الخطيب",
    bodyType: "سيدان",
    plateNumber: "449-466-8664",
    brand: "تويوتا",
    carName: "كامري 2021",
  },
];

type Car = (typeof customerCars)[0];

const CustomerCarsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | "all">(10);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const columns: Column<(typeof customerCars)[0]>[] = [
    {
      key: "carName",
      title: "اسم السيارة",
    },
    {
      key: "brand",
      title: "الماركة",
    },
    {
      key: "plateNumber",
      title: "رقم اللوحة",
    },
    {
      key: "bodyType",
      title: "نوع الهيكل",
    },
    {
      key: "customer",
      title: "اسم الزبون",
    },
    {
      key: "dateAdded",
      title: "تاريخ الإضافة",
    },
    {
      key: "__display",
      title: "",
      render: (row) => (
        <ActionsMenu
          viewHref={`/cars`}
          title="حذف السيارة"
          description="هل أنت متأكد من حذف هذه السيارة ؟"
          onDelete={() => console.log("delete car", row.id)}
          onEdit={() => {
            setEditingCar(row);
            setIsEditOpen(true);
          }}
        />
      ),
    },
  ];

  const handleEditSubmit = (values: CarFormValues) => {
    if (!editingCar) return;

    console.log("update service", editingCar.id, values);

    setIsEditOpen(false);
  };

  const totalPages = useMemo(() => {
    if (pageSize === "all") return 1;
    return Math.ceil(customerCars.length / pageSize);
  }, [pageSize]);

  const paginatedData = useMemo(() => {
    if (pageSize === "all") return customerCars;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return customerCars.slice(start, end);
  }, [currentPage, pageSize]);

  return (
    <>
      <SectionTitle className="text-text-primary-500">
        السيارات المرتبطة به
      </SectionTitle>
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
      {editingCar && (
        <CarEditDialog
          onSubmit={handleEditSubmit}
          open={isEditOpen}
          setOpen={setIsEditOpen}
          initialValues={editingCar}
          isTable
        />
      )}
    </>
  );
};

export default CustomerCarsTable;
