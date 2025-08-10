// src/components/Default/Default.jsx

import React from "react";
import classNames from "classnames/bind";
import { FaTiktok, FaInstagram, FaLinkedin, FaStar } from "react-icons/fa";
import styles from "./Default.module.scss";

const cx = classNames.bind(styles);

const Default = ({
  avatar = "https://blog.vn.revu.net/wp-content/uploads/2023/09/KOL_noi_tieng_viet_nam-5.jpg",
  name = "Jack 97",
  username = "@jack97",
}) => {
  // Bản đồ tên mạng xã hội → Icon tương ứng
  const iconMap = {
    tiktok: <FaTiktok />,
    instagram: <FaInstagram />,
    linkedin: <FaLinkedin />,
    // Nếu cần thêm, cứ bổ sung vào đây
  };

  // Ví dụ dữ liệu động bạn nhận được từ API hoặc bất cứ đâu
  const socialPlatforms = [
    { name: "tiktok", url: "https://tiktok.com/@jack97" },
    { name: "instagram", url: "https://instagram.com/jack97" },
    { name: "linkedin", url: "https://linkedin.com/in/jack97" },
  ];

  const productListData = [
    {
      image:
        "https://vietnamnomad.com/wp-content/uploads/2020/07/Vietnam-travel-guide-book-social-cover-official.jpg",
      title: "Nhận hướng dẫn của tôi ngay!",
      subtitle:
        "Hướng dẫn miễn phí này sẽ dạy bạn mọi thứ bạn cần để đạt được …",
      originalPrice: "2.880.000 đ",
      discountedPrice: "2.400.000 đ",
      discountPercent: "Giảm đặt trước 15%",
      rating: 5,
      // nếu cần link cho thẻ chính-card, thêm thuộc tính `link` vào đây
    },
    {
      image:
        "https://vietnamnomad.com/wp-content/uploads/2020/07/Vietnam-travel-guide-book-social-cover-official.jpg",
      title: "Podcast của tôi cùng các nhà sáng lập tỷ phú",
      rating: 5,
      price: "2.400.000 đ",
      link: "#",
    },
    {
      image:
        "https://vietnamnomad.com/wp-content/uploads/2020/07/Vietnam-travel-guide-book-social-cover-official.jpg",
      title: "Đặt cuộc gọi 1:1 với tôi",
      rating: 5,
      price: "2.400.000 đ",
      link: "#",
    },
    {
      image:
        "https://vietnamnomad.com/wp-content/uploads/2020/07/Vietnam-travel-guide-book-social-cover-official.jpg",
      title: "Liên kết đến nơi nào đó",
      rating: 0,
      price: null,
      link: "#",
    },
  ];

  // Tách phần Main Card (index 0) và "Other Items" (index >= 1)
  const mainCardData = productListData.length ? productListData[0] : null;
  const otherItemsData =
    productListData.length > 1 ? productListData.slice(1) : [];

  return (
    <div className={cx("container")}>
      {/* Header */}
      <div className={cx("header")}>
        <div className={cx("avatar-wrapper")}>
          <img src={avatar} alt="Avatar" className={cx("avatar")} />
        </div>
        <div className={cx("profile-info")}>
          <h2 className={cx("name")}>{name}</h2>
          {username && <p className={cx("username")}>{username}</p>}
          {socialPlatforms.length > 0 && (
            <div className={cx("social-icons")}>
              {socialPlatforms.map((plat, idx) => {
                const key = plat.name.toLowerCase();
                const icon = iconMap[key] || null;
                return icon ? (
                  <a href={plat.url} key={idx} className={cx("social-icon")}>
                    {icon}
                  </a>
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>

      <div className={cx("divider")} />

      {/* Main Card */}
      {mainCardData && (
        <div className={cx("main-card")}>
          {/* Ảnh full-width */}
          <div className={cx("main-image-wrapper")}>
            <img
              src={mainCardData.image}
              alt={mainCardData.title}
              className={cx("main-image")}
            />
            {mainCardData.discountPercent && (
              <div className={cx("badge")}>{mainCardData.discountPercent}</div>
            )}
          </div>

          {/* Nội dung bên dưới ảnh */}
          <div className={cx("main-content")}>
            {mainCardData.title && (
              <h3 className={cx("main-title")}>{mainCardData.title}</h3>
            )}
            {mainCardData.subtitle && (
              <p className={cx("main-subtitle")}>{mainCardData.subtitle}</p>
            )}

            {typeof mainCardData.rating === "number" &&
              mainCardData.rating > 0 && (
                <div className={cx("stars")}>
                  {Array.from({
                    length: mainCardData.rating,
                  }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              )}

            <div className={cx("pricing")}>
              {mainCardData.originalPrice && (
                <span className={cx("original-price")}>
                  {mainCardData.originalPrice}
                </span>
              )}
              {mainCardData.discountedPrice && (
                <span className={cx("discounted-price")}>
                  {mainCardData.discountedPrice}
                </span>
              )}
            </div>

            <button className={cx("btn-primary")}>Nhận hướng dẫn</button>
          </div>
        </div>
      )}

      {/* Other Items */}
      {otherItemsData.length > 0 && (
        <div className={cx("item-list")}>
          {otherItemsData.map((item, idx) => (
            <a href={item.link || "#"} key={idx} className={cx("item-card")}>
              <div className={cx("item-image-wrapper")}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={cx("item-image")}
                />
              </div>

              <div className={cx("item-info")}>
                {item.title && (
                  <h4 className={cx("item-title")}>{item.title}</h4>
                )}
                {typeof item.rating === "number" && item.rating > 0 && (
                  <div className={cx("stars-small")}>
                    {Array.from({
                      length: item.rating,
                    }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                )}
              </div>

              {item.price && (
                <div className={cx("item-price")}>{item.price}</div>
              )}
            </a>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className={cx("footer")}>
        <span>Build Your Creator Store with</span>
        <a href="#" className={cx("footer-link")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1zm.5 4h-1v1H7a.5.5 0 0 0 0 1h.5v3H7a.5.5 0 0 0 0 1h.5v1h1v-1H9a.5.5 0 0 0 0-1H8.5V7H9a.5.5 0 0 0 0-1H8.5V5z" />
          </svg>
          <span className={cx("baola-text")}>Bao La ›</span>
        </a>
      </div>
    </div>
  );
};

export default Default;
