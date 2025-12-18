import { useState, useMemo } from "react";
import Pagination from "@/components/shared/pagination.component";
import { type Column, Table } from "@/components/ui/table";
import CarEditDialog from "./car-edit-dialog.component";
import carSkeleton from "@/assets/skeletons/car-skeleton.png";
import CustomImage from "@/components/shared/custom-image.component";
import ActionsMenu from "@/components/shared/actions-menu.component";
import { type CarFormValues } from "@/schema/car.schema";

const cars = [
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
    customer: "نادر المصري",
    bodyType: "SUV",
    plateNumber: "992-859-1963",
    brand: "هيونداي",
    carName: "توسان 2022",
  },
  {
    id: "3",
    dateAdded: "2024-08-02",
    customer: "رامي عوّاد",
    bodyType: "بيك أب",
    plateNumber: "919-363-5902",
    brand: "نيسان",
    carName: "نافارا 2023",
  },
  {
    id: "4",
    dateAdded: "2024-08-02",
    customer: "رامي عوّاد",
    bodyType: "بيك أب",
    plateNumber: "919-363-5902",
    brand: "نيسان",
    carName: "نافارا 2023",
  },
  {
    id: "5",
    dateAdded: "2024-09-11",
    customer: "نادر المصري",
    bodyType: "SUV",
    plateNumber: "992-859-1963",
    brand: "هيونداي",
    carName: "توسان 2022",
  },
  {
    id: "6",
    dateAdded: "2024-08-02",
    customer: "رامي عوّاد",
    bodyType: "بيك أب",
    plateNumber: "919-363-5902",
    brand: "نيسان",
    carName: "نافارا 2023",
  },
  {
    id: "7",
    dateAdded: "2024-08-02",
    customer: "رامي عوّاد",
    bodyType: "بيك أب",
    plateNumber: "919-363-5902",
    brand: "نيسان",
    carName: "نافارا 2023",
  },
  {
    id: "8",
    dateAdded: "2024-09-11",
    customer: "نادر المصري",
    bodyType: "SUV",
    plateNumber: "992-859-1963",
    brand: "هيونداي",
    carName: "توسان 2022",
  },
  {
    id: "9",
    dateAdded: "2024-08-02",
    customer: "رامي عوّاد",
    bodyType: "بيك أب",
    plateNumber: "919-363-5902",
    brand: "نيسان",
    carName: "نافارا 2023",
  },
  {
    id: "10",
    dateAdded: "2024-10-22",
    customer: "أحمد الخطيب",
    bodyType: "سيدان",
    plateNumber: "449-466-8664",
    brand: "تويوتا",
    carName: "كامري 2021",
  },
  {
    id: "11",
    dateAdded: "2024-10-22",
    customer: "أحمد الخطيب",
    bodyType: "سيدان",
    plateNumber: "449-466-8664",
    brand: "تويوتا",
    carName: "كامري 2021",
  },
  {
    id: "12",
    dateAdded: "2024-08-02",
    customer: "رامي عوّاد",
    bodyType: "بيك أب",
    plateNumber: "919-363-5902",
    brand: "نيسان",
    carName: "نافارا 2023",
  },
  {
    id: "13",
    dateAdded: "2024-09-11",
    customer: "نادر المصري",
    bodyType: "SUV",
    plateNumber: "992-859-1963",
    brand: "هيونداي",
    carName: "توسان 2022",
  },
];

type Car = (typeof cars)[0];

const CarsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | "all">(10);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditSubmit = (values: CarFormValues) => {
    if (!editingCar) return;

    console.log("update service", editingCar.id, values);

    setIsEditOpen(false);
  };

  const columns: Column<(typeof cars)[0]>[] = [
    {
      key: "__display",
      title: "",
      render: () => (
        <CustomImage
          imageClassName="object-cover"
          className="w-11 h-11 rounded-full ms-9 overflow-hidden"
          alt="car-skeleton"
          src={carSkeleton}
        />
      ),
    },
    {
      key: "carName",
      title: "اسم السيارة",
    },
    {
      key: "plateNumber",
      title: "رقم اللوحة",
    },
    {
      key: "brand",
      title: "الماركة",
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
          showView={false}
          title="حذف السيارة"
          description="هل انت متأكد من حذف هذه السيارة ؟"
          onDelete={() => console.log(row.id)}
          onEdit={() => {
            setEditingCar(row);
            setIsEditOpen(true);
          }}
        />
      ),
    },
  ];

  const totalPages = useMemo(() => {
    if (pageSize === "all") return 1;
    return Math.ceil(cars.length / pageSize);
  }, [pageSize]);

  const paginatedData = useMemo(() => {
    if (pageSize === "all") return cars;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return cars.slice(start, end);
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

export default CarsTable;
