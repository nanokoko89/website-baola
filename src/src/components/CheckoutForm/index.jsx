// src/components/CheckoutForm/CheckoutForm.jsx
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./CheckoutForm.module.scss";

const cx = classNames.bind(styles);

export default function CheckoutForm({ onNext, onSaveDraft, onDataChange }) {
  // State cho phần hình ảnh sản phẩm
  const [productImage, setProductImage] = useState(null);

  // State cho phần giá
  const [price, setPrice] = useState("9,99");
  const [hasDiscount, setHasDiscount] = useState(false);
  const [discountPrice, setDiscountPrice] = useState("");

  // State cho tiêu đề + mô tả + buy section
  const [title, setTitle] = useState("Get My [Template/eBook/Course] Now!");
  const [description, setDescription] = useState(
    `This [Template/eBook/Course] will teach you everything you need to achieve your goals.\n\n` +
      `This guide is for you if you’re looking to:\n• Achieve your Dream\n• Find Meaning in Your Work\n• Be Happy`
  );
  const [buyHeadline, setBuyHeadline] = useState("Get My Guide");
  const [buyButtonLabel, setBuyButtonLabel] = useState("PURCHASE");

  // State cho phần Collect Info (tạm thời chỉ 2 trường Name + Email)
  // Ở đây hai trường này là disabled (không cho edit)
  // Nếu bạn muốn thêm field động, có thể đưa logic vào onAddField / onRemoveField

  // ==== Phần mới: Digital Product Upload ====

  // mode: 'upload' hoặc 'redirect'
  const [digitalMode, setDigitalMode] = useState("upload");

  // Nếu đang upload file
  const [fileList, setFileList] = useState([]);

  // Nếu đang redirect
  const [redirectURL, setRedirectURL] = useState("");

  // Xử lý khi chọn file
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    const processed = files.map((f) => ({
      name: f.name,
      file: f,
      url: URL.createObjectURL(f),
    }));
    setFileList((prev) => {
      const newList = [...prev, ...processed];
      // Gửi data lên parent nếu cần
      onDataChange && onDataChange({ mode: "upload", files: newList, url: "" });
      return newList;
    });
    e.target.value = null; // reset để lần sau chọn lại cùng file vẫn nhận được
  };

  // Xóa file ở vị trí idx
  const removeFileAtIndex = (idx) => {
    setFileList((prev) => {
      const newList = prev.filter((_, i) => i !== idx);
      onDataChange && onDataChange({ mode: "upload", files: newList, url: "" });
      return newList;
    });
  };

  // Chuyển tab giữa Upload và Redirect
  const handleDigitalModeChange = (newMode) => {
    setDigitalMode(newMode);
    if (newMode === "upload") {
      // reset redirectURL
      setRedirectURL("");
      onDataChange &&
        onDataChange({ mode: "upload", files: fileList, url: "" });
    } else {
      // reset fileList
      setFileList([]);
      onDataChange &&
        onDataChange({ mode: "redirect", files: [], url: redirectURL });
    }
  };

  // Xử lý URL thay đổi
  const handleURLChange = (e) => {
    setRedirectURL(e.target.value);
    onDataChange &&
      onDataChange({ mode: "redirect", files: [], url: e.target.value });
  };

  // ====================== END DIGITAL UPLOAD ======================

  // Xử lý chọn ảnh sản phẩm
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProductImage(reader.result);
      onDataChange &&
        onDataChange({ ...checkoutData, productImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Khi nhấn nút Next (Publish cho bước này)
  const handlePublish = () => {
    // Gửi toàn bộ dữ liệu của CheckoutForm + phần Digital Upload lên parent
    const payload = {
      productImage,
      price,
      hasDiscount,
      discountPrice,
      title,
      description,
      buyHeadline,
      buyButtonLabel,
      digital: {
        mode: digitalMode,
        files: fileList,
        url: redirectURL,
      },
    };
    onNext && onNext(payload);
  };

  return (
    <div className={cx("checkout-form")}>
      <h2 className={cx("form-title")}>Checkout Page</h2>

      {/* ===== Upload ảnh sản phẩm ===== */}
      <div className={cx("form-section")}>
        <label className={cx("label")}>Add a product image</label>
        <div className={cx("image-uploader")}>
          {productImage ? (
            <img
              src={productImage}
              alt="Product"
              className={cx("product-img")}
            />
          ) : (
            <div className={cx("drop-zone")}>
              <span>Drag Your Image Here (1920×1080)</span>
              <button
                className={cx("choose-btn")}
                onClick={() =>
                  document.getElementById("product-file-input").click()
                }
              >
                Choose Image
              </button>
            </div>
          )}
          <input
            id="product-file-input"
            type="file"
            accept="image/*"
            className={cx("file-input")}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
      </div>

      {/* ===== Giá và Discount ===== */}
      <div className={cx("form-row", "two-cols")}>
        <div className={cx("form-col")}>
          <label className={cx("label")}>Price($) *</label>
          <input
            type="text"
            className={cx("input")}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="9,99"
          />
        </div>
        <div className={cx("form-col")}>
          <label className={cx("label")}>
            Discount Price($){" "}
            <input
              type="checkbox"
              checked={hasDiscount}
              onChange={() => setHasDiscount((prev) => !prev)}
            />
          </label>
          {hasDiscount && (
            <input
              type="text"
              className={cx("input")}
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="0"
            />
          )}
        </div>
      </div>

      {/* ===== Title ===== */}
      <div className={cx("form-section")}>
        <label className={cx("label")}>Title</label>
        <input
          type="text"
          className={cx("input")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Get My [Template/eBook/Course] Now!"
        />
      </div>

      {/* ===== Description ===== */}
      <div className={cx("form-section")}>
        <label className={cx("label")}>Description</label>
        <textarea
          className={cx("textarea")}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={cx("generate-ai")}>Generate with AI</div>
      </div>

      {/* ===== Buy Section Headline ===== */}
      <div className={cx("form-section")}>
        <label className={cx("label")}>Buy Section Headline</label>
        <input
          type="text"
          className={cx("input")}
          value={buyHeadline}
          onChange={(e) => setBuyHeadline(e.target.value)}
          placeholder="Get My Guide"
        />
      </div>

      {/* ===== Buy Button Label ===== */}
      <div className={cx("form-section")}>
        <label className={cx("label")}>Buy Button Label</label>
        <input
          type="text"
          className={cx("input")}
          value={buyButtonLabel}
          onChange={(e) => setBuyButtonLabel(e.target.value)}
          placeholder="PURCHASE"
        />
      </div>

      {/* ===== Collect Info ===== */}
      <div className={cx("form-section")}>
        <label className={cx("label")}>Collect Info</label>
        <div className={cx("info-fields")}>
          <input
            type="text"
            disabled
            placeholder="Name"
            className={cx("input", "disabled")}
          />
          <input
            type="email"
            disabled
            placeholder="Email"
            className={cx("input", "disabled")}
          />
        </div>
        <button className={cx("add-field-btn")}>+ Add Field</button>
      </div>

      {/* ===== Digital Product Upload (phần mới) ===== */}
      <div className={cx("form-section")}>
        <h3 className={cx("digital-title")}>Upload your Digital Product</h3>
        <p className={cx("digital-subtitle")}>
          Stan will send these files automatically to your customer upon
          purchase!
        </p>

        {/* Tab chọn giữa Upload File và Redirect to URL */}
        <div className={cx("tab-wrapper")}>
          <button
            className={cx("tab-button", { active: digitalMode === "upload" })}
            onClick={() => handleDigitalModeChange("upload")}
          >
            Upload File
          </button>
          <button
            className={cx("tab-button", { active: digitalMode === "redirect" })}
            onClick={() => handleDigitalModeChange("redirect")}
          >
            Redirect to URL
          </button>
        </div>

        {/* Nội dung theo mode */}
        <div className={cx("content-area")}>
          {digitalMode === "upload" && (
            <div className={cx("upload-area")}>
              {fileList.length === 0 ? (
                <div className={cx("drop-zone-digital")}>
                  <span className={cx("drop-text")}>
                    Drag & drop files here
                  </span>
                  <span className={cx("or-text")}>or</span>
                  <button
                    className={cx("choose-btn")}
                    onClick={() =>
                      document.getElementById("digital-file-input").click()
                    }
                  >
                    Choose File(s)
                  </button>
                  <input
                    id="digital-file-input"
                    type="file"
                    className={cx("file-input")}
                    multiple
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
              ) : (
                <ul className={cx("file-list")}>
                  {fileList.map((item, idx) => (
                    <li key={idx} className={cx("file-item")}>
                      <span className={cx("file-name")}>{item.name}</span>
                      <button
                        className={cx("remove-btn")}
                        onClick={() => removeFileAtIndex(idx)}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                  <button
                    className={cx("add-more-btn")}
                    onClick={() =>
                      document.getElementById("digital-file-input").click()
                    }
                  >
                    + Add More File
                  </button>
                  <input
                    id="digital-file-input"
                    type="file"
                    className={cx("file-input")}
                    multiple
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </ul>
              )}
            </div>
          )}

          {digitalMode === "redirect" && (
            <div className={cx("redirect-area")}>
              <input
                type="text"
                className={cx("url-input")}
                value={redirectURL}
                onChange={handleURLChange}
                placeholder="https://example.com/your-file.zip"
              />
            </div>
          )}
        </div>
      </div>

      {/* ===== Nút Save Draft và Next (Publish) ===== */}
      <div className={cx("form-actions")}>
        <button className={cx("btn", "btn--secondary")} onClick={onSaveDraft}>
          Save As Draft
        </button>
        <button className={cx("btn", "btn--primary")} onClick={handlePublish}>
          Publish
        </button>
      </div>
    </div>
  );
}
