// src/components/Benefit/Benefit.jsx
import React from "react";
import classNames from "classnames/bind";
import styles from "./Benefit.module.scss";

// Các icon sử dụng react-icons
import {
  AiOutlineMobile,
  AiOutlineCalendar,
  AiOutlineMail,
} from "react-icons/ai";
import {
  FaGift,
  FaLock,
  FaChartLine,
  FaPaperPlane,
  FaWrench,
  FaTimes,
  FaDollarSign,
} from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";

const cx = classNames.bind(styles);

// Dữ liệu danh sách tính năng (đã được chuyển sang tiếng Việt, giá tính bằng VND)
const features = [
  {
    icon: <AiOutlineMobile />,
    title: 'Cửa hàng "Link-in-Bio" tối ưu cho di động',
    sub: "Thay thế Beacons & Linktree",
    price: "667.000₫",
  },
  {
    icon: <AiOutlineCalendar />,
    title: "Lên lịch & đặt hẹn",
    sub: "Thay thế Calendly & Google Calendar",
    price: "345.000₫",
  },
  {
    icon: <GiGraduateCap />,
    title: "Trình tạo khóa học",
    sub: "Thay thế Gumroad",
    price: "2.737.000₫",
  },
  {
    icon: <FaChartLine />,
    title: "Phân tích khán giả",
    sub: "Thay thế Google Analytics",
    price: "230.000₫",
  },
  //   {
  //     icon: <FaPaperPlane />,
  //     title: "Gửi tin nhắn tự động trên Instagram",
  //     sub: "Thay thế Manychat",
  //     price: "345.000₫",
  //   },
  {
    icon: <AiOutlineMail />,
    title: "Tạo danh sách email / bản tin",
    sub: "",
    price: "667.000₫",
  },
  {
    icon: <FaGift />,
    title: "Thư viện mẫu mạng xã hội",
    sub: "",
    price: "690.000₫",
  },
  {
    icon: <FaLock />,
    title: "Truy cập cộng đồng sáng tạo độc quyền",
    sub: "",
    price: "2.231.000₫",
  },
  {
    icon: <FaWrench />,
    title: "Huấn luyện chiến lược 1:1 cho người sáng tạo",
    sub: "",
    price: "2.277.000₫",
  },
];

const Benefit = ({ handleStart }) => {
  return (
    <div className={cx("wrapper")}>
      {/* Phần tiêu đề */}
      <div className={cx("header")}>
        <h2 className={cx("title")}>Giải Pháp Đơn Giản 💰</h2>
        <p className={cx("subtitle")}>
          Không phải trả tiền cho hơn 5 ứng dụng khác nhau! Bao La hội tụ tất cả
          về một nơi.
        </p>
      </div>

      {/* Phần card trắng chứa danh sách tính năng */}
      <div className={cx("card")}>
        {features.map((item, index) => (
          <div key={index} className={cx("featureRow")}>
            <div className={cx("iconWrapper")}>{item.icon}</div>
            <div className={cx("textWrapper")}>
              <span className={cx("featureTitle")}>{item.title}</span>
              {item.sub && <span className={cx("featureSub")}>{item.sub}</span>}
            </div>
            <span className={cx("featurePrice")}>{item.price}</span>
          </div>
        ))}

        {/* Đường phân cách */}
        <div className={cx("divider")}></div>

        {/* Dòng “Chi phí bạn sẽ phải trả nếu không dùng” */}
        <div className={cx("alternativeRow")}>
          <div className={cx("iconWrapper", "smallIcon")}>
            <FaTimes />
          </div>
          <span className={cx("alternativeText")}>
            Chi phí bạn sẽ phải trả nếu không dùng
          </span>
          <span className={cx("alternativePrice")}>10.189.000₫/tháng</span>
        </div>

        <div className={cx("ctaRow")}>
          <div className={cx("iconWrapper", "smallIcon")}>
            <FaDollarSign />
          </div>
          <span className={cx("ctaText")}>Tham gia cộng đồng Bao La ✨</span>
          <span className={cx("ctaPrice")}>229.000₫/tháng</span>
        </div>
      </div>

      {/* Nút “Bắt đầu dùng thử” */}
      <button className={cx("btnTrial")} onClick={handleStart}>
        <span>Bắt đầu dùng thử</span>{" "}
        <span className={cx("arrow")}>&rarr;</span>
      </button>
    </div>
  );
};

export default Benefit;
