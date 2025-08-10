import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

// React Icons
import { AiOutlineStar, AiOutlineArrowRight } from "react-icons/ai";
import SocialLinks from "../../common/SocialLinks";

import styles from "./NightView.module.scss";
import useUserProducts from "../../../config/useUserProducts";
const cx = classNames.bind(styles);
import {
  ButtonCard,
  CalloutCard,
  PreviewCard,
} from "../ProductCards/NightViewCards";

// URL ảnh minh họa (các bạn có thể thay bằng local asset hoặc URL thực tế)
const avatarUrl =
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"; // Ảnh đại diện Paul Cézanne (ví dụ)
const workshopImageUrl =
  "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg"; // Ảnh phong cảnh ban đêm
const resumeTplUrl =
  "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg"; // Ảnh "Resume Templates"

const NightView = ({
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
      <div className={cx("night-wrapper")}>
        <div className={cx("header")}>
          <div className={cx("avatar-wrapper")}>
            <img
              src={userData.avatarURL || avatarUrl}
              alt={userData.displayName}
              className={cx("avatar-image")}
            />
          </div>
          <h1 className={cx("name")}>{userData.displayName}</h1>
          <h1 className={cx("bio")}>{userData.bio}</h1>

          <div className={cx("social-icons")}>
            <SocialLinks
              links={userData.socialLinks}
              linkClass={cx("icon-btn")}
              iconClass={cx("icon")}
            />
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

export default NightView;
