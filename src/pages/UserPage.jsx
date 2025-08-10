// src/components/UserPage/UserPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { slides, previewSlides } from "../config/others";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDocs,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../config/firebase";
import styles from "./UserPage.module.scss";
import LoadingScreen from "../components/utils/LoadingScreen";
import { logVisit } from "../config/visitService";
import getContrastTextColor from "../config/getContrastTextColor";

const cx = classNames.bind(styles);

const UserPage = () => {
  // 1) Lấy username từ URL
  const { username } = useParams(); // ex: "alexT"
  const template = useSelector((state) => state.template);

  // 2) State để lưu dữ liệu user, loading, notFound
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [products, setProducts] = useState([]);

  // Đặt favicon dựa theo avatar của từng user
  useEffect(() => {
    const linkEl = document.querySelector("link[rel='icon']");
    const prevHref = linkEl.getAttribute("href");

    if (userData?.avatarURL) {
      linkEl.setAttribute("href", userData.avatarURL);
    }

    return () => {
      linkEl.setAttribute("href", prevHref); // trả lại favicon cũ khi rời trang
    };
  }, [userData]);

  // 3) useEffect để lắng nghe realtime trên field "username"
  useEffect(() => {
    // Reset state mỗi khi username thay đổi
    setLoading(true);
    setNotFound(false);
    setUserData(null);

    // 3.1) Tạo query: tìm document trong "users" nơi field "username" == giá trị từ URL
    const usersCol = collection(db, "users");
    const q = query(usersCol, where("username", "==", username));

    let unsubscribe = () => {};

    const fetchAndListen = async () => {
      try {
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Giả sử username unique, nên chỉ lấy docs[0]
          const docSnap = querySnapshot.docs[0];
          setUserData({
            id: docSnap.id,
            ...docSnap.data(),
          });
          const userDocRef = doc(db, "users", docSnap.id);

          // Tăng visitCount một lần khi tải trang
          try {
            await updateDoc(userDocRef, { visitCount: increment(1) });
            await logVisit(docSnap.id, "profile");
          } catch (err) {
            console.error("Failed to update visit count:", err);
          }

          // Lắng nghe realtime thay đổi của document
          unsubscribe = onSnapshot(
            userDocRef,
            (snapshot) => {
              if (snapshot.exists()) {
                setUserData({ id: snapshot.id, ...snapshot.data() });
                setNotFound(false);
              } else {
                setUserData(null);
                setNotFound(true);
              }
              setLoading(false);
            },
            (error) => {
              console.error("Lỗi onSnapshot:", error);
              setUserData(null);
              setNotFound(true);
              setLoading(false);
            }
          );
        } else {
          setNotFound(true);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setNotFound(true);
        setLoading(false);
      }
    };

    fetchAndListen();

    // Cleanup
    return () => {
      unsubscribe();
    };
  }, [username]);

  useEffect(() => {
    if (!username) return;
    const productsQuery = query(
      collection(db, "products"),
      where("username", "==", username)
    );
    const unsubscribe = onSnapshot(
      productsQuery,
      (snapshot) => {
        const items = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        items.sort((a, b) => (a.order || 0) - (b.order || 0));
        const publishedItems = items.filter((item) => item.published !== false);
        setProducts(publishedItems);
      },
      (err) => {
        console.error("Failed to fetch products:", err);
      }
    );
    return () => unsubscribe();
  }, [username]);

  // 4) Nếu đang loading, hiển thị loading
  if (loading) {
    return <LoadingScreen />;
  }

  // 5) Nếu không tìm thấy user
  if (notFound) {
    return (
      <div className={cx("not-found")}>
        Không tìm thấy người dùng với username: <strong>{username}</strong>
      </div>
    );
  }
  const themeIndex = userData?.templateIndex ?? template.templateIndex ?? 0;
  const colors =
    userData?.selectedColors ||
    template.selectedColors ||
    slides[themeIndex].colors;
  const fontFamily = userData?.selectedFont || template.selectedFont;
  const textColor = getContrastTextColor(colors.secondary);
  const buttonTextColor = getContrastTextColor(colors.primary);

  const ThemeComponent = previewSlides[themeIndex]?.Component;
  const themeName = slides[themeIndex]?.title;
  const gradientBackground =
    themeName === "Kels"
      ? `linear-gradient(${colors.primary}, ${colors.secondary})`
      : undefined;

  return (
    <div
      className={cx("container")}
      style={{
        "--template-font-family": fontFamily
          ? `'${fontFamily}', sans-serif`
          : undefined,
        "--template-color-primary": colors.primary,
        "--template-color-secondary": colors.secondary,
        "--template-text-color": textColor,
        "--template-button-text-color": buttonTextColor,
        background: gradientBackground,
      }}
    >
      {ThemeComponent && <ThemeComponent user={userData} products={products} />}
    </div>
  );
};

export default UserPage;
