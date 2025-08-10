import React from "react";
import classNames from "classnames/bind";

// React Icons
import {
  AiFillYoutube,
  AiOutlineTwitter,
  AiFillLinkedin,
  AiFillInstagram,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { SiTiktok } from "react-icons/si";
import { FaRss } from "react-icons/fa";
// Use a local placeholder to avoid remote 404 errors
import localFloral2 from "../../../assets/blog.jpg";

// URL ảnh ví dụ (bạn có thể thay bằng import local asset nếu muốn)
const headerImageUrl =
  "https://images.pexels.com/photos/5668430/pexels-photo-5668430.jpeg"; // Michelle Foucault
const floralImageUrl1 =
  "https://images.pexels.com/photos/853199/pexels-photo-853199.jpeg"; // Bó hoa vintage
const floralImageUrl2 = localFloral2; // Local placeholder image
const podcastImageUrl =
  "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg"; // Headphone (Podcast)
const colorImageUrl =
  "https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg"; // Màu sắc

import styles from "./Material.module.scss";
const cx = classNames.bind(styles);

const Material = () => {
  return (
    <div className={cx("material-wrapper")}>
      {/* ========= 1. HEADER: Ảnh + Tên + Social ========= */}
      <div className={cx("card", "card-header")}>
        <div className={cx("card-left")}>
          <img
            src={headerImageUrl}
            alt="Michelle Foucault"
            className={cx("card-image")}
          />
        </div>
        <div className={cx("card-right", "header-right")}>
          <h2 className={cx("header-name")}>Michelle Đức</h2>
          <div className={cx("social-icons")}>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cx("icon-wrapper")}
            >
              <AiFillYoutube className={cx("icon")} />
            </a>
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cx("icon-wrapper")}
            >
              <SiTiktok className={cx("icon")} />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cx("icon-wrapper")}
            >
              <AiOutlineTwitter className={cx("icon")} />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cx("icon-wrapper")}
            >
              <AiFillLinkedin className={cx("icon")} />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cx("icon-wrapper")}
            >
              <AiFillInstagram className={cx("icon")} />
            </a>
          </div>
        </div>
      </div>

      {/* ========= 2. CARD: Đặt Cuộc Gọi Video ========= */}
      <div className={cx("card", "card-video")}>
        <div className={cx("card-left")}>
          <img
            src={floralImageUrl1}
            alt="Bó hoa vintage"
            className={cx("card-image")}
          />
        </div>
        <div className={cx("card-right", "video-right")}>
          <h3 className={cx("video-title")}>Đặt Cuộc Gọi Video Với Tôi</h3>
          <p className={cx("video-subtitle")}>
            Tôi sẵn sàng vào thứ Hai và thứ Năm.
          </p>
          {/* <span className={cx("video-price", "free")}>Miễn Phí</span> */}
          <button className={cx("video-button")}>
            <span>Chọn thời gian</span>
            <AiOutlineArrowRight className={cx("arrow-icon")} />
          </button>
        </div>
      </div>

      {/* ========= 3. CARD: Watercolors Course ========= */}
      <div className={cx("card", "card-course")}>
        <div className={cx("card-left")}>
          <img
            src={floralImageUrl2}
            alt="Tranh tĩnh vật hoa"
            className={cx("card-image")}
          />
        </div>
        <div className={cx("card-right", "course-right")}>
          <h3 className={cx("course-title")}>Khóa Học Vẽ Màu Nước</h3>
          <p className={cx("course-desc")}>
            Khóa học toàn diện với video hướng dẫn, walkthrough và mọi thứ bạn
            cần để thành công.
          </p>
          <div className={cx("price-rating")}>
            <span className={cx("current-price")}>₫1.900.000</span>
            <span className={cx("original-price")}>₫3.200.000</span>
            {/* <span className={cx("rating")}>
              <AiOutlineStar className={cx("star-icon")} /> 5.0
            </span> */}
          </div>
          <p className={cx("items-left")}>27 Items Left</p>
          <button className={cx("course-button")}>
            <span>Bắt đấu</span>
            <AiOutlineArrowRight className={cx("arrow-icon")} />
          </button>
        </div>
      </div>

      {/* ========= 4. LINK: Renaissance Podcast ========= */}
      {/* <a
        href="https://podcast.example.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={cx("card", "link-card")}
      >
        <div className={cx("card-left", "link-left")}>
          <img
            src={podcastImageUrl}
            alt="Renaissance Podcast"
            className={cx("card-image")}
          />
        </div>
        <div className={cx("card-right", "link-right")}>
          <div className={cx("link-content")}>
            <FaRss className={cx("link-icon")} />
            <span className={cx("link-text")}>Podcast Khởi Nghiệp</span>
          </div>
        </div>
      </a> */}

      {/* ========= 5. LINK: Introduction to Color ========= */}
      {/* <a
        href="https://colorcourse.example.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={cx("card", "link-card")}
      >
        <div className={cx("card-left", "link-left")}>
          <img
            src={colorImageUrl}
            alt="Introduction to Color"
            className={cx("card-image")}
          />
        </div>
        <div className={cx("card-right", "link-right")}>
          <div className={cx("link-content")}>
            <FaRss className={cx("link-icon")} />
            <span className={cx("link-text")}>Giới thiệu tới hệ thống</span>
          </div>
        </div>
      </a> */}
    </div>
  );
};

export default Material;
