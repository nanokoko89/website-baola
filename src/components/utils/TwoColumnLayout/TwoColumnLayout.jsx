// src/components/TwoColumnLayout/TwoColumnLayout.jsx
import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./TwoColumnLayout.module.scss";
const cx = classNames.bind(styles);

export default function TwoColumnLayout({
  tabs = [],
  initialActiveTabIndex = 0,
  onTabChange,
  mobilePreviewOpen = false,
  onClosePreview,
}) {
  const [activeTabIndex, setActiveTabIndex] = useState(initialActiveTabIndex);

  // Đồng bộ khi parent update initialActiveTabIndex
  useEffect(() => {
    setActiveTabIndex(initialActiveTabIndex);
  }, [initialActiveTabIndex]);

  const handleClick = (idx) => {
    setActiveTabIndex(idx);
    onTabChange && onTabChange(idx);
  };

  const active = tabs[activeTabIndex] || {};

  return (
    <div className={cx("wrapper")}>
      <div className={cx("leftColumn")}>
        <div className={cx("tabsHeader")}>
          {tabs.map((tab, idx) => (
            <div
              key={idx}
              className={cx("tabItem", { active: idx === activeTabIndex })}
              onClick={() => handleClick(idx)}
            >
              {tab.icon}
              {tab.label}
            </div>
          ))}
        </div>
        <div className={cx("tabContent")}>{active.content}</div>
      </div>
      <div className={cx("rightColumn", { open: mobilePreviewOpen })}>
        <button className={cx("closeBtn")} onClick={onClosePreview}>×</button>
        <div className={cx("rightInner")}>{active.rightPreview}</div>
      </div>
    </div>
  );
}
