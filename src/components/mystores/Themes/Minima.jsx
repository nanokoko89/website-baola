import React from "react";
import classNames from "classnames/bind";

// React Icons
import {
  AiFillYoutube,
  AiOutlineTwitter,
  AiFillLinkedin,
  AiFillInstagram,
} from "react-icons/ai";
import { SiTiktok } from "react-icons/si";
import { BsSpotify } from "react-icons/bs";
import { AiOutlineDollarCircle, AiOutlineArrowRight } from "react-icons/ai";

import styles from "./Minima.module.scss";
const cx = classNames.bind(styles);
// Local placeholder to avoid remote 404 error
import localCourseThumb from "../../../assets/anh.jpeg";

// URL ảnh minh họa (bạn có thể thay bằng import local asset nếu cần)
const avatarUrl =
  "https://tamannatural.com/wp-content/uploads/2024/05/KOC-KOL-la-gi.webp"; // Ảnh ví dụ Angelica Kauffman
const sessionThumbUrl =
  "https://images.pexels.com/photos/4171732/pexels-photo-4171732.jpeg"; // Ảnh thumbnail cho Coaching Session
const courseThumbUrl = localCourseThumb; // Local placeholder image

const Minima = () => {
  return (
    <div className={cx("minima-wrapper")}>
      {/* ===== Avatar + Tên + Social ===== */}
      <div className={cx("header")}>
        <div className={cx("avatar-wrapper")}>
          <img
            src={avatarUrl}
            alt="Angelica Kauffman"
            className={cx("avatar-image")}
          />
        </div>
        <h1 className={cx("name")}>Angelica Trang Tằm</h1>
        <div className={cx("social-icons")}>
          {/* Ở đây chỉ hiển thị icon (không bấm được) nên để màu xám nhạt */}
          <AiFillYoutube className={cx("social-icon", "disabled")} />
          <SiTiktok className={cx("social-icon", "disabled")} />
          <AiOutlineTwitter className={cx("social-icon", "disabled")} />
          <AiFillLinkedin className={cx("social-icon", "disabled")} />
          <AiFillInstagram className={cx("social-icon", "disabled")} />
        </div>
      </div>

      {/* ===== 1:1 Coaching Session ===== */}
      <div className={cx("card", "session-card")}>
        <div className={cx("session-left")}>
          <img
            src={sessionThumbUrl}
            alt="Phiên Coaching 1:1"
            className={cx("session-thumb")}
          />
        </div>
        <div className={cx("session-right")}>
          <h2 className={cx("session-title")}>Phiên Coaching 1:1</h2>
          <p className={cx("session-desc")}>
            Hãy gặp nhau! Trong buổi gặp 60 phút này, mình sẽ dạy bạn mọi thứ
            bạn cần về cách trở thành một creator độc lập.
          </p>
          <div className={cx("price-original")}>
            <span className={cx("current-price")}>₫1.799.000</span>
            <span className={cx("original-price")}>₫2.999.000</span>
          </div>
          <p className={cx("items-left")}>42 suất còn lại</p>
          <button className={cx("btn-primary")}>
            <span>Đặt Lịch</span>
          </button>
        </div>
      </div>

      {/* ===== Link: The Mindfulness Course ===== */}
      <a href="#" className={cx("link-card")}>
        <div className={cx("link-left")}>
          <img
            src={courseThumbUrl}
            alt="Khóa Học Chánh Niệm"
            className={cx("link-image")}
          />
        </div>
        <div className={cx("link-right")}>
          <span className={cx("link-title")}>Khóa Học Chánh Niệm</span>
          <span className={cx("link-price")}>₫699.000</span>
        </div>
      </a>

      {/* ===== Link: Check out my podcast! ===== */}
      <a href="#" className={cx("link-card")}>
        <div className={cx("link-left-icon")}>
          <BsSpotify className={cx("podcast-icon")} />
        </div>
        <div className={cx("link-right")}>
          <span className={cx("link-title")}>Nghe Podcast Của Tôi!</span>
        </div>
      </a>

      {/* ===== Link: Get Started with Stan ===== */}
      <a href="#" className={cx("link-card")}>
        <div className={cx("link-left-icon")}>
          <AiOutlineDollarCircle className={cx("dollar-icon")} />
        </div>
        <div className={cx("link-right")}>
          <span className={cx("link-title")}>Bắt Đầu Cùng Stan</span>
        </div>
      </a>
    </div>
  );
};

export default Minima;
