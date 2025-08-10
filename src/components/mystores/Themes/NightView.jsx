import React from "react";
import classNames from "classnames/bind";

// React Icons
import {
  AiFillYoutube,
  AiOutlineTwitter,
  AiFillLinkedin,
  AiFillInstagram,
  AiOutlineStar,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { SiTiktok } from "react-icons/si";

import styles from "./NightView.module.scss";
const cx = classNames.bind(styles);

// URL ảnh minh họa (các bạn có thể thay bằng local asset hoặc URL thực tế)
const avatarUrl =
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"; // Ảnh đại diện Paul Cézanne (ví dụ)
const workshopImageUrl =
  "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg"; // Ảnh phong cảnh ban đêm
const resumeTplUrl =
  "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg"; // Ảnh "Resume Templates"
const vlogImageUrl =
  "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg"; // Ảnh "Resume Templates"

const NightView = () => {
  return (
    <div className={cx("night-wrapper")}>
      {/* ====== Avatar + Tên + Social ====== */}
      <div className={cx("header")}>
        <div className={cx("avatar-wrapper")}>
          <img
            src={avatarUrl}
            alt="Paul Cézanne"
            className={cx("avatar-image")}
          />
        </div>
        <h1 className={cx("name")}>Paul Cézanne</h1>
        <div className={cx("social-icons")}>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={cx("icon-btn")}
          >
            <AiFillYoutube className={cx("icon")} />
          </a>
          <a
            href="https://www.tiktok.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={cx("icon-btn")}
          >
            <SiTiktok className={cx("icon")} />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={cx("icon-btn")}
          >
            <AiOutlineTwitter className={cx("icon")} />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={cx("icon-btn")}
          >
            <AiFillLinkedin className={cx("icon")} />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={cx("icon-btn")}
          >
            <AiFillInstagram className={cx("icon")} />
          </a>
        </div>
      </div>

      {/* ====== Card Workshop ====== */}
      <div className={cx("card", "workshop-card")}>
        <div className={cx("card-image-wrapper")}>
          <img
            src={workshopImageUrl}
            alt="The Mindset Workshop"
            className={cx("card-image")}
          />
        </div>
        <div className={cx("card-content")}>
          <h2 className={cx("card-title")}>The Mindset Workshop</h2>
          <p className={cx("card-desc")}>
            My comprehensive guide to help you achieve your own goals.
          </p>
          <div className={cx("price-rating")}>
            <span className={cx("price")}>$57</span>
            <span className={cx("rating")}>
              <AiOutlineStar className={cx("star-icon")} /> 5.0
            </span>
          </div>
          <button className={cx("btn-primary")}>
            <span>Get Started</span>
            <AiOutlineArrowRight className={cx("arrow")} />
          </button>
        </div>
      </div>

      {/* ====== Danh sách link phụ ====== */}
      {/* <div className={cx("link-list")}>
        <a href="#" className={cx("link-card")}>
          <div className={cx("link-img-wrapper")}>
            <img
              src={resumeTplUrl}
              alt="My Resume Templates"
              className={cx("link-image")}
            />
          </div>
          <div className={cx("link-text-wrapper")}>
            <span className={cx("link-title")}>My Resume Templates</span>
            <span className={cx("link-price")}>$29</span>
          </div>
        </a>

        <a href="#" className={cx("link-card")}>
          <div className={cx("link-img-wrapper")}>
            <img
              src={vlogImageUrl}
              alt="Appalachian Trip Vlog"
              className={cx("link-image")}
            />
          </div>
          <div className={cx("link-text-wrapper")}>
            <span className={cx("link-title")}>Appalachian Trip Vlog</span>
            <span className={cx("link-price")}>$19</span>
          </div>
        </a>
      </div> */}
    </div>
  );
};

export default NightView;
