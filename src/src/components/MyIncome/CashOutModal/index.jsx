import React from "react";
import classNames from "classnames/bind";
import styles from "./CashOutModal.module.scss";
import { FiX } from "react-icons/fi";

const cx = classNames.bind(styles);

/**
 * @param {boolean} isOpen      - trạng thái mở/đóng modal
 * @param {function} onClose    - callback khi muốn đóng modal
 */
const CashOutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={cx("backdrop")} onClick={onClose}>
      <div
        className={cx("modal")}
        onClick={(e) => e.stopPropagation()} // ngăn click vào nội dung modal bị lan ra backdrop
      >
        {/* Nút “X” góc trên */}
        <button className={cx("closeBtn")} onClick={onClose}>
          <FiX size={20} />
        </button>

        {/* Tiêu đề modal */}
        <h2 className={cx("title")}>Yêu cầu rút tiền đã được gửi</h2>

        {/* Nội dung thông báo */}
        <p className={cx("message")}>
          Chúng tôi đã nhận được yêu cầu rút tiền của bạn và sẽ xử lý ngay. Dự
          kiến tiền sẽ về tài khoản của bạn trong 2 giờ làm việc tiếp theo.
        </p>

        {/* Nút “Đóng” */}
        <button className={cx("confirmBtn")} onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default CashOutModal;
