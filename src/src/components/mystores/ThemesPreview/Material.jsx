import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

// React Icons
import { AiOutlineArrowRight, AiOutlineStar } from "react-icons/ai";
import { FaRss } from "react-icons/fa";
import SocialLinks from "../../common/SocialLinks";
import {
  ButtonCard,
  CalloutCard,
  PreviewCard,
} from "../ProductCards/MaterialCards";

// URL ảnh ví dụ (bạn có thể thay bằng import local asset nếu muốn)
const headerImageUrl =
  "https://images.pexels.com/photos/5668430/pexels-photo-5668430.jpeg"; // Michelle Foucault
const floralImageUrl1 =
  "https://images.pexels.com/photos/853199/pexels-photo-853199.jpeg"; // Bó hoa vintage

import styles from "./Material.module.scss";
import useUserProducts from "../../../config/useUserProducts";
const cx = classNames.bind(styles);

const Material = ({
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
      <div className={cx("material-wrapper")}>
        {/* ========= 1. HEADER: Ảnh + Tên + Social ========= */}
        <div className={cx("card", "card-header")}>
          <div className={cx("card-left")}>
            <img
              src={userData.avatarURL || headerImageUrl}
              alt={userData.displayName}
              className={cx("card-image")}
            />
          </div>
          <div className={cx("card-right", "header-right")}>
            <h2 className={cx("header-name")}>{userData.displayName}</h2>
            <p className={cx("bio")}>{userData.bio}</p>

            <div className={cx("social-icons")}>
              <SocialLinks
                links={userData.socialLinks}
                linkClass={cx("icon-wrapper")}
                iconClass={cx("icon")}
              />
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

export default Material;
