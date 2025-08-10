import React from "react";
import styles from "./Store.module.scss";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);

// ---- Inline SVG icons (tối giản, sắc nét) ----
const Icon = ({ name, size = 18, className }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
  };
  switch (name) {
    case "hamburger":
      return (
        <svg {...common}>
          <path d="M3 7h18M3 12h18M3 17h18" />
        </svg>
      );
    case "external":
      return (
        <svg {...common}>
          <path d="M14 3h7v7" />
          <path d="M10 14L21 3" />
          <path d="M5 21h14a2 2 0 0 0 2-2V9" />
        </svg>
      );
    case "edit":
      return (
        <svg {...common}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M18 2h-3a4 4 0 0 0-4 4v3H8v4h3v9h4v-9h3l1-4h-4V6a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "cap":
      return (
        <svg {...common}>
          <path d="M22 10L12 5 2 10l10 5 10-5z" />
          <path d="M6 12v5c3 2 9 2 12 0v-5" />
        </svg>
      );
    case "envelope":
      return (
        <svg {...common}>
          <path d="M3 6h18v12H3z" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 11h18" />
        </svg>
      );
    case "analytics":
      return (
        <svg {...common}>
          <path d="M4 19V9" />
          <path d="M10 19V5" />
          <path d="M16 19v-8" />
          <path d="M22 19H2" />
        </svg>
      );
    case "kebab":
      return (
        <svg {...common} stroke="none" fill="currentColor">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      );
    case "drag":
      return (
        <svg {...common} stroke="none" fill="currentColor">
          <circle cx="7" cy="8" r="1.6" />
          <circle cx="12" cy="8" r="1.6" />
          <circle cx="17" cy="8" r="1.6" />
          <circle cx="7" cy="14" r="1.6" />
          <circle cx="12" cy="14" r="1.6" />
          <circle cx="17" cy="14" r="1.6" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="M13 5l7 7-7 7" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    default:
      return null;
  }
};

const SocialButton = ({ icon, href = "#" }) => (
  <a className={cx("social-btn")} href={href} aria-label={icon}>
    <Icon name={icon} size={16} />
  </a>
);

const ProductItem = ({ emoji, title, trailIcon }) => (
  <div className={cx("row")}>
    <button className={cx("drag")} aria-label="drag">
      <Icon name="drag" />
    </button>
    <div className={cx("thumb")}>{emoji}</div>
    <div className={cx("title")}>
      <span>{title}</span>
    </div>
    <div className={cx("row-actions")}>
      {trailIcon && (
        <span className={cx("metric")} title="Analytics">
          <Icon name="analytics" size={18} />
        </span>
      )}
      <button className={cx("more")} aria-label="more">
        <Icon name="kebab" size={18} />
      </button>
    </div>
  </div>
);

export default function Store() {
  return (
    <div className={cx("page")}>
      {/* Top tabs */}
      <div className={cx("tabs")}>
        <button className={cx("tab", "active")}>
          <span className={cx("tab-icon")}>
            <Icon name="hamburger" size={18} />
          </span>
          Store
        </button>
        <button className={cx("tab")}>Landing Pages</button>
        <button className={cx("tab")}>
          <span className={cx("tab-icon")}>
            <Icon name="edit" size={18} />
          </span>
          Edit Design
        </button>
      </div>

      {/* Profile card */}
      <section className={cx("profile")}>
        <img
          className={cx("avatar")}
          src="https://picsum.photos/seed/building/80"
          alt="avatar"
        />
        <div className={cx("profile-info")}>
          <div className={cx("name-row")}>
            <h3 className={cx("name")}>Nguyễn Phi Vân</h3>
            <button className={cx("edit-btn")} aria-label="edit name">
              <Icon name="edit" size={16} />
            </button>
          </div>
          <div className={cx("handle")}>@taoreo</div>
          <div className={cx("socials")}>
            <SocialButton icon="instagram" />
            <SocialButton icon="x" />
            <SocialButton icon="facebook" />
          </div>
        </div>
        <a className={cx("open-link")} href="#" title="Open landing">
          <Icon name="external" size={18} />
        </a>
      </section>

      {/* List */}
      <section className={cx("list")}>
        <ProductItem
          emoji={<span className={cx("emoji", "grad")}>🎓</span>}
          title="Get started with this amazing course"
          trailIcon
        />
        <ProductItem
          emoji={<span className={cx("emoji")}>📨</span>}
          title="Get My FREE Guide Now!"
        />
        <ProductItem
          emoji={<span className={cx("flag")}>🇻🇳</span>}
          title="Book a 1:1 Call"
        />
      </section>

      {/* Section footer */}
      <section className={cx("section")}>
        <div className={cx("section-head")}>
          <button className={cx("drag")} aria-label="drag section">
            <Icon name="drag" />
          </button>
          <div className={cx("section-title")}>New Section</div>
          <button className={cx("more")} aria-label="more">
            <Icon name="kebab" size={18} />
          </button>
        </div>

        <button className={cx("add-product")}>
          <Icon name="plus" size={20} /> Add Product
        </button>

        <button className={cx("add-section")}>Add Section</button>
      </section>
    </div>
  );
}
