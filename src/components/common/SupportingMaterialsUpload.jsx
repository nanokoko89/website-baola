// src/components/SupportingMaterialsUpload/SupportingMaterialsUpload.jsx
import React, { useState, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./SupportingMaterialsUpload.module.scss";

const cx = classNames.bind(styles);

export default function SupportingMaterialsUpload({ onFilesSelect }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    onFilesSelect?.(files);
  };

  const handleButtonClick = () => inputRef.current.click();
  const handleInputChange = (e) => {
    const files = Array.from(e.target.files);
    onFilesSelect?.(files);
  };

  return (
    <div
      className={cx("container", { dragging: isDragging })}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={cx("header")}>
        <h2>Tài liệu hỗ trợ (Nếu có)</h2>
        <p>
          Hãy tải lên bất kỳ tệp nào để giúp học sinh của bạn hoàn thành bài học
          này
        </p>
      </div>
      <div className={cx("body")}>
        <p className={cx("dragText")}>Kéo thả file tại đây</p>
        <button type="button" className={cx("btn")} onClick={handleButtonClick}>
          Tải lên
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          className={cx("fileInput")}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
