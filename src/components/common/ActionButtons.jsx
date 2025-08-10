// ActionButtons.jsx
import React from "react";
import classNames from "classnames/bind";
import styles from "./ActionButtons.module.scss";

const cx = classNames.bind(styles);

const ActionButtons = ({
  title = "Tiếp tục",
  deleteBtn,
  onDelete,
  onSaveAsDraft,
  onPublish,
  disabledDelete = false,
  disabledSave = false,
  disabledPublish = false,
  handleBtn,
}) => {
  return (
    <div className={cx("actionButtons-container")}>
      {/* Delete Button */}
      <div className={cx("left-container")}>
        {deleteBtn && (
          <button
            className={cx("btn", "delete")}
            onClick={onDelete}
            disabled={disabledDelete}
          >
            {/* Icon thùng rác (Delete) */}
            <svg viewBox="0 0 24 24">
              <path
                d="M3 6h18M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <span>Xóa</span>
          </button>
        )}
      </div>
      {/* <button
        className={cx("btn", "saveDraft")}
        onClick={onSaveAsDraft}
        disabled={disabledSave}
      >
        <svg viewBox="0 0 24 24">
          <path
            d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M17 21v-8H7v8M7 3v6h8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Lưu bản nháp</span>
      </button> */}

      {/* Publish Button */}
      <button
        className={cx("btn", "publish")}
        onClick={handleBtn}
        disabled={disabledPublish}
      >
        <span>{title}</span>
      </button>
    </div>
  );
};

export default ActionButtons;
