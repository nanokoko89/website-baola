// Subscription.jsx
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Subscription.module.scss";
import SubscriptionModal from "./SubscriptionModal";

const cx = classNames.bind(styles);

const Subscription = ({ subscription = {}, invoices = [], onRefresh }) => {
  const [showModal, setShowModal] = useState(false);

  const {
    name = "Chưa có gói",
    price = "0,00",
    period = "",
    billingNote = "",
    trialEnds = null,
  } = subscription;

  const formatPrice = (num) =>
    num.toLocaleString("vi-VN", { maximumFractionDigits: 0 }) + " đ";

  return (
    <div className={cx("container")}>
      <h2 className={cx("title")}>Gói đăng ký</h2>
      <div className={cx("card")}>
        <div className={cx("cardHeader")}>
          <div>
            <div className={cx("cardTitle")}>{name}</div>
            <div className={cx("cardSubtext")}>{billingNote}</div>
          </div>
          <div className={cx("cardPrice")}>
            {formatPrice(price)}
            <span className={cx("period")}>{period}</span>
          </div>
        </div>

        {trialEnds && (
          <div className={cx("trialText")}>
            Thời gian dùng thử hết hạn vào ngày {trialEnds}
          </div>
        )}

        <div className={cx("actions")}>
          {/* <button
            className={cx("btn")}
            onClick={() => {
            }}
          >
            Hủy đăng ký
          </button> */}
          <button
            className={cx("btn", "primary")}
            onClick={() => setShowModal(true)}
          >
            Thay đổi gói
          </button>
        </div>
      </div>
      {/* Bảng Hóa đơn */}
      <div className={cx("tableWrapper")}>
        <h2 className={cx("sectionTitle")}>Hóa đơn</h2>
        <table className={cx("table")}>
          <thead>
            <tr>
              <th className={cx("th")}>Ngày</th>
              <th className={cx("th")}>Số tiền</th>
              <th className={cx("th")}>Tình trạng</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td className={cx("td")}>{inv.date}</td>
                <td className={cx("td")}>{inv.amount}</td>
                <td className={cx("td")}>{inv.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal Thay đổi gói */}
      {showModal && (
        <SubscriptionModal
          onClose={() => setShowModal(false)}
          currentPlanId={subscription.planId}
          currentPeriod={subscription.period}
          onPlanChanged={() => {
            setShowModal(false);
            onRefresh?.();
          }}
        />
      )}{" "}
    </div>
  );
};

export default Subscription;
