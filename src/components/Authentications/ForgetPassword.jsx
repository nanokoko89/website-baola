// src/components/Signup/Signup.jsx
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ForgetPassword.module.scss";
import { Link } from "react-router-dom";

// Import icon từ react-icons
import { FiMail } from "react-icons/fi";

const cx = classNames.bind(styles);

const ForgetPassword = () => {
  const [isSent, setIsSent] = useState(false);

  const [formData, setFormData] = useState({
    username: "", // ví dụ: "stan.store/username"
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  // Hàm thay đổi giá trị formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hàm submit form (hiện tại chỉ preventDefault, bạn có thể bổ sung xử lý API)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className={cx("wrapper")}>
      {isSent ? (
        <div className={cx("container")}>
          {/* Tiêu đề chào mừng */}
          <div className={cx("header")}>
            <h2 className={cx("header__title")}>
              <span className={cx("wave")}>👋</span> Bao La
            </h2>
            <p className={cx("header__subtitle")}>Quên mật khẩu của bạn?</p>
          </div>

          {/* Form đăng ký */}
          <div className={cx("form")}>
            <p className={cx("footer__text")}>
              Chúng tôi đôi lúc đều như vậy - chúng tôi sẽ gửi cho email của bạn
              một liên kết đặt lại! nếu{" "}
              <strong>{"nguyentuan1989xk@gmail.com"}</strong> tồn tại, bạn sẽ
              sớm nhận được email hướng dẫn đặt lại mật khẩu!
            </p>
          </div>

          {/* Chú thích & link Terms / Login */}
          <div className={cx("footer")}>
            <p className={cx("footer__text")}>
              Không nhận được email?{" "}
              <a
                onClick={() => setIsSent(false)}
                className={cx("footer__link")}
              >
                Gửi lại
              </a>
            </p>
            <p className={cx("footer__text")}>
              Quay lại{" "}
              <Link to="/login" className={cx("footer__link")}>
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div className={cx("container")}>
          {/* Tiêu đề chào mừng */}
          <div className={cx("header")}>
            <h2 className={cx("header__title")}>
              <span className={cx("wave")}>👋</span> Bao La
            </h2>
            <p className={cx("header__subtitle")}>Quên mật khẩu của bạn?</p>
          </div>

          {/* Form đăng ký */}
          <form className={cx("form")} onSubmit={handleSubmit}>
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
                />
              </label>
            </div>

            {/* 6. Nút Next */}
            <button
              type="submit"
              className={cx("btn", "btn--next")}
              onClick={() => setIsSent(true)}
            >
              Gửi
            </button>
          </form>

          {/* Chú thích & link Terms / Login */}
          <div className={cx("footer")}>
            <p className={cx("footer__text")}>
              <Link to="/quen-mat-khau" className={cx("footer__link")}>
                Quên mật khẩu
              </Link>
            </p>
            <p className={cx("footer__text")}>
              Quay lại{" "}
              <Link to="/login" className={cx("footer__link")}>
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
