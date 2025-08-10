// File: src/common/TimeAvailability/TimeAvailability.jsx

import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import TimeSelect from "./TimeSelect";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import styles from "./TimeAvailability.module.scss";

const cx = classNames.bind(styles);

const WEEK_DAYS = [
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
  "Chủ nhật",
];

/**
 * Cộng minsToAdd phút vào time ("HH:MM"), trả về "HH:MM"
 */
function addMinutes(time, minsToAdd) {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minsToAdd;
  const newH = Math.floor(total / 60) % 24;
  const newM = total % 60;
  return `${newH.toString().padStart(2, "0")}:${newM
    .toString()
    .padStart(2, "0")}`;
}

export default function TimeAvailability({
  step = 15,
  defaultInterval = 60,
  slots = {}, // từ Redux: { day: [{from,to}, ...], ... }
  onChangeSlots = () => {}, // dispatch setAvailableSlots
}) {
  // Khởi tạo default nếu chưa có slots truyền vào
  const defaultInit = WEEK_DAYS.reduce((acc, day, idx) => {
    acc[day] = idx < 5 ? [{ from: "09:00", to: "17:00" }] : [];
    return acc;
  }, {});

  // State nội bộ
  const [availability, setAvailability] = useState(
    Object.keys(slots).length ? slots : defaultInit
  );

  // Khi prop slots thay đổi, đồng bộ lại state
  useEffect(() => {
    if (Object.keys(slots).length) {
      setAvailability(slots);
    }
  }, [slots]);

  // Hàm chung cập nhật state + gọi callback
  const updateAvailability = (newAvailability) => {
    setAvailability(newAvailability);
    onChangeSlots(newAvailability);
  };

  // Bật/tắt active ngày
  const handleToggleDay = (day) => {
    const clone = { ...availability };
    clone[day] =
      clone[day].length > 0
        ? []
        : [{ from: "09:00", to: addMinutes("09:00", defaultInterval) }];
    updateAvailability(clone);
  };

  // Thay đổi from/to
  const handleTimeChange = (day, idx, field, value) => {
    const clone = { ...availability };
    const slotsOfDay = [...clone[day]];
    slotsOfDay[idx] = { ...slotsOfDay[idx], [field]: value };
    clone[day] = slotsOfDay;
    updateAvailability(clone);
  };

  // Thêm slot mới dựa trên slot cuối + defaultInterval
  const handleAddSlot = (day) => {
    const clone = { ...availability };
    const slotsOfDay = [...clone[day]];
    if (slotsOfDay.length === 0) {
      slotsOfDay.push({
        from: "09:00",
        to: addMinutes("09:00", defaultInterval),
      });
    } else {
      const last = slotsOfDay[slotsOfDay.length - 1];
      const newFrom = last.to;
      const newTo = addMinutes(newFrom, defaultInterval);
      slotsOfDay.push({ from: newFrom, to: newTo });
    }
    clone[day] = slotsOfDay;
    updateAvailability(clone);
  };

  // Xóa slot
  const handleRemoveSlot = (day, idx) => {
    const clone = { ...availability };
    clone[day] = clone[day].filter((_, i) => i !== idx);
    updateAvailability(clone);
  };

  return (
    <div className={cx("timeAvailability-container")}>
      <div className={cx("header")}>
        <div className={cx("step-circle")}>2</div>
        <h2 className={cx("title")}>Chọn thời gian sẵn sàng</h2>
      </div>
      <div className={cx("subtitle")}>Sự sẵn sàng của bạn *</div>
      <div className={cx("day-list")}>
        {WEEK_DAYS.map((day) => {
          const slotsOfDay = availability[day];
          const active = slotsOfDay.length > 0;
          return (
            <div key={day} className={cx("day-row")}>
              <div className={cx("column-one")}>
                <button
                  type="button"
                  className={cx("day-button", { active })}
                  onClick={() => handleToggleDay(day)}
                >
                  {day}
                </button>
              </div>
              <div className={cx("slots-container", { hidden: !active })}>
                {slotsOfDay.map((slot, idx) => (
                  <div key={idx} className={cx("time-slot")}>
                    <span className={cx("label")}>Từ</span>
                    <TimeSelect
                      className={cx("time-select")}
                      value={slot.from}
                      onChange={(val) =>
                        handleTimeChange(day, idx, "from", val)
                      }
                      step={step}
                    />
                    <span className={cx("label")}>đến</span>
                    <TimeSelect
                      className={cx("time-select")}
                      value={slot.to}
                      onChange={(val) => handleTimeChange(day, idx, "to", val)}
                      step={step}
                    />
                    <button
                      type="button"
                      className={cx("add-slot")}
                      onClick={() => handleAddSlot(day)}
                    >
                      <FiPlus />
                    </button>
                    <button
                      type="button"
                      className={cx("remove-slot")}
                      onClick={() => handleRemoveSlot(day, idx)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
