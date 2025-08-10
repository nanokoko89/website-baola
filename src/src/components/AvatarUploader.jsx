// AvatarUploader.jsx
import { useState, useRef } from "react";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "./AvatarUploader.module.scss"; // dùng SCSS Module
import classNames from "classnames/bind";
import { cropImageToCircle } from "../config/cropImage";
const cx = classNames.bind(styles);

export default function AvatarUploader() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef();

  // 1) Khi user chọn file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl({ file, url });
  };

  // 2) Crop hình tròn và upload
  const handleUpload = async () => {
    if (!previewUrl) return;
    const blob = await cropImageToCircle(previewUrl.url, 200);
    // tạo reference với tên duy nhất
    const storageRef = ref(storage, `avatars/${Date.now()}.png`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
  };

  return (
    <div className={cx("container")}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      {previewUrl && (
        <>
          <div className={cx("preview-circle")}>
            <img src={previewUrl.url} alt="preview" />
          </div>
          <button onClick={handleUpload}>Upload lên Firebase</button>
        </>
      )}
    </div>
  );
}
