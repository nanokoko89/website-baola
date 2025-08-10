import React from "react";
import classNames from "classnames/bind";
import styles from "./SepayModal.module.scss";
import { FiX } from "react-icons/fi";
import napasLogo from "../../../assets/Logo Napas.svg";

const cx = classNames.bind(styles);

const SepayModal = ({ isOpen, onClose, qrUrl }) => {
  if (!isOpen) return null;

  return (
    <div className={cx("backdrop")} onClick={onClose}>
      <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
        <button className={cx("closeBtn")} onClick={onClose}>
          <FiX size={20} />
        </button>
        <div className={cx("content")}>
          {qrUrl ? (
            <img src={qrUrl} alt="QR" className={cx("qrImage")} />
          ) : (
            <div className={cx("qrPlaceholder")}>Đang tạo mã QR...</div>
          )}
          <span className={cx("note")}>
            Sử dụng ứng dụng ngân hàng hoặc ví điện tử để quét và thanh toán
          </span>
        </div>
        <div className={cx("bottom")}>
          Phát triển bởi{" "}
          <img src={napasLogo} alt="Napas Logo" className={cx("napas-logo")} />
        </div>
      </div>
    </div>
  );
};

export default SepayModal;
