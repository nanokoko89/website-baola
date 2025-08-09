import { useState } from "react";
import styles from "./Header.module.scss";
import bind from "../../utils/cx";
const cx = bind(styles);

import useHideOnScroll from "../../hooks/useHideOnScroll.js";
import SearchModal from "../SearchModal/SearchModal.jsx";

const demoItems = [
  {
    id: 1,
    rank: 1,
    avatar: "https://i.pravatar.cc/80?img=11",
    title: "Simple Politics",
    subtitle: "Helping people have better conversations about politics",
  },
  {
    id: 2,
    rank: 2,
    avatar: "https://i.pravatar.cc/80?img=32",
    title: "Cara",
    subtitle: "building a new platform for artists",
  },
  {
    id: 3,
    rank: 3,
    avatar: "https://i.pravatar.cc/80?img=48",
    title: "Beach Talk Radio",
    subtitle: "A Dinky Little Podcast",
  },
  // ...thêm các mục khác tương tự ảnh
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const { hidden } = useHideOnScroll();
  return (
    <header className={cx("nav", hidden && "hidden")}>
      <div className={cx("nav-left")}>
        <a className={cx("nav-link")} href="#">
          Hỏi đáp
        </a>
        <a className={cx("nav-link")} href="#">
          Bộ sưu tập <span className={cx("heart")}>♥</span>
        </a>
        <a className={cx("nav-link")} href="#">
          Tải ứng dụng <span className={cx("chev")}>▾</span>
        </a>
      </div>

      <a className={cx("brand")} href="#">
        <span className={cx("cup")}>☕</span>
        <span className={cx("brand-text")}>Bao La</span>
        <span className={cx("r")}>®</span>
      </a>

      <div className={cx("nav-right")}>
        <div className={cx("search")}>
          <svg
            className={cx("search-icon")}
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input placeholder="Tìm thương hiệu, sản phẩm, dịch vụ" />
        </div>

        <button onClick={() => setOpen(true)}>Open “Search creators”</button>

        <a className={cx("nav-link")} href="#">
          Đăng nhập
        </a>
        <a className={cx("btn", "btn-yellow")} href="#">
          Đăng ký
        </a>
      </div>

      <SearchModal
        open={open}
        onClose={() => setOpen(false)}
        items={demoItems}
      />
    </header>
  );
}
