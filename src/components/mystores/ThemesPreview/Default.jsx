// src/components/Default/Default.jsx

import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { FaStar } from "react-icons/fa";
import SocialLinks from "../../common/SocialLinks";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../config/firebase";
import styles from "./Default.module.scss";
import {
  ButtonCard,
  CalloutCard,
  PreviewCard,
} from "../ProductCards/DefaultCards";

const cx = classNames.bind(styles);

export default function Default({
  user,
  products: productList,
  headerOnly = false,
  disableClick = false,
}) {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [products, setProducts] = useState([]);
  const userData = user || currentUser;
  const items = (productList || products).filter((p) => p.published !== false);
  const firstItem = items[0];
  const otherItems = items.slice(1);
  const navigate = useNavigate();

  const goCheckout = (id) => {
    if (disableClick) return;
    if (userData?.username) {
      navigate(`/${userData.username}/${id}`);
    }
  };
  useEffect(() => {
    if (productList) {
      const filtered = productList.filter((p) => p.published !== false);
      setProducts(filtered);
      return;
    }

    // Nếu chưa có username thì không fetch
    if (!currentUser?.username) {
      setProducts([]);
      return;
    }

    // Tạo query chỉ lấy products của currentUser
    const productsQuery = query(
      collection(db, "products"),
      where("username", "==", currentUser.username)
    );

    // Lắng nghe realtime
    const unsubscribe = onSnapshot(
      productsQuery,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Sắp xếp theo order
        items.sort((a, b) => (a.order || 0) - (b.order || 0));
        const publishedItems = items.filter((item) => item.published !== false);
        setProducts(publishedItems);
      },
      (error) => {
        console.error("Realtime fetch lỗi:", error);
      }
    );

    return () => unsubscribe();
  }, [currentUser?.username, productList]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("header")}>
          <div className={cx("avatar-wrapper")}>
            <img
              src={
                userData.avatarURL ||
                "https://blog.vn.revu.net/wp-content/uploads/2023/09/KOL_noi_tieng_viet_nam-5.jpg"
              }
              alt="Avatar"
              className={cx("avatar")}
            />
          </div>
          <div className={cx("profile-info")}>
            <h2 className={cx("name")}>{userData.displayName}</h2>
            <p className={cx("username")}>{userData.bio}</p>
            {userData.socialLinks && (
              <div className={cx("social-icons")}>
                <SocialLinks
                  links={userData.socialLinks}
                  linkClass={cx("social-icon-container")}
                  iconClass={cx("social-icon")}
                />
              </div>
            )}
          </div>
        </div>

        {!headerOnly && items.length > 0 && (
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
}
