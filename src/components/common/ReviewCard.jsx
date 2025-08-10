// src/components/ReviewCard/ReviewCard.jsx
import React from "react";
import classNames from "classnames/bind";
import { FaStar, FaRegStar } from "react-icons/fa";
import styles from "./ReviewCard.module.scss";

const cx = classNames.bind(styles);

export default function ReviewCard({
  rating = 3,
  maxRating = 5,
  avatarUrl,
  username = "Tuấn",
  content,
}) {
  // Số sao đầy
  const fullStars = Math.min(Math.floor(rating), maxRating);
  // Số sao rỗng
  const emptyStars = maxRating - fullStars;

  // Tạo mảng icon - SỬA LẠI PHẦN NÀY
  const stars = [
    // Tạo các sao đầy trước
    ...Array(fullStars)
      .fill()
      .map((_, i) => (
        <FaStar key={`full-${i}`} className={cx("star", "full")} />
      )),
    // Sau đó tạo các sao rỗng
    ...Array(emptyStars)
      .fill()
      .map((_, i) => (
        <FaRegStar key={`empty-${i}`} className={cx("star", "empty")} />
      )),
  ];

  return (
    <div className={cx("card")}>
      <div className={cx("top")}>
        {avatarUrl && (
          <img src={avatarUrl} alt={username} className={cx("avatar")} />
        )}
        <div className={cx("header")}>
          <span className={cx("username")}>{username}</span>
          <div className={cx("stars")}>
            {stars}
            <span className={cx("ratingText")}>
              {rating}/{maxRating}
            </span>
          </div>
        </div>
      </div>
      {content && <p className={cx("content")}>{content}</p>}
    </div>
  );
}
