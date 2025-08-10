import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

// React Icons
import { AiOutlineArrowRight } from "react-icons/ai";
import SocialLinks from "../../common/SocialLinks";

// import hình Google Calendar (bạn có thể thay bằng local asset nếu cần)

import {
  ButtonCard,
  CalloutCard,
  PreviewCard,
} from "../ProductCards/SpotlightCards";

import styles from "./Spotlight.module.scss";
import useUserProducts from "../../../config/useUserProducts";
const cx = classNames.bind(styles);

const GOOGLE_CALENDAR_LOGO =
  "https://www.gstatic.com/images/branding/product/1x/calendar_2020q4_48dp.png";

const Spotlight = ({
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
    <div
      className={cx("container")}
      style={{
        backgroundImage: `url(${
          userData.avatarURL ||
          "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg"
        })`,
      }}
    >
      <div className={cx("spotlight-wrapper")}>
        {/* Layer mờ phía trên background (nếu cần) */}
        <div className={cx("overlay")}></div>

        {/* Nội dung chính */}
        <div className={cx("content-container")}>
          {/* Phần tên và social */}
          <div className={cx("header")}>
            <h1 className={cx("name")}>{userData.displayName}</h1>
            <h1 className={cx("bio")}>{userData.bio}</h1>

            <div className={cx("social-icons")}>
              <SocialLinks
                links={userData.socialLinks}
                linkClass={cx("icon-wrapper")}
                iconClass={cx("icon")}
              />
            </div>
          </div>

          {/* Phần cơ bản (Avatar) */}
          <div className={cx("avatar-image-wrapper")}>
            {/* Avatar được đặt làm background của wrapper, nên ở đây chỉ là placeholder nếu cần */}
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

export default Spotlight;
