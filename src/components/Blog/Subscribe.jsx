// src/components/Subscribe/Subscribe.jsx
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Subscribe.module.scss";

const cx = classNames.bind(styles);

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    alert("Cảm ơn bạn đã đăng ký!");
  };

  return (
    <div className={cx("subscribe-wrapper")}>
      <div className={cx("content")}>
        <h2 className={cx("title")}>
          Đăng ký nhận bản tin hàng tuần dành cho Creator
        </h2>
        <p className={cx("subtitle")}>
          Liều lượng tin tức, công cụ, chiến lược và cảm hứng dành cho Creator
          mỗi tuần.
        </p>

        <form className={cx("form")} onSubmit={handleSubmit}>
          <input
            type="email"
            className={cx("email-input")}
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className={cx("submit-button")}>
            Đăng ký
          </button>
        </form>

        <p className={cx("disclaimer")}>
          Bằng cách đăng ký, bạn đồng ý nhận thông tin về tin tức, sự kiện và ưu
          đãi từ Bao La.
        </p>
      </div>
    </div>
  );
};

export default Subscribe;
