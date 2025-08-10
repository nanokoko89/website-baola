import React from "react";
import classNames from "classnames/bind";

// React Icons
import {
  AiFillYoutube,
  AiOutlineTwitter,
  AiFillLinkedin,
  AiFillInstagram,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { SiTiktok } from "react-icons/si";
import { FaSpotify } from "react-icons/fa";

// import hình Google Calendar (bạn có thể thay bằng local asset nếu cần)
const GOOGLE_CALENDAR_LOGO =
  "https://www.gstatic.com/images/branding/product/1x/calendar_2020q4_48dp.png";

import styles from "./Spotlight.module.scss";
const cx = classNames.bind(styles);

const Spotlight = () => {
  return (
    <div className={cx("spotlight-wrapper")}>
      {/* Layer mờ phía trên background (nếu cần) */}
      <div className={cx("overlay")}></div>

      {/* Nội dung chính */}
      <div className={cx("content-container")}>
        {/* Phần tên và social */}
        <div className={cx("header")}>
          <h1 className={cx("name")}>Nguyễn Phi Vân</h1>

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

        {/* Phần cơ bản (Avatar) */}
        <div className={cx("avatar-image-wrapper")}>
          {/* Avatar được đặt làm background của wrapper, nên ở đây chỉ là placeholder nếu cần */}
        </div>

        {/* Card "Book a Video Call with Me" */}
        <div className={cx("booking-card")}>
          <div className={cx("booking-card-top")}>
            <div className={cx("calendar-logo-wrapper")}>
              <img
                src={GOOGLE_CALENDAR_LOGO}
                alt="Google Calendar"
                className={cx("calendar-logo")}
              />
            </div>

            {/* Thông tin bên phải */}
            <div className={cx("booking-info")}>
              <h2 className={cx("booking-title")}>
                Đặt Cuộc Gọi Video Với Tôi
              </h2>
              <p className={cx("booking-subtitle")}>
                Tôi rảnh vào thứ Hai và thứ Năm. Hãy lên lịch gặp nhé!
              </p>
              <div className={cx("price-rating")}>
                <div className={cx("booking-card-top")}>
                  <span className={cx("current-price")}>₫600.000</span>
                  <span className={cx("original-price")}>₫1.200.000</span>
                </div>
                <div className={cx("booking-card-top")}>
                  <span className={cx("rating")}>★ 5.0</span>
                  <span className={cx("discount-tag")}>50% OFF</span>
                </div>
              </div>
            </div>
          </div>

          <button className={cx("booking-button")}>
            Đặt Lịch
            <AiOutlineArrowRight className={cx("arrow-icon")} />
          </button>
        </div>
        {/* Các link phụ: Podcast và YouTube */}
        <div className={cx("other-links")}>
          <a
            href="https://open.spotify.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={cx("link-card")}
          >
            <div className={cx("link-icon-wrapper")}>
              <FaSpotify className={cx("link-icon")} />
            </div>
            <span className={cx("link-text")}>Nghe Podcast Của Tôi</span>
          </a>

          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={cx("link-card")}
          >
            <div className={cx("link-icon-wrapper")}>
              <AiFillYoutube className={cx("link-icon")} />
            </div>
            <span className={cx("link-text")}>Kênh YouTube Của Tôi</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Spotlight;
