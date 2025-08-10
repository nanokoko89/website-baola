import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import SocialLinks from "../../common/SocialLinks";

import styles from "./Eclipse.module.scss";
import useUserProducts from "../../../config/useUserProducts";

import {
  ButtonCard,
  CalloutCard,
  PreviewCard,
} from "../ProductCards/EclipseCards";
const cx = classNames.bind(styles);

const Eclipse = ({
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
    <div className={cx("container")}>
      <div className={cx("eclipse-wrapper")}>
        {/* Avatar */}
        <div className={cx("avatar-container")}>
          <img
            // src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg"
            src={userData.avatarURL}
            alt={userData.displayName}
            className={cx("avatar-image")}
          />
        </div>
        {/* Tên */}
        <h1 className={cx("name")}>{userData.displayName}</h1>
        <h3 className={cx("bio")}>{userData.bio}</h3>
        <div className={cx("social-icons")}>
          <SocialLinks
            links={userData.socialLinks}
            linkClass={cx("icon-wrapper")}
            iconClass={cx("icon")}
          />
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

export default Eclipse;
