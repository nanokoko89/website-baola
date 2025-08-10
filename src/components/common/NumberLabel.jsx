import classNames from "classnames/bind";
import styles from "./NumberLabel.module.scss";

const cx = classNames.bind(styles);

const NumberLabel = ({ number, label }) => {
  return (
    <div className={cx("header")}>
      <div className={cx("step-circle")}>{number}</div>
      <h2 className={cx("title")}>{label}</h2>
    </div>
  );
};

export default NumberLabel;
