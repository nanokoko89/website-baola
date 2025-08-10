// src/components/Signup/Signup.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./Signup.module.scss";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import FlagVN from "../../assets/flag.svg";
import { Link, useNavigate } from "react-router-dom";

import {
  signupWithEmail,
  selectAuthLoading,
  selectAuthError,
  selectCurrentUser,
  clearAuthError,
} from "../../store/authSlice";

const cx = classNames.bind(styles);

const USERNAME_REGEX = /^[A-Za-z0-9_-]+$/;

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [usernameError, setUsernameError] = useState("");

  // Clear any previous auth errors when this screen loads
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Kiểm tra riêng cho field username
    if (name === "username") {
      if (value === "" || USERNAME_REGEX.test(value)) {
        setUsernameError("");
      } else {
        setUsernameError(
          "Username chỉ được chứa chữ cái (A–Z, a–z), số (0–9), dấu gạch ngang (-) và gạch dưới (_)."
        );
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear auth error when user begins editing
    if (error) {
      dispatch(clearAuthError());
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Nếu username sai định dạng thì không submit
    if (usernameError) return;

    dispatch(
      signupWithEmail({
        username: formData.username,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      })
    );
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        {/* Progress bar */}
        {/* <div className={cx("progress")}>
          <span className={cx("progress__fill")}></span>
        </div> */}

        {/* Header */}
        <div className={cx("header")}>
          <h2 className={cx("header__title")}>
            Hey @{formData.username || "Username"}!{" "}
            <span className={cx("wave")}>👋</span>
          </h2>
          <p className={cx("header__subtitle")}>
            Cùng kinh doanh kiếm tiền thôi nào!
          </p>
        </div>

        {/* Hiển thị lỗi từ server */}
        {error && <p className={cx("error-message")}>{error}</p>}

        {/* Form signup */}
        <form className={cx("form")} onSubmit={handleSubmit}>
          {/* 1. Username */}
          <div className={cx("form__group")}>
            <label htmlFor="username" className={cx("form__label")}>
              <span className={cx("label-symbol")}>@</span>
              {/* <div className={cx("label-store")}>baola.store/</div> */}
              <input
                type="text"
                id="username"
                name="username"
                className={cx("form__input", "form__input--username")}
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </label>
            {usernameError && (
              <p className={cx("error-message")}>{usernameError}</p>
            )}
          </div>

          {/* 2. Full Name */}
          <div className={cx("form__group")}>
            <label htmlFor="fullName" className={cx("form__label")}>
              <FiUser className={cx("icon")} />
              <input
                type="text"
                id="fullName"
                name="fullName"
                className={cx("form__input")}
                placeholder="Tên đầy đủ"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </label>
          </div>

          {/* 3. Email */}
          <div className={cx("form__group")}>
            <label htmlFor="email" className={cx("form__label")}>
              <FiMail className={cx("icon")} />
              <input
                type="email"
                id="email"
                name="email"
                className={cx("form__input")}
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </label>
          </div>

          {/* 4. Phone */}
          <div className={cx("form__group", "form__group--phone")}>
            <div className={cx("phone-code")}>
              <img
                src={FlagVN}
                alt="Vietnam Flag"
                className={cx("phone-code__flag")}
              />
              <span className={cx("phone-code__prefix")}>+84</span>
            </div>
            <label
              htmlFor="phone"
              className={cx("form__label", "form__label--phone")}
            >
              <input
                type="tel"
                id="phone"
                name="phone"
                className={cx("form__input", "form__input--phone")}
                placeholder="Số điện thoại"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </label>
          </div>

          {/* 5. Password */}
          <div className={cx("form__group")}>
            <label htmlFor="password" className={cx("form__label")}>
              <FiLock className={cx("icon")} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className={cx("form__input")}
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <button
                type="button"
                className={cx("password-toggle")}
                onClick={toggleShowPassword}
                tabIndex={-1}
                disabled={loading}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className={cx("icon", "icon--eye")} />
                ) : (
                  <AiOutlineEye className={cx("icon", "icon--eye")} />
                )}
              </button>
            </label>
          </div>

          {/* Nút Tiếp tục */}
          <button
            type="submit"
            className={cx("btn", "btn--next")}
            disabled={loading || Boolean(usernameError)}
          >
            {loading ? "Đang xử lý..." : "Tiếp tục"}
          </button>
        </form>

        {/* Footer link */}
        <div className={cx("footer")}>
          <p className={cx("footer__text")}>
            Đã có tài khoản?{" "}
            <Link to="/login" className={cx("footer__link")}>
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
