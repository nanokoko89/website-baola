// src/components/PaymentCard/PaymentCard.jsx
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./PaymentCard.module.scss";

const cx = classNames.bind(styles);

export default function PaymentCard({
  total,
  onPurchase,
  callActionButtonText = "Mua ngay",
}) {
  const [method, setMethod] = useState(null);

  return (
    <div className={cx("card")}>
      {/* Tổng tiền */}
      <div className={cx("summary")}>
        <span className={cx("label")}>Tổng thanh toán:</span>
        <span className={cx("amount")}>{total}</span>
      </div>

      {/* Phương thức thanh toán */}
      {/* <h3 className={cx("heading")}>Thanh toán</h3> */}

      <button className={cx("purchaseBtn")} onClick={() => {}}>
        {callActionButtonText}
      </button>
    </div>
  );
}
