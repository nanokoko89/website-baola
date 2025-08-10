// AddReviews.jsx
import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";

// Icons
import {
  FiSmile,
  FiTrash2,
  FiChevronDown,
  FiUser,
  FiStar as FiStarOutline, // giữ cho sao chưa chọn
} from "react-icons/fi";
import { FaStar } from "react-icons/fa"; // sao đã chọn (filled)
import { FaPlus } from "react-icons/fa6";

// Component ImagePicker (đã tách trước đó)
import ImagePicker from "./ImagePicker";

// SCSS module
import styles from "./AddReviews.module.scss";
const cx = classNames.bind(styles);

// Hàm tạo ID ngẫu nhiên đơn giản
const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

function ReviewCard({ review, onDelete, onChange }) {
  const { id, name, text, imageUrl, rating } = review;

  const [selectedImage, setSelectedImage] = useState(
    imageUrl ? { url: imageUrl } : null
  );
  const [currentRating, setCurrentRating] = useState(rating || 0);

  useEffect(() => {
    setSelectedImage(imageUrl ? { url: imageUrl } : null);
  }, [imageUrl]);

  useEffect(() => {
    setCurrentRating(rating || 0);
  }, [rating]);
  // Khi ImagePicker chọn xong ảnh, lưu vào state
  const handleImageSelect = (imgObj) => {
    setSelectedImage(imgObj);
    if (onChange) onChange({ id, imageUrl: imgObj.url });
  };

  return (
    <div className={cx("review-card")}>
      {/* Phần top: icon, sao và nút delete */}
      <div className={cx("card-top")}>
        <div className={cx("star-rating")}>
          {[...Array(5)].map((_, i) => {
            const isSelected = i < currentRating;
            return (
              <span
                key={i}
                onClick={() => {
                  setCurrentRating(i + 1);
                  if (onChange) onChange({ id, rating: i + 1 });
                }}
              >
                {isSelected ? (
                  <FaStar className={cx("star")} fill="#f5c518" />
                ) : (
                  <FiStarOutline className={cx("star")} />
                )}
              </span>
            );
          })}
        </div>
        <button className={cx("delete-button")} onClick={() => onDelete(id)}>
          <FiTrash2 className={cx("delete-icon")} />
          Xóa
        </button>
      </div>

      {/* Phần body: avatar + inputs + ImagePicker */}
      <div className={cx("card-body")}>
        <div className={cx("card-left")}>
          <div className={cx("avatar-placeholder")}>
            {selectedImage ? (
              <img
                src={selectedImage.url}
                alt={selectedImage.author}
                className={cx("avatar-img")}
              />
            ) : (
              <FiUser className={cx("user-icon")} />
            )}
          </div>
          {/* Nút chọn ảnh: dùng ImagePicker */}
          <div className={cx("image-picker-wrapper")}>
            <ImagePicker onSelect={handleImageSelect} />
          </div>
        </div>
        <div className={cx("inputs-wrapper")}>
          <input
            type="text"
            placeholder="Tên khách hàng"
            className={cx("input-name")}
            value={name}
            onChange={(e) => onChange && onChange({ id, name: e.target.value })}
          />
          <textarea
            placeholder="Viết đánh giá"
            className={cx("input-text")}
            value={text}
            onChange={(e) => onChange && onChange({ id, text: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
function AddReviews({ reviews = [], onAdd, onRemove, onUpdate }) {
  // Thêm review mới
  const handleAddReview = () => {
    if (onAdd)
      onAdd({
        id: generateId(),
        name: "",
        text: "",
        imageUrl: "",
        rating: 0,
      });
  };

  const handleDeleteReview = (id) => {
    if (onRemove) onRemove(id);
  };

  return (
    <div className={cx("add-reviews")}>
      {/* Header */}
      <div className={cx("header")}>
        <div className={cx("header-left")}>
          <FiSmile className={cx("smiley-icon")} />
          <h3 className={cx("title")}>Thêm đánh giá</h3>
        </div>
        {/* <FiChevronDown className={cx("collapse-icon")} /> */}
      </div>

      {/* Danh sách review-card */}
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onDelete={handleDeleteReview}
          onChange={(update) => onUpdate && onUpdate(update)}
        />
      ))}

      {/* Nút thêm review mới */}
      <button className={cx("add-button")} onClick={handleAddReview}>
        <FaPlus className={cx("plus-icon")} />
        Thêm đánh giá của khách hàng
      </button>
    </div>
  );
}

export default AddReviews;
