import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ChangeThumbnailModal.module.scss";
import { FiX } from "react-icons/fi";
import PickStyle from "../../../common/PickStyle";
import TemplateStylePreview from "../../../utils/TemplateStylePreview/TemplateStylePreview";
import ImageUploader from "../../../common/ImageUploader";
import CustomLabelInput from "../../../common/CustomLabelInput";
import NumberLabel from "../../../common/NumberLabel";

const cx = classNames.bind(styles);

export default function ChangeThumbnailModal({
  isOpen,
  product,
  onClose,
  onSave,
  onPickStyle,
  onTitleChange,
  onDescriptionChange,
  onButtonTextChange,
  onImageUpload,
}) {
  const [style, setStyle] = useState(product?.template.pickStyle || "button");
  const [title, setTitle] = useState(product?.template.addText.title || "");
  const [description, setDescription] = useState(
    product?.template.addText.description || ""
  );
  const [buttonText, setButtonText] = useState(
    product?.template.addText.buttonText || ""
  );
  const [imageUrl, setImageUrl] = useState(product?.template.imageUrl || "");

  useEffect(() => {
    if (product) {
      setStyle(product.template.pickStyle || "button");
      setTitle(product.template.addText.title || "");
      setDescription(product.template.addText.description || "");
      setButtonText(product.template.addText.buttonText || "");
      setImageUrl(product.template.imageUrl || "");
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleStyleChange = (val) => {
    setStyle(val);
    onPickStyle && onPickStyle(val);
  };

  const handleImageChange = (url) => {
    setImageUrl(url);
    onImageUpload && onImageUpload(url);
  };

  const handleTitleChange = (val) => {
    setTitle(val);
    onTitleChange && onTitleChange(val);
  };

  const handleDescriptionChange = (val) => {
    setDescription(val);
    onDescriptionChange && onDescriptionChange(val);
  };

  const handleButtonTextChange = (val) => {
    setButtonText(val);
    onButtonTextChange && onButtonTextChange(val);
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        style,
        imageUrl,
        title,
        description,
        buttonText,
      });
    }
  };

  return (
    <div className={cx("backdrop")} onClick={onClose}>
      <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
        <button className={cx("closeBtn")} onClick={onClose}>
          <FiX size={20} />
        </button>
        <h3 className={cx("title")}>Đổi kiểu hiển thị</h3>

        <div className={cx("preview")}>
          <TemplateStylePreview
            type={style}
            productType={product.type}
            title={title}
            description={description}
            buttonText={buttonText}
            imageUrl={imageUrl}
            price={product.checkout?.price || 0}
            calendarHeaderOnly={style === "preview"}
          />
        </div>

        <div className={cx("section")}>
          <NumberLabel number="1" label="Chọn kiểu mẫu" />
          <PickStyle selectedStyle={style} setTypeStyle={handleStyleChange} />
        </div>

        <NumberLabel number="2" label="Chọn ảnh" />
        <ImageUploader
          onImageChange={({ url }) => handleImageChange(url)}
          imageUrl={imageUrl}
        />
        <NumberLabel number="3" label="Thêm chữ" />
        <CustomLabelInput
          label="Tiêu đề"
          maxLength={50}
          value={title}
          onChange={handleTitleChange}
        />
        <CustomLabelInput
          label="Mô tả"
          maxLength={100}
          value={description}
          onChange={handleDescriptionChange}
        />
        <CustomLabelInput
          label="Nút kêu gọi"
          maxLength={30}
          required
          value={buttonText}
          onChange={handleButtonTextChange}
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
