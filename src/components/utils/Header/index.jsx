import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import Logo from "../../../assets/avatar.png";

import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

const cx = classNames.bind(styles);

const Header = ({ tab }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={cx("header", { open: menuOpen })}>
      <div className={cx("header__left")}>
        <Link to="/" className={cx("logo-container")}>
          <img src={Logo} alt="Stan Logo" className={cx("logo")} />
          <span className={cx("brand")}>Bao La</span>
        </Link>

        <nav className={cx("nav")}>
          <Link
            to="/"
            className={cx("nav__link", tab === "Trang chủ" ? "active" : "")}
          >
            Trang chủ
          </Link>
          <Link
            to="/mission"
            className={cx("nav__link", tab === "Sứ mệnh" ? "active" : "")}
          >
            Sứ mệnh
          </Link>
          <Link
            to="/blog"
            className={cx("nav__link", tab === "Blog" ? "active" : "")}
          >
            Blog
          </Link>
        </nav>
      </div>
      <button className={cx("menu-button")} onClick={() => setMenuOpen(true)}>
        <FiMenu size={24} />
      </button>
      <div className={cx("header__right")}>
        <button
          className={cx("btn", "btn--login")}
          onClick={() => navigate("/login")}
        >
          Đăng nhập
        </button>
        <button
          className={cx("btn", "btn--signup")}
          onClick={() => navigate("/signup")}
        >
          Đăng ký
        </button>
      </div>
      {menuOpen && (
        <div className={cx("mobile-menu")}>
          <button
            className={cx("close-button")}
            onClick={() => setMenuOpen(false)}
          >
            <FiX size={24} />
          </button>
          <nav
            className={cx("nav", "mobile-nav")}
            onClick={() => setMenuOpen(false)}
          >
            <Link
              to="/"
              className={cx("nav__link", tab === "Trang chủ" ? "active" : "")}
            >
              Trang chủ
            </Link>
            <Link
              to="/mission"
              className={cx("nav__link", tab === "Sứ mệnh" ? "active" : "")}
            >
              Sứ mệnh
            </Link>
            <Link
              to="/blog"
              className={cx("nav__link", tab === "Blog" ? "active" : "")}
            >
              Blog
            </Link>
          </nav>
          <div
            className={cx("mobile-actions")}
            onClick={() => setMenuOpen(false)}
          >
            <button
              className={cx("btn", "btn--login")}
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </button>
            <button
              className={cx("btn", "btn--signup")}
              onClick={() => navigate("/signup")}
            >
              Đăng ký
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
