// MeetingBreakSettings.jsx

import React, { useState } from "react";
import styles from "./MeetingBreakSettings.module.scss";
import classNames from "classnames/bind";
import DurationSelect from "./DurationSelect";
// Lưu ý: đường dẫn tuỳ theo project. Mình giả sử DurationSelect nằm ở ../DurationSelect

const cx = classNames.bind(styles);

/**
 * MeetingBreakSettings
 * - Hiển thị phần "Nghỉ Giữa Các Cuộc Họp"
 * - Cho phép bật/tắt nghỉ trước/sau cuộc họp, và chọn thời lượng khi bật.
 */
const MeetingBreakSettings = ({
  preventTime = "",
  breakBefore = "",
  breakAfter = "",
  onPreventTimeChange = () => {},
  onBreakBeforeChange = () => {},
  onBreakAfterChange = () => {},
}) => {
  const [beforeEnabled, setBeforeEnabled] = useState(Boolean(breakBefore));
  const [beforeDuration, setBeforeDuration] = useState(
    breakBefore || "15 min"
  );

  const [afterEnabled, setAfterEnabled] = useState(Boolean(breakAfter));
  const [afterDuration, setAfterDuration] = useState(breakAfter || "15 min");

  // Các lựa chọn thời lượng (có thể tuỳ chỉnh)
  const durationOptions = [
    "0 min",
    "5 min",
    "10 min",
    "15 min",
    "30 min",
    "45 min",
    "60 min",
  ];

  // Update parent when duration or enable state changes
  const handleBeforeChange = (val) => {
    setBeforeDuration(val);
    onBreakBeforeChange(beforeEnabled ? val : "");
  };

  const handleAfterChange = (val) => {
    setAfterDuration(val);
    onBreakAfterChange(afterEnabled ? val : "");
  };

  const handleBeforeToggle = (checked) => {
    setBeforeEnabled(checked);
    if (!checked) onBreakBeforeChange("");
    else onBreakBeforeChange(beforeDuration);
  };

  const handleAfterToggle = (checked) => {
    setAfterEnabled(checked);
    if (!checked) onBreakAfterChange("");
    else onBreakAfterChange(afterDuration);
  };

  const handlePreventChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    onPreventTimeChange(raw);
  };

  return (
    <div className={cx("container")}>
      {/* Tiêu đề */}
      <h2 className={cx("title")}>Nghỉ Giữa Các Cuộc Họp</h2>

      {/* Mô tả */}
      <p className={cx("description")}>
        Dành một chút thời gian dự phòng để bạn chuẩn bị hoặc kết thúc cuộc họp
        tiếp theo
      </p>

      <div className={cx("row")}
        style={{ marginBottom: "16px" }}>
        <div className={cx("column")}> 
          <label className={cx("switchLabel")}>Ngăn đặt chỗ trước (giờ)</label>
          <input
            type="text"
            className={cx("inputField")}
            value={preventTime}
            onChange={handlePreventChange}
          />
        </div>
      </div>

      <div className={cx("row")}>
        {/* Cột 1: Trước cuộc họp */}
        <div className={cx("column")}>
          <div className={cx("switchWrapper")}>
            <span className={cx("switchLabel")}>Trước cuộc họp</span>
            <label className={cx("toggleSwitch")}>
              <input
                type="checkbox"
                checked={beforeEnabled}
                onChange={(e) => handleBeforeToggle(e.target.checked)}
              />
              <span className={cx("slider")}></span>
            </label>
          </div>
          <div className={cx("dropdownWrapper")}>
            <DurationSelect
              options={durationOptions}
              defaultValue={beforeDuration}
              onChange={handleBeforeChange}
              disabled={!beforeEnabled}
              width="100%"
            />
          </div>
        </div>

        {/* Cột 2: Sau cuộc họp */}
        <div className={cx("column")}>
          <div className={cx("switchWrapper")}>
            <span className={cx("switchLabel")}>Sau cuộc họp</span>
            <label className={cx("toggleSwitch")}>
              <input
                type="checkbox"
                checked={afterEnabled}
                onChange={(e) => handleAfterToggle(e.target.checked)}
              />
              <span className={cx("slider")}></span>
            </label>
          </div>
          <div className={cx("dropdownWrapper")}>
            <DurationSelect
              options={durationOptions}
              defaultValue={afterDuration}
              onChange={handleAfterChange}
              disabled={!afterEnabled}
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingBreakSettings;
