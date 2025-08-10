/* HeaderBar.tsx */
import React from "react";
// Sử dụng icon Feather từ react-icons
import { FiArrowLeft, FiCopy } from "react-icons/fi";
import { FaLink } from "react-icons/fa6";
import classNames from "classnames/bind";
import styles from "./HeaderBar.module.scss";
import Breadcrumb from "../Breadcrumb";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { IoEye } from "react-icons/io5";
import logo from "../../../assets/avatar.png";

const cx = classNames.bind(styles);

const HeaderBar = ({
  title,
  noBack,
  handleBack,
  items = [],
  onPreviewClick,
}) => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  const linkUrl = `https://bao-la.web.app/${currentUser.username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(linkUrl);
    toast("Đã sao chép!");
  };

  return (
    <header className={cx("headerBar")}>
      <div className={cx("left")}>
        {noBack && (
          <FiArrowLeft
            className={cx("backIcon")}
            size={24}
            onClick={handleBack}
          />
        )}

        {items.length > 0 ? (
          <Breadcrumb items={items} />
        ) : (
          <div className={cx("mobileBrand")}>
            <img src={logo} alt="Bao La" className={cx("mobileLogo")} />
            <span className={cx("mobileName")}>Bao La</span>
            <span className={cx("title")}>{title}</span>
          </div>
        )}
      </div>
      <div className={cx("right")}>
        {onPreviewClick && (
          <button className={cx("previewBtn")} onClick={onPreviewClick}>
            <IoEye /> <span style={{ marginLeft: 8 }}>Xem trước</span>
          </button>
        )}
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cx("link")}
        >
          <FaLink className={cx("linkIcon")} />
          <span className={cx("linkText")}>{linkUrl}</span>
        </a>
        <FiCopy className={cx("copyIcon")} size={20} onClick={handleCopy} />
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />{" "}
    </header>
  );
};

export default HeaderBar;
