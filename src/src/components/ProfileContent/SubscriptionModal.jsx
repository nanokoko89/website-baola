// SubscriptionModal.jsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./SubscriptionModal.module.scss";
import {
  fetchPlans,
  updateUserSubscription,
} from "../../config/subscriptionService";
import { selectCurrentUser } from "../../store/authSlice";
import SwitchButton from "../utils/SwitchButton";

const cx = classNames.bind(styles);

const SubscriptionModal = ({
  onClose,
  currentPlanId,
  currentPeriod = "monthly",
  onPlanChanged,
}) => {
  const currentUser = useSelector(selectCurrentUser);
  const [plans, setPlans] = useState([]);
  const [activeTab, setActiveTab] = useState(
    currentPeriod === "yearly" ? "Theo Năm (Tiết kiệm 25%)" : "Theo Tháng"
  );

  useEffect(() => {
    fetchPlans().then(setPlans);
  }, []);

  useEffect(() => {
    setActiveTab(
      currentPeriod === "yearly" ? "Theo Năm (Tiết kiệm 25%)" : "Theo Tháng"
    );
  }, [currentPeriod]);

  const handleSelect = async (planId) => {
    if (!currentUser) return;
    const period = activeTab === "Theo Tháng" ? "monthly" : "yearly";
    await updateUserSubscription(currentUser.uid, planId, period);
    onPlanChanged?.(planId);
  };

  const formatPrice = (num) =>
    num.toLocaleString("vi-VN", { maximumFractionDigits: 0 }) + " đ";

  return (
    <div className={cx("overlay")} onClick={onClose}>
      <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
        <button className={cx("closeBtn")} onClick={onClose}>
          ×
        </button>
        <div className={cx("header")}>
          <h2 className={cx("modalTitle")}>Chọn gói</h2>

          <SwitchButton activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className={cx("planList")}>
          {plans.map((plan) => {
            const periodLabel =
              activeTab === "Theo Tháng" ? "monthly" : "yearly";
            const isCurrent =
              plan.id === currentPlanId && periodLabel === currentPeriod;
            const yearlyPrice =
              plan.price > 0 ? Math.round(plan.price * 12 * 0.75 - 1000) : 0;
            const priceValue =
              activeTab === "Theo Tháng" ? plan.price : yearlyPrice;
            const priceLabel =
              activeTab === "Theo Tháng"
                ? `${formatPrice(priceValue)}/tháng`
                : `${formatPrice(priceValue)}/năm`;

            return (
              <div
                key={plan.id}
                className={cx("planCard", { selected: isCurrent })}
              >
                {isCurrent && <div className={cx("badge")}>Đang chọn</div>}

                <div className={cx("planHeader")}>
                  <div className={cx("planTitle")}>{plan.title}</div>
                  <div className={cx("planPrice")}>
                    {plan.price === 0 ? "Miễn phí" : priceLabel}
                  </div>
                </div>

                <ul className={cx("features")}>
                  {plan.features.map((f, i) => (
                    <li key={i} className={cx("featureItem")}>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={cx("selectBtn")}
                  disabled={isCurrent}
                  onClick={() => handleSelect(plan.id)}
                >
                  {isCurrent ? "Gói hiện tại" : "Chọn gói này"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
