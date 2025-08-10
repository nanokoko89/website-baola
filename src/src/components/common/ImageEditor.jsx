import React, { useState, useCallback, useEffect } from "react";
import classNames from "classnames/bind";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../config/cropImage";
import styles from "./ImageEditor.module.scss";

const cx = classNames.bind(styles);

const ImageEditor = ({
  imageUrl, // URL gốc của ảnh (Object URL hoặc URL bình thường)
  onCancel, // gọi khi người dùng bấm “Cancel”
  onConfirm, // gọi khi người dùng bấm “Use this photo” (trả về { file, url })
  aspect = 1, // tỉ lệ crop = 1 (hình vuông)
  cropShape = "round", // 'round' để mask tròn; 'rect' để mask vuông/chữ nhật
}) => {
  // ===== 1. State quản lý =====
  // crop.x, crop.y trong react-easy-crop chạy từ -100 → +100 (tỉ lệ %)
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1); // Mặc định zoom = 1
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Khi imageUrl thay đổi (mở modal mới), reset crop và zoom
  useEffect(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  }, [imageUrl]);

  // Khi cropComplete: lưu khu vực crop tính theo pixel
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Khi bấm “Use this photo”: thực hiện crop thật và trả về kết quả
  const handleConfirm = useCallback(async () => {
    try {
      const croppedResult = await getCroppedImg(imageUrl, croppedAreaPixels, 0);
      // croppedResult = { file: Blob (image/jpeg), url: ObjectURL }
      onConfirm && onConfirm(croppedResult);
    } catch (e) {
      console.error("Crop thất bại:", e);
    }
  }, [imageUrl, croppedAreaPixels, onConfirm]);

  return (
    <div className={cx("overlay")}>
      <div className={cx("modal")}>
        {/* ===== 2. Header: tiêu đề + nút đóng ===== */}
        <div className={cx("header")}>
          <h3 className={cx("title")}>Cắt, thu phóng hoặc di chuyển</h3>
          <button className={cx("closeBtn")} onClick={onCancel}>
            ×
          </button>
        </div>

        {/* ===== 3. Vùng crop (vuông chứa ảnh + mask tròn) ===== */}
        <div className={cx("cropOuterContainer")}>
          <div className={cx("cropContainer")}>
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              aspect={aspect} // aspect = 1 để tạo vùng vuông
              cropShape={cropShape} // 'round' hoặc 'rect'
              showGrid={false} // Ẩn lưới
              restrictPosition={true} // Giới hạn để mask luôn nằm trong ảnh
              objectFit="cover" // Ép ảnh phủ kín vùng crop
              objectPosition="center" // Ảnh luôn căn giữa vùng crop
              minZoom={1} // zoom tối thiểu = 1 (không cho co nhỏ dưới 1)
              maxZoom={2} // zoom tối đa = 2
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        </div>

        {/* ===== 4. Slider Zoom + Nút “−” / “＋” ===== */}
        <div className={cx("controls")}>
          <button
            onClick={() => setZoom((z) => Math.max(1, z - 0.1))}
            className={cx("zoomBtn")}
          >
            −
          </button>
          <input
            type="range"
            min={1}
            max={2}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className={cx("slider")}
          />
          <button
            onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
            className={cx("zoomBtn")}
          >
            ＋
          </button>
        </div>

        {/* ===== 5. Footer: hai nút “Cancel” và “Use this photo” ===== */}
        <div className={cx("footer")}>
          <button className={cx("btnCancel")} onClick={onCancel}>
            Hủy
          </button>
          <button className={cx("btnConfirm")} onClick={handleConfirm}>
            Sử dụng ảnh này
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
