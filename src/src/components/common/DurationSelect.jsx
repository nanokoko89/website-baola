// DurationSelect.jsx

import React, { useState, useRef, useEffect } from "react";
import styles from "./DurationSelect.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

/**
 * DurationSelect
 * props:
 *  - options: mảng các string ví dụ ["15 min", "30 min", "45 min", ...]
 *  - defaultValue: giá trị ban đầu (string), mặc định "15 min"
 *  - onChange: callback khi chọn xong, trả về value string
 *  - disabled: boolean (mặc định false). Nếu true, không thể mở dropdown.
 *  - width: (string) ví dụ "200px" để override width.
 */
const DurationSelect = ({
  options = ["15 min", "30 min", "45 min", "60 min", "90 min", "120 min"],
  defaultValue = "15 min",
  onChange = () => {},
  disabled = false,
  width = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const rootRef = useRef(null);

  // Tắt dropdown khi click ngoài
  const handleClickOutside = (e) => {
    if (rootRef.current && !rootRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle open/close nếu không disabled
  const handleToggle = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  // Khi click chọn 1 option
  const handleOptionClick = (value) => {
    setSelected(value);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div
      className={cx("container")}
      ref={rootRef}
      style={width ? { width: width } : {}}
    >
      <div
        className={cx("selectBox", {
          open: isOpen,
          disabled: disabled,
        })}
        onClick={handleToggle}
      >
        <span className={cx("selectedValue")}>{selected}</span>
        <span className={cx("arrow")}>▾</span>
      </div>

      {isOpen && !disabled && (
        <ul className={cx("optionsList")}>
          {options.map((opt) => (
            <li
              key={opt}
              className={cx("optionItem", {
                selected: opt === selected,
              })}
              onClick={() => handleOptionClick(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DurationSelect;
