import classNames from "classnames/bind";
import styles from "./Home.module.scss";

import HeroPhone from "../../assets/anh.jpeg";
import Avatar from "../../assets/avatar.png";
import CalendarIcon from "../../assets/products/calendarIcon.svg";
import CoursesIcon from "../../assets/products/courseIcon.svg";
import DownloadsIcon from "../../assets/products/digitalIcon.svg";
import Header from "../utils/Header";
import { useNavigate } from "react-router-dom";
import Benefit from "./Benefit";
import Simple from "./Simple";
import FreeTrialBanner from "./FreeTrialBanner";
import Sliders from "../utils/Sliders";
import { FaDollarSign } from "react-icons/fa";

const cx = classNames.bind(styles);

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => navigate("/signup");
  return (
    <div className={cx("home")}>
      <Header tab="Trang chủ" />
      <section className={cx("hero")}>
        {/* Left-side text */}
        <div className={cx("hero__content")}>
          <h1 className={cx("hero__title")}>
            Dùng cửa hàng
            <br />
            tất cả trong một
            <br />
            cho nhà sáng tạo
          </h1>
          <p className={cx("hero__subtitle")}>
            Bao La là cách <em>dễ nhất</em> để kiếm tiền online.
            <br />
            Tất cả khóa học, sản phẩm số và các lịch hẹn của bạn giờ đây đều
            được lưu trữ ngay trong link-in-bio của bạn.
          </p>
          <button className={cx("btn-read-more")} onClick={handleStart}>
            Tiếp tục<span className={cx("arrow")}>&rarr;</span>
          </button>
        </div>

        <div className={cx("hero__illustration")}>
          <Sliders />

          {/* Các biểu tượng phụ (Calendar, Downloads, Courses) */}
          <div className={cx("icon-circle", "icon-circle--calendar")}>
            <img className={cx("icon")} src={CalendarIcon} alt="Calendar" />
            <span className={cx("icon-circle__label")}>LỊCH HẸN</span>
          </div>
          <div className={cx("icon-circle", "icon-circle--downloads")}>
            <img className={cx("icon")} src={DownloadsIcon} alt="Downloads" />
            <span className={cx("icon-circle__label")}>SẢN PHẨM SỐ</span>
          </div>
          <div className={cx("icon-circle", "icon-circle--courses")}>
            <img className={cx("icon")} src={CoursesIcon} alt="Courses" />
            <span className={cx("icon-circle__label")}>KHÓA HỌC</span>
          </div>
        </div>
      </section>
      <Benefit handleStart={handleStart} />
      <Simple />
      <FreeTrialBanner handleStart={handleStart} />
    </div>
  );
};

export default Home;
