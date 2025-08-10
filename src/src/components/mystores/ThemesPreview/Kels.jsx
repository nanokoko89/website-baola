import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import SocialLinks from "../../common/SocialLinks";

import styles from "./Kels.module.scss";
import useUserProducts from "../../../config/useUserProducts";

import {
  ButtonCard,
  CalloutCard,
  PreviewCard,
} from "../ProductCards/KelsCards";

const cx = classNames.bind(styles);

const Kels = ({
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
      <div className={cx("banner")}>
        <img
          src={userData.avatarURL}
          alt="Kels Banner"
          className={cx("bannerImage")}
        />
      </div>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          {/* Header tên + icon */}
          <div className={cx("headerInfo")}>
            <div className={cx("nameSection")}>
              <h1 className={cx("name")}>{userData.displayName}</h1>
              <span className={cx("handle")}>{userData.bio}</span>
            </div>
            <div className={cx("socialIcons")}>
              <SocialLinks
                links={userData.socialLinks}
                linkClass={cx("iconLink")}
                iconClass={cx("icon")}
              />
            </div>
          </div>

          {/* Divider */}
          {!headerOnly && <div className={cx("divider")} />}

          {!headerOnly && (
            <div className={cx("item-list")}>
              {items.map((item, index) => {
                const handleClick = !disableClick
                  ? () => goCheckout(item.id)
                  : undefined;
                if (item.template.pickStyle === "callout") {
                  return (
                    <CalloutCard
                      key={item.id}
                      item={item}
                      onClick={handleClick}
                      reverse={index % 2 === 0 ? true : false}
                    />
                  );
                }
                if (item.template.pickStyle === "preview") {
                  return (
                    <PreviewCard
                      key={item.id}
                      item={item}
                      onClick={handleClick}
                      reverse={index % 2 === 0 ? true : false}
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

export default Kels;
