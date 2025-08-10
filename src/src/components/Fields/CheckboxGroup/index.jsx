// src/components/CheckboxGroup/CheckboxGroup.jsx
import React from "react";
import classNames from "classnames/bind";
import styles from "./CheckboxGroup.module.scss";

const cx = classNames.bind(styles);

export default function CheckboxGroup({ label, options, values, onChange }) {
  const toggle = (val) => {
    if (values.includes(val)) onChange(values.filter((v) => v !== val));
    else onChange([...values, val]);
  };

  return (
    <div className={cx("wrapper")}>
      {label && <label className={cx("title")}>{label}</label>}

      {options.map((opt) => (
        <label key={opt.value} className={cx("option")}>
          <input
            type="checkbox"
            checked={values.includes(opt.value)}
            onChange={() => toggle(opt.value)}
          />
          <span className={cx("box")} />
          <span className={cx("label")}>{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
