import React from "react";
import classNames from "classnames/bind";
import styles from "./NightViewCards.module.scss";
import CalendarPreview from "../../../coachingCallComponents/Calendars/CalendarPreview";
import numberWithCommas from "../../../../config/numberWithCommas";

const cx = classNames.bind(styles);

export const ButtonCard = ({ item, onClick }) => (
  <div className={cx("button")} onClick={onClick}>
    <img
      className={cx("thumbnail")}
      src={item.template.imageUrl}
      alt={item.template.addText.title}
    />

    <div className={cx("content")}>
      <h3 className={cx("title")}>{item.template.addText.title}</h3>
      {/* {item.template.addText.description && (
        <p className={cx("desc")}>{item.template.addText.description}</p>
      )} */}
      {item.checkout.price > 0 && (
        <div className={cx("price")}>
          {numberWithCommas(item.checkout.price)}đ
        </div>
      )}
      {/* {item.template.addText.buttonText && (
        <button className={cx("btn")}>
          {item.template.addText.buttonText}
        </button>
      )} */}
    </div>
  </div>
);

export const CalloutCard = ({ item, onClick }) => (
  <div
    className={cx("callout")}
    onClick={onClick}
    style={{
      backgroundImage: `url(${item.template.imageUrl})`,
      height: "auto",
      width: "100%",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "400px",
    }}
  >
    <div className={cx("overlay")} />

    <div className={cx("content")}>
      <h3 className={cx("title")}>{item.template.addText.title}</h3>
      {item.template.addText.description && (
        <p className={cx("desc")}>{item.template.addText.description}</p>
      )}
      {item.checkout.price > 0 && (
        <div className={cx("price")}>
          {numberWithCommas(item.checkout.price)}đ
        </div>
      )}

      {item.template.addText.buttonText && (
        <button className={cx("btn")}>
          {item.template.addText.buttonText}
        </button>
      )}
    </div>
  </div>
);

export const PreviewCard = ({ item, onClick }) => (
  <div
    className={cx("callout")}
    onClick={onClick}
    style={{
      backgroundImage: `url(${item.template.imageUrl})`,
      height: "auto",
      width: "100%",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "400px",
    }}
  >
    <div className={cx("overlay")} />

    <div className={cx("content")}>
      <h3 className={cx("title")}>{item.template.addText.title}</h3>
      {item.template.addText.description && (
        <p className={cx("desc")}>{item.template.addText.description}</p>
      )}
      {item.checkout.price > 0 && (
        <div className={cx("price")}>
          {numberWithCommas(item.checkout.price)}đ
        </div>
      )}

      {item.type === "CoachingCall" && (
        <CalendarPreview color="#fff" headerOnly={item.calendarHeaderOnly} />
      )}

      {item.type === "OnlineCourse" && (
        <ul className={cx("preview")}>
          <li>Chương 1: Giới thiệu</li>
          <li>Chương 2: Giới thiệu</li>
          <li>Chương 3: Giới thiệu</li>
        </ul>
      )}

      {item.template.addText.buttonText && (
        <button className={cx("btn")}>
          {item.template.addText.buttonText}
        </button>
      )}
    </div>
  </div>
);
