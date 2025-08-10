import React, { useState } from "react";
import styles from "./MiniLayouts.module.scss";
import classNames from "classnames/bind";

// Import các components cho từng loại sản phẩm
import EmailCollection from "../CreateProducts/EmailCollection";
import DigitalProduct from "../CreateProducts/DigitalProduct";
import CoachingCall from "../CreateProducts/CoachingCall";
import CustomProduct from "../CreateProducts/CustomProduct";
import OnlineCourse from "../CreateProducts/OnlineCourse";
import Membership from "../CreateProducts/Membership";
import Webinar from "../CreateProducts/Webinar";
import Community from "../CreateProducts/Community";
import MediaLink from "../CreateProducts/MediaLink";
import Affiliate from "../CreateProducts/Affiliate";
import { useNavigate } from "react-router-dom";

// Import classNames bind
const cx = classNames.bind(styles);

export const productTypes = [
  // {
  //   id: "email",
  //   title: "Form",
  //   description:
  //     "Thu thập thông tin khách hàng tiềm năng bằng quà tặng miễn phí, ebook, checklist, hoặc biểu mẫu đăng ký.",
  //   icon: "email",
  //   bgColor: "#fce7f3",
  //   component: <EmailCollection />,
  // },
  {
    id: "DigitalProduct",
    title: "Sản Phẩm Số",
    description: "PDF, Hướng dẫn, Mẫu, Nội dung độc quyền, eBook, v.v.",
    icon: "digital",
    bgColor: "#dbeafe",
    component: <DigitalProduct />,
  },
  {
    id: "CoachingCall",
    title: "Lịch hẹn",
    description: "Đặt lịch hẹn gặp mặt hoặc cuộc gọi qua Zoom, Google Meet,…",
    icon: "coaching",
    bgColor: "#dbeafe",
    component: <CoachingCall />,
  },
  // {
  //   id: "custom",
  //   title: "Sản Phẩm Vật Lý",
  //   description: "Quần áo, phụ kiện, đồ chơi, thiết bị gia dụng,…",
  //   icon: "custom",
  //   bgColor: "#fef3c7",
  //   component: <CustomProduct />,
  // },
  {
    id: "OnlineCourse",
    title: "Khóa Học Online",
    description: "Tạo và bán khóa học online, lưu trữ trực tiếp trên nền tảng.",
    icon: "course",
    bgColor: "#dbeafe",
    component: <OnlineCourse />,
  },
  // {
  //   id: "membership",
  //   title: "Gói Thành Viên Định Kỳ",
  //   description:
  //     "Bán gói thành viên tính phí hàng tháng/quý để truy cập nội dung, tài nguyên, hoặc hỗ trợ riêng.",
  //   icon: "membership",
  //   bgColor: "#fef3c7",
  //   component: <Membership />,
  // },
  // {
  //   id: "webinar",
  //   title: "Hội Thảo Online",
  //   description:
  //     "Tổ chức lớp học, buổi chia sẻ trực tiếp (Zoom/Meet) cho nhiều người cùng lúc.",
  //   icon: "webinar",
  //   bgColor: "#ecfdf5",
  //   component: <Webinar />,
  // },
  // {
  //   id: "community",
  //   title: "Cộng Đồng Riêng",
  //   description:
  //     "Xây dựng cộng đồng trả phí (hoặc miễn phí) trên nền tảng – nơi học viên/gười theo dõi giao lưu và được hỗ trợ.",
  //   icon: "community",
  //   bgColor: "#ede9fe",
  //   component: <Community />,
  // },
  // {
  //   id: "media",
  //   title: "Chia sẻ liên kết / Media ",
  //   description:
  //     "Chèn link website riêng, affiliate link, hoặc nhúng video YouTube, Spotify,... để khách truy cập xem/bấm vào.",
  //   icon: "media",
  //   bgColor: "#fce7f3",
  //   component: <MediaLink />,
  // },
  // {
  //   id: "affiliate",
  //   title: "Tiếp thị liên kết",
  //   description:
  //     "Giới thiệu người khác dùng Bao La để nhận 20% hoa hồng từ phí đăng ký hàng tháng của họ.",
  //   icon: "affiliate",
  //   bgColor: "#dbeafe",
  //   component: <Affiliate />,
  // },
];

const MiniLayouts = () => {
  const navigate = useNavigate();

  const renderIcon = (type, bgColor) => {
    const iconStyle = {
      backgroundColor: bgColor,
      width: "48px",
      height: "48px",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      marginRight: "16px",
      flexShrink: 0,
    };

    const iconMap = {
      email: "👤",
      digital: "📦",
      coaching: "📅",
      custom: "📋",
      course: "🎓",
      membership: "🔄",
      webinar: "💻",
      community: "👥",
      media: "🔗",
      affiliate: "💰",
    };

    return <div style={iconStyle}>{iconMap[type]}</div>;
  };

  const handleProductSelect = (id) => navigate(`/mystore/create-product/${id}`);

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <h1>Chọn mẫu</h1>
        <p className={cx("subtitle")}>
          Chọn mẫu phù hợp nhất với loại hình kinh doanh để khách hàng của bạn
          có thể gửi yêu cầu đến bạn.
        </p>
      </div>

      <div className={cx("product-grid")}>
        <h1>Dành cho thuê xe tự lái</h1>
        <h1>Dành cho taxi sân bay</h1>
        <h1>Dành cho chuyển nhà</h1>
        <h1>Dành cho dọn dẹp</h1>
      </div>
    </div>
  );
};

export default MiniLayouts;
