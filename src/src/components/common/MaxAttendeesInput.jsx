// MaxAttendeesInput.jsx

import React from "react";
import styles from "./MaxAttendeesInput.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

/**
 * MaxAttendeesInput Component
 * - props:
 *    - label (string): Tiêu đề (thường là "Max Attendees")
 *    - description (string): Mô tả phụ (ví dụ "Host a group call...")
 *    - value (number|string): Giá trị hiện tại của input
 *    - onChange (function): Callback khi giá trị input thay đổi
 *    - suffix (string): Chữ hiện bên phải trong input (ví dụ "Attendees")
 *    - placeholder (string): Placeholder cho input (nếu cần)
 *    - min (number): Số nhỏ nhất được phép nhập (mặc định 1)
 *    - max (number): Số lớn nhất (nếu cần giới hạn)
 */
const MaxAttendeesInput = ({
  label = "Max Attendees",
  description = "Host a group call by letting 1+ attendees join the meeting.",
  value = 1,
  onChange = () => {},
  suffix = "Attendees",
  placeholder = "",
  min = 1,
  max = null,
}) => {
  // Handler khi user thay đổi giá trị input
  const handleInputChange = (e) => {
    const raw = e.target.value;
    // Chỉ giữ lại số, loại bỏ ký tự không phải số (nếu copy-paste)
    const numeric = raw.replace(/\D/g, "");
    if (numeric === "") {
      onChange("");
      return;
    }
    // Ép kiểu number
    const numValue = parseInt(numeric, 10);
    // Giới hạn min/max nếu có
    if (min != null && numValue < min) {
      onChange(min);
      return;
    }
    if (max != null && numValue > max) {
      onChange(max);
      return;
    }
    onChange(numValue);
  };

  return (
    <div className={cx("container")}>
      {/* Tiêu đề */}
      <label className="label">{label}</label>
      {/* Mô tả phụ */}
      {description && <p className={cx("description")}>{description}</p>}

      {/* Wrapper cho input + suffix */}
      <div className={cx("inputWrapper")}>
        <input
          type="text" /* Dùng text để dễ xử lý ép só */
          inputMode="numeric" /* Gợi bàn phím số trên di động */
          pattern="[0-9]*"
          className={cx("inputField")}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
        />

        {/* Suffix hiển thị bên phải */}
        <span className={cx("suffix")}>{suffix}</span>
      </div>
    </div>
  );
};

export default MaxAttendeesInput;
