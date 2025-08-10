import React, { useMemo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Avatar.module.scss";

const cx = classNames.bind(styles);

// Preset gradient theo docs backgroundColor
const PRESETS = {
  "BLUE-BLUELIGHT": ["#2F6BFF", "#7FB3FF"],
  "PURPLE-BLUE": ["#7A5AF8", "#3B82F6"],
  "SKYBLUE-GREEN": ["#5AC8FA", "#34D399"],
  "GREEN-GREENLIGHT": ["#10B981", "#6EE7B7"],
};

// Hash đơn giản để auto-chọn preset theo text
function pickPresetFromText(text) {
  if (!text) return "BLUE-BLUELIGHT";
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  const keys = Object.keys(PRESETS);
  return keys[h % keys.length];
}

/**
 * Props bám theo ZaUI Avatar:
 * - size: number (px)
 * - src: string (url ảnh)
 * - children: ReactNode (nếu là string sẽ hiển thị text/initial)
 * - online: boolean (dot trạng thái)
 * - story: "default" | "seen" (vòng story)
 * - blocked: boolean (overlay khoá)
 * - backgroundColor: "BLUE-BLUELIGHT" | "PURPLE-BLUE" | "SKYBLUE-GREEN" | "GREEN-GREENLIGHT"
 * - onClick: function
 * - alt, className, style: mở rộng
 */
export default function Avatar({
  size = 40,
  src,
  children,
  online = false,
  story, // "default" | "seen"
  blocked = false,
  backgroundColor,
  onClick,
  alt = "",
  className,
  style,
  ...rest
}) {
  const [imgError, setImgError] = useState(false);

  const isTextChild =
    typeof children === "string" || typeof children === "number";
  const text = isTextChild ? String(children) : "";

  const presetKey = useMemo(() => {
    if (backgroundColor && PRESETS[backgroundColor]) return backgroundColor;
    if (isTextChild) return pickPresetFromText(text.trim());
    return "BLUE-BLUELIGHT";
  }, [backgroundColor, isTextChild, text]);

  const gradient = PRESETS[presetKey];
  const fontSize = Math.max(12, Math.round(size * 0.42));
  const ringWidth = Math.max(2, Math.round(size * 0.06)); // viền story

  const showImg = !!src && !imgError;

  return (
    <div
      className={cx("wrap", className, {
        clickable: !!onClick,
        hasStory: !!story,
        seen: story === "seen",
        blocked,
      })}
      onClick={onClick}
      style={{ width: size, height: size, ...style }}
      {...rest}
    >
      {/* Vòng story */}
      {story && (
        <span
          className={cx("storyRing")}
          aria-hidden
          style={{
            borderWidth: ringWidth,
          }}
        />
      )}

      {/* Nền + nội dung */}
      <div
        className={cx("avatar")}
        style={
          showImg
            ? undefined
            : {
                background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
                fontSize,
              }
        }
        role="img"
        aria-label={alt || (isTextChild ? text : undefined)}
        title={alt || (isTextChild ? text : undefined)}
      >
        {showImg ? (
          // Ảnh
          <img
            src={src}
            alt={alt}
            className={cx("img")}
            draggable="false"
            onError={() => setImgError(true)}
          />
        ) : isTextChild ? (
          // Text / Initial
          <span className={cx("text")}>{text}</span>
        ) : (
          // Fallback icon đơn giản (SVG)
          <svg
            className={cx("fallback")}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M12 13c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
          </svg>
        )}
      </div>

      {/* Online dot */}
      {online && <span className={cx("online")} aria-label="online" />}

      {/* Blocked overlay + icon khoá */}
      {blocked && (
        <span className={cx("blocked")} aria-label="blocked">
          <svg viewBox="0 0 24 24" className={cx("lock")}>
            <path d="M17 9h-1V7a4 4 0 10-8 0v2H7a1 1 0 00-1 1v9a1 1 0 001 1h10a1 1 0 001-1v-9a1 1 0 00-1-1zm-7-2a2 2 0 114 0v2h-4V7z" />
          </svg>
        </span>
      )}
    </div>
  );
}
