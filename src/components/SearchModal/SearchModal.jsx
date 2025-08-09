import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./SearchModal.module.scss";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

/**
 * props:
 * - open: boolean
 * - onClose: () => void
 * - items: Array<{ id, rank, avatar, title, subtitle }>
 */
export default function SearchModal({ open, onClose, items = [] }) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);

  // Khóa scroll nền khi modal tồn tại
  useLockBodyScroll(mounted);

  // mount/unmount để transition mượt
  useEffect(() => {
    if (open) {
      setMounted(true);
      // đợi 1 frame để CSS transition chạy
      requestAnimationFrame(() => setShow(true));
    } else {
      setShow(false);
    }
  }, [open]);

  // focus ô search khi mở
  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
      inputRef.current.select?.();
    }
  }, [show]);

  // Esc để đóng
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (mounted) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, onClose]);

  // unmount khi đóng xong
  const onTransitionEnd = (e) => {
    if (!show && e.target === e.currentTarget) {
      setMounted(false);
    }
  };

  if (!mounted) return null;
  return createPortal(
    <div
      className={cx("overlay", { show })}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      onTransitionEnd={onTransitionEnd}
    >
      <div className={cx("modal", { show })} role="dialog" aria-modal="true">
        <button className={cx("close")} aria-label="Close" onClick={onClose}>
          <SvgX />
        </button>

        {/* Search bar */}
        <div className={cx("searchBar")}>
          <SvgSearch />
          <input
            ref={inputRef}
            className={cx("input")}
            placeholder="Search creators"
            type="text"
          />
        </div>

        {/* Body */}
        <div className={cx("body")}>
          <div className={cx("sectionTitle")}>
            <SvgFlame />
            <span>Trending</span>
          </div>

          <ul className={cx("list")}>
            {items.map((it) => (
              <li key={it.id} className={cx("item")}>
                <span className={cx("rank")}>#{it.rank}</span>
                <img className={cx("avatar")} src={it.avatar} alt="" />
                <div className={cx("meta")}>
                  <div className={cx("title")}>{it.title}</div>
                  <div className={cx("subtitle")}>{it.subtitle}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ==== Icons (SVG inline cho đúng ảnh) ==== */
function SvgSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function SvgX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function SvgFlame() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M13 3s-1 2-4 4-4 5-4 7a7 7 0 0 0 14 0c0-4-3-6-3-6s0 2-2 3-3-1-1-3 0-5 0-5z"
        fill="#ffb300"
        stroke="#ff9800"
        strokeWidth="1"
      />
    </svg>
  );
}
