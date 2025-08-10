// src/components/Simple/Simple.jsx
import React from "react";
import classNames from "classnames/bind";
import styles from "./Simple.module.scss";

import nocode from "../../assets/nocode.png";
import onetouch from "../../assets/onetouch.png";

const cx = classNames.bind(styles);

const Simple = () => {
  return (
    <div className={cx("wrapper")}>
      {/* === Phần 1: “Không cần lập trình” === */}
      <div className={cx("section", "sectionTop")}>
        <div className={cx("imageWrapper")}>
          {/* Ảnh mockup composite (phone + popup) */}
          <img
            src={nocode}
            alt="Không cần lập trình"
            className={cx("mockupTop")}
          />
        </div>
        <div className={cx("textWrapper")}>
          <h2 className={cx("title")}>Không cần lập trình</h2>
          <p className={cx("description")}>
            Bao La là cách đơn giản nhất để bắt đầu. Bạn có thể xây dựng cửa
            hàng chỉ trong vài phút!
          </p>
        </div>
      </div>

      {/* === Phần 2: “Thanh toán 1 chạm” === */}
      <div className={cx("section", "sectionBottom")}>
        <div className={cx("textWrapper", "textWrapperBottom")}>
          <h2 className={cx("title")}>Thanh toán 1 chạm</h2>
          <p className={cx("description")}>
            Khán giả của bạn không nên gặp khó khăn để mua sản phẩm. Bao La tối
            đa hóa tỷ lệ chuyển đổi thanh toán.
          </p>
        </div>
        <div className={cx("imageWrapper", "imageWrapperBottom")}>
          <div className={cx("phonesContainer")}>
            <img
              src={onetouch}
              alt="thanh toán một chạm"
              className={cx("mockupBottom")}
            />
            {/* <span className={cx("arrow")}>›››</span>
            <img
              src={
                "https://rotato.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fdpv1qe4y%2Fproduction%2Fda2b43ac9c544915291e98e48f38b27534ca45e8-2000x2000.png%3Fw%3D1000%26h%3D1000%26fit%3Dmax%26auto%3Dformat&w=3840&q=75"
              }
              alt="Màn hình thanh toán"
              className={cx("phone")}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simple;
