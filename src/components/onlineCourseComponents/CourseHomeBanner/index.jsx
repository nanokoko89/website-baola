// src/components/CourseHomeBanner/CourseHomeBanner.jsx
import React from "react";
import classNames from "classnames/bind";
import { FiChevronRight } from "react-icons/fi";
import styles from "./CourseHomeBanner.module.scss";

const cx = classNames.bind(styles);

export default function CourseHomeBanner({
  courseTitle = "Chương trình 12 tuần của tôi",
  onEdit,
}) {
  return (
    <div className={cx("section")}>
      {/* header step */}
      <div className={cx("header")}>
        <div className={cx("step")}>1</div>
        <div className={cx("text")}>
          <h3 className={cx("title")}>Trang chủ khóa học</h3>
          <p className={cx("subtitle")}>
            Bắt đầu bằng cách đặt tên cho khóa học của bạn và thiết lập trang
            chủ của bạn.
          </p>
        </div>
      </div>

      {/* card preview */}
      <div className={cx("card")}>
        <img
          src="https://media.istockphoto.com/id/1413606459/vi/anh/nghiên-cứu-thí-nghiệm-và-thử-nghiệm-y-tế-đang-được-thực-hiện-bởi-một-nhà-khoa-h%E1%BB%8Dc-trong-phòng.jpg?s=612x612&w=0&k=20&c=U8h0cUKfBsW3lYxsKAfI0OIbpwz-9KK5xi9gtfgAFhw="
          alt="Homepage thumbnail"
          className={cx("thumbnail")}
        />
        <div className={cx("info")}>
          <span className={cx("label")}>Trang chủ</span>
          <span className={cx("coursename")}>{courseTitle}</span>
        </div>
        <button type="button" className={cx("btn")} onClick={onEdit}>
          Chỉnh sửa trang <FiChevronRight className={cx("icon")} />
        </button>
      </div>
    </div>
  );
}
