import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./OrdersTable.module.scss";
import { FiPlus, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import numberWithCommas from "../../../config/numberWithCommas";
import formatCreatedAt from "../../../utils/formatCreatedAt";

const cx = classNames.bind(styles);

const TYPE_STYLES = {
  OnlineCourse: { bg: "#eef2ff", color: "#5b57ff" },
  DigitalProduct: { bg: "#ecfdf5", color: "#34d399" },
  CoachingCall: { bg: "#fefce8", color: "#f59e0b" },
  custom: { bg: "#fef2f2", color: "#ef4444" },
  email: { bg: "#fce7f3", color: "#db2777" },
};

const TYPE_LABELS = {
  OnlineCourse: "Khóa học",
  DigitalProduct: "Sản phẩm số",
  CoachingCall: "Cuộc hẹn",
  custom: "Sản phẩm vật lý",
  email: "Thu thập Form",
};

// Dữ liệu mẫu cho 1 đơn hàng
const SAMPLE_ORDER = {
  id: 1,

  buyerEmail: "sample@email.com",
  productType: "OnlineCourse",
  productName: "Get started with this amazing course",
  amount: 0.0,
  status: "Paid",
  createdAt: new Date(),
};

const OrdersTable = ({ orders = [SAMPLE_ORDER] }) => {
  const [currentPage] = useState(1);
  const [totalPages] = useState(1);

  const handlePrevPage = () => {
    // Logic chuyển trang (hiện 1 trang mẫu)
  };
  const handleNextPage = () => {
    // Logic chuyển trang
  };

  return (
    <div className={cx("tableContainer")}>
      <div className={cx("sectionTitle")}>Đơn hàng mới nhất</div>

      <div className={cx("tableWrapper")}>
        <table>
          <thead>
            <tr>
              <th>Ngày</th>
              <th>Email</th>
              <th>Sản phẩm</th>
              <th>Số tiền</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((ord) => (
              <tr key={ord.id}>
                <td>{formatCreatedAt(ord.createdAt)}</td>
                <td>{ord.buyerEmail}</td>

                <td>
                  {(() => {
                    const style = TYPE_STYLES[ord.productType] || {
                      bg: "#eef2ff",
                      color: "#5b57ff",
                    };
                    const label =
                      TYPE_LABELS[ord.productType] || ord.productType;
                    return (
                      <span
                        style={{
                          backgroundColor: style.bg,
                          color: style.color,
                          fontSize: "0.85rem",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "0.25rem",
                          marginRight: "0.5rem",
                        }}
                      >
                        {label}
                      </span>
                    );
                  })()}
                  {ord.productName}
                </td>
                <td style={{ color: "#33d69f", fontWeight: 600 }}>
                  {numberWithCommas(ord.amount.toFixed(2))}đ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className={cx("pagination")}>
        <span className={cx("pageInfo")}>
          Trang {currentPage} trên {totalPages}
        </span>
        <FiChevronLeft onClick={handlePrevPage} />
        <FiChevronRight onClick={handleNextPage} />
      </div>
    </div>
  );
};

export default OrdersTable;
