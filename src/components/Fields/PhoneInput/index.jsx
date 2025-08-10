// src/components/PhoneInput/PhoneInput.jsx
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./PhoneInput.module.scss";

const cx = classNames.bind(styles);
const countryCodes = [
  { code: "+1", label: "US" },
  { code: "", label: "VN" },
  // ...thêm khi cần
];

export default function PhoneInput({ value, onChange }) {
  const [selected, setSelected] = useState(
    countryCodes.find((ct) => ct.code === "+84") || countryCodes[0]
  );
  return (
    <div className={cx("wrapper")}>
      <div className={cx("zip")}>VN +84</div>
      <input
        className={cx("input")}
        type="tel"
        placeholder="Enter your phone number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
