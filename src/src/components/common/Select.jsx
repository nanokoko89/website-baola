/* File: src/common/Select.jsx */
import React from "react";
import CustomSelect from "./CustomSelect";

const durationOptions = [
  { value: "15 phút", label: "15 phút" },
  { value: "30 phút", label: "30 phút" },
  { value: "45 phút", label: "45 phút" },
  { value: "60 phút", label: "60 phút" },
];

export default function Select({
  value,
  onChange,
  width,
  labelText = "Thời gian",
}) {
  return (
    <CustomSelect
      options={durationOptions}
      value={value}
      onChange={onChange}
      labelText={labelText}
      width={width}
    />
  );
}
