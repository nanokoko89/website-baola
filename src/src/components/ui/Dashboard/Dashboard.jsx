import React from "react";
import { Page, Box, Button, Icon } from "zmp-ui";
import styles from "./Dashboard.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

// Data để vẽ biểu đồ như ảnh
const bars = [
  { x: "Jul 27", v: 0 },
  { x: "Jul 31", v: 74 },
  { x: "Aug 02", v: 0 },
  { x: "Aug 04", v: 0 },
  { x: "Aug 06", v: 126 },
  { x: "Aug 08", v: 168 },
];
const maxV = Math.max(...bars.map((b) => b.v)) || 1;

function MetricCard({ icon, label, value, delta, up = true }) {
  return (
    <div className={cx("kpi")}>
      <div className={cx("kpi-head")}>
        <Icon icon={icon} className={cx("kpi-icon")} />
        <span className={cx("kpi-label")}>{label}</span>
      </div>
      <div className={cx("kpi-body")}>
        <div className={cx("kpi-value")}>{value}</div>
        <div className={cx("kpi-delta", { up, down: !up })}>
          <Icon icon={up ? "zi-trending-up" : "zi-trending-down"} />
          <span>{delta}</span>
        </div>
      </div>
    </div>
  );
}

function BarChart() {
  return (
    <div className={cx("chart")}>
      <div className={cx("chart-grid")}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={cx("grid-line")} />
        ))}
      </div>
      <div className={cx("bars")}>
        {bars.map((b, i) => (
          <div key={i} className={cx("bar-wrap")}>
            <div
              className={cx("bar")}
              style={{ height: `${(b.v / maxV) * 100}%` }}
            />
            <div className={cx("bar-x")}>{b.x}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Page className={cx("page")}>
      {/* Topbar thay cho Navbar */}
      <div className={cx("topbar")}>
        <div className={cx("topbar-inner")}>
          <div className={cx("topbar-left")}>Home</div>
          <button
            className={cx("topbar-right")}
            onClick={() => navigator.clipboard?.writeText("stan.store/taoreo")}
          >
            <span>stan.store/taoreo</span>
            <Icon icon="zi-copy" />
          </button>
        </div>
      </div>

      <Box className={cx("container")}>
        <h1 className={cx("welcome")}>Hey Nguyễn – welcome back!</h1>

        {/* Tip card */}
        <div className={cx("tip")}>
          <div className={cx("tip-left")}>
            <div className={cx("ig")}>
              <Icon icon="zi-camera" />
            </div>
            <div className={cx("tip-text")}>
              <div className={cx("tip-title")}>Track your posting habits</div>
              <div className={cx("tip-desc")}>
                Stan data shows that creators who post daily are 7x more likely
                to make a sale.
              </div>
            </div>
          </div>
          <div className={cx("tip-right")}>
            <Button size="small" variant="secondary" className={cx("ig-btn")}>
              Connect Instagram
            </Button>
            <button className={cx("tip-close")} aria-label="close">
              <Icon icon="zi-close" />
            </button>
          </div>
        </div>

        {/* Date ranges */}
        <div className={cx("ranges")}>
          <button className={cx("range")}>Last 7 Days</button>
          <button className={cx("range", "active")}>Last 14 Days</button>
          <button className={cx("range")}>Aug 1, 2025 – Aug 10, 2025</button>
          <button className={cx("range")}>Custom Range</button>
        </div>

        {/* KPI row */}
        <div className={cx("kpis")}>
          <MetricCard
            icon="zi-view"
            label="Store Visits"
            value="11"
            delta="267%"
            up
          />
          <MetricCard
            icon="zi-dollar"
            label="Total Revenue"
            value="$0"
            delta="0%"
            up
          />
          <MetricCard icon="zi-user" label="Leads" value="0" delta="0%" up />
        </div>

        {/* Chart */}
        <BarChart />
      </Box>
    </Page>
  );
}
