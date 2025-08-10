import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Tabs.module.scss";
import { selectCurrentUser } from "../../../store/authSlice";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

const tabOptions = [
  "7 ngày gần đây",
  "14 ngày gần đây",
  "Tháng này",
  "Từ trước đến nay",
];

const Tabs = ({ onChange }) => {
  const [activeIndex, setActiveIndex] = useState(1); // Mặc định chọn "Last 14 Days"

  const handleClick = (index) => {
    setActiveIndex(index);
    if (onChange) onChange(tabOptions[index], index);
  };

  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className={cx("container")}>
      <h2>Hey {currentUser.displayName} - chào mừng trở lại! </h2>
      <div className={cx("tabsContainer")}>
        {tabOptions.map((label, idx) => (
          <button
            key={label}
            className={cx("tab", { active: activeIndex === idx })}
            onClick={() => handleClick(idx)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
