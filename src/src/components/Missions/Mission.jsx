import classNames from "classnames/bind";
import styles from "./Mission.module.scss";
import backgroundImage from "../../assets/mission.png";
import Header from "../utils/Header";

const cx = classNames.bind(styles);

const Mission = () => {
  return (
    <div className={cx("mission")}>
      <Header tab="Sứ mệnh" />

      <div
        className={cx("hero")}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className={cx("overlayOpacity")} />

        <div className={cx("overlay")}>
          <h1 className={cx("title")}>Sứ mệnh của chúng tôi:</h1>
          <p className={cx("subtitle")}>
            Chúng tôi tồn tại để giúp{" "}
            <span className={cx("highlight")}>mỗi người</span> tự làm chủ công
            việc của mình.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mission;
