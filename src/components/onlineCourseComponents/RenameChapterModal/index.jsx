import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./RenameChapterModal.module.scss";
import CustomLabelInput from "../../common/CustomLabelInput";
import { FiX } from "react-icons/fi";

const cx = classNames.bind(styles);

export default function RenameChapterModal({
  isOpen,
  initialTitle = "",
  onClose,
  onSave,
}) {
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave?.(title);
  };

  return (
    <div className={cx("overlay")} onClick={onClose}>
      <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
        <button className={cx("closeBtn")} onClick={onClose}>
          <FiX size={20} />
        </button>
        <h2 className={cx("title")}>Sửa tên</h2>
        <CustomLabelInput
          label="Tiêu đề chương"
          value={title}
          onChange={setTitle}
        />
        <div className={cx("actions")}>
          <button className={cx("cancelBtn")} onClick={onClose}>
            Hủy
          </button>
          <button className={cx("saveBtn")} onClick={handleSave}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
