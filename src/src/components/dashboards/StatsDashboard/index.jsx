// StatsDashboard.jsx
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./StatsDashboard.module.scss";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { subscribeOrdersByUser } from "../../../config/orderService";
import numberWithCommas from "../../../config/numberWithCommas";

const cx = classNames.bind(styles);

const StatsDashboard = ({ startDate, endDate }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    const handleOrders = async (orders) => {
      const paidOrders = orders.filter((o) => o.status === "paid");
      const grouped = {};
      paidOrders.forEach((o) => {
        const pid = o.productId;
        if (!pid) return;
        if (!grouped[pid]) grouped[pid] = [];
        grouped[pid].push(o);
      });

      const rows = [];
      for (const pid of Object.keys(grouped)) {
        const snap = await getDoc(doc(db, "products", pid));
        const product = snap.exists() ? snap.data() : {};
        const views = product.checkoutViewCount || 0;
        const ordersArr = grouped[pid];
        const orderCount = ordersArr.length;
        const revenue = ordersArr.reduce((s, o) => s + (o.amount || 0), 0);
        rows.push({
          product: product.checkout?.title || product.title || pid,
          views,
          orders: orderCount,
          conversion:
            views > 0 ? `${((orderCount / views) * 100).toFixed(1)}%` : "-",
          revenue: revenue > 0 ? numberWithCommas(revenue) : "-",
        });
      }
      setTableData(rows);
    };

    const unsubscribe = subscribeOrdersByUser(
      currentUser.uid,
      startDate,
      endDate,
      handleOrders
    );

    return () => unsubscribe();
  }, [currentUser, startDate, endDate]);

  return (
    <div className={cx("dashboard")}>
      <div className={cx("tableWrapper")}>
        <table className={cx("table")}>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Lượt xem</th>
              <th>Đơn hàng</th>
              <th>Tỷ lệ chuyển đổi</th>
              <th>Doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => (
              <tr key={i}>
                <td>{row.product}</td>
                <td>{row.views}</td>
                <td>{row.orders}</td>
                <td>{row.conversion}</td>
                <td>{row.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatsDashboard;
