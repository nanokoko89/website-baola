import classNames from "classnames/bind";
import styles from "./PickStyle.module.scss";

const cx = classNames.bind(styles);

const PICK_OPTIONS = [
  {
    id: "button",
    label: "Nút",
    icon: (
      /* Ví dụ ở đây mình dùng một SVG giản lược để minh họa icon, bạn có thể thay bằng icon thực chất */
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="10"
          width="18"
          height="4"
          rx="2"
          stroke="#1e2a5c"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: "callout",
    label: "Lời kêu gọi",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 4H20V14H13L10 18V14H4V4Z"
          stroke="#1e2a5c"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "preview",
    label: "Xem trước",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 12.6V7.2C21 5.75 19.65 4.4 18.2 4.4H5.8C4.35 4.4 3 5.75 3 7.2V16.8C3 18.25 4.35 19.6 5.8 19.6H18.2C19.65 19.6 21 18.25 21 16.8V11.4"
          stroke="#1e2a5c"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 14L18 10L14 6"
          stroke="#1e2a5c"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    badge: "Mới",
  },
];

const getOptions = (hidePreview) =>
  hidePreview
    ? PICK_OPTIONS.filter((opt) => opt.id !== "preview")
    : PICK_OPTIONS;

const PickStyle = ({ setTypeStyle, selectedStyle, hidePreview = false }) => {
  const handleSelect = (id) => {
    setTypeStyle(id);
  };
  return (
    <div className={cx("pickStyle-container")}>
      {/* Danh sách các tùy chọn */}
      <div className={cx("options-list")}>
        {getOptions(hidePreview).map((opt) => (
          <div
            key={opt.id}
            className={cx("option-card", { active: selectedStyle === opt.id })}
            onClick={() => handleSelect(opt.id)}
          >
            <div className={cx("icon")}>{opt.icon}</div>
            <div className={cx("label")}>{opt.label}</div>
            {opt.badge && <div className={cx("badge")}>{opt.badge}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PickStyle;
