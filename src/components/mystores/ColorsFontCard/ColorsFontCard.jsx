import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

import { createPortal } from "react-dom";
import { ChromePicker } from "react-color";
import { IoChevronDown } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedColors,
  setSelectedFont,
} from "../../../store/templateSlice";
import classNames from "classnames/bind";
import styles from "./ColorsFontCard.module.scss";
import getContrastTextColor from "../../../config/getContrastTextColor";
import { FONTS } from "../../../utils/fonts";

const cx = classNames.bind(styles);

export default function ColorsFontCard() {
  const selectedColors = useSelector((state) => state.template.selectedColors);
  const PRESET_COLORS = [
    selectedColors.primary,
    selectedColors.secondary,
    "#FF8A65",
    "#4CAF50",
    "#7F5AF0",
    "#FF1F77",
  ];
  const dispatch = useDispatch();
  const selectedFont = useSelector((state) => state.template.selectedFont);
  const [openKey, setOpenKey] = useState(null);
  const [popoverPos, setPopoverPos] = useState({ left: 0, top: 0 });
  const popoverRef = useRef(null);
  const swatchRefs = useRef({});
  const [fontOpen, setFontOpen] = useState(false);
  const [fontPos, setFontPos] = useState({ left: 0, top: 0, width: 0 });
  const fontRef = useRef(null);
  const fontOptionsRef = useRef(null);

  // Chuyển object thành mảng để map
  const colorEntries = Object.entries(selectedColors);
  const handleSwatchClick = (key) => {
    if (openKey === key) {
      setOpenKey(null);
    } else {
      const rect = swatchRefs.current[key].getBoundingClientRect();
      setPopoverPos({
        left: rect.left + window.scrollX,
        top: rect.bottom + window.scrollY + 8,
      });
      setOpenKey(key);
    }
  };

  useLayoutEffect(() => {
    if (openKey && popoverRef.current) {
      const popRect = popoverRef.current.getBoundingClientRect();
      const swRect = swatchRefs.current[openKey].getBoundingClientRect();
      setPopoverPos({
        left: swRect.left + window.scrollX,
        top: swRect.top + window.scrollY - popRect.height - 8,
      });
    }
  }, [openKey]);

  useLayoutEffect(() => {
    if (fontOpen && fontOptionsRef.current && fontRef.current) {
      const listRect = fontOptionsRef.current.getBoundingClientRect();
      const refRect = fontRef.current.getBoundingClientRect();
      setFontPos({
        left: refRect.left + window.scrollX,
        top: refRect.top + window.scrollY - listRect.height - 8,
        width: refRect.width,
      });
    }
  }, [fontOpen]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        !Object.values(swatchRefs.current).some((el) => el.contains(e.target))
      ) {
        setOpenKey(null);
      }
      if (
        fontRef.current &&
        !fontRef.current.contains(e.target) &&
        fontOptionsRef.current &&
        !fontOptionsRef.current.contains(e.target)
      ) {
        setFontOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleColorChange = ({ hex }) => {
    if (!openKey) return;
    const newColors = { ...selectedColors, [openKey]: hex };
    // setColors(newColors);
    dispatch(setSelectedColors(newColors));
  };

  useEffect(() => {
    if (!selectedColors) return;
    document.documentElement.style.setProperty(
      "--template-color-primary",
      selectedColors.primary
    );
    document.documentElement.style.setProperty(
      "--template-color-secondary",
      selectedColors.secondary
    );
    document.documentElement.style.setProperty(
      "--template-text-color",
      getContrastTextColor(selectedColors.secondary)
    );
    document.documentElement.style.setProperty(
      "--template-button-text-color",
      getContrastTextColor(selectedColors.primary)
    );
  }, [selectedColors]);

  const handleFontOptionClick = (font) => {
    dispatch(setSelectedFont(font));
    setFontOpen(false);
  };

  return (
    <div className={cx("card")}>
      {/* Phần chọn màu */}
      <div className={cx("section")}>
        <div className={cx("title")}>Màu sắc</div>
        <div className={cx("colors-wrapper")}>
          {colorEntries.map(([key, col]) => (
            <div
              key={key}
              className={cx("swatch-wrapper")}
              ref={(el) => (swatchRefs.current[key] = el)}
            >
              <div
                className={cx("color-swatch")}
                style={{ backgroundColor: col }}
                onClick={() => handleSwatchClick(key)}
              />
              {openKey === key &&
                createPortal(
                  <div
                    ref={popoverRef}
                    style={{
                      position: "absolute",
                      left: popoverPos.left,
                      top: popoverPos.top,
                      zIndex: 9999,
                    }}
                  >
                    <ChromePicker
                      color={col}
                      onChange={handleColorChange}
                      disableAlpha
                      presetColors={PRESET_COLORS}
                    />
                  </div>,
                  document.body
                )}
            </div>
          ))}
        </div>
      </div>

      {/* Phần chọn font */}
      <div className={cx("section")}>
        <div className={cx("title")}>Kiểu chữ</div>
        <div className={cx("font-select-wrapper")} ref={fontRef}>
          <div
            className={cx("select")}
            onClick={() => {
              if (!fontOpen && fontRef.current) {
                const rect = fontRef.current.getBoundingClientRect();
                setFontPos({
                  left: rect.left + window.scrollX,
                  top: rect.bottom + window.scrollY + 8,
                  width: rect.width,
                });
              }
              setFontOpen((o) => !o);
            }}
          >
            <span>
              {selectedFont === "system-ui" ? "Mặc định" : selectedFont}
            </span>
            <IoChevronDown className={cx("icon")} />
          </div>
          {fontOpen &&
            createPortal(
              <ul
                ref={fontOptionsRef}
                className={cx("font-options")}
                style={{
                  left: fontPos.left,
                  top: fontPos.top,
                  width: fontPos.width,
                }}
              >
                {FONTS.map((f) => (
                  <li
                    key={f}
                    className={cx("font-option")}
                    onClick={() => handleFontOptionClick(f)}
                    style={{ fontFamily: f }}
                  >
                    {f === "system-ui" ? "Mặc định" : f}
                  </li>
                ))}
              </ul>,
              document.body
            )}
        </div>
      </div>
    </div>
  );
}
