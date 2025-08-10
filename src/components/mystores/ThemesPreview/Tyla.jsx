// src/components/Tyla/Tyla.jsx
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import SocialLinks from "../../common/SocialLinks";

import styles from "./Tyla.module.scss";
import useUserProducts from "../../../config/useUserProducts";

import {
  ButtonCard,
  CalloutCard,
  PreviewCard,
} from "../ProductCards/TylaCards";
const cx = classNames.bind(styles);

const Tyla = ({
  user,
  products: productList,
  headerOnly = false,
  disableClick = false,
}) => {
  const { currentUser, products } = useUserProducts();
  const userData = user || currentUser;
  const items = productList || products;
  const mainItem = items[0];
  const otherItems = items.slice(1);
  const navigate = useNavigate();

  const goCheckout = (id) => {
    if (disableClick) return;
    if (userData?.username) {
      navigate(`/${userData.username}/${id}`);
    }
  };

  return (
    <div className={cx("app")}>
      {/* Banner ở trên cùng */}
      <div className={cx("banner")}>
        <img
          src={userData.avatarURL}
          alt="Tyla Banner"
          className={cx("bannerImage")}
        />
      </div>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("socialIcons")}>
            <SocialLinks
              links={userData.socialLinks}
              linkClass={cx("iconLink")}
              iconClass={cx("icon")}
            />
          </div>

          {/* Tên và mô tả */}
          <div className={cx("titleSection")}>
            <h1 className={cx("title")}>{userData.displayName}</h1>
            <p className={cx("subtitle")}>{userData.bio}</p>
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
    </div>
  );
};

export default Tyla;
