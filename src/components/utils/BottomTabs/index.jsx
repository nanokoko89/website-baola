import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./BottomTabs.module.scss";

import {
  AiOutlineHome,
  AiOutlineBarChart,
  AiOutlineCalendar,
} from "react-icons/ai";
import { PiStorefrontLight } from "react-icons/pi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/authSlice";
import avatarPlaceholder from "../../../assets/avatar-placeholder.svg";

const cx = classNames.bind(styles);

const BottomTabs = () => {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);
  const navItems = [
    { to: "/dashboard", label: "Trang chủ", Icon: AiOutlineHome },
    // Tránh redirect khi vào mystore bằng cách thêm ?tab=store
    { to: "/mystore?tab=store", label: "Cửa hàng", Icon: PiStorefrontLight },
    { to: "/income", label: "Kết quả", Icon: AiOutlineBarChart },
    {
      to: "/profile",
      label: "Tài khoản",
      image: currentUser?.avatarURL || avatarPlaceholder,
    },
    // { to: "/calendar", label: "Lịch", Icon: AiOutlineCalendar },
  ];
  return (
    <nav className={cx("bottomTabs")}>
      {navItems.map((item) => {
        let isActive = false;
        if (item.to.startsWith("/mystore")) {
          isActive =
            location.pathname.startsWith("/mystore") ||
            location.pathname === "/edit-profile";
        } else {
          isActive = location.pathname.startsWith(item.to);
        }
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={cx("tabItem", { active: isActive })}
          >
            {item.Icon ? (
              <item.Icon size={20} />
            ) : (
              <img
                src={item.image}
                alt="profile"
                style={{ width: 20, height: 20, borderRadius: "50%" }}
              />
            )}
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomTabs;
