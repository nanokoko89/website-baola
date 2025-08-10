// src/pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./NotFound.module.scss";

const cx = classNames.bind(styles);

export default function NotFound({ username }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/${username}`);
  };

  return (
    <div className={cx("container")}>
      <h1 className={cx("code")}>404</h1>
      <p className={cx("message")}>
        Xin lỗi, chúng tôi không tìm thấy sản phẩm này.
      </p>
      <button className={cx("btn")} onClick={handleBack}>
        Quay về
      </button>
    </div>
  );
}
