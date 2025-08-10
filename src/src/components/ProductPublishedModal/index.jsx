import React from "react";
import classNames from "classnames/bind";
import styles from "./ProductPublishedModal.module.scss";
import { FiX, FiCopy } from "react-icons/fi";

const cx = classNames.bind(styles);

export default function ProductPublishedModal({
  isOpen,
  productName,
  link,
  onClose,
}) {
  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
  };

  return (
    <div className={cx("backdrop")} onClick={onClose}>
      <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
        <button className={cx("closeBtn")} onClick={onClose}>
          <FiX size={20} />
        </button>
        <h2 className={cx("title")}>{productName} is live!</h2>
        <p className={cx("message")}>
          Your item is now available for sale on your page. Don’t forget to
          spread the word and let others know about it.
        </p>
        <div className={cx("linkBox")}>
          <input type="text" readOnly value={link} className={cx("linkInput")} />
          <button className={cx("copyBtn")} onClick={handleCopy}>
            <FiCopy size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
