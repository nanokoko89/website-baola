// QRCodeUser.jsx
import React from "react";
import { QRCodeSVG } from "qrcode.react";
import classNames from "classnames/bind";
import styles from "./QRCodeUser.module.scss";

const cx = classNames.bind(styles);

export default function QRCodeUser({ username = "malaca", size = 128 }) {
  // Giá trị encode có thể là chỉ username, hoặc URL đầy đủ như:
  // const value = `https://yourapp.com/user/${username}`;
  const value = "https://bao-la.web.app/malaca";

  return (
    <div className={cx("qr-container")}>
      <QRCodeSVG
        value={value}
        size={size}
        level="H"
        bgColor="#FFFFFF"
        fgColor="#000000"
      />{" "}
      <p className={cx("label")}>@{username}</p>
    </div>
  );
}
