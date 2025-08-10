// CustomSelect.jsx

import React, { useState, useRef, useEffect } from "react";
import styles from "./CustomSelect.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

/**
 * CustomSelect
 * - options: mảng các object { value, label, icon (URL hoặc component) }
 * - defaultValue: giá trị value mặc định (string)
 * - onChange: callback khi chọn 1 option, trả về value
 * - labelText: nhãn hiển thị bên trên
 * - width: (tuỳ chọn) width CSS, ví dụ "260px"
 */
const CustomSelect = ({
  options = [],
  defaultValue = null,
  onChange = () => {},
  labelText = "",
  width = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const rootRef = useRef(null);

  // Chuyển từ giá trị value sang object option đầy đủ
  const selectedOption = options.find((opt) => opt.value === selected) || null;

  // Toggle dropdown
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // Khi click chọn 1 option
  const handleOptionClick = (opt) => {
    setSelected(opt.value);
    onChange(opt.value);
    setIsOpen(false);
  };

  // Click ngoài để đóng dropdown
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

  return (
    <div
      className={cx("container")}
      ref={rootRef}
      style={width ? { width: width } : {}}
    >
      {labelText && <label className={cx("label")}>{labelText}</label>}

      <div className={cx("selectBox", { open: isOpen })} onClick={handleToggle}>
        <div className={cx("selectedValue")}>
          {selectedOption &&
            selectedOption.icon &&
            // Nếu icon là URL string, dùng <img/>
            (typeof selectedOption.icon === "string" ? (
              <img
                src={selectedOption.icon}
                alt="icon"
                className={cx("selectedIcon")}
              />
            ) : (
              // Nếu icon là React component, giả sử được truyền vào
              <span className={cx("selectedIcon")}>{selectedOption.icon}</span>
            ))}
          <span>{selectedOption ? selectedOption.label : "— Chưa chọn —"}</span>
        </div>
        <div className={cx("arrow")}>▾</div>
      </div>

      {isOpen && (
        <ul className={cx("optionsList")}>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={cx("optionItem", {
                // Nếu muốn đánh dấu option đang chọn
                // selected: opt.value === selected
              })}
              onClick={() => handleOptionClick(opt)}
            >
              {opt.icon &&
                (typeof opt.icon === "string" ? (
                  <img src={opt.icon} alt="icon" className={cx("optionIcon")} />
                ) : (
                  <span className={cx("optionIcon")}>{opt.icon}</span>
                ))}
              <span>{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
