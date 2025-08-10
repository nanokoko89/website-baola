// src/components/Footer/Footer.jsx
import React from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

// Dùng react-icons để hiển thị các icon mạng xã hội
import { FaYoutube, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx("container")}>
      <div className={cx("footer-wrapper")}>
        <div className={cx("left")}>
          <div className={cx("social-icons")}>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cx("icon-link")}
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cx("icon-link")}
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cx("icon-link")}
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cx("icon-link")}
              aria-label="TikTok"
            >
              <SiTiktok />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cx("icon-link")}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>

          {/* Phần tên thương hiệu ở giữa */}
          <div className={cx("brand")}>
            <span className={cx("brand-icon")}>💰</span>
            <span className={cx("brand-text")}>Bao La</span>
          </div>
        </div>
        {/* Phần menu bên phải (dạng danh sách dọc) */}
        <nav className={cx("links")}>
          <a href="#" className={cx("link-item")}>
            Đăng nhập
          </a>
          <a href="#" className={cx("link-item")}>
            Chương trình liên kết
          </a>
          <a href="#" className={cx("link-item")}>
            Tuyển dụng
          </a>
          <a href="#" className={cx("link-item")}>
            Trợ giúp
          </a>
          <a href="#" className={cx("link-item")}>
            Chính sách bảo mật
          </a>
          <a href="#" className={cx("link-item")}>
            Điều khoản & Điều kiện
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
