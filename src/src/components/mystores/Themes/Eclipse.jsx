import React from "react";
import classNames from "classnames/bind";
import {
  AiFillYoutube,
  AiOutlineTwitter,
  AiFillLinkedin,
  AiFillInstagram,
} from "react-icons/ai";
import { SiTiktok } from "react-icons/si";

import styles from "./Eclipse.module.scss";

const cx = classNames.bind(styles);

const Eclipse = () => {
  return (
    <div className={cx("eclipse-wrapper")}>
      {/* Avatar */}
      <div className={cx("avatar-container")}>
        <img
          src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg"
          alt="Nguyễn Thị Lan"
          className={cx("avatar-image")}
        />
      </div>

      {/* Tên */}
      <h1 className={cx("name")}>Nguyễn Thị Lan</h1>

      {/* Social Icons */}
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

      {/* Card Khóa học */}
      <div className={cx("course-card")}>
        {/* Ảnh lớn */}
        <div className={cx("course-image-wrapper")}>
          <img
            src="https://images.pexels.com/photos/1450963/pexels-photo-1450963.jpeg"
            alt="Hội Thảo Hiện Thực Hóa Ước Mơ"
            className={cx("course-image")}
          />
        </div>

        {/* Thông tin khóa học */}
        <div className={cx("course-info")}>
          <h2 className={cx("course-title")}>
            Hội Thảo Hiện Thực Hóa Ước Mơ ✨
          </h2>

          <div className={cx("price-and-rating")}>
            <span className={cx("current-price")}>₫1.150.000</span>
            <span className={cx("original-price")}>₫1.850.000</span>
            <span className={cx("rating")}>★ 5.0</span>
          </div>

          <p className={cx("course-desc")}>
            Mình sẽ dạy bạn mọi thứ cần biết để biến ước mơ thành hiện thực. Sự
            nghiệp, tình yêu, học hành… bạn thích gì thì mình hướng dẫn đến đó!
          </p>

          <button className={cx("find-button")}>Chọn Thời Gian</button>
        </div>
      </div>
    </div>
  );
};

export default Eclipse;
