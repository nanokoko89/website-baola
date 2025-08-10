import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules"; // bổ sung Autoplay
import { slides } from "../../../config/others";
import styles from "./Sliders.module.scss";
import classNames from "classnames/bind";

import "swiper/css";
import "swiper/css/effect-cards";

const cx = classNames.bind(styles);

function Sliders() {
  return (
    <div className={cx("swiperWrapper")}>
      <Swiper
        effect="cards"
        grabCursor
        loop
        modules={[EffectCards, Autoplay]} // thêm Autoplay vào đây
        className={cx("cardsSwiper")}
        cardsEffect={{
          slideShadows: true,
        }}
        autoplay={{
          // đổi từ boolean thành object
          delay: 3000, // mỗi 3 giây chuyển slide
          disableOnInteraction: false, // sau khi người dùng vuốt vẫn tự động tiếp tục
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className={cx("swiperSlide")}>
            {slide.template}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Sliders;
