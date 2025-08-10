import React, { useMemo } from "react";
import classNames from "classnames/bind";
import styles from "./TimeSelect.module.scss";

const cx = classNames.bind(styles);

/**
 * TimeSelect component
 *
 * Props:
 * - value: string, định dạng "HH:MM" (ví dụ "09:00")
 * - onChange: function(value: string)
 * - step: number (phút), khoảng cách giữa các mốc thời gian (mặc định 30)
 * - className: chuỗi className tuỳ chỉnh
 */
export default function TimeSelect({ value, onChange, step = 30, className }) {
  const options = useMemo(() => {
    const opts = [];
    for (let totalMin = 0; totalMin < 24 * 60; totalMin += step) {
      const hour = Math.floor(totalMin / 60);
      const minute = totalMin % 60;
      const hh = String(hour).padStart(2, "0");
      const mm = String(minute).padStart(2, "0");
      const val = `${hh}:${mm}`;

      // Đổi sang 12h với AM/PM
      const hour12 = hour % 12 === 0 ? 12 : hour % 12;
      const period = hour < 12 ? "AM" : "PM";
      const label = `${hour12}:${mm} ${period}`;

      opts.push({ value: val, label });
    }
    return opts;
  }, [step]);

  return (
    <select
      className={cx("time-select", className)}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map(({ value: v, label }) => (
        <option key={v} value={v}>
          {label}
        </option>
      ))}
    </select>
  );
}
