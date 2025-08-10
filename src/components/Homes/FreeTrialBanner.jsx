// src/components/FreeTrialBanner/FreeTrialBanner.jsx
import React from "react";
import classNames from "classnames/bind";
import styles from "./FreeTrialBanner.module.scss";

const cx = classNames.bind(styles);

const FreeTrialBanner = ({ handleStart }) => {
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Dùng thử Bao La miễn phí 14 ngày</h2>
      <button className={cx("btnTrial")} onClick={handleStart}>
        Bắt đầu dùng thử
      </button>
    </div>
  );
};

export default FreeTrialBanner;
