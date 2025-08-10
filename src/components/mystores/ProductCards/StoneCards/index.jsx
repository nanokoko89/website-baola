import React from "react";
import classNames from "classnames/bind";
import styles from "./StoneCards.module.scss";
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
  <div className={cx("callout")} onClick={onClick}>
    <div className={cx("top")}>
      <img
        className={cx("thumbnail")}
        src={item.template.imageUrl}
        alt={item.template.addText.title}
      />
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
      </div>
    </div>
    {item.template.addText.buttonText && (
      <button className={cx("btn")}>{item.template.addText.buttonText}</button>
    )}
  </div>
);

export const PreviewCard = ({ item, onClick }) => (
  <div className={cx("callout")} onClick={onClick}>
    <div className={cx("top")}>
      <img
        className={cx("thumbnail")}
        src={item.template.imageUrl}
        alt={item.template.addText.title}
      />
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
      </div>
    </div>
    {/* <button className={cx("btn")}>Tháng 6 năm 2025</button> */}

    {item.type === "CoachingCall" && (
      <CalendarPreview headerOnly={item.calendarHeaderOnly} />
    )}

    {item.type === "OnlineCourse" && (
      <ul className={cx("preview")}>
        <li>Chương 1: Giới thiệu</li>
        <li>Chương 2: Giới thiệu</li>
        <li>Chương 3: Giới thiệu</li>
      </ul>
    )}

    {item.template.addText.buttonText && (
      <button className={cx("btn")}>{item.template.addText.buttonText}</button>
    )}
  </div>
);
