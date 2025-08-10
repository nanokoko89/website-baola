import React from "react";
import classNames from "classnames/bind";
import styles from "./StatsCard.module.scss";
import {
  AiOutlineEye,
  AiOutlineDollarCircle,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { BiArrowFromBottom, BiArrowFromTop } from "react-icons/bi";
import numberWithCommas from "../../../config/numberWithCommas";

const cx = classNames.bind(styles);

// type: "visits" | "revenue" | "leads", mainValue: số chính, percent: % tăng giảm
const StatsCard = ({
  type,
  mainValue,
  percent,
  active = false,
  onClick,
  color = "#17d945ff",
}) => {
  let title,
    IconComponent,
    isCurrency = false;

  switch (type) {
    case "visits":
      title = "Lượt ghé thăm cửa hàng";
      IconComponent = AiOutlineEye;
      break;
    case "revenue":
      title = "Tổng doanh thu";
      IconComponent = AiOutlineDollarCircle;
      isCurrency = true;
      break;
    case "leads":
      title = "Đơn hàng";
      IconComponent = AiOutlineUsergroupAdd;
      break;
    default:
      title = "";
      IconComponent = AiOutlineEye;
  }

  const isNegative = percent < 0;

  return (
    <div
      className={cx("statsCard", { active })}
      onClick={onClick}
      style={active ? { borderColor: color } : undefined}
    >
      <div className={cx("cardHeader")}>
        <span className={cx("icon")}>
          <IconComponent size={18} color="#6c6cff" />
        </span>
        <span>{title}</span>
      </div>
      <div className={cx("cardBody")}>
        <div className={cx("mainNumber")}>
          {isCurrency
            ? `${numberWithCommas(mainValue)} đ`
            : numberWithCommas(mainValue)}{" "}
        </div>
        <div className={cx("percentage", { negative: isNegative })}>
          <span className={cx(isNegative ? "arrowDown" : "arrowUp")}>
            {isNegative ? (
              <BiArrowFromTop size={16} />
            ) : (
              <BiArrowFromBottom size={16} />
            )}
          </span>
          <span>{percent}%</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
