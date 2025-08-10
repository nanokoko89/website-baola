import React, { useEffect, useRef, useState } from "react";
import styles from "./Dashboard.module.scss";
import bind from "../../utils/cx.js";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";

const cx = bind(styles);

export default function Dashboard() {
  return (
    <div className={cx("page")}>
      <footer className={cx("site-footer")} />
    </div>
  );
}
