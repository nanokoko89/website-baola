import React from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

/**
 * Bám sát ZaUI Button (v1.11.0):
 * - variant: "primary" | "secondary" | "tertiary" (default "primary")
 * - type: "highlight" | "danger" | "neutral" (default "highlight")
 * - size: "large" | "medium" | "small"
 * - htmlType: "button" | "submit" | "reset" (default "button")
 * - loading: boolean (disable + spinner)
 * - disabled: boolean
 * - fullWidth: boolean
 * - icon: ReactNode (nếu có label => leading; không label => Icon Button)
 * - prefixIcon / suffixIcon: ReactNode (ưu tiên cao hơn `icon`)
 * - className, style, onClick, ...rest
 */
export default function Button({
  children,
  variant = "primary",
  type = "highlight",
  size = "medium",
  htmlType = "button",
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  prefixIcon,
  suffixIcon,
  className,
  style,
  onClick,
  ...rest
}) {
  const hasLabel = children != null && children !== false;
  const iconOnly = !hasLabel && !!icon && !prefixIcon && !suffixIcon;
  const isDisabled = disabled || loading;

  // Tính leading/trailing icon theo ưu tiên tài liệu
  let leading = null;
  let trailing = null;
  if (prefixIcon || suffixIcon) {
    leading = prefixIcon ?? null;
    trailing = suffixIcon ?? null;
  } else if (icon && hasLabel) {
    leading = icon; // theo docs: leading icon
  }

  return (
    <button
      type={htmlType}
      className={cx(
        "btn",
        `v-${variant}`, // primary|secondary|tertiary
        `t-${type}`, // highlight|danger|neutral
        `s-${size}`, // large|medium|small
        {
          fullWidth,
          iconOnly,
          loading,
          disabled: isDisabled,
          withLeading: !!leading,
          withTrailing: !!trailing,
        },
        className
      )}
      style={style}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {/* Spinner: cố định, không đẩy label; ở giữa nếu icon-only */}
      {loading && <span className={cx("spinner")} aria-hidden />}

      <span className={cx("inner")}>
        {iconOnly ? (
          <span className={cx("onlyIcon")}>{icon}</span>
        ) : (
          <>
            {leading ? (
              <span className={cx("icon", "prefix")}>{leading}</span>
            ) : null}
            {hasLabel ? <span className={cx("label")}>{children}</span> : null}
            {trailing ? (
              <span className={cx("icon", "suffix")}>{trailing}</span>
            ) : null}
          </>
        )}
      </span>
    </button>
  );
}
