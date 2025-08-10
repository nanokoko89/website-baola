// ActionButtons.jsx
import React from "react";
import classNames from "classnames/bind";
import styles from "./SaveCancel.module.scss";

const cx = classNames.bind(styles);

const SaveCancel = ({
  handleCancel,
  disabledSave = false,
  disabledPublish = false,
  handleSave,
}) => {
  return (
    <div className={cx("actionButtons-container")}>
      <button
        className={cx("btn", "saveDraft")}
        onClick={handleCancel}
        disabled={disabledSave}
      >
        <span>Hủy</span>
      </button>

      <button
        className={cx("btn", "publish")}
        onClick={handleSave}
        disabled={disabledPublish}
      >
        <span>Lưu</span>
      </button>
    </div>
  );
};

export default SaveCancel;
