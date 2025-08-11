
import Tabs from "../components/dashboards/Tabs/Tabs";
import StatsCard from "../components/dashboards/StatsCard/StatsCard";
import ChartBar from "../components/dashboards/ChartBar/ChartBar";
import HeaderBar from "../components/utils/Headerbar";
import classNames from "classnames/bind";
import styles from "./AffiliatePage.module.scss";

import Affiliate from "../components/Affiliate";

const cx = classNames.bind(styles);

const AffiliatePage = () => {
  return (
    <div className={cx("layout")}>
      <div className={cx("content")}>
        <HeaderBar title="Tiếp thị liên kết" userName="Alex" />

        <Affiliate />
      </div>
    </div>
  );
};

export default AffiliatePage;
