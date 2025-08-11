import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { TbAffiliate } from "react-icons/tb";

import { AiOutlineHome, AiOutlineBarChart } from "react-icons/ai";
import { PiStorefrontLight } from "react-icons/pi";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/authSlice";
import logo from "../../../assets/avatar.png";
import avatarPlaceholder from "../../../assets/avatar-placeholder.svg";
const cx = classNames.bind(styles);

const Sidebar = () => {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);

  // Nav chính
  const navItems = [
    { to: "/dashboard", label: "Trang chủ", Icon: AiOutlineHome },
    // Tab "Cửa hàng của tôi" sẽ active khi location.pathname === "/mystore"
    // HOẶC location.pathname === "/edit-profile"
    { to: "/mystore", label: "Cửa hàng", Icon: PiStorefrontLight },
    { to: "/income", label: "Kết quả", Icon: AiOutlineBarChart },
    { to: "/affiliate", label: "Tiếp thị liên kết", Icon: TbAffiliate },

    // { to: "/calendar", label: "Lịch", Icon: AiOutlineBarChart },
  ];

  // Profile (giữ nguyên hoặc điều chỉnh tuỳ mục đích)
  const profileList = [
    {
      to: "/profile",
      label: currentUser?.username,
      image: currentUser?.avatarURL || avatarPlaceholder,
    },
  ];

  return (
    <div className={cx("sidebar")}>
      <div className={cx("logo-container")}>
        <img src={logo} alt="bao-la-logo" className={cx("logo")} />
        <div className={cx("logo-name")}>Bao La</div>
      </div>

      <ul className={cx("navList")}>
        {navItems.map((item) => {
          // Tạo biến customActive cho từng item
          let customActive = false;

          if (item.to === "/mystore") {
            // Muốn mystore active khi /mystore HOẶC /edit-profile
            customActive =
              location.pathname.startsWith("/mystore") ||
              location.pathname === "/edit-profile";
          } else {
            // Còn lại, active bình thường khi url bắt đầu bằng item.to
            customActive = location.pathname.startsWith(item.to);
          }

          return (
            <li key={item.to} className={cx("navItem")}>
              <NavLink
                to={item.to}
                className={() => cx({ active: customActive })}
              >
                <span className={cx("icon")}>
                  <item.Icon size={20} />
                </span>
                <span className={cx("label")}>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>

      <ul className={cx("profileList")}>
        {profileList.map((item) => {
          const customActive = location.pathname.startsWith(item.to);
          return (
            <li key={item.to} className={cx("navItem")}>
              <NavLink
                to={item.to}
                className={() => cx({ active: customActive })}
              >
                <span className={cx("icon")}>
                  <img
                    src={item.image}
                    alt="profile"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  />
                </span>
                <span className={cx("label")}>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
