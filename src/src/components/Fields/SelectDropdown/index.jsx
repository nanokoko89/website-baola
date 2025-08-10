// src/components/SelectDropdown/SelectDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./SelectDropdown.module.scss";

const cx = classNames.bind(styles);

export default function SelectDropdown({
  options,
  placeholder,
  value,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={cx("wrapper")}>
      <div className={cx("header")} onClick={() => setOpen((o) => !o)}>
        {value ? options.find((o) => o.value === value)?.label : placeholder}
        <span className={cx("arrow", { open })} />
      </div>
      {open && (
        <div className={cx("list")}>
          {options.map((opt) => (
            <span
              key={opt.value}
              className={cx("item")}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
