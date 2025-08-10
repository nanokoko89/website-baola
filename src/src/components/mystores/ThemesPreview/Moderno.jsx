// src/components/Moderno/Moderno.jsx
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import SocialLinks from "../../common/SocialLinks";
import styles from "./Moderno.module.scss";
import useUserProducts from "../../../config/useUserProducts";
import numberWithCommas from "../../../config/numberWithCommas";
import {
  ButtonCard,
  CalloutCard,
  PreviewCard,
} from "../ProductCards/ModernoCards";

const avatarImage =
  "https://cdn.brvn.vn/editor/2021/11/A33_Anh-Chris-1_1637579650.jpg";
const guideImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwtZurTP5RMdGEa3Uf2_q6mmDP7xGwix7w2Lwciq-9r0B5PWSfwtLFJF1MvsBdQufqMLA&usqp=CAU";
const podcastImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Lkgpd3uh47d6_vAl8esM2HtRpAVpjlxLxF3sdRcsLaWDtNy57KrMobZC9KpePMmyr1Y&usqp=CAU";

const cx = classNames.bind(styles);

const Moderno = ({
  user,
  products: productList,
  headerOnly = false,
  disableClick = false,
}) => {
  const { currentUser, products } = useUserProducts();
  const userData = user || currentUser;
  const items = productList || products;
  const navigate = useNavigate();

  const goCheckout = (id) => {
    if (disableClick) return;
    if (userData?.username) {
      navigate(`/${userData.username}/${id}`);
    }
  };
  return (
    <div className={cx("app")}>
      <div className={cx("wrapper")}>
        {/* =========================
          Phần Header: avatar + tên + social icons
         ========================= */}
        <div className={cx("header")}>
          <div className={cx("headerLeft")}>
            <div className={cx("avatarWrapper")}>
              <img
                src={userData.avatarURL || avatarImage}
                alt={userData.displayName}
                className={cx("avatar")}
              />
            </div>
            <div className={cx("nameSection")}>
              <h1 className={cx("name")}>{userData.displayName}</h1>
              <span className={cx("handle")}>{userData.bio}</span>
              <div className={cx("socialIcons")}>
                <SocialLinks
                  links={userData.socialLinks}
                  linkClass={cx("iconLink")}
                  iconClass={cx("icon")}
                />
              </div>
            </div>
          </div>
        </div>

        {!headerOnly && (
          <div className={cx("item-list")}>
            {items.map((item) => {
              const handleClick = !disableClick
                ? () => goCheckout(item.id)
                : undefined;
              if (item.template.pickStyle === "callout") {
                return (
                  <CalloutCard
                    key={item.id}
                    item={item}
                    onClick={handleClick}
                  />
                );
              }
              if (item.template.pickStyle === "preview") {
                return (
                  <PreviewCard
                    key={item.id}
                    item={item}
                    onClick={handleClick}
                  />
                );
              }
              return (
                <ButtonCard key={item.id} item={item} onClick={handleClick} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Moderno;
