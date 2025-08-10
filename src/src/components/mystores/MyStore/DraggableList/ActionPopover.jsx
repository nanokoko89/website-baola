import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import cx from "classnames/bind";
import styles from "./DraggableList.module.scss";

const bind = cx.bind(styles);

export default function ActionPopover({ anchorEl, options = [], onClose }) {
  const popRef = useRef(null);
  const [position, setPosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    const handleClick = (e) => {
      if (
        popRef.current &&
        !popRef.current.contains(e.target) &&
        anchorEl &&
        !anchorEl.contains(e.target)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [anchorEl, onClose]);

  useLayoutEffect(() => {
    if (!anchorEl) return;

    const rect = anchorEl.getBoundingClientRect();
    const popHeight = popRef.current ? popRef.current.offsetHeight : 0;

    const belowSpace = window.innerHeight - rect.bottom - 8;
    const showBelow = belowSpace >= popHeight;

    const top = showBelow
      ? rect.bottom + window.scrollY + 8
      : rect.top + window.scrollY - popHeight - 8;

    setPosition({
      left: rect.left + window.scrollX,
      top: Math.max(top, 0),
    });
  }, [anchorEl, options]);

  if (!anchorEl) return null;

  return createPortal(
    <div
      ref={popRef}
      className={bind("action-menu")}
      style={position}
    >
      {options.map((opt) => (
        <div
          key={opt.label}
          className={bind("action-menu-item")}
          onClick={() => {
            opt.onClick && opt.onClick();
            onClose();
          }}
        >
          <span className={bind("action-menu-icon")}>{opt.icon}</span>
          <span>{opt.label}</span>
        </div>
      ))}
    </div>,
    document.body
  );
}
