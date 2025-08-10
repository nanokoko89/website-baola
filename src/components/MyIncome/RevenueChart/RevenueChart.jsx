import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./RevenueChart.module.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import RevenueBreakdownModal from "../RevenueBreakdownModal";
import CashOutModal from "../CashOutModal";
import numberWithCommas from "../../../config/numberWithCommas";

const cx = classNames.bind(styles);

// Dữ liệu mẫu (có thể thay bằng props hoặc fetch từ API)
const sampleData = [
  { date: "05 Thg 5", revenue: 0 },
  { date: "08 Thg 5", revenue: 20 },
  { date: "11 Thg 5", revenue: 35 },
  { date: "14 Thg 5", revenue: 10 },
  { date: "17 Thg 5", revenue: 50 },
  { date: "20 Thg 5", revenue: 30 },
  { date: "23 Thg 5", revenue: 45 },
  { date: "26 Thg 5", revenue: 25 },
  { date: "29 Thg 5", revenue: 60 },
  { date: "01 Thg 6", revenue: 40 },
];

const RevenueChart = ({ data = sampleData, available = 100, upcoming = 0 }) => {
  // Nếu available <= 0 thì disable nút “Rút tiền”
  const isDisabled = available <= 0;

  const navigate = useNavigate();

  // State để mở/đóng modal chi tiết (Breakdown)
  const [isBreakdownModalOpen, setIsBreakdownModalOpen] = useState(false);

  // State để mở/đóng modal rút tiền (CashOut)
  const [isCashModalOpen, setIsCashModalOpen] = useState(false);

  // Dữ liệu breakdown tạm (3 dòng giống ví dụ)
  const breakdownItems = [
    { label: "Đang xử lý giao dịch", value: 0 },
    { label: "Thưởng giới thiệu", value: 0 },
    { label: "Thưởng tiếp thị liên kết", value: 0 },
  ];

  // Khi nhấn “Rút tiền”:
  // - Nếu isDisabled = true thì không làm gì
  // - Ngược lại setIsCashModalOpen(true) để mở modal
  const handleCashOut = () => {
    if (isDisabled) return;
    setIsCashModalOpen(true);
  };

  // Khi nhấn “Xem chi tiết” (luôn cho phép bấm)
  const handleViewBreakdown = () => {
    setIsBreakdownModalOpen(true);
  };

  // Đóng modal breakdown
  const handleCloseBreakdown = () => {
    setIsBreakdownModalOpen(false);
  };

  // Đóng modal rút tiền
  const handleCloseCashModal = () => {
    setIsCashModalOpen(false);
  };

  // Điều hướng sang trang cài đặt
  const handleSettings = () => {
    navigate("/profile?tab=payment");
  };

  return (
    <>
      <div className={cx("container")}>
        <div className={cx("chartCard")}>
          <div className={cx("chartTitle")}>Tổng doanh thu</div>
          <div className={cx("chartContainer")}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f5" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => `${numberWithCommas(value)}₫`}
                />
                <YAxis
                  tickFormatter={(value) => `${value}₫`}
                  tick={{ fill: "#6a6f9c", fontSize: 12 }}
                />
                <Tooltip formatter={(value) => `${numberWithCommas(value)}₫`} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#5b57ff"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={cx("cardWrapper")}>
          <div className={cx("row")}>
            <div className={cx("label")}>Khả dụng rút</div>
            <div className={cx("infoValue")}>
              {numberWithCommas(Math.round(available))}₫
            </div>
          </div>

          <div className={cx("row")}>
            <div className={cx("subInfo")}>Sắp khả dụng</div>
            <div
              className={cx("subInfo")}
              onClick={handleViewBreakdown}
              style={{ cursor: "pointer", color: "#5b57ff" }}
            >
              {numberWithCommas(Math.round(upcoming))}₫{" "}
              <span className={cx("viewDetail")}> (Xem chi tiết) </span>
            </div>
          </div>

          <button
            className={cx("cashOutBtn")}
            onClick={handleCashOut}
            disabled={isDisabled}
          >
            Rút tiền
          </button>

          <div>
            <span className={cx("settingsLink")} onClick={handleSettings}>
              <FiSettings className={cx("settingsIcon")} size={18} />
              Cài đặt
            </span>
          </div>
        </div>
      </div>

      {/* Modal “Chi tiết thu nhập” */}
      <RevenueBreakdownModal
        isOpen={isBreakdownModalOpen}
        onClose={handleCloseBreakdown}
        total={upcoming}
        items={breakdownItems}
      />

      {/* Modal “Xác nhận rút tiền” */}
      <CashOutModal isOpen={isCashModalOpen} onClose={handleCloseCashModal} />
    </>
  );
};

export default RevenueChart;
