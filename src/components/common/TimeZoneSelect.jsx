/* File: src/common/TimeZoneSelect.jsx */
import React from "react";
import CustomSelect from "./CustomSelect";

const tzOptions = [
  { value: "UTC+7", label: "UTC+7 (Hà Nội, TP.HCM)" },
  { value: "UTC+8", label: "UTC+8 (Singapore, Kuala Lumpur)" },
  { value: "UTC+9", label: "UTC+9 (Tokyo, Seoul)" },
];

export default function TimeZoneSelect({ value, onChange, width }) {
  return (
    <CustomSelect
      options={tzOptions}
      value={value}
      onChange={onChange}
      labelText="Múi giờ"
      width={width}
    />
  );
}
