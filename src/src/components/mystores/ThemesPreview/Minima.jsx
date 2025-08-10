import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

// React Icons
import { BsSpotify } from "react-icons/bs";
import { AiOutlineDollarCircle, AiOutlineArrowRight } from "react-icons/ai";
import SocialLinks from "../../common/SocialLinks";

import styles from "./Minima.module.scss";
import {
  ButtonCard,
  CalloutCard,
  PreviewCard,
} from "../ProductCards/MinimaCards";
import useUserProducts from "../../../config/useUserProducts";
const cx = classNames.bind(styles);

// URL ảnh minh họa (bạn có thể thay bằng import local asset nếu cần)
const avatarUrl =
  "https://tamannatural.com/wp-content/uploads/2024/05/KOC-KOL-la-gi.webp"; // Ảnh ví dụ Angelica Kauffman
const sessionThumbUrl =
  "https://images.pexels.com/photos/4171732/pexels-photo-4171732.jpeg"; // Ảnh thumbnail cho Coaching Session

const Minima = ({
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
      <div className={cx("minima-wrapper")}>
        {/* ===== Avatar + Tên + Social ===== */}
        <div className={cx("header")}>
          <div className={cx("avatar-wrapper")}>
            <img
              src={userData.avatarURL || avatarUrl}
              alt={userData.displayName}
              className={cx("avatar-image")}
            />
          </div>
          <h1 className={cx("name")}>{userData.displayName}</h1>
          <span className={cx("bio")}>{userData.bio}</span>

          <div className={cx("social-icons")}>
            <SocialLinks
              links={userData.socialLinks}
              linkClass={cx("social-icon")}
              iconClass={cx("social-icon")}
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

export default Minima;
