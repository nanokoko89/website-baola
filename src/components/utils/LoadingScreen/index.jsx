import React from "react";
import classNames from "classnames/bind";
import styles from "./LoadingScreen.module.scss";

const cx = classNames.bind(styles);

export default function LoadingScreen({ message = "Đang tải..." }) {
  return (
    <div className={cx("overlay")}>
      <div className={cx("spinner")} />
      {message && <p className={cx("message")}>{message}</p>}
    </div>
  );
}
