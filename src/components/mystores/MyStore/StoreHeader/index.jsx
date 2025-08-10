// File: src/components/StoreHeader/StoreHeader.jsx

import React from "react";
import classNames from "classnames/bind";
import styles from "./StoreHeader.module.scss";
import avatarPlaceholder from "../../../../assets/avatar-placeholder.svg";

// Import riêng từng bộ icon
import { AiOutlineEdit } from "react-icons/ai";
import SocialLinks from "../../../common/SocialLinks";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../store/authSlice";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const StoreHeader = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  // Lấy object socialLinks từ currentUser (có thể undefined)
  const userSocialLinks = currentUser?.socialLinks || {};

  return (
    <div className={cx("content")}>
      {/* Avatar người dùng */}
      <img
        src={currentUser?.avatarURL || avatarPlaceholder}
        alt="avatar"
        className={cx("avatar")}
      />

      <div className={cx("profile-section")}>
        <div className={cx("profile-info")}>
          <div className={cx("profile-top")}>
            {/* Tên hiển thị */}
            <span className={cx("name")}>
              {currentUser?.displayName || "Chưa đặt tên"}
            </span>

            {/* Nút Chỉnh sửa */}
            <div
              onClick={() => navigate("/edit-profile")}
              className={cx("edit-icon")}
            >
              <span className={cx("edit-text")}>Chỉnh sửa</span>
              <AiOutlineEdit size={20} style={{ paddingLeft: "5px" }} />
            </div>
          </div>

          {/* Username */}
          <p className={cx("username")}>
            @{currentUser?.username || "chưa-có-username"}
          </p>
        </div>

        {/* Phần hiển thị icon các mạng xã hội nếu có */}
        <div className={cx("social-links")}>
          <SocialLinks
            links={userSocialLinks}
            linkClass={cx("social-link")}
            iconClass={cx("social-icon")}
          />
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
