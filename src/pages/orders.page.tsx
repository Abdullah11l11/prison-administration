import OrdersTable from "@/components/sections/orders/orders-table.component";
import OrderFilterBar from "@/components/sections/orders/orders-filter-bar.component";

const OrdersPage = () => {
  return (
    <>
      <OrderFilterBar />
      <OrdersTable />
    </>
  );
};

export default OrdersPage;
