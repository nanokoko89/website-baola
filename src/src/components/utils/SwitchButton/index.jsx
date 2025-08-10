import { useState, useRef, useEffect } from "react";
import styles from "./SwitchButton.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function SwitchButton({ activeTab, setActiveTab }) {
  const monthlyRef = useRef(null);
  const yearlyRef = useRef(null);
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0 });

  // Cập nhật vị trí và kích thước slider khi activeTab thay đổi
  useEffect(() => {
    const ref =
      activeTab === "Theo Tháng" ? monthlyRef.current : yearlyRef.current;
    if (ref) {
      setSliderStyle({
        width: ref.offsetWidth,
        left: ref.offsetLeft,
      });
    }
  }, [activeTab]);

  return (
    <div className={cx("toggleWrapper")}>
      <div className={cx("toggleContainer")}>
        {/* Slider với style động */}
        <div
          className={cx("slider")}
          style={{
            width: sliderStyle.width,
            transform: `translateX(${sliderStyle.left}px)`,
          }}
        />

        <button
          ref={monthlyRef}
          onClick={() => setActiveTab("Theo Tháng")}
          className={cx("tabButton", {
            tabActive: activeTab === "Theo Tháng",
            tabInactive: activeTab !== "Theo Tháng",
          })}
        >
          Theo Tháng
        </button>

        <button
          ref={yearlyRef}
          onClick={() => setActiveTab("Theo Năm (Tiết kiệm 25%)")}
          className={cx("tabButton", {
            tabActive: activeTab === "Theo Năm (Tiết kiệm 25%)",
            tabInactive: activeTab !== "Theo Năm (Tiết kiệm 25%)",
          })}
        >
          Theo Năm (Tiết kiệm 25%)
        </button>
      </div>
    </div>
  );
}
