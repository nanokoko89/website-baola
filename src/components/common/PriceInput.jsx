import React, { useState } from "react";
import styles from "./PriceInput.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const PriceInput = ({ price, discount, onPriceChange, onDiscountChange }) => {
  // Giá gốc

  // Trạng thái cho phép nhập giá chiết khấu
  const [discountEnabled, setDiscountEnabled] = useState(false);

  // Khi toggle bật/tắt chiết khấu
  const handleToggle = () => {
    setDiscountEnabled((prev) => !prev);
    if (discountEnabled) {
      // Nếu đang bật và chuyển thành tắt thì reset giá chiết khấu
      onDiscountChange("");
    }
  };

  return (
    <div className={cx("priceInput")}>
      {/* Phần Giá gốc */}
      <div className={cx("item")}>
        <label className={cx("label")}>
          Giá (đồng)<span className={cx("required")}>*</span>
        </label>
        <input
          type="text"
          className={cx("input")}
          value={price}
          onChange={(e) => onPriceChange(e.target.value)}
          placeholder="0"
        />
      </div>

      {/* Phần Giá chiết khấu */}
      <div className={cx("item")}>
        <label className={cx("label")}>
          Giá chiết khấu (đồng)
          <div className={cx("toggleSwitch")}>
            <input
              type="checkbox"
              checked={discountEnabled}
              onChange={handleToggle}
            />
            <span className={cx("slider")}></span>
          </div>
        </label>
        <input
          type="text"
          className={cx("input", { inputDisabled: !discountEnabled })}
          value={discount}
          onChange={(e) => onDiscountChange(e.target.value)}
          placeholder="0"
          disabled={!discountEnabled}
        />
      </div>
    </div>
  );
};

export default PriceInput;
