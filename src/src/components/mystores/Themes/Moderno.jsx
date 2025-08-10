// src/components/Moderno/Moderno.jsx
import React from "react";
import classNames from "classnames/bind";

// React Icons
import { SiTiktok } from "react-icons/si";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import styles from "./Moderno.module.scss";

const avatarImage =
  "https://cdn.brvn.vn/editor/2021/11/A33_Anh-Chris-1_1637579650.jpg";
const guideImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwtZurTP5RMdGEa3Uf2_q6mmDP7xGwix7w2Lwciq-9r0B5PWSfwtLFJF1MvsBdQufqMLA&usqp=CAU";
const podcastImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Lkgpd3uh47d6_vAl8esM2HtRpAVpjlxLxF3sdRcsLaWDtNy57KrMobZC9KpePMmyr1Y&usqp=CAU";

const cx = classNames.bind(styles);

const Moderno = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("headerLeft")}>
          <div className={cx("avatarWrapper")}>
            <img src={avatarImage} alt="John Hu" className={cx("avatar")} />
          </div>
          <div className={cx("nameSection")}>
            <h1 className={cx("name")}>John Hu</h1>
            <span className={cx("handle")}>@jayhoovy</span>
          </div>
        </div>
        <div className={cx("socialIcons")}>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className={cx("iconLink")}
          >
            <SiTiktok className={cx("icon")} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className={cx("iconLink")}
          >
            <FaInstagram className={cx("icon")} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className={cx("iconLink")}
          >
            <FaLinkedin className={cx("icon")} />
          </a>
        </div>
      </div>

      <div className={cx("divider")} />

      <div className={cx("cardMain")}>
        <div className={cx("discountBadge")}>
          15%
          <br />
          Giảm đặt trước
        </div>

        <div className={cx("mainImageWrapper")}>
          <img
            src={guideImage}
            alt="Nhận hướng dẫn của tôi ngay"
            className={cx("mainImage")}
          />
        </div>

        <div className={cx("mainContent")}>
          <h2 className={cx("mainTitle")}>Nhận hướng dẫn của tôi ngay!</h2>
          <p className={cx("mainSubtitle")}>
            Hướng dẫn miễn phí này sẽ dạy bạn mọi thứ bạn cần để đạt được …
          </p>
          <div className={cx("rating")}>
            <span className={cx("star")}>&#9733;</span>
            <span className={cx("star")}>&#9733;</span>
            <span className={cx("star")}>&#9733;</span>
            <span className={cx("star")}>&#9733;</span>
            <span className={cx("star")}>&#9733;</span>
          </div>
          <div className={cx("priceRow")}>
            <span className={cx("oldPrice")}>2.880.000&nbsp;đ</span>
            <span className={cx("newPrice")}>2.400.000&nbsp;đ</span>
          </div>
        </div>
      </div>

      <div className={cx("cardSub")}>
        <div className={cx("subImageWrapper")}>
          <img
            src={podcastImage}
            alt="Podcast của tôi cùng nhà sáng lập tỷ phú"
            className={cx("subImage")}
          />
        </div>
        <div className={cx("subContent")}>
          <h3 className={cx("subTitle")}>
            Podcast của tôi cùng nhà sáng lập tỷ phú
          </h3>
          <div className={cx("rating")}>
            <span className={cx("star")}>&#9733;</span>
            <span className={cx("star")}>&#9733;</span>
            <span className={cx("star")}>&#9733;</span>
            <span className={cx("star")}>&#9733;</span>
            <span className={cx("star")}>&#9733;</span>
          </div>{" "}
          <div className={cx("subPrice")}>2.400.000&nbsp;đ</div>
        </div>
      </div>

      <div className={cx("footerBanner")}>
        <span className={cx("footerText")}>Xây dựng cửa hàng của bạn với</span>
        <button className={cx("stanButton")}>
          <span className={cx("stanIcon")}>💲</span>
          <span className={cx("stanText")}>BaoLa</span>
          <span className={cx("stanArrow")}>&rarr;</span>
        </button>
      </div>
    </div>
  );
};

export default Moderno;
