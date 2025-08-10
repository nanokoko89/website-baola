// src/components/Notifications/Notifications.jsx
import React, { useState } from "react";
import classNames from "classnames/bind";
import {
  AiOutlineMail,
  AiOutlineBell,
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import styles from "./Notifications.module.scss";

const cx = classNames.bind(styles);

const Notifications = () => {
  // State cài đặt nhận thông báo
  const [settings, setSettings] = useState({
    email: true,
    push: true,
  });

  // State danh sách thông báo mẫu
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Tài khoản của bạn đã được duyệt",
      message:
        "Chúc mừng! Tài khoản của bạn đã được xác thực và kích hoạt thành công.",
      time: "2025-06-05 10:30",
      isRead: false,
    },
    {
      id: 2,
      title: "Khuyến mãi mới từ nền tảng",
      message:
        "Giảm 20% cho đơn hàng đầu tiên của bạn trong tháng này. Nhanh tay để không bỏ lỡ!",
      time: "2025-06-04 16:15",
      isRead: true,
    },
    {
      id: 3,
      title: "Cập nhật chính sách bảo mật",
      message:
        "Chúng tôi vừa cập nhật chính sách bảo mật. Vui lòng đọc kỹ “Điều khoản & Điều kiện” mới.",
      time: "2025-06-01 09:00",
      isRead: false,
    },
    // ... có thể thêm nhiều thông báo mẫu khác
  ]);

  // Bật/tắt cài đặt nhận thông báo
  const handleSettingChange = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Đánh dấu đã đọc / chưa đọc
  const toggleReadStatus = (id) => {
    setNotifications((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isRead: !item.isRead } : item
      )
    );
  };

  return (
    <div className={cx("notifications")}>
      {/* Tiêu đề chính */}
      <h2 className={cx("sectionTitle")}>
        <AiOutlineBell className={cx("iconTitle")} /> Thông báo của tôi
      </h2>

      {/* Phần Cài đặt nhận thông báo */}
      <div className={cx("settingsSection")}>
        <h3 className={cx("subTitle")}>
          <AiOutlineMail className={cx("iconSub")} /> Cài đặt nhận thông báo
        </h3>
        <div className={cx("settingsGroup")}>
          <label className={cx("settingItem")}>
            <input
              type="checkbox"
              checked={settings.email}
              onChange={() => handleSettingChange("email")}
            />
            <span className={cx("settingLabel")}>Nhận thông báo qua Email</span>
          </label>

          <label className={cx("settingItem")}>
            <input
              type="checkbox"
              checked={settings.push}
              onChange={() => handleSettingChange("push")}
            />
            <span className={cx("settingLabel")}>
              Nhận thông báo đẩy (Push)
            </span>
          </label>
        </div>
      </div>

      {/* Phần Danh sách Thông báo */}
      <div className={cx("listSection")}>
        <h3 className={cx("subTitle")}>Danh sách thông báo</h3>
        {notifications.length === 0 ? (
          <p className={cx("noNotification")}>Chưa có thông báo nào.</p>
        ) : (
          <ul className={cx("notificationList")}>
            {notifications.map((item) => (
              <li
                key={item.id}
                className={cx("notificationItem", {
                  unread: !item.isRead,
                  read: item.isRead,
                })}
              >
                <div className={cx("notificationContent")}>
                  <div className={cx("titleRow")}>
                    <span className={cx("notifTitle")}>{item.title}</span>
                    <button
                      className={cx("markButton")}
                      onClick={() => toggleReadStatus(item.id)}
                      title={
                        item.isRead ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc"
                      }
                    >
                      {item.isRead ? (
                        <AiOutlineExclamationCircle
                          className={cx("iconMark")}
                        />
                      ) : (
                        <AiOutlineCheckCircle className={cx("iconMark")} />
                      )}
                    </button>
                  </div>
                  <p className={cx("notifMessage")}>{item.message}</p>
                  <span className={cx("notifTime")}>{item.time}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;
