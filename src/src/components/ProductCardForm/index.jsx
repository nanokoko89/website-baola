// src/components/ProductCardForm/ProductCardForm.jsx
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ProductCardForm.module.scss";

const cx = classNames.bind(styles);

export default function ProductCardForm({ onNext, onSaveDraft }) {
  const [styleOption, setStyleOption] = useState("callout");
  const [title, setTitle] = useState("Get My [Template/eBook/Course] Now!");
  const [description, setDescription] = useState(
    "We will deliver this file right to your inbox"
  );
  const [buttonLabel, setButtonLabel] = useState("Get My Guide");
  const [thumbnail, setThumbnail] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setThumbnail(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={cx("product-card-form")}>
      <h2 className={cx("form-title")}>Product card</h2>
      <div className={cx("form-section")}>
        <label className={cx("label")}>Pick a style</label>
        <div className={cx("radio-group")}>
          {["button", "callout", "preview"].map((opt) => (
            <label key={opt} className={cx("radio-label")}>
              <input
                type="radio"
                name="style"
                value={opt}
                checked={styleOption === opt}
                onChange={() => setStyleOption(opt)}
              />
              <span className={cx("radio-text")}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className={cx("preview-box")}>
        {/* Mình mô phỏng preview dựa vào styleOption */}
        <div className={cx("preview-box__inner", styleOption)}>
          <div className={cx("preview-thumbnail")}>
            <div className={cx("thumbnail-placeholder")}>
              {thumbnail ? (
                <img src={thumbnail} alt="Thumbnail" />
              ) : (
                <div className={cx("no-image")} />
              )}
            </div>
          </div>
          <div className={cx("preview-content")}>
            <h3 className={cx("preview-title")}>{title}</h3>
            <p className={cx("preview-desc")}>{description}</p>
            <span className={cx("preview-price")}>$9.99</span>
            <button className={cx("preview-button")}>{buttonLabel}</button>
          </div>
        </div>
      </div>

      <div className={cx("form-section")}>
        <label className={cx("label")}>Add a title</label>
        <input
          type="text"
          className={cx("input")}
          value={title}
          maxLength={50}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Get My [Template/eBook/Course] Now!"
        />
        <div className={cx("char-count")}>{title.length}/50</div>
      </div>

      <div className={cx("form-section")}>
        <label className={cx("label")}>Description</label>
        <input
          type="text"
          className={cx("input")}
          value={description}
          maxLength={100}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="We will deliver this file right to your inbox"
        />
        <div className={cx("char-count")}>{description.length}/100</div>
      </div>

      <div className={cx("form-section")}>
        <label className={cx("label")}>Button</label>
        <input
          type="text"
          className={cx("input")}
          value={buttonLabel}
          maxLength={30}
          onChange={(e) => setButtonLabel(e.target.value)}
          placeholder="Get My Guide"
        />
        <div className={cx("char-count")}>{buttonLabel.length}/30</div>
      </div>

      <div className={cx("form-section")}>
        <label className={cx("label")}>Add a thumbnail</label>
        <div className={cx("thumbnail-uploader")}>
          {thumbnail ? (
            <img
              src={thumbnail}
              alt="Thumb Preview"
              className={cx("thumb-img")}
            />
          ) : (
            <div className={cx("thumb-placeholder")}>Thumbnail 400×400</div>
          )}
          <input
            type="file"
            accept="image/*"
            className={cx("file-input")}
            onChange={handleImageChange}
          />
        </div>
      </div>

      <div className={cx("form-actions")}>
        <button className={cx("btn", "btn--secondary")} onClick={onSaveDraft}>
          Save As Draft
        </button>
        <button className={cx("btn", "btn--primary")} onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}
