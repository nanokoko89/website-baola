import React from "react";
import { Avatar } from "zmp-ui";
import styles from "./Sidebar.module.scss";

import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: "home" },
  { key: "store", label: "Cửa hàng", icon: "store" },
  { key: "income", label: "Thu nhập", icon: "wallet" },
  { key: "analytics", label: "Phân tích", icon: "chart" },
  { key: "customers", label: "Khách hàng", icon: "heart" },
  { key: "community", label: "Cộng đồng", icon: "users" },
  { key: "appointments", label: "Cuộc hẹn", icon: "clock" },
  { key: "more", label: "Thêm", icon: "plus" },
];

// Bộ icon SVG chuẩn hoá để không phụ thuộc tên icon của thư viện
function Icon({ name, className }) {
  switch (name) {
    case "home":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "store":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M3 7h18l-1.5 4.5H4.5L3 7Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M5 11.5V21h14v-9.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "wallet":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="6"
            width="18"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M16 12h3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "chart":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M4 20V4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <rect x="7" y="10" width="3" height="10" rx="1" fill="currentColor" />
          <rect x="12" y="6" width="3" height="14" rx="1" fill="currentColor" />
          <rect x="17" y="13" width="3" height="7" rx="1" fill="currentColor" />
        </svg>
      );
    case "heart":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21s-7.5-4.5-9-8.5C2 8.5 4.5 6 7.5 6c1.9 0 3.2.9 4.5 2
                   1.3-1.1 2.6-2 4.5-2C19.5 6 22 8.5 21 12.5 19.5 16.5 12 21 12 21Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "users":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle
            cx="9"
            cy="9"
            r="3.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M3.5 20c.5-3.2 3.2-5 5.5-5s5 1.8 5.5 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle
            cx="18"
            cy="10"
            r="2.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );
    case "clock":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M12 7v5l3 2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "plus":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "gear":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="3.2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M19 12a7 7 0 0 0-.1-1l2-1.6-2-3.4-2.4.9a7 7 0 0 0-1.8-1L12 3 9.3 4
                   a7 7 0 0 0-1.8 1L5.1 4 3.1 7.4 5 9a7 7 0 0 0 0 2L3.1 12.9l2 3.4 2.4-.9
                   a7 7 0 0 0 1.8 1L12 21l2.7-1a7 7 0 0 0 1.8-1l2.4.9 2-3.4-2-1.6c.1-.3.1-.7.1-1Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar({
  active = "home",
  onChange = () => {},
  user = { name: "taoreo", avatar: "https://i.pravatar.cc/120?img=12" },
}) {
  return (
    <aside className={cx("wrap")}>
      {/* Header logo + brand */}
      <div className={cx("brand")}>
        <div className={cx("logo")}>
          <span className={cx("logoDollar")}>$</span>
        </div>
        <div className={cx("brandText")}>Bao La</div>
      </div>

      {/* Nav */}
      <nav className={cx("nav")}>
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              className={cx("navItem", { active: isActive })}
              onClick={() => onChange(item.key)}
              type="button"
            >
              <Icon name={item.icon} className={cx("icon")} />
              <span className={cx("label")}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className={cx("bottom")}>
        <button className={cx("askStanley")} type="button">
          <span className={cx("askIcon")} />
          <span className={cx("askText")}>Hỏi AI</span>
        </button>

        <button className={cx("settings")} type="button">
          <Icon name="gear" className={cx("icon")} />
          <span className={cx("label")}>Cài đặt</span>
        </button>

        <div className={cx("me")}>
          <Avatar src={user.avatar} size={48} className={cx("meAvatar")} />
          <div className={cx("meName")}>{user.name}</div>
        </div>
      </div>
    </aside>
  );
}
