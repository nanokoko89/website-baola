// src/components/Tyla/Tyla.jsx
import React from "react";
import classNames from "classnames/bind";
import { FaYoutube, FaInstagram, FaTwitter, FaPinterest } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

import styles from "./Tyla.module.scss";

// Các ảnh minh họa (thay bằng đường dẫn/URL thực tế của bạn)
const bannerImage =
  "https://kartra.com/wp-content/uploads/2024/05/Digital-Products-101-What-You-Need-to-Know-About-Selling-Online.jpg";
const strategizeImage =
  "https://cdn.brvn.vn/editor/2021/11/A33_Anh-Chris-1_1637579650.jpg";
const coachingImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwtZurTP5RMdGEa3Uf2_q6mmDP7xGwix7w2Lwciq-9r0B5PWSfwtLFJF1MvsBdQufqMLA&usqp=CAU";
const promoteImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Lkgpd3uh47d6_vAl8esM2HtRpAVpjlxLxF3sdRcsLaWDtNy57KrMobZC9KpePMmyr1Y&usqp=CAU";

const cx = classNames.bind(styles);

const Tyla = () => {
  return (
    <div className={cx("wrapper")}>
      {/* Banner ở trên cùng */}
      <div className={cx("banner")}>
        <img
          src={bannerImage}
          alt="Tyla Banner"
          className={cx("bannerImage")}
        />
      </div>

      <div className={cx("container")}>
        <div className={cx("socialIcons")}>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <FaYoutube className={cx("icon")} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram className={cx("icon")} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter className={cx("icon")} />
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noreferrer">
            <FaPinterest className={cx("icon")} />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer">
            <SiTiktok className={cx("icon")} />
          </a>
        </div>

        {/* Tên và mô tả */}
        <div className={cx("titleSection")}>
          <h1 className={cx("title")}>Tyla Brimblecombe</h1>
          <p className={cx("subtitle")}>
            Teaching Content Creation Skills &amp; Social Media Growth
            Strategies
          </p>
        </div>

        {/* Các thẻ (cards) */}
        <div className={cx("cards")}>
          <div className={cx("card", "cardMain")}>
            <div className={cx("cardImageWrapper")}>
              <img
                src={strategizeImage}
                alt="Strategize For Success"
                className={cx("cardImage")}
              />
            </div>
            <div className={cx("cardContent")}>
              <h2 className={cx("cardTitle")}>Strategize For Success</h2>
              <p className={cx("cardDescription")}>
                Work smarter NOT harder and scale your personal or business
                brand by strategizing on TikTok.
              </p>
              <div className={cx("rating")}>
                <span className={cx("star")}>&#9733;</span>
                <span className={cx("star")}>&#9733;</span>
                <span className={cx("star")}>&#9733;</span>
                <span className={cx("star")}>&#9733;</span>
                <span className={cx("star")}>&#9733;</span>
              </div>
              <div className={cx("price")}>
                <span className={cx("currentPrice")}>$49</span>
                <span className={cx("oldPrice")}>$89</span>
              </div>
              <button className={cx("btnDownload")}>DOWNLOAD NOW</button>
            </div>
          </div>

          {/* <div className={cx("card", "cardSmall")}>
            <div className={cx("cardSmallImageWrapper")}>
              <img
                src={coachingImage}
                alt="Book a 1:1 Coaching Call"
                className={cx("cardSmallImage")}
              />
            </div>
            <div className={cx("cardSmallContent")}>
              <h3 className={cx("cardSmallTitle")}>BOOK A 1:1 COACHING CALL</h3>
              <span className={cx("cardSmallPrice")}>$199</span>
            </div>
            <div className={cx("cardSmallArrow")}>&rarr;</div>
          </div> */}

          {/* <div className={cx("card", "cardSmall")}>
            <div className={cx("cardSmallImageWrapper")}>
              <img
                src={promoteImage}
                alt="Promote Your Offers Online"
                className={cx("cardSmallImage")}
              />
            </div>
            <div className={cx("cardSmallContent")}>
              <h3 className={cx("cardSmallTitle")}>
                PROMOTE YOUR OFFERS ONLINE
              </h3>
              <span className={cx("cardSmallSubtitle")}>
                Try Stan 14 days FREE!
              </span>
            </div>
            <div className={cx("cardSmallArrow")}>&rarr;</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Tyla;
