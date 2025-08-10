// src/components/CustomizeBrand/CustomizeBrand.jsx

import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./CustomizeBrand.module.scss";

const cx = classNames.bind(styles);

// Mảng màu cho phần Background và Highlight
const backgroundColors = [
  "#FFFFFF", // Trắng
  "#F9F1A5", // Vàng nhạt
  "#F8DBD0", // Hồng nhạt 1
  "#FBBBF0", // Hồng nhạt 2
  "#7769FF", // Tím nhạt
  "#DEE5FF", // Xanh nhạt (mặc định)
  "#CCF8DB", // Xanh lá nhạt
];

const highlightColors = [
  "#000000", // Đen
  "#FF5C02", // Cam (mặc định)
  "#FF3EB0", // Hồng
  "#9247FF", // Tím đậm
  "#3DB3FF", // Xanh da trời
  "#35D0BA", // Xanh ngọc
];

const CustomizeBrand = ({
  backgroundColor = "#DEE5FF",
  highlightColor = "#FF5C02",
  onBackgroundChange,
  onHighlightChange,
}) => {
  // State lưu giá trị màu đang chọn
  const [selectedBackground, setSelectedBackground] = useState(backgroundColor);
  const [selectedHighlight, setSelectedHighlight] = useState(highlightColor);

  // Đồng bộ khi props thay đổi
  useEffect(() => {
    setSelectedBackground(backgroundColor);
  }, [backgroundColor]);

  useEffect(() => {
    setSelectedHighlight(highlightColor);
  }, [highlightColor]);

  // refs của 2 input type="color" (ẩn nhưng vẫn có thể click thông qua label)
  const bgColorInputRef = useRef(null);
  const hlColorInputRef = useRef(null);

  // Kiểm tra xem chuỗi có phải mã hex hợp lệ không (ví dụ "#A1B2C3")
  const isValidHex = (hex) => /^#([0-9A-Fa-f]{6})$/.test(hex);

  // Khi user gõ trực tiếp vào input text
  const handleBackgroundInputChange = (e) => {
    const value = e.target.value;
    setSelectedBackground(value);
    onBackgroundChange && onBackgroundChange(value);
  };
  const handleHighlightInputChange = (e) => {
    const value = e.target.value;
    setSelectedHighlight(value);
    onHighlightChange && onHighlightChange(value);
  };

  // Khi user chọn màu từ <input type="color">
  const handleBgColorPickerChange = (e) => {
    const value = e.target.value; // luôn là chuỗi "#RRGGBB"
    setSelectedBackground(value);
    onBackgroundChange && onBackgroundChange(value);
  };
  const handleHlColorPickerChange = (e) => {
    const value = e.target.value;
    setSelectedHighlight(value);
    onHighlightChange && onHighlightChange(value);
  };

  return (
    <div className={cx("row")}>
      {/* ======== Card Background ======== */}
      <div className={cx("card")}>
        <h2 className={cx("cardTitle")}>Màu nền</h2>

        {/* Hiển thị ô tròn lớn (được bọc bởi <label>), input text + input type="color" (ẩn nhưng liên kết qua label) */}
        <div className={cx("selectedContainer")}>
          {/*
            Dùng <label htmlFor="bg-color-picker"> để khi click vào ô circleLarge
            thì thực chất là click vào input type="color" ẩn bên dưới.
          */}
          <div className={cx("selected")}>
            <label htmlFor="bg-color-picker" className={cx("circleLabel")}>
              <div
                className={cx("circleLarge")}
                style={{
                  backgroundColor: isValidHex(selectedBackground)
                    ? selectedBackground
                    : "transparent",
                }}
                title="Click để chọn màu"
              />
            </label>

            {/* Input text cho phép user gõ trực tiếp mã hex */}
            <input
              type="text"
              className={cx("colorInput")}
              value={selectedBackground}
              onChange={handleBackgroundInputChange}
              placeholder="#ABCDE0"
              aria-label="Nhập mã màu hex"
            />
          </div>
          {/* Input type="color" ẩn, có id="bg-color-picker" để label trigger */}
          <input
            type="color"
            id="bg-color-picker"
            ref={bgColorInputRef}
            className={cx("colorPickerHidden")}
            value={
              isValidHex(selectedBackground) ? selectedBackground : "#ffffff"
            }
            onChange={handleBgColorPickerChange}
          />
        </div>

        {/* Hàng các ô tròn nhỏ để chọn sẵn màu background */}
        <div className={cx("colorRow")}>
          {backgroundColors.map((color) => {
            const isActive = color === selectedBackground;
            return (
              <button
                key={color}
                className={cx("circleSmall", isActive && "circleSmallActive")}
                style={{ backgroundColor: color }}
                onClick={() => {
                  setSelectedBackground(color);
                  onBackgroundChange && onBackgroundChange(color);
                }}
                aria-label={`Chọn màu ${color}`}
              />
            );
          })}
        </div>
      </div>

      {/* ======== Card Highlight ======== */}
      <div className={cx("card")}>
        <h2 className={cx("cardTitle")}>Màu nổi bật</h2>

        {/* Hiển thị ô tròn lớn (label) + input text + input type="color" ẩn */}
        <div className={cx("selectedContainer")}>
          <div className={cx("selected")}>
            <label htmlFor="hl-color-picker" className={cx("circleLabel")}>
              <div
                className={cx("circleLarge")}
                style={{
                  backgroundColor: isValidHex(selectedHighlight)
                    ? selectedHighlight
                    : "transparent",
                }}
                title="Click để chọn màu"
              />
            </label>

            {/* Input text để gõ hex */}
            <input
              type="text"
              className={cx("colorInput")}
              value={selectedHighlight}
              onChange={handleHighlightInputChange}
              placeholder="#FF3EB0"
              aria-label="Nhập mã màu hex"
            />
          </div>
          {/* Input type="color" ẩn nhưng có id để label kích hoạt */}
          <input
            type="color"
            id="hl-color-picker"
            ref={hlColorInputRef}
            className={cx("colorPickerHidden")}
            value={
              isValidHex(selectedHighlight) ? selectedHighlight : "#000000"
            }
            onChange={handleHlColorPickerChange}
          />
        </div>

        {/* Hàng các ô tròn nhỏ (preset highlight colors) */}
        <div className={cx("colorRow")}>
          {highlightColors.map((color) => {
            const isActive = color === selectedHighlight;
            return (
              <button
                key={color}
                className={cx("circleSmall", isActive && "circleSmallActive")}
                style={{ backgroundColor: color }}
                onClick={() => {
                  setSelectedHighlight(color);
                  onHighlightChange && onHighlightChange(color);
                }}
                aria-label={`Chọn màu ${color}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomizeBrand;
