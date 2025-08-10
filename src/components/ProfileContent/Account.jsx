import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { auth, db } from "../../config/firebase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { uploadImage } from "../../config/firebase";
import {
  listenAuthState,
  logoutUser,
  selectCurrentUser,
} from "../../store/authSlice";
import styles from "./Account.module.scss";
import avatarPlaceholder from "../../assets/avatar-placeholder.svg";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineFileImage,
} from "react-icons/ai";

const cx = classNames.bind(styles);

const Account = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  // State các trường form
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+84");
  const [phone, setPhone] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // State để ẩn/hiện mật khẩu
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const toggleCurrentPwd = () => setShowCurrentPwd((prev) => !prev);
  const toggleNewPwd = () => setShowNewPwd((prev) => !prev);
  const toggleConfirmPwd = () => setShowConfirmPwd((prev) => !prev);

  // Khi currentUser thay đổi, fill dữ liệu vào form
  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.displayName || "");
      if (currentUser.phone && currentUser.phone.startsWith("+")) {
        const pn = currentUser.phone;
        setCountryCode(pn.slice(0, 3));
        setPhone(pn.slice(3));
      } else {
        setCountryCode("+84");
        setPhone(currentUser.phone || "");
      }
      setAvatarPreview(currentUser.avatarURL || currentUser.photoURL || "");
    }
  }, [currentUser]);

  // Nếu chưa login, redirect về trang /
  useEffect(() => {
    if (currentUser === null) {
      window.location.href = "/";
    }
  }, [currentUser]);

  // Khi user chọn file avatar, tạo preview
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý form submit khi cập nhật profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setErrorUpdate("");
    setSuccessMsg("");
    setLoadingUpdate(true);

    if (!currentUser) {
      setErrorUpdate("Không tìm thấy tài khoản.");
      setLoadingUpdate(false);
      return;
    }

    try {
      // 1. Cập nhật displayName trên Firebase Auth nếu có thay đổi
      if (
        fullName.trim() !== "" &&
        fullName.trim() !== currentUser.displayName
      ) {
        await updateProfile(auth.currentUser, {
          displayName: fullName.trim(),
        });
      }

      // 2. Cập nhật tên xuống Firestore để đồng bộ với listener
      const userDocRef = doc(db, "users", currentUser.uid);
      await setDoc(
        userDocRef,
        { fullName: fullName.trim(), displayName: fullName.trim() },
        { merge: true }
      );

      // 3. Upload avatar (nếu có) và cập nhật photoURL
      let newAvatarURL = currentUser.avatarURL || currentUser.photoURL || null;
      if (avatarFile) {
        newAvatarURL = await uploadImage(
          avatarFile,
          `avatars/${currentUser.uid}`
        );
        await updateProfile(auth.currentUser, {
          photoURL: newAvatarURL,
        });
      }

      // 4. Cập nhật phone, avatarURL và updatedAt xuống Firestore
      const fullPhone = countryCode + phone.trim();
      await setDoc(
        userDocRef,
        {
          phone: fullPhone,
          avatarURL: newAvatarURL,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      // 5. Reload lại Redux currentUser
      await dispatch(listenAuthState()).unwrap();

      setSuccessMsg("Cập nhật thông tin thành công!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Lỗi khi cập nhật profile:", err);
      setErrorUpdate("Không thể cập nhật. Vui lòng thử lại.");
    } finally {
      setLoadingUpdate(false);
    }
  };

  // Xử lý đăng xuất
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (err) {
      console.error("Lỗi khi đăng xuất:", err);
    }
  };

  return (
    <div className={cx("profile")}>
      <div className={cx("content")}>
        <h2 className={cx("sectionTitle")}>Hồ sơ của tôi</h2>
        <form className={cx("formGrid")} onSubmit={handleUpdateProfile}>
          {/* Avatar */}
          <div className={cx("formGroup")}>
            <label className={cx("label")}>Ảnh đại diện</label>
            <div className={cx("avatarWrapper")}>
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className={cx("avatarPreview")}
                />
              ) : (
                <img
                  src={avatarPlaceholder}
                  alt="Avatar placeholder"
                  className={cx("avatarPreview")}
                />
              )}
              <input
                type="file"
                accept="image/*"
                id="avatarUpload"
                onChange={handleAvatarChange}
                className={cx("fileInput")}
              />
              <label htmlFor="avatarUpload" className={cx("uploadLabel")}>
                <AiOutlineFileImage className={cx("uploadIcon")} />
                {avatarFile
                  ? avatarFile.name
                  : avatarPreview
                  ? "Đổi ảnh..."
                  : "Chọn ảnh..."}
              </label>
            </div>
          </div>

          {/* Tên */}
          <div className={cx("formGroup")}>
            <label htmlFor="fullName" className={cx("label")}>
              Tên thương hiệu
            </label>
            <input
              id="fullName"
              type="text"
              className={cx("input")}
              placeholder="Nhập tên đầy đủ"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* Email (không cho sửa) */}
          <div className={cx("formGroup")}>
            <label className={cx("label")}>Email</label>
            <input
              type="email"
              className={cx("input")}
              value={currentUser?.email || ""}
              disabled
            />
          </div>

          {/* Số điện thoại */}
          <div className={cx("formGroup", "phoneGroup")}>
            <label htmlFor="phone" className={cx("label")}>
              Số điện thoại
            </label>
            <div className={cx("phoneWrapper")}>
              <select
                className={cx("countrySelect")}
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="+84">🇻🇳 +84</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+86">🇨🇳 +86</option>
                <option value="+81">🇯🇵 +81</option>
              </select>
              <input
                id="phone"
                type="tel"
                className={cx("input", "inputField")}
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Hiển thị lỗi / thành công */}
          {errorUpdate && <p className={cx("error-message")}>{errorUpdate}</p>}
          {successMsg && <p className={cx("success-message")}>{successMsg}</p>}

          {/* Nút Cập nhật */}
          <button
            type="submit"
            className={cx("button", loadingUpdate ? "buttonDisabled" : "")}
            disabled={loadingUpdate}
          >
            {loadingUpdate ? "Đang cập nhật..." : "Cập nhật thông tin"}
          </button>
        </form>
      </div>

      {/* Phần đổi mật khẩu (chưa có logic) */}
      <h2 className={cx("sectionTitle", "mt24")}>Mật khẩu</h2>
      <div className={cx("formGrid", "passwordGrid")}>
        {/* Mật khẩu hiện tại */}
        <div className={cx("formGroup", "passwordGroup")}>
          <label className={cx("label")}>Mật khẩu hiện tại</label>
          <div className={cx("passwordWrapper")}>
            <input
              type={showCurrentPwd ? "text" : "password"}
              className={cx("input")}
              placeholder="••••••••"
            />
            <span className={cx("eyeIcon")} onClick={toggleCurrentPwd}>
              {showCurrentPwd ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>

        {/* Mật khẩu mới */}
        <div className={cx("formGroup", "passwordGroup")}>
          <label className={cx("label")}>Mật khẩu mới</label>
          <div className={cx("passwordWrapper")}>
            <input
              type={showNewPwd ? "text" : "password"}
              className={cx("input")}
              placeholder="••••••••"
            />
            <span className={cx("eyeIcon")} onClick={toggleNewPwd}>
              {showNewPwd ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>

        {/* Xác nhận mật khẩu */}
        <div className={cx("formGroup", "passwordGroup")}>
          <label className={cx("label")}>Xác nhận mật khẩu</label>
          <div className={cx("passwordWrapper")}>
            <input
              type={showConfirmPwd ? "text" : "password"}
              className={cx("input")}
              placeholder="••••••••"
            />
            <span className={cx("eyeIcon")} onClick={toggleConfirmPwd}>
              {showConfirmPwd ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>
      </div>

      <button className={cx("button", "buttonDisabled")} disabled>
        Cập nhật mật khẩu
      </button>

      {/* Nút Đăng xuất */}
      <button className={cx("button", "buttonLogout")} onClick={handleLogout}>
        Đăng Xuất
      </button>
    </div>
  );
};

export default Account;
