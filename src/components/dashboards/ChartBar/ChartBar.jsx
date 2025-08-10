import React, { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ChartBar.module.scss";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const cx = classNames.bind(styles);

const ChartBar = ({
  data = [],
  dataKey = "value",
  color = "#06d6a0",
  startDate,
  endDate,
}) => {
  const containerRef = useRef(null);
  const [maxTicks, setMaxTicks] = useState(6);

  // Update max tick count based on container width
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      // roughly 80px per tick label
      const count = Math.max(Math.floor(width / 80), 2);
      setMaxTicks(count);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Ensure the chart has data for each day in the range
  const fullData = useMemo(() => {
    if (startDate && endDate) {
      const map = new Map(data.map((d) => [d.date, d[dataKey] || 0]));
      const arr = [];
      const current = new Date(startDate);
      const last = new Date(endDate);
      while (current <= last) {
        const label = current.toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "short",
        });
        arr.push({ date: label, [dataKey]: map.get(label) || 0 });
        current.setDate(current.getDate() + 1);
      }
      return arr;
    }
    return data;
  }, [data, dataKey, startDate, endDate]);

  // Calculate ticks to fit the screen
  const ticks = useMemo(() => {
    const total = fullData.length;
    if (total === 0) return [];
    const step = Math.ceil(total / maxTicks);
    return fullData
      .filter((_, idx) => idx % step === 0 || idx === total - 1)
      .map((d) => d.date);
  }, [fullData, maxTicks]);

  return (
    <div className={cx("chartContainer")} ref={containerRef}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={fullData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
          <XAxis
            dataKey="date"
            ticks={ticks}
            interval={0}
            tick={{ fontSize: 12, fill: "#6c6cff" }}
          />
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
