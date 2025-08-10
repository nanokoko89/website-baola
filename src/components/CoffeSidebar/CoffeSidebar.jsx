import React from "react";
import styles from "./CoffeSidebar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const sections = [
  {
    id: "top",
    items: [
      { id: "home", label: "Home", icon: HomeGlyph, activeable: true },
      { id: "view", label: "View page", icon: ViewGlyph, after: ExternalGlyph },
      { id: "explore", label: "Explore creators", icon: ExploreGlyph },
    ],
  },
  {
    id: "monetize",
    heading: "MONETIZE",
    items: [
      { id: "supporters", label: "Supporters", icon: HeartGlyph },
      { id: "memberships", label: "Memberships", icon: LockGlyph },
      { id: "shop", label: "Shop", icon: BagGlyph },
      {
        id: "publish",
        label: "Publish",
        icon: PencilGlyph,
        after: ChevronDownGlyph,
      },
    ],
  },
  {
    id: "settings",
    heading: "SETTINGS",
    items: [
      { id: "buttons", label: "Buttons & Graphics", icon: WidgetGlyph },
      { id: "integrations", label: "Integrations", icon: LightningGlyph },
      { id: "payouts", label: "Payouts", icon: DollarGlyph },
      { id: "settings_", label: "Settings", icon: GearGlyph },
    ],
  },
];

export default function CoffeSidebar({ activeId = "home", onNavigate }) {
  return (
    <aside className={cx("wrap")} role="navigation" aria-label="Sidebar">
      <div className={cx("brand")}>
        <CupLogo />
      </div>

      <nav className={cx("nav")}>
        {sections.map((sec) => (
          <div key={sec.id} className={cx("section")}>
            {sec.heading && <div className={cx("heading")}>{sec.heading}</div>}
            <ul className={cx("list")}>
              {sec.items.map((item) => {
                const isActive = item.activeable && item.id === activeId;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={cx("navItem", { active: isActive })}
                      onClick={() => onNavigate && onNavigate(item.id)}
                    >
                      <span className={cx("left")}>
                        <item.icon className={cx("icon")} />
                        <span className={cx("label")}>{item.label}</span>
                      </span>
                      {item.after ? (
                        <item.after className={cx("after")} />
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

/* ========================= Icons (SVG) ========================= */
// Logo cốc vàng trên cùng
function CupLogo(props) {
  return (
    <svg width="38" height="48" viewBox="0 0 38 48" fill="none" {...props}>
      <path
        d="M8 14h18l-2.2 23.5a6 6 0 0 1-6 5.4h-1.6a6 6 0 0 1-6-5.4L8 14Z"
        fill="#FFD400"
      />
      <path
        d="M8 14h18M10.5 8h13m-18 6 2.2 23.5a6 6 0 0 0 6 5.4h1.6a6 6 0 0 0 6-5.4L24 14m0 0h6.5a4.5 4.5 0 1 1 0 9H24"
        stroke="#0F0F0F"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Home: khối vàng + mái nhà cười nhẹ
function HomeGlyph(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="5"
        fill="#FFD400"
        stroke="#111"
        strokeWidth="1.5"
      />
      <path
        d="M8 14.5c.6.6 1.4.9 2 .9s1.4-.3 2-.9"
        stroke="#111"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 11h10"
        stroke="#111"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function ViewGlyph(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <rect
        x="4"
        y="5"
        width="16"
        height="14"
        rx="2.5"
        stroke="#111"
        strokeWidth="1.6"
      />
      <path
        d="M8 9h8M8 13h6"
        stroke="#111"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function ExternalGlyph(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M14 5h5v5"
        stroke="#111"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14 19 5"
        stroke="#111"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M19 14v5H5V5h5"
        stroke="#111"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ExploreGlyph(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="8" stroke="#111" strokeWidth="1.6" />
      <path
        d="M9.5 14.5 14.8 9l-2.3 6.8-3 1.2 1.0-2.5Z"
        stroke="#111"
        strokeWidth="1.2"
      />
    </svg>
  );
}
function HeartGlyph(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 20s-7-4.5-7-9a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 4.5-7 9-7 9Z"
        stroke="#111"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function LockGlyph(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <rect
        x="5"
        y="10"
        width="14"
        height="9"
        rx="2"
        stroke="#111"
        strokeWidth="1.6"
      />
      <path
        d="M8 10V8a4 4 0 1 1 8 0v2"
        stroke="#111"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function BagGlyph(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <rect
        x="4.5"
        y="7.5"
        width="15"
        height="12"
        rx="2"
        stroke="#111"
        strokeWidth="1.6"
      />
      <path
        d="M9 7.5a3 3 0 0 1 6 0"
        stroke="#111"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function PencilGlyph(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 20l4.5-1L19 8.5 15.5 5 6 15.5 5 20Z"
        stroke="#111"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ChevronDownGlyph(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6 9l6 6 6-6"
        stroke="#111"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function WidgetGlyph(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <rect
        x="4"
        y="4"
        width="7"
        height="7"
        rx="2"
        stroke="#111"
        strokeWidth="1.6"
      />
      <rect
        x="13"
        y="4"
        width="7"
        height="7"
        rx="2"
        stroke="#111"
        strokeWidth="1.6"
      />
      <rect
        x="4"
        y="13"
        width="7"
        height="7"
        rx="2"
        stroke="#111"
        strokeWidth="1.6"
      />
      <rect
        x="13"
        y="13"
        width="7"
        height="7"
        rx="2"
        stroke="#111"
        strokeWidth="1.6"
      />
    </svg>
  );
}
function LightningGlyph(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
        stroke="#111"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function DollarGlyph(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 3v18M8.5 8.5A3.5 3.5 0 0 0 12 6h1a3 3 0 1 1 0 6h-2a3 3 0 1 0 0 6h2a3.5 3.5 0 0 0 3.5-2.5"
        stroke="#111"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function GearGlyph(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="3" stroke="#111" strokeWidth="1.6" />
      <path
        d="M19 12a7 7 0 0 0-.2-1.6l2-1.5-2-3.4-2.3.8a7 7 0 0 0-2.7-1.6L13.5 2h-3l-.3 2.7a7 7 0 0 0-2.7 1.6l-2.3-.8-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .55.07 1.08.2 1.6l-2 1.5 2 3.4 2.3-.8a7 7 0 0 0 2.7 1.6l.3 2.7h3l.3-2.7a7 7 0 0 0 2.7-1.6l2.3.8 2-3.4-2-1.5c.13-.52.2-1.05.2-1.6Z"
        stroke="#111"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
