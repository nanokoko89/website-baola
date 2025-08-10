import React from "react";
import classNames from "classnames/bind";
import styles from "./RevenueBreakdownModal.module.scss";
import { FiX } from "react-icons/fi";
import numberWithCommas from "../../../config/numberWithCommas";

const cx = classNames.bind(styles);

/**
 * @param {boolean} isOpen      - trạng thái mở/đóng modal
 * @param {function} onClose    - callback đóng modal
 * @param {number} total        - tổng số tiền (hiển thị ở phía trên)
 * @param {Array<{ label: string, value: number }>} items
 *                              - danh sách các mục breakdown (ví dụ: Đang xử lý, Thưởng giới thiệu,…)
 */
const RevenueBreakdownModal = ({ isOpen, onClose, total = 0, items = [] }) => {
  // Nếu modal không mở thì không render gì cả
  if (!isOpen) return null;

  return (
    <div className={cx("backdrop")} onClick={onClose}>
      <div
        className={cx("modal")}
        onClick={(e) => e.stopPropagation()} // tránh click vào backdrop làm đóng modal
      >
        {/* Nút đóng (X) */}
        <button className={cx("closeBtn")} onClick={onClose}>
          <FiX size={20} />
        </button>

        {/* Tiêu đề */}
        <h2 className={cx("title")}>Chi tiết thu nhập</h2>
        <p className={cx("subtitle")}>
          Xem cách thu nhập của bạn được phân chia trên Bao La.
        </p>

        {/* Phần hiển thị “Số tiền sắp khả dụng” */}
        <div className={cx("section")}>
          <div className={cx("sectionTitle")}>Số tiền sắp khả dụng</div>
          <div className={cx("total")}>
            {numberWithCommas(Math.round(total))}₫
          </div>
        </div>

        {/* Danh sách breakdown chi tiết */}
        <div className={cx("list")}>
          {items.map((item, idx) => (
            <div key={idx} className={cx("item")}>
              <span className={cx("itemLabel")}>{item.label}</span>
              <span className={cx("itemValue")}>
                {numberWithCommas(Math.round(item.value))}₫
              </span>
            </div>
          ))}
        </div>

        {/* Nút xác nhận/đóng */}
        <button className={cx("confirmBtn")} onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default RevenueBreakdownModal;
