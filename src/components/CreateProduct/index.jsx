import React, { useState } from "react";
import styles from "./CreateProduct.module.scss";
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

// Import classNames bind
const cx = classNames.bind(styles);

const CreateProduct = ({ type, mobilePreviewOpen = false, onClosePreview }) => {
  const productTypes = [
    // {
    //   id: "email",
    //   title: "Form thu thập thông tin",
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
      component: DigitalProduct,
    },
    {
      id: "CoachingCall",
      title: "Đặt lịch hẹn",
      description: "Đặt lịch hẹn gặp mặt hoặc cuộc gọi qua Zoom, Google Meet,…",
      icon: "coaching",
      bgColor: "#dbeafe",
      component: CoachingCall,
    },
    {
      id: "custom",
      title: "Sản Phẩm Vật Lý",
      description: "Quần áo, phụ kiện, đồ chơi, thiết bị gia dụng,…",
      icon: "custom",
      bgColor: "#fef3c7",
      component: CustomProduct,
    },
    {
      id: "OnlineCourse",
      title: "Khóa Học Online",
      description:
        "Tạo và bán khóa học online, lưu trữ trực tiếp trên nền tảng.",
      icon: "course",
      bgColor: "#dbeafe",
      component: OnlineCourse,
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
    //   title: "Tiếp thị liên kết với Bao La",
    //   description:
    //     "Giới thiệu người khác dùng Bao La để nhận 20% hoa hồng từ phí đăng ký hàng tháng của họ.",
    //   icon: "affiliate",
    //   bgColor: "#dbeafe",
    //   component: <Affiliate />,
    // },
  ];
  const thisProduct = productTypes.find((product) => product.id === type);
  if (!thisProduct) {
    return (
      <div className={cx("product-detail-container")}>
        <p>Loại sản phẩm “{type}” không hợp lệ.</p>
      </div>
    );
  }
  const ProductComponent = thisProduct.component;
  return (
    <div className={cx("product-detail-container")}>
      <div className={cx("product-component")}>
        <ProductComponent
          mobilePreviewOpen={mobilePreviewOpen}
          onClosePreview={onClosePreview}
        />
      </div>
    </div>
  );
};

export default CreateProduct;
