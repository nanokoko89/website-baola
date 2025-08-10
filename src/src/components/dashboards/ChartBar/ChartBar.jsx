import React from "react";
import classNames from "classnames/bind";
import styles from "./ChartBar.module.scss";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const cx = classNames.bind(styles);

// Ví dụ dữ liệu mẫu (dates, số lượng)
const sampleData = [
  { date: "21/5", value: 10 },
  { date: "23/05", value: 0 },
  { date: "25/05", value: 0 },
  { date: "27/05", value: 50 },
  { date: "29/05", value: 120 },
  { date: "31/05", value: 0 },
  { date: "02/06", value: 100 },
];

const ChartBar = ({
  data = sampleData,
  dataKey = "value",
  color = "#06d6a0",
}) => {
  return (
    <div className={cx("chartContainer")}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
        >
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#6c6cff" }} />
          <Tooltip />
          <Bar
            dataKey={dataKey}
            fill={color}
            barSize={40}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartBar;
