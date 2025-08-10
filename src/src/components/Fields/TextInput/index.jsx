// src/components/TextInput/TextInput.jsx
import React from "react";
import classNames from "classnames/bind";
import styles from "./TextInput.module.scss";

const cx = classNames.bind(styles);

export default function TextInput({
  label,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
}) {
  return (
    <div className={cx("wrapper")}>
      {/* {label && <label className={cx("label")}>{label}</label>} */}
      <input
        className={cx("input", { error })}
        type={type}
        placeholder={placeholder || label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span className={cx("errorMessage")}>{error}</span>}
    </div>
  );
}
