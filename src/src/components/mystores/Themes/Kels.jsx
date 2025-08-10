import React from "react";
import classNames from "classnames/bind";
import { SiTiktok } from "react-icons/si";
import {
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";

import styles from "./Kels.module.scss";

const bannerKels =
  "https://fastdo.vn/wp-content/uploads/2023/01/coaching-la-gi-24-min.jpg";
const auditImage =
  "https://cdn.brvn.vn/editor/2021/11/A33_Anh-Chris-1_1637579650.jpg";
const clubImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwtZurTP5RMdGEa3Uf2_q6mmDP7xGwix7w2Lwciq-9r0B5PWSfwtLFJF1MvsBdQufqMLA&usqp=CAU";
const podcastImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Lkgpd3uh47d6_vAl8esM2HtRpAVpjlxLxF3sdRcsLaWDtNy57KrMobZC9KpePMmyr1Y&usqp=CAU";

const cx = classNames.bind(styles);

const Kels = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("banner")}>
          <img
            src={bannerKels}
            alt="Kels Banner"
            className={cx("bannerImage")}
          />
        </div>
        <div className={cx("content")}>
          <div className={cx("headerInfo")}>
            <div className={cx("nameSection")}>
              <h1 className={cx("name")}>Hà My Idol</h1>
              <span className={cx("handle")}>@sociallykels</span>
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
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className={cx("iconLink")}
              >
                <FaYoutube className={cx("icon")} />
              </a>
              <a href="mailto:youremail@example.com" className={cx("iconLink")}>
                <FaEnvelope className={cx("icon")} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className={cx("iconLink")}
              >
                <FaTwitter className={cx("icon")} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className={cx("iconLink")}
              >
                <FaPinterest className={cx("icon")} />
              </a>
            </div>
          </div>
          {/* Divider */}
          <div className={cx("divider")} />
          {/* Cards */}
          <div className={cx("cards")}>
            {/* Card 1 */}
            <div className={cx("card", "cardMain")}>
              <div className={cx("cardImageWrapper")}>
                <img
                  src={auditImage}
                  alt="IG/TikTok Audit"
                  className={cx("cardImage")}
                />
              </div>
              <div className={cx("cardContent")}>
                <h2 className={cx("cardTitle")}>Đánh Giá IG/TikTok</h2>
                <p className={cx("cardSubtitle")}>
                  Đánh giá cá nhân hóa tài khoản IG hoặc TikTok của bạn.
                </p>
                <div className={cx("rating")}>
                  <span className={cx("star")}>&#9733;</span>
                  <span className={cx("star")}>&#9733;</span>
                  <span className={cx("star")}>&#9733;</span>
                  <span className={cx("star")}>&#9733;</span>
                  <span className={cx("star", "starInactive")}>&#9733;</span>
                </div>
                <div className={cx("price")}>
                  <span className={cx("currentPrice")}>790,000đ</span>
                  <span className={cx("oldPrice")}>999,000đ</span>
                </div>
                <button className={cx("btnAction")}>Đặt Lịch Đánh Giá</button>
              </div>
            </div>

            {/* Card 2 (đảo ngược) */}
            <div className={cx("card", "cardMain", "flipped")}>
              <div className={cx("cardImageWrapper")}>
                <img
                  src={clubImage}
                  alt="The SociallyKels Club"
                  className={cx("cardImage")}
                />
              </div>
              <div className={cx("cardContent")}>
                <h2 className={cx("cardTitle")}>Câu Lạc Bộ SociallyKels</h2>
                <p className={cx("cardSubtitle")}>
                  Kết nối với các Social Media Manager khác, nhận hỗ trợ từ tôi
                  và...
                </p>
                <div className={cx("rating")}>
                  <span className={cx("star")}>&#9733;</span>
                  <span className={cx("star")}>&#9733;</span>
                  <span className={cx("star")}>&#9733;</span>
                  <span className={cx("star")}>&#9733;</span>
                  <span className={cx("star", "starInactive")}>&#9733;</span>
                </div>
                <div className={cx("price")}>
                  <span className={cx("currentPrice")}>$79</span>
                  <span className={cx("oldPrice")}>$99</span>
                </div>
                <button className={cx("btnAction")}>Tham Gia Ngay</button>
              </div>
            </div>
          </div>
          {/* Podcast Box */}
          <div className={cx("podcastBox")}>
            <div className={cx("podcastContent")}>
              <div className={cx("podcastAvatarWrapper")}>
                <img
                  src={podcastImage}
                  alt="Kels Podcast"
                  className={cx("podcastAvatar")}
                />
              </div>
              <span className={cx("podcastText")}>Nghe Podcast của Tôi</span>
            </div>
            <div className={cx("podcastArrow")}>&rarr;</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kels;
