// src/components/ImageUploader/ImageUploader.jsx
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ImageUploader.module.scss";
import ImagePicker from "./ImagePicker";
import ImageEditor from "./ImageEditor";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/authSlice";
import { uploadImage } from "../../config/firebase";

const cx = classNames.bind(styles);

// Icon “cây bút” chồng lên thumbnail
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="#fff"
    viewBox="0 0 24 24"
  >
    <path d="M3 17.25V21h3.75l11.02-11.02-3.75-3.75L3 17.25zM21.41 6.34c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

const ImageUploader = ({ onImageChange, imageUrl }) => {
  const currentUser = useSelector(selectCurrentUser);
  const uid = currentUser?.uid || "";

  // 1. URL mặc định khi chưa chọn
  const DEFAULT_IMAGE_URL =
    "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg";

  const [previewUrl, setPreviewUrl] = useState(imageUrl || DEFAULT_IMAGE_URL);
  const [fileName, setFileName] = useState("Default");
  const [showEditor, setShowEditor] = useState(false);
  const [originalImage, setOriginalImage] = useState(DEFAULT_IMAGE_URL);

  // Kéo–thả lên vùng upload
  const handleDragOverOutside = (e) => e.preventDefault();
  const handleDropOutside = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const tempUrl = URL.createObjectURL(file);
      setPreviewUrl(tempUrl);
      setFileName(file.name);
      setOriginalImage(tempUrl);
      setShowEditor(true);
      onImageChange && onImageChange({ url: tempUrl, author: file.name });
    }
  };

  // Chọn từ picker
  const handleImageSelectFromPicker = ({ url, author }) => {
    setPreviewUrl(url);
    setFileName(author);
    setOriginalImage(url);
    setShowEditor(true);
    onImageChange && onImageChange({ url, author });
  };

  // Mở editor
  const handleOpenEditor = () => {
    setOriginalImage(previewUrl);
    setShowEditor(true);
  };

  // Hủy chỉnh sửa
  const handleCancelEdit = () => setShowEditor(false);

  // Xác nhận chỉnh sửa: crop + upload
  const handleConfirmEdit = async ({ file, url }) => {
    try {
      // Hiển thị tạm ảnh cắt
      setPreviewUrl(url);
      setFileName(file.name || file.type);
      setShowEditor(false);

      // Upload file Blob lên Firebase Storage
      if (file && uid) {
        const remoteUrl = await uploadImage(file, `images/${uid}`);
        setPreviewUrl(remoteUrl);
        onImageChange && onImageChange({ url: remoteUrl, author: file.name });
      } else {
        onImageChange && onImageChange({ url, author: file.name });
      }
    } catch (err) {
      console.error("Upload ảnh thất bại:", err);
    }
  };

  return (
    <>
      <div
        className={cx("uploaderContainer")}
        onDragOver={handleDragOverOutside}
        onDrop={handleDropOutside}
      >
        <div className={cx("thumbnailWrapper")} onClick={handleOpenEditor}>
          <img src={previewUrl} alt="Preview" />
          <div className={cx("editIcon")}>
            <EditIcon />
          </div>
        </div>

        <div className={cx("infoWrapper")}>
          <div className={cx("text")}>
            <p className={cx("title")}>Kéo –thả ảnh tại đây</p>
            <p className={cx("dimensions")}>1920 × 1080</p>
          </div>
          <ImagePicker onSelect={handleImageSelectFromPicker} />
        </div>
      </div>

      {showEditor && (
        <ImageEditor
          imageUrl={originalImage}
          aspect={1}
          cropShape="round"
          onCancel={handleCancelEdit}
          onConfirm={handleConfirmEdit}
        />
      )}
    </>
  );
};

export default ImageUploader;
