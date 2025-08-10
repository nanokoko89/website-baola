// ThankYouPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import styles from "./ThankYouPage.module.scss";

// Nếu bạn dùng Firebase Firestore:
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebase"; // Đường dẫn tới file khởi tạo firebase của bạn
import { slides } from "../config/others";
import getContrastTextColor from "../config/getContrastTextColor";

const cx = classNames.bind(styles);

const ThankYouPage = () => {
  const { username, productId } = useParams();
  const template = useSelector((state) => state.template);

  const [product, setProduct] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // --- Ví dụ với Firestore ---
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          throw new Error("Không tìm thấy sản phẩm trên server.");
        }

        // --- Nếu bạn có API REST, thay bằng:
        // const res = await fetch(`/api/products/${productId}`);
        // if (!res.ok) throw new Error('Lấy sản phẩm thất bại');
        // const data = await res.json();
        // setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      if (!username) return;
      try {
        const q = query(
          collection(db, "users"),
          where("username", "==", username)
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          const d = snap.docs[0];
          setUserData({ id: d.id, ...d.data() });
        }
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };

    fetchProduct();
    fetchUser();
  }, [productId, username]);

  const themeIndex = userData?.templateIndex ?? template.templateIndex ?? 0;
  const colors =
    userData?.selectedColors || template.selectedColors ||
    slides[themeIndex].colors;
  const fontFamily = userData?.selectedFont || template.selectedFont;
  const textColor = getContrastTextColor(colors.secondary);
  const buttonTextColor = getContrastTextColor(colors.primary);
  const themeName = slides[themeIndex]?.title;
  const gradientBackground =
    themeName === "Kels"
      ? `linear-gradient(${colors.primary}, ${colors.secondary})`
      : undefined;

  return (
    <div
      className={cx("wrapper")}
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
      <h1 className={cx("title")}>Cảm ơn bạn!</h1>

      <div className={cx("icon")}>
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="var(--template-color-primary)"
            strokeWidth="2"
          />
          <path
            d="M7 12l3 3 7-7"
            stroke="var(--template-color-primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p className={cx("message")}>Bạn sẽ sớm nhận được email xác nhận!</p>

      <div className={cx("order")}>
        <h2 className={cx("orderTitle")}>Đơn hàng của bạn</h2>

        {loading && (
          <p className={cx("message")}>Đang tải thông tin sản phẩm...</p>
        )}

        {error && (
          <p className={cx("message")} style={{ color: "#ff6b6b" }}>
            Lỗi: {error}
          </p>
        )}

        {!loading && !error && product && (
          <div className={cx("productItem")}>
            <span className={cx("productName")}>
              {product.template.addText.title}
            </span>
            <Link
              to={
                product
                  ? product.type === "OnlineCourse"
                    ? `/course/${product.id}`
                    : product.link || "/"
                  : "/"
              }
              className={cx("btn")}
            >
              {product?.buttonText || "Xem chi tiết"}
            </Link>
          </div>
        )}

        {!loading && !error && !product && (
          <p className={cx("message")}>Không tìm thấy sản phẩm.</p>
        )}
      </div>

      <Link to={`/${username}`} className={cx("homeLink")}>
        Đưa tôi về nhà
      </Link>
    </div>
  );
};

export default ThankYouPage;
