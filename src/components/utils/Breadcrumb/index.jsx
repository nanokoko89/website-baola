// src/components/Breadcrumb/Breadcrumb.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Breadcrumb.module.scss";

const cx = classNames.bind(styles);

const Breadcrumb = ({ items = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (link) => {
    if (link && link !== location.pathname) {
      navigate(link);
    }
  };

  return (
    <nav className={cx("breadcrumb")}>
      <ol className={cx("breadcrumbList")}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isActive =
            item.link === "" && isLast ? true : item.link === location.pathname;

          return (
            <li key={index} className={cx("breadcrumbItem")}>
              {/* Nếu chưa phải phần tử cuối và có link */}
              {!isLast && item.link ? (
                <button
                  type="button"
                  className={cx("breadcrumbButton", { active: isActive })}
                  onClick={() => handleClick(item.link)}
                >
                  {item.label}
                </button>
              ) : (
                <span className={cx("breadcrumbCurrent", { active: isActive })}>
                  {item.label}
                </span>
              )}
              {!isLast && <span className={cx("separator")}>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
