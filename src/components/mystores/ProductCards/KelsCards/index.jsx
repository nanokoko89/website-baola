import React from "react";
import classNames from "classnames/bind";
import styles from "./KelsCards.module.scss";
import CalendarPreview from "../../../coachingCallComponents/Calendars/CalendarPreview";
import { IoIosArrowRoundForward } from "react-icons/io";
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
      {/* {item.checkout.price && (
        <div className={cx("price")}>{item.checkout.price}</div>
      )} */}

      <IoIosArrowRoundForward />
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
    <img
      className={cx("thumbnail")}
      src={item.template.imageUrl}
      alt={item.template.addText.title}
    />
    <div className={cx("content")}>
      <div className={cx("top")}>
        <h3 className={cx("title")}>{item.template.addText.title}</h3>
        {item.template.addText.description && (
          <p className={cx("desc")}>{item.template.addText.description}</p>
        )}
        {item.checkout.price && (
          <div className={cx("price")}>
            {numberWithCommas(item.checkout.price)}đ
          </div>
        )}
      </div>
      {item.template.addText.buttonText && (
        <button className={cx("btn")}>
          {item.template.addText.buttonText}
        </button>
      )}
    </div>
  </div>
);

export const PreviewCard = ({ item, onClick, reverse }) => (
  <div className={cx("preview")} onClick={onClick}>
    <div
      className={cx("top")}
      style={{
        flexDirection: !reverse ? "row-reverse" : "row",
      }}
    >
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
        {item.checkout.price && (
          <div className={cx("price")}>
            {numberWithCommas(item.checkout.price)}đ
          </div>
        )}
      </div>
    </div>
    {/* <button className={cx("btn")}>Tháng 6 năm 2025</button> */}
    <div className={cx("preview-extra")}>
      {item.type === "CoachingCall" && (
        <CalendarPreview color="#000" headerOnly={item.calendarHeaderOnly} />
      )}

      {item.type === "OnlineCourse" && (
        <ul className={cx("preview")}>
          <li>Chương 1: Giới thiệu</li>
          <li>Chương 2: Giới thiệu</li>
          <li>Chương 3: Giới thiệu</li>
        </ul>
      )}
    </div>
    {item.template.addText.buttonText && (
      <button className={cx("btn")}>{item.template.addText.buttonText}</button>
    )}
  </div>
);
