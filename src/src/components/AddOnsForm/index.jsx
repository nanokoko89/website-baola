// src/components/AddOnsForm/AddOnsForm.jsx
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AddOnsForm.module.scss";

// Giả lập dữ liệu cho các mục Add-ons
const ADDONS_DATA = [
  { key: "reviews", title: "Add Reviews" },
  { key: "emailFlows", title: "Email Flows" },
  { key: "orderBump", title: "Order Bump" },
  { key: "affiliateShare", title: "Affiliate Share" },
  { key: "confirmationEmail", title: "Confirmation Email" },
];

const cx = classNames.bind(styles);

export default function AddOnsForm({ onSaveDraft, onPublish }) {
  const [expandedKey, setExpandedKey] = useState(null);

  const toggleExpand = (key) => {
    setExpandedKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className={cx("addons-form")}>
      <h2 className={cx("form-title")}>Add-ons</h2>
      <p className={cx("subtitle")}>Optional add-ons to boost your profits.</p>

      <div className={cx("accordion")}>
        {ADDONS_DATA.map((item) => {
          const isOpen = expandedKey === item.key;
          return (
            <div key={item.key} className={cx("accordion-item")}>
              <div
                className={cx("accordion-header", { open: isOpen })}
                onClick={() => toggleExpand(item.key)}
              >
                <div className={cx("header-left")}>
                  {/* icon giả lập, có thể dùng SVG hoặc Icon Library */}
                  <span className={cx("icon")}>🔧</span>
                  <span className={cx("title")}>{item.title}</span>
                </div>
                <div className={cx("header-right")}>{isOpen ? "▾" : "▸"}</div>
              </div>
              {isOpen && (
                <div className={cx("accordion-content")}>
                  <p>
                    Nội dung cấu hình cho {item.title} (ví dụ: bật/tắt, cài đặt
                    chi tiết,...)
                  </p>
                  {/* Bạn có thể thay bằng các form con chi tiết */}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={cx("form-actions")}>
        <button className={cx("btn", "btn--secondary")} onClick={onSaveDraft}>
          Save As Draft
        </button>
        <button className={cx("btn", "btn--primary")} onClick={onPublish}>
          Publish
        </button>
      </div>
    </div>
  );
}
