import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";

import {
  setTemplateIndex,
  setSelectedColors,
} from "../../../../store/templateSlice";
import classNames from "classnames/bind";
import styles from "./ThemeEdit.module.scss";
import ColorsFontCard from "../../ColorsFontCard/ColorsFontCard";
import SaveCancel from "../../../common/SaveCancel";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { selectCurrentUser } from "../../../../store/authSlice";

const cx = classNames.bind(styles);

const ThemeEdit = ({ slides }) => {
  const template = useSelector((state) => state.template);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(1);
  const [swiperInitialized, setSwiperInitialized] = useState(false);
  const swiperRef = useRef(null);

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === slides.length - 1;

  // Khi component mount hoặc template.templateIndex thay đổi, đồng bộ với swiper
  useEffect(() => {
    if (
      template.templateIndex !== undefined &&
      template.templateIndex !== null
    ) {
      setActiveIndex(template.templateIndex);

      if (swiperInitialized && swiperRef.current) {
        swiperRef.current.slideTo(template.templateIndex, 0);
      }
    }
  }, [template.templateIndex, swiperInitialized]);

  const goToPrevious = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const goToNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleSwiperInit = (swiper) => {
    swiperRef.current = swiper;
    setSwiperInitialized(true);

    const currentIndex = swiper.activeIndex;
    if (
      template.templateIndex !== undefined &&
      template.templateIndex !== null &&
      template.templateIndex !== currentIndex
    ) {
      swiper.slideTo(template.templateIndex, 0);
      setActiveIndex(template.templateIndex);
    } else {
      setActiveIndex(currentIndex);
      dispatch(setTemplateIndex(currentIndex));
    }
  };

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.activeIndex;
    setActiveIndex(newIndex);
    dispatch(setTemplateIndex(newIndex));
    dispatch(setSelectedColors(slides[newIndex].colors));
  };

  const handleCancel = () => navigate("/mystore?tab=store");

  const handleSave = async () => {
    if (!currentUser) return;
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        templateIndex: template.templateIndex,
        selectedColors: template.selectedColors,
        selectedFont: template.selectedFont,
        updatedAt: new Date().toISOString(),
      });
      navigate("/mystore?tab=store");
    } catch (error) {
      console.error("Lỗi khi lưu template:", error);
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <div className={cx("swiperWrapper")}>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards, Navigation]}
            className={cx("cardsSwiper")}
            initialSlide={template.templateIndex || 0}
            onSwiper={handleSwiperInit}
            onSlideChange={handleSlideChange}
            cardsEffect={{
              slideShadows: true,
              transformEl: null,
            }}
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id} className={cx("swiperSlide")}>
                {slide.template}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={cx("controls")}>
          <button
            className={cx("navButton", { disabled: isFirst })}
            onClick={goToPrevious}
            onMouseEnter={(e) => {
              e.currentTarget.classList.add(styles["buttonHover"]);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.classList.remove(styles["buttonHover"]);
            }}
          >
            ←
          </button>

          <span className={cx("slideTitle")}>
            {slides[activeIndex]?.label || "Tải..."}
          </span>

          <button
            className={cx("navButton", { disabled: isLast })}
            onClick={goToNext}
            onMouseEnter={(e) => {
              e.currentTarget.classList.add(styles["buttonHover"]);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.classList.remove(styles["buttonHover"]);
            }}
          >
            →
          </button>
        </div>
        <ColorsFontCard />
        <SaveCancel handleCancel={handleCancel} handleSave={handleSave} />
      </div>
    </div>
  );
};

export default ThemeEdit;
