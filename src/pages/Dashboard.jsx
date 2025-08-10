import Sidebar from "../components/utils/Sidebar/Sidebar";

import Tabs from "../components/dashboards/Tabs/Tabs";
import StatsCard from "../components/dashboards/StatsCard/StatsCard";
import ChartBar from "../components/dashboards/ChartBar/ChartBar";
import HeaderBar from "../components/utils/Headerbar";
import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";

import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import {
  groupRevenueByDate,
  groupOrdersByDate,
  subscribeOrdersByUser,
  fetchOrdersByUser,
} from "../config/orderService";
import {
  fetchVisitLogsByUser,
  groupVisitsByDate,
  subscribeVisitLogsByUser,
} from "../config/visitService";
import BottomTabs from "../components/utils/BottomTabs";

const cx = classNames.bind(styles);

const Dashboard = () => {
  const [dateRange, setDateRange] = useState(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 13);
    return { start, end };
  });

  // Nếu bạn có logic lọc dữ liệu theo khoảng thời gian, xử lý ở đây
  const handleTabChange = (label, idx) => {
    const now = new Date();
    let start = null;
    let end = now;
    if (idx === 0) {
      start = new Date(now);
      start.setDate(now.getDate() - 6);
    } else if (idx === 1) {
      start = new Date(now);
      start.setDate(now.getDate() - 13);
    } else if (idx === 2) {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
    } else {
      start = null;
      end = null;
    }
    setDateRange({ start, end });
  };
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [stats, setStats] = useState({
    visits: { value: 0, percent: 0 },
    revenue: { value: 0, percent: 0 },
    leads: { value: 0, percent: 0 },
  });
  const prevOrdersRef = useRef([]);
  const prevVisitsRef = useRef([]);
  const [revenueData, setRevenueData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [visitData, setVisitData] = useState([]);

  const [activeChart, setActiveChart] = useState("visits");

  useEffect(() => {
    if (!currentUser) return;

    let unsubOrders = () => {};
    let unsubVisits = () => {};
    let cancelled = false;

    const handleOrders = (orders) => {
      const paidOrders = orders.filter((o) => o.status === "paid");
      const revenue = paidOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
      const leads = paidOrders.length;

      const prevRevenue = prevOrdersRef.current.reduce(
        (sum, o) => sum + (o.amount || 0),
        0
      );
      const prevLeads = prevOrdersRef.current.length;

      const revenuePercent =
        prevRevenue > 0 ? ((revenue - prevRevenue) / prevRevenue) * 100 : 100;
      const leadsPercent =
        prevLeads > 0 ? ((leads - prevLeads) / prevLeads) * 100 : 100;

      setStats((prev) => ({
        ...prev,
        revenue: { value: revenue, percent: Math.round(revenuePercent) },
        leads: { value: leads, percent: Math.round(leadsPercent) },
      }));

      setRevenueData(groupRevenueByDate(paidOrders));
      setOrdersData(groupOrdersByDate(paidOrders));
    };

    const handleVisits = (visits) => {
      const prevCount = prevVisitsRef.current.length;
      const visitPercent =
        prevCount > 0 ? ((visits.length - prevCount) / prevCount) * 100 : 100;

      setStats((prev) => ({
        ...prev,
        visits: { value: visits.length, percent: Math.round(visitPercent) },
      }));
      setVisitData(groupVisitsByDate(visits));
    };
    async function fetchPrevAndSubscribe() {
      if (dateRange.start && dateRange.end) {
        const rangeMs = dateRange.end.getTime() - dateRange.start.getTime();
        const prevEnd = new Date(dateRange.start.getTime() - 1);
        const prevStart = new Date(prevEnd.getTime() - rangeMs);

        const [prevOrders, prevVisits] = await Promise.all([
          fetchOrdersByUser(currentUser.uid, prevStart, prevEnd),
          fetchVisitLogsByUser(currentUser.uid, prevStart, prevEnd),
        ]);
        if (!cancelled) {
          prevOrdersRef.current = prevOrders.filter((o) => o.status === "paid");
          prevVisitsRef.current = prevVisits;
        }
      } else {
        prevOrdersRef.current = [];
        prevVisitsRef.current = [];
      }

      unsubOrders = subscribeOrdersByUser(
        currentUser.uid,
        dateRange.start,
        dateRange.end,
        handleOrders
      );
      unsubVisits = subscribeVisitLogsByUser(
        currentUser.uid,
        dateRange.start,
        dateRange.end,
        handleVisits
      );
    }

    fetchPrevAndSubscribe();
    return () => {
      cancelled = true;
      unsubOrders();
      unsubVisits();
    };
  }, [currentUser, dateRange]);

  return (
    <div className={cx("layout")}>
      <Sidebar />
      <div className={cx("content")}>
        <HeaderBar title="Trang chủ" userName="Alex" />
        <Tabs onChange={handleTabChange} />
        <div className={cx("statsContainer")}>
          <StatsCard
            type="visits"
            mainValue={stats.visits.value}
            percent={stats.visits.percent}
            active={activeChart === "visits"}
            onClick={() => setActiveChart("visits")}
            color="#06d6a0"
          />
          <StatsCard
            type="revenue"
            mainValue={stats.revenue.value}
            percent={stats.revenue.percent}
            active={activeChart === "revenue"}
            onClick={() => setActiveChart("revenue")}
            color="#5b57ff"
          />
          <StatsCard
            type="leads"
            mainValue={stats.leads.value}
            percent={stats.leads.percent}
            active={activeChart === "leads"}
            onClick={() => setActiveChart("leads")}
            color="#ffa500"
          />
        </div>
        <div className={cx("chartsContainer")}>
          {activeChart === "revenue" && (
            <ChartBar data={revenueData} dataKey="revenue" color="#5b57ff" />
          )}
          {activeChart === "visits" && (
            <ChartBar data={visitData} dataKey="value" color="#06d6a0" />
          )}
          {activeChart === "leads" && (
            <ChartBar data={ordersData} dataKey="value" color="#ffa500" />
          )}
        </div>
        <BottomTabs />
      </div>
    </div>
  );
};

export default Dashboard;
