// File: src/components/StoreHeaderEdit/StoreHeaderEdit.jsx

import { useEffect, useState, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./StoreHeaderEdit.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setBio, setDisplayName } from "../../../store/templateSlice";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaPen } from "react-icons/fa";

import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { auth, db, storage } from "../../../config/firebase";

import { selectCurrentUser } from "../../../store/authSlice";
import { allSocialDefaults } from "../../../config/others";

// Import ImageEditor đã viết ở src/components/ImageEditor/ImageEditor.jsx
import ImageEditor from "../../common/ImageEditor";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const StoreHeaderEdit = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ref cho input <file> (ẩn)
  const fileInputRef = useRef(null);

  // Lấy danh sách platform đã có URL từ currentUser.socialLinks
  const existingPlatforms = currentUser?.socialLinks
    ? Object.entries(currentUser.socialLinks)
        .filter(([platform, url]) => url && url.trim() !== "")
        .map(([platform]) => platform)
    : [];

  // Luôn bao gồm "instagram" và "tiktok", sau đó thêm existingPlatforms (loại trùng lặp)
  const initialPlatforms = Array.from(
    new Set(["instagram", "tiktok", ...existingPlatforms])
  );

  // Khởi tạo state formData: avatarURL, displayName, bio, socialLinks
  const [formData, setFormData] = useState({
    avatarURL: currentUser?.avatarURL || currentUser?.photoURL || "",
    displayName: currentUser?.displayName,
    bio: currentUser?.bio,
    socialLinks: allSocialDefaults.map((item) => ({
      ...item,
      url: currentUser?.socialLinks?.[item.platform] || "",
    })),
  });

  // Khi currentUser thay đổi (do tải dữ liệu async), đồng bộ lại formData
  useEffect(() => {
    setFormData({
      avatarURL: currentUser?.avatarURL || currentUser?.photoURL || "",
      displayName: currentUser?.displayName || "",
      bio: currentUser?.bio || "",
      socialLinks: allSocialDefaults.map((item) => ({
        ...item,
        url: currentUser?.socialLinks?.[item.platform] || "",
      })),
    });
  }, [currentUser]);

  const [showMoreSocials, setShowMoreSocials] = useState(false);
  const [uploading, setUploading] = useState(false);

  // State để quản lý ImageEditor modal
  const [showEditor, setShowEditor] = useState(false);
  const [originalImageURL, setOriginalImageURL] = useState(""); // Object URL của file gốc để crop

  // Khi user gõ DisplayName hoặc Bio
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Khi user thay đổi một social link
  const handleSocialLinkChange = (platform, value) => {
    const updated = formData.socialLinks.map((item) =>
      item.platform === platform ? { ...item, url: value } : item
    );
    setFormData((prev) => ({ ...prev, socialLinks: updated }));
  };

  // Đồng bộ displayName & bio lên Redux
  useEffect(() => {
    dispatch(setDisplayName(formData.displayName));
  }, [dispatch, formData.displayName]);

  useEffect(() => {
    dispatch(setBio(formData.bio));
  }, [dispatch, formData.bio]);

  // ========== XỬ LÝ AVATAR ==========
  // Khi nhấn nút ✏️ sẽ mở file dialog
  const handleEditAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // reset input để có thể chọn lại cùng file nếu cần
      fileInputRef.current.click();
    }
  };

  // Khi user chọn file mới (trực tiếp từ dialog), ta chưa upload ngay
  // Mà sẽ tạo Object URL, set vào originalImageURL, rồi mở ImageEditor modal
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Tạo Object URL để preview & crop
    const tempUrl = URL.createObjectURL(file);
    setOriginalImageURL(tempUrl);
    // Mở modal ImageEditor
    setShowEditor(true);
  };

  // Khi user bấm "Cancel" trong ImageEditor (muốn hủy crop)
  const handleCancelCrop = () => {
    // Dọn Object URL nếu không dùng tiếp
    if (originalImageURL) {
      URL.revokeObjectURL(originalImageURL);
    }
    setShowEditor(false);
    setOriginalImageURL("");
  };

  // Khi user bấm "Use this photo" trong ImageEditor -> nhận về { file: Blob, url: ObjectURL }
  // Ta sẽ upload Blob đó lên Firebase, sau đó cập nhật xuống formData.avatarURL
  const handleConfirmCrop = async ({ file, url }) => {
    // Đóng modal edit
    setShowEditor(false);

    // Dọn Object URL gốc (nếu cần)
    if (originalImageURL) {
      URL.revokeObjectURL(originalImageURL);
      setOriginalImageURL("");
    }

    // Bắt đầu upload ảnh đã crop
    if (!file || !currentUser) return;
    try {
      setUploading(true);

      // Tạo path lưu file trong Storage
      const fileName = `${Date.now()}_${file.name}`; // giữ đuôi .jpeg, .png
      const avatarStorageRef = storageRef(
        storage,
        `avatars/${currentUser.uid}/${fileName}`
      );

      // Upload Blob (file) lên Firebase Storage
      await uploadBytes(avatarStorageRef, file);

      // Lấy downloadURL từ Firebase
      const downloadURL = await getDownloadURL(avatarStorageRef);

      // Cập nhật ngay trong state formData để preview avatar
      setFormData((prev) => ({
        ...prev,
        avatarURL: downloadURL,
      }));

      // 1. Cập nhật photoURL trên Firebase Auth
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          photoURL: downloadURL,
        });
      }

      // 2. Cập nhật avatarURL trên Firestore document users/{uid}
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        avatarURL: downloadURL,
        updatedAt: new Date().toISOString(),
      });

      setUploading(false);
    } catch (error) {
      console.error("Lỗi khi upload avatar đã crop:", error);
      setUploading(false);
    }
  };

  // ========== LƯU THÔNG TIN KHÁC (DisplayName, Bio, SocialLinks) ==========
  const handleSave = async () => {
    if (!currentUser) return;

    try {
      // 1. Cập nhật displayName trên Firebase Auth
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: formData.displayName,
        });
      }

      // 2. Chuyển mảng socialLinks thành object { platform: url }
      const socialObj = formData.socialLinks.reduce((acc, item) => {
        acc[item.platform] = item.url || "";
        return acc;
      }, {});

      // 3. Cập nhật document users/{uid}
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        displayName: formData.displayName,
        bio: formData.bio,
        socialLinks: socialObj,
        updatedAt: new Date().toISOString(),
      });
      navigate("/mystore");
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu profile:", error);
    }
  };

  return (
    <div className={cx("profile-form")}>
      {/* 1. Avatar Section */}
      <div className={cx("avatar-section")}>
        <div className={cx("avatar")}>
          {formData.avatarURL ? (
            <img
              src={formData.avatarURL}
              alt="Avatar"
              className={cx("avatar-image")}
            />
          ) : (
            <span className={cx("avatar-placeholder")}>🍎</span>
          )}

          {/* Overlay loading đè lên avatar cũ khi uploading */}
          {uploading && (
            <div className={cx("avatar-overlay")}>
              <div className={cx("loading-text")}>Đang tải ảnh...</div>
            </div>
          )}

          <div
            className={cx("edit-icon")}
            onClick={handleEditAvatarClick}
            title="Thay đổi ảnh đại diện"
          >
            <FaPen />
          </div>

          {/* Input chọn file ẩn */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        {/* ĐÃ BỎ phần hiển thị text upload riêng bên ngoài */}
      </div>

      {/* 2. Display Name */}
      <div className={cx("form-group")}>
        <label className={cx("label")}>Tên hiển thị</label>
        <input
          type="text"
          className={cx("input")}
          placeholder="Tên thương hiệu cá nhân hoặc doanh nghiệp"
          value={formData.displayName}
          onChange={(e) => handleInputChange("displayName", e.target.value)}
        />
      </div>

      {/* 3. Bio */}
      <div className={cx("form-group")}>
        <label className={cx("label")}>Bio</label>
        <div className={cx("bio-input-wrapper")}>
          <textarea
            className={cx("textarea")}
            value={formData.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            rows={3}
            placeholder="Viết một đoạn giới thiệu ngắn gọn..."
          />
          <span className={cx("char-count")}>
            {formData.bio?.length || 0}/80
          </span>
        </div>
      </div>

      {/* 4. Social Links */}
      <div className={cx("form-group")}>
        <label className={cx("label")}>Liên kết mạng xã hội</label>

        {formData.socialLinks
          .filter((item) => initialPlatforms.includes(item.platform))
          .map((link) => (
            <div key={link.platform} className={cx("social-link-item")}>
              <div className={cx("social-icon")}>
                <img src={link.icon} alt={link.platform} />
              </div>
              <span className={cx("at-symbol")}>@</span>
              <input
                type="text"
                className={cx("social-input")}
                placeholder={link.placeholder}
                value={link.url}
                onChange={(e) =>
                  handleSocialLinkChange(link.platform, e.target.value)
                }
              />
            </div>
          ))}

        <button
          type="button"
          className={cx("more-socials-btn")}
          onClick={() => setShowMoreSocials((prev) => !prev)}
        >
          Thêm liên kết
          <span className={cx("dropdown-icon", { rotated: showMoreSocials })}>
            <IoIosArrowDropdownCircle />
          </span>
        </button>

        {showMoreSocials && (
          <div className={cx("more-socials-list")}>
            {formData.socialLinks
              .filter((item) => !initialPlatforms.includes(item.platform))
              .map((link) => (
                <div key={link.platform} className={cx("social-link-item")}>
                  <div className={cx("social-icon")}>
                    <img src={link.icon} alt={link.platform} />
                  </div>
                  <span className={cx("at-symbol")}>@</span>
                  <input
                    type="text"
                    className={cx("social-input")}
                    placeholder={link.placeholder}
                    value={link.url}
                    onChange={(e) =>
                      handleSocialLinkChange(link.platform, e.target.value)
                    }
                  />
                </div>
              ))}
          </div>
        )}
      </div>

      {/* 5. Nút Lưu */}
      <button className={cx("save-btn")} onClick={handleSave}>
        Lưu
      </button>

      {/* ========== 6. ImageEditor Modal ========== */}
      {showEditor && (
        <ImageEditor
          imageUrl={originalImageURL}
          aspect={1} // crop vuông
          cropShape="round" // mask tròn
          onCancel={handleCancelCrop}
          onConfirm={handleConfirmCrop}
        />
      )}
    </div>
  );
};

export default StoreHeaderEdit;
