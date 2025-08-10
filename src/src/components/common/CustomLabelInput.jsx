// src/common/CustomLabelInput.jsx
import React from "react";
import cx from "classnames/bind";
import styles from "./CustomLabelInput.module.scss";
const cn = cx.bind(styles);

export default function CustomLabelInput({
  label = "Nút",
  maxLength = 30,
  required = false,
  placeholder = "",
  value = "", // ← nhận giá trị từ props
  onChange, // ← đẩy về parent
}) {
  const handleChange = (e) => {
    const newValue = e.target.value.slice(0, maxLength);
    onChange?.(newValue);
  };

  return (
    <div className={cn("wrapper")}>
      <div className={cn("header")}>
        <label className={cn("label")}>
          {label}
          {required && "*"}
        </label>
        <span className={cn("counter")}>
          {value.length}/{maxLength}
        </span>
      </div>
      <input
        type="text"
        className={cn("input")}
        value={value} // ← dùng trực tiếp prop
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
}
