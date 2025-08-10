import RevenueChart from "../components/MyIncome/RevenueChart/RevenueChart";
import OrdersTable from "../components/MyIncome/OrdersTable/OrdersTable";
import Sidebar from "../components/utils/Sidebar/Sidebar";
import HeaderBar from "../components/utils/Headerbar";
import BottomTabs from "../components/utils/BottomTabs";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchOrdersByUser, groupRevenueByDate } from "../config/orderService";
import StatsDashboard from "../components/dashboards/StatsDashboard";

const MyIncome = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [orders, setOrders] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [available, setAvailable] = useState(0);

  useEffect(() => {
    if (!currentUser) return;

    const loadOrders = async () => {
      const result = await fetchOrdersByUser(currentUser.uid);
      const paidOrders = result.filter((o) => o.status === "paid");
      setOrders(paidOrders);
      setRevenueData(groupRevenueByDate(paidOrders));
      const total = paidOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
      setAvailable(total);
    };

    loadOrders();
  }, [currentUser]);
  return (
    <>
      <Sidebar />
      <HeaderBar title="Kết quả" />
      <RevenueChart data={revenueData} available={available} />

      {orders.length > 0 && <OrdersTable orders={orders} />}

      {/* <StatsDashboard /> */}
      <BottomTabs />
    </>
  );
};

export default MyIncome;
