import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Banner.module.scss";
import { AiOutlineInstagram, AiOutlineClose } from "react-icons/ai";

const cx = classNames.bind(styles);

const Banner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className={cx("bannerContainer")}>
      <div className={cx("bannerText")}>
        <span className={cx("icon")}>
          <AiOutlineInstagram size={24} color="#E4405F" />
        </span>
        <span className={cx("message")}>
          Track your posting habits Theo dõi thói quen đăng bài
          <span className={cx("highlight")}>
            Stan data shows that creators who post daily are 7x more likely to
            make a sale.
          </span>
        </span>
      </div>
      <button className={cx("btnConnect")}>Connect Instagram</button>
      <button className={cx("btnClose")} onClick={() => setVisible(false)}>
        <AiOutlineClose />
      </button>
    </div>
  );
};

export default Banner;
