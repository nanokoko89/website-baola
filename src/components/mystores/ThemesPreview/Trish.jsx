import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import SocialLinks from "../../common/SocialLinks";

import styles from "./Trish.module.scss";
import useUserProducts from "../../../config/useUserProducts";

import { ButtonCard, CalloutCard, PreviewCard } from "../ProductCards/TrishCards";
const cx = classNames.bind(styles);

const Trish = ({
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
      <div className={cx("trish-wrapper")}>
        {/* Ảnh đại diện */}
        <div className={cx("profile-image")}>
          <img
            src={
              userData.avatarURL ||
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
            }
            alt={userData.displayName}
          />
        </div>

        {/* Tên */}
        <h1 className={cx("name")}>{userData.displayName}</h1>
        <h3 className={cx("bio")}>{userData.bio}</h3>

        {/* Social Icons */}
        <div className={cx("social-icons")}>
          <SocialLinks links={userData.socialLinks} size={24} />
        </div>

        {/* Section: Courses */}
        <div className={cx("section")}>
        </div>
          {!headerOnly && (
            <div className={cx("item-list")}> 
              {items.map((item) => {
                const handleClick = !disableClick ? () => goCheckout(item.id) : undefined;
                if (item.template.pickStyle === "callout") {
                  return <CalloutCard key={item.id} item={item} onClick={handleClick} />;
                }
                if (item.template.pickStyle === "preview") {
                  return <PreviewCard key={item.id} item={item} onClick={handleClick} />;
                }
                return <ButtonCard key={item.id} item={item} onClick={handleClick} />;
              })}
            </div>
          )}
      </div>
    </div>
  );
};

export default Trish;
