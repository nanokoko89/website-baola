// src/components/Login/Login.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { FiUser, FiLock } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import {
  loginWithEmail,
  selectAuthLoading,
  selectAuthError,
  selectCurrentUser,
  clearAuthError,
} from "../../store/authSlice";

const cx = classNames.bind(styles);

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  // Clear any previous auth errors when this screen loads
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  // Nếu đã login (currentUser != null), redirect về dashboard
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear any existing auth error when user edits input
    if (error) {
      dispatch(clearAuthError());
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginWithEmail({ email: formData.email, password: formData.password })
    );
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        {/* Tiêu đề */}
        <div className={cx("header")}>
          <h2 className={cx("header__title")}>
            <span className={cx("wave")}>👋</span> Bao La
          </h2>
          <p className={cx("header__subtitle")}>
            May túi ba gang, mang theo mà đựng 💰💸😤
          </p>
        </div>

        {/* Hiển thị lỗi */}
        {error && <p className={cx("error-message")}>{error}</p>}

        {/* Form đăng nhập */}
        <form className={cx("form")} onSubmit={handleSubmit}>
          {/* Email */}
          <div className={cx("form__group")}>
            <label htmlFor="email" className={cx("form__label")}>
              <FiUser className={cx("icon")} />
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

          {/* Password */}
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

          {/* Nút Đăng nhập */}
          <button
            type="submit"
            className={cx("btn", "btn--next")}
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {/* Footer link */}
        <div className={cx("footer")}>
          <p className={cx("footer__text")}>
            <Link to="/quen-mat-khau" className={cx("footer__link")}>
              Quên mật khẩu
            </Link>
          </p>
          <p className={cx("footer__text")}>
            Không có tài khoản?{" "}
            <Link to="/signup" className={cx("footer__link")}>
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
