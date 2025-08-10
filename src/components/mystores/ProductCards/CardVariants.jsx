import React from "react";
import classNames from "classnames/bind";
import styles from "./CardVariants.module.scss";
import numberWithCommas from "../../config/numberWithCommas";

const cx = classNames.bind(styles);

export const ButtonCard = ({ item, onClick }) => (
  <div className={cx("card", "button") } onClick={onClick}>
    <img className={cx("thumbnail")} src={item.template.imageUrl} alt={item.template.addText.title} />
    <div className={cx("content")}>
      <h3 className={cx("title")}>{item.template.addText.title}</h3>
      {item.template.addText.description && (
        <p className={cx("desc")}>{item.template.addText.description}</p>
      )}
      {item.price && (
        <div className={cx("price")}>{numberWithCommas(item.price)}đ</div>
      )}
      {item.template.addText.buttonText && (
        <button className={cx("btn")}>{item.template.addText.buttonText}</button>
      )}
    </div>
  </div>
);

export const CalloutCard = ({ item, onClick }) => (
  <div className={cx("card", "callout") } onClick={onClick}>
    <div className={cx("content")}>
      <h3 className={cx("title")}>{item.template.addText.title}</h3>
      {item.template.addText.description && (
        <p className={cx("desc")}>{item.template.addText.description}</p>
      )}
      {item.price && (
        <div className={cx("price")}>{numberWithCommas(item.price)}đ</div>
      )}
      {item.template.addText.buttonText && (
        <button className={cx("btn")}>{item.template.addText.buttonText}</button>
      )}
    </div>
  </div>
);

export const PreviewCard = ({ item, onClick }) => (
  <div className={cx("card", "preview") } onClick={onClick}>
    <img className={cx("thumbnail")} src={item.template.imageUrl} alt={item.template.addText.title} />
    <div className={cx("content")}>
      <h3 className={cx("title")}>{item.template.addText.title}</h3>
      {item.template.addText.description && (
        <p className={cx("desc")}>{item.template.addText.description}</p>
      )}
      {item.price && (
        <div className={cx("price")}>{numberWithCommas(item.price)}đ</div>
      )}
      {item.template.addText.buttonText && (
        <button className={cx("btn")}>{item.template.addText.buttonText}</button>
      )}
      <div className={cx("learnMore")}>Tìm hiểu thêm</div>
    </div>
  </div>
);

