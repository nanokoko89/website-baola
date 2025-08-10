// PasteURL.jsx
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./PasteURL.module.scss";

const cx = classNames.bind(styles);

const MAX_LENGTH = 1024;

const PasteURL = () => {
  const [url, setUrl] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    // Giới hạn không cho vượt quá MAX_LENGTH
    if (newValue.length <= MAX_LENGTH) {
      setUrl(newValue);
    }
  };

  return (
    <div className={cx("pasteURL-container")}>
      {/* Header: vòng tròn số 2 + tiêu đề */}
      <div className={cx("header")}>
        <div className={cx("step-circle")}>2</div>
        <h2 className={cx("title")}>Paste URL*</h2>
      </div>

      {/* Wrapper cho input + icon + char counter */}
      <div className={cx("input-wrapper")}>
        {/* Icon hình link: dùng SVG inline */}
        <svg
          className={cx("icon-link")}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.59 13.41a2 2 0 010-2.82L13.17 8a2 2 0 112.82 2.82l-1.06 1.06"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.76 16.24a2 2 0 010-2.82l3.58-3.59a2 2 0 112.82 2.82l-1.06 1.06"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Input chính */}
        <input
          type="text"
          placeholder="http://your-link"
          value={url}
          onChange={handleChange}
        />

        {/* Char counter */}
        <div className={cx("char-counter")}>
          {url.length}/{MAX_LENGTH}
        </div>
      </div>
    </div>
  );
};

export default PasteURL;
