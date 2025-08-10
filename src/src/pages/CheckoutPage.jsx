import React, { useEffect, useState } from "react";
import sanitizeHtml from "../utils/sanitizeHtml";
import classNames from "classnames/bind";
import styles from "./CheckoutPage.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import avatarPlaceholder from "../assets/avatar-placeholder.svg"; // ảnh fallback
import productImg from "../assets/mission.png"; // ảnh fallback
import { useSelector } from "react-redux";
import { slides } from "../config/others";
import { logVisit } from "../config/visitService";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../config/firebase";
import LoadingScreen from "../components/utils/LoadingScreen";
import { createOrder } from "../config/orderService";
import numberWithCommas from "../config/numberWithCommas";
import getContrastTextColor from "../config/getContrastTextColor";
import SepayModal from "../components/utils/SepayModal";
import { createSepayPayment } from "../config/sepayService";
import NotFound from "../components/utils/NotFound";

const cx = classNames.bind(styles);

const CheckoutPage = () => {
  const { username, productId } = useParams();
  const template = useSelector((state) => state.template);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fieldValues, setFieldValues] = useState({});
  const [note, setNote] = useState("");
  const [showSepayModal, setShowSepayModal] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const [payAmount, setPayAmount] = useState(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [pollingId, setPollingId] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setName((prev) => prev || currentUser.displayName || "");
      setEmail((prev) => prev || currentUser.email || "");
    }
  }, [currentUser]);

  const handleFieldChange = (id, value) => {
    setFieldValues((prev) => ({ ...prev, [id]: value }));
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
          <input
            key={field.id}
            type="text"
            placeholder={field.label}
            className={cx("input")}
            value={fieldValues[field.id] || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
          />
        );
      case "dropdown":
        return (
          <select
            key={field.id}
            className={cx("input")}
            value={fieldValues[field.id] || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
          >
            <option value="">{field.label}</option>
            {field.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        );
      case "multiple":
        return (
          <div key={field.id} className={cx("radioGroup")}>
            <span className={cx("fieldLabel")}>{field.label}</span>
            {field.options.map((o, idx) => (
              <label key={o} className={cx("option")}>
                <input
                  type="radio"
                  name={field.id}
                  checked={fieldValues[field.id] === o}
                  onChange={() => handleFieldChange(field.id, o)}
                  required={field.required && idx === 0}
                />
                {o}
              </label>
            ))}
          </div>
        );
      case "checkboxes":
        return (
          <div key={field.id} className={cx("checkboxGroup")}>
            <span className={cx("fieldLabel")}>{field.label}</span>
            {field.options.map((o) => {
              const values = fieldValues[field.id] || [];
              const checked = values.includes(o);
              return (
                <label key={o} className={cx("option")}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      const newVals = checked
                        ? values.filter((v) => v !== o)
                        : [...values, o];
                      handleFieldChange(field.id, newVals);
                    }}
                  />
                  {o}
                </label>
              );
            })}
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    return () => {
      if (pollingId) clearInterval(pollingId);
    };
  }, [pollingId]);

  useEffect(() => {
    if (!currentOrderId) return;
    const id = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders/${currentOrderId}/status`);
        if (res.ok) {
          const { status } = await res.json();
          if (status === "paid") {
            clearInterval(id);
            setPollingId(null);
            localStorage.setItem(`access_${productId}`, currentOrderId);
            navigate(`/${username}/success/${productId}`);
          }
        }
      } catch (err) {
        console.error("Failed to check order status", err);
      }
    }, 3000);
    setPollingId(id);
    return () => clearInterval(id);
  }, [currentOrderId, navigate, username, productId]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let user = null;
        if (username) {
          const q = query(
            collection(db, "users"),
            where("username", "==", username)
          );
          const snap = await getDocs(q);
          if (!snap.empty) {
            const d = snap.docs[0];
            user = { id: d.id, ...d.data() };
          }
        }

        let product = null;
        if (productId) {
          const prodRef = doc(db, "products", productId);
          const prodSnap = await getDoc(prodRef);
          if (prodSnap.exists()) {
            const prodData = { id: prodSnap.id, ...prodSnap.data() };
            if (prodData.username === username) {
              product = prodData;
              try {
                await updateDoc(prodRef, { checkoutViewCount: increment(1) });
                if (user) {
                  await logVisit(user.id, "checkout");
                }
              } catch (err) {
                console.error("Failed to update checkout view count", err);
              }
            }
          }
        }

        setUserData(user);
        setProductData(product);
      } catch (err) {
        console.error("Failed to fetch checkout data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name.trim() || !email.trim()) {
        alert("Vui lòng nhập họ tên và email");
        return;
      }

      const requiredFields =
        productData.checkout?.collectInfo?.fields?.filter((f) => f.required) ||
        [];
      for (const field of requiredFields) {
        const value = fieldValues[field.id];
        if (field.type === "checkboxes") {
          if (!Array.isArray(value) || value.length === 0) {
            alert(`Vui lòng nhập ${field.label || "thông tin"}`);
            return;
          }
        } else {
          if (!value) {
            alert(`Vui lòng nhập ${field.label || "thông tin"}`);
            return;
          }
        }
      }

      const orderData = {
        sellerId: userData?.id || null,
        sellerUsername: userData?.username || null,
        productId: productData?.id || null,
        productType: productData?.type || null,
        productName: productData?.checkout?.title || null,
        buyerId: currentUser?.uid || null,
        buyerName: name,
        buyerEmail: email,
        fields: fieldValues,
        note,
        amount: Number(productData?.checkout?.price) || 0,
      };
      if (orderData.amount <= 0) {
        const orderId = await createOrder({ ...orderData, status: "paid" });
        setCurrentOrderId(orderId);
        localStorage.setItem(`access_${productId}`, orderId);
        navigate(`/${username}/success/${productId}`);
      } else {
        const orderId = await createOrder(orderData);
        setCurrentOrderId(orderId);
        setPayAmount(orderData.amount);
        try {
          const url = await createSepayPayment({
            amount: orderData.amount,
            orderId,
          });
          setQrUrl(url);
        } catch (err) {
          console.error("Create sepay payment failed", err);
        }
        setShowSepayModal(true);
      }
    } catch (err) {
      console.error("Failed to create order", err);
      alert("Không thể gửi đơn hàng");
    }
  };

  const handleSepayClose = () => {
    setShowSepayModal(false);
    // Don't clear polling here so the page can redirect once payment is confirmed
    // navigate(`/${username}/success/${productId}`);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!productData) {
    return <NotFound username={username} />;
  }

  const themeIndex = userData?.templateIndex ?? template.templateIndex ?? 0;
  const colors =
    userData?.selectedColors ||
    template.selectedColors ||
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
      <aside className={cx("profile")}>
        <img
          src={userData?.avatarURL || avatarPlaceholder}
          alt={userData?.displayName || "Avatar"}
          className={cx("avatar")}
        />
        <h2 className={cx("name")}>{userData?.displayName || ""}</h2>
        {userData?.bio && <p className={cx("role")}>{userData.bio}</p>}
      </aside>
      <section className={cx("checkout")}>
        <div className={cx("checkout-inner")}>
          <div className={cx("hero")}>
            <img
              src={productData.checkout?.imageUrl || productImg}
              alt="Product"
            />
          </div>
          {productData.checkout?.description && (
            <div
              className={cx("desc")}
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(productData.checkout.description),
              }}
            />
          )}
          {productData.checkout?.collectInfo?.fields?.length > 0 && (
            <p className={cx("subtitle")}>{productData.checkout.bottomTitle}</p>
          )}

          {/* Form */}
          <form className={cx("form")} onSubmit={handleSubmit}>
            <h3 className={cx("formTitle")}>
              {productData.checkout?.bottomTitle}
            </h3>
            <input
              type="text"
              placeholder="Họ tên của bạn"
              className={cx("input")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email của bạn"
              className={cx("input")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {productData.checkout?.collectInfo?.fields?.map((field) =>
              renderField(field)
            )}
            <textarea
              placeholder="Ghi chú thêm (nếu có)"
              rows="3"
              className={cx("textarea")}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            {/* Total */}
            <div className={cx("total")}>
              <span>Tổng:</span>
              <span className={cx("amount")}>
                {productData.checkout?.price > 0
                  ? `${numberWithCommas(productData.checkout.price)}đ`
                  : "Miễn phí"}
              </span>{" "}
            </div>

            {/* PayPal button */}
            <button type="submit" className={cx("btnPay")}>
              {productData.checkout?.callActionButtonText || "Thanh toán"}{" "}
            </button>
          </form>

          {/* Privacy */}
          <div className={cx("privacy")}>
            <Link to="/privacy-policy">Chính sách bảo mật</Link>
          </div>
        </div>
      </section>
      <SepayModal
        isOpen={showSepayModal}
        onClose={handleSepayClose}
        qrUrl={qrUrl}
        amount={payAmount}
      />
    </div>
  );
};

export default CheckoutPage;
