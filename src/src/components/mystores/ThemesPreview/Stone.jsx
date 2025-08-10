import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Stone.module.scss";

// Import icon từ react-icons
import { FaDollarSign } from "react-icons/fa";
import {
  ButtonCard,
  CalloutCard,
  PreviewCard,
} from "../ProductCards/StoneCards";
import SocialLinks from "../../common/SocialLinks";
import useUserProducts from "../../../config/useUserProducts";

const cx = classNames.bind(styles);

const Stone = ({
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
      <div className={cx("trish-card")}>
        {/* ================= Header Phần ảnh + tên + icon MXH ================= */}
        <div
          className={cx("header")}
          style={{
            backgroundImage: `url(${userData.avatarURL})`,
            height: "auto",
            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "400px",
          }}
        >
          <div className={cx("overlay")} />

          <h1 className={cx("name")}>{userData.displayName}</h1>
          <h2 className={cx("bio")}>{userData.bio}</h2>

          <div className={cx("social-icons")}>
            <SocialLinks
              links={userData.socialLinks}
              linkClass={cx("iconLink")}
              iconClass={cx("icon")}
            />
          </div>
        </div>

        {/* ================= Phần khóa học ================= */}

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
        {/* ================= Phần 2 nút bên dưới ================= */}
        {/* <div className={cx("actions")}>
          <button className={cx("btn-secondary")}>
            <FaDollarSign className={cx("dollar-icon")} />
            XÂY CỬA HÀNG BAO LA &amp; KIẾM TIỀN
          </button>
          <button className={cx("btn-secondary")}>
            <img
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRETlr8oF4V7fEvUFDnJk3HOtD0bxZm4KRmvKpXjDxNWDgD5oS5--0yhMybCVwoVvpQ1Zg&usqp=CAU"
              }
              alt="Hướng dẫn TikTok"
              className={cx("guide-icon")}
            />
            HƯỚNG DẪN TĂNG TRƯỞNG TIKTOK MIỄN PHÍ
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Stone;
