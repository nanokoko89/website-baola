import React from "react";
import classNames from "classnames/bind";
import {
  AiFillYoutube,
  AiOutlineTwitter,
  AiFillLinkedin,
  AiFillInstagram,
} from "react-icons/ai";
import { SiTiktok } from "react-icons/si";

import styles from "./Trish.module.scss";

const cx = classNames.bind(styles);

const Trish = () => {
  return (
    <div className={cx("trish-wrapper")}>
      {/* Ảnh đại diện */}
      <div className={cx("profile-image")}>
        <img
          src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
          alt="Coach Trish"
        />
      </div>

      {/* Tên */}
      <h1 className={cx("name")}>Đào Tạo Dropshipping</h1>

      {/* Social Icons */}
      <div className={cx("social-icons")}>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillYoutube />
        </a>
        <a
          href="https://www.tiktok.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiTiktok />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineTwitter />
        </a>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillLinkedin />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillInstagram />
        </a>
      </div>

      {/* Section: Courses */}
      <div className={cx("section")}>
        <h2 className={cx("section-title")}>Các khóa học</h2>

        <div className={cx("course-card")}>
          <div className={cx("course-content")}>
            <div className={cx("course-image")}>
              {/* Ảnh khóa học ví dụ */}
              <img
                src="https://nowads.com.vn/wp-content/uploads/2021/11/thiet-ke-to-roi.jpeg"
                alt="Digital Playbook Funnel Course"
              />
            </div>
            <div className={cx("course-info")}>
              <h3 className={cx("course-title")}>
                DIGITAL PLAYBOOK FUNNEL COURSE
              </h3>
              <p className={cx("course-desc")}>
                Học tất cả về digital dropshipping trong khóa học này
              </p>
            </div>
          </div>
          <button className={cx("course-button")}>Bắt đầu</button>
        </div>
      </div>

      {/* Section: Digital Starter Kit */}
      <div className={cx("section")}>
        <h2 className={cx("section-title")}>Vị trí dạy</h2>

        <div className={cx("starter-kit")}>
          <div className={cx("kit-item")}>
            <img
              src="https://product.hstatic.net/1000173566/product/img_1548_cf944569b18e4849bf6df5b3a966777a_master.jpeg"
              alt="Kit 1"
            />
          </div>
          <div className={cx("kit-item")}>
            <img
              src="https://product.hstatic.net/1000173566/product/img_1548_cf944569b18e4849bf6df5b3a966777a_master.jpeg"
              alt="Kit 2"
            />
          </div>
          {/* Bạn có thể thêm nhiều kit-item hơn nếu cần */}
        </div>
      </div>
    </div>
  );
};

export default Trish;
