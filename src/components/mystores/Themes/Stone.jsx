import React from "react";
import classNames from "classnames/bind";
import styles from "./Stone.module.scss";

// Import icon từ react-icons
import { SiTiktok } from "react-icons/si";
import { AiFillYoutube, AiFillLinkedin, AiFillInstagram } from "react-icons/ai";
import { FaDollarSign } from "react-icons/fa";

const cx = classNames.bind(styles);

const Stone = () => {
  return (
    <div className={cx("trish-card")}>
      {/* ================= Header Phần ảnh + tên + icon MXH ================= */}
      <div
        className={cx("header")}
        style={{
          backgroundImage: `url("https://cdn2.tuoitre.vn/zoom/700_700/471584752817336320/2024/7/10/hoc-boi-17205750037001183403956-56-0-1103-2000-crop-17205751604851146053140.jpg")`,
          height: "auto",
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "400px",
        }}
      >
        <div className={cx("overlay")} />

        <h1 className={cx("name")}>HLV Bơi Thái Hà</h1>
        <div className={cx("social-icons")}>
          <SiTiktok className={cx("icon")} />
          <AiFillYoutube className={cx("icon")} />
          <AiFillLinkedin className={cx("icon")} />
          <AiFillInstagram className={cx("icon")} />
        </div>
      </div>

      {/* ================= Phần khóa học ================= */}
      <div className={cx("course-card")}>
        <div className={cx("course-card-top")}>
          <div className={cx("course-image-wrapper")}>
            <img
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZhx1trL8s_4QHR-MSBmNPJFE_0kDu3rk-Zu9aYpy_prjXn6gYQ5pQsubhMSVcpAx2ENE&usqp=CAU"
              }
              alt="Khóa học"
              className={cx("course-image")}
            />
          </div>
          <div className={cx("course-info")}>
            <h2 className={cx("course-title")}>
              KHÓA HỌC: CÁCH TĂNG 100K+ FOLLOWER TRÊN TIKTOK!
            </h2>
            <p className={cx("course-desc")}>
              Khóa học này là quy trình CHÍNH XÁC từng bước tôi đã thực hiện để
              phát triển CẢ hai tài khoản lên hơn 100K người theo dõi!
            </p>
            <div className={cx("course-pricing")}>
              <div className={cx("course-card-top")}>
                <span className={cx("price")}>2.300.000₫</span>
                <span className={cx("original-price")}>4.600.000₫</span>
              </div>
              <div className={cx("course-card-top")}>
                <span className={cx("discount-badge")}>50% GIẢM</span>
                <span className={cx("rating")}>⭐ 5.0</span>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("course-card-bottom")}>
          <button className={cx("btn-primary")}>
            PHÁT TRIỂN KHÁN GIẢ NGAY!
          </button>
        </div>
      </div>

      {/* ================= Phần 2 nút bên dưới ================= */}
      <div className={cx("actions")}>
        <button className={cx("btn-secondary")}>
          <FaDollarSign className={cx("dollar-icon")} />
          XÂY CỬA HÀNG BAO LA &amp; KIẾM TIỀN
        </button>
        <button className={cx("btn-secondary")}>
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRETlr8oF4V7fEvUFDnJk3HOtD0bxZm4KRmvKpXjDxNWDgD5oS5--0yhMybCVwoVvpQ1Zg&usqp=CAU"
            }
            alt="Hướng dẫn TikTok"
            className={cx("guide-icon")}
          />
          HƯỚNG DẪN TĂNG TRƯỞNG TIKTOK MIỄN PHÍ
        </button>
      </div>
    </div>
  );
};

export default Stone;
