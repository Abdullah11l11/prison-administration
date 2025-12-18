import FinancialDetails from "@/components/sections/order-details/financial-details.component";
import OrderInfo from "@/components/sections/order-details/order-info.component";

const OrderDetailsPage = () => {
  return (
    <>
      <OrderInfo />
      <FinancialDetails />
    </>
  );
};

export default OrderDetailsPage;
