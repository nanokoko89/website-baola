import Sidebar from "../components/utils/Sidebar/Sidebar";

import Tabs from "../components/dashboards/Tabs/Tabs";
import StatsCard from "../components/dashboards/StatsCard/StatsCard";
import ChartBar from "../components/dashboards/ChartBar/ChartBar";
import HeaderBar from "../components/utils/Headerbar";
import classNames from "classnames/bind";
import styles from "./AffiliatePage.module.scss";

import BottomTabs from "../components/utils/BottomTabs";
import Affiliate from "../components/Affiliate";

const cx = classNames.bind(styles);

const AffiliatePage = () => {
  return (
    <div className={cx("layout")}>
      <Sidebar />
      <div className={cx("content")}>
        <HeaderBar title="Tiếp thị liên kết" userName="Alex" />

        <Affiliate />
        <BottomTabs />
      </div>
    </div>
  );
};

export default AffiliatePage;
