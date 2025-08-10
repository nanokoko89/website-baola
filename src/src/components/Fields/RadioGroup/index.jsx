// src/components/RadioGroup/RadioGroup.jsx
import React from "react";
import classNames from "classnames/bind";
import styles from "./RadioGroup.module.scss";

const cx = classNames.bind(styles);

export default function RadioGroup({ label, options, value, onChange }) {
  return (
    <div className={cx("wrapper")}>
      {label && <label className={cx("title")}>{label}</label>}

      {options.map((opt) => (
        <label key={opt.value} className={cx("option")}>
          <input
            type="radio"
            name="radio-group"
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
          <span className={cx("circle")} />
          <span className={cx("label")}>{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
