// SelectImage.jsx
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./SelectImage.module.scss";

const cx = classNames.bind(styles);

// Một list ảnh mẫu ban đầu (12 ảnh), bạn có thể thay thế bằng URL thật hoặc fetch API
const INITIAL_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1606787621619-01c59a2fb37b?w=400&h=400&fit=crop",
    author: "Mahrous Houses",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
    author: "Matze Bob",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    author: "Clarisse Meyer",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
    author: "Jose Hernandez-Uribe",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=400&fit=crop",
    author: "Felicia Buitenwerf",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=400&h=400&fit=crop",
    author: "Paolo Nicolello",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=400&h=400&fit=crop",
    author: "Himiway Bikes",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=400&fit=crop",
    author: "Rao Desi",
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=400&h=400&fit=crop",
    author: "Matias Luige",
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop",
    author: "Mohamed Jamil Latrach",
  },
  {
    id: 11,
    url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop",
    author: "Thomas Chan",
  },
  {
    id: 12,
    url: "https://images.unsplash.com/photo-1499696019501-7f4f99d35c5b?w=400&h=400&fit=crop",
    author: "Sebastian Hans",
  },
];

const SelectImage = ({ size = "1920x1080" }) => {
  // State lưu ảnh đã chọn (object { url, author }) hoặc null
  const [selectedImage, setSelectedImage] = useState(null);

  // State quản lý modal: true = mở, false = đóng
  const [modalOpen, setModalOpen] = useState(false);

  // State list ảnh trong grid (có thể load thêm)
  const [images, setImages] = useState(INITIAL_IMAGES);

  // State cho search term
  const [searchTerm, setSearchTerm] = useState("");

  // Hàm lọc ảnh theo author's name
  const filteredImages = images.filter((img) =>
    img.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mở modal
  const openModal = () => {
    setSearchTerm("");
    setModalOpen(true);
  };

  // Đóng modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Khi user chọn ảnh trong grid
  const handleImageSelect = (img) => {
    setSelectedImage(img);
    setModalOpen(false);
  };

  // Khi user upload ảnh từ máy (tạo URL tạm để preview)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const tempUrl = URL.createObjectURL(file);
    setSelectedImage({ url: tempUrl, author: file.name });
    setModalOpen(false);
  };

  // Giả lập “Load More”: thêm 3 ảnh nữa vào cuối mảng
  const handleLoadMore = () => {
    const more = [
      {
        id: images.length + 1,
        url: "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?w=400&h=400&fit=crop",
        author: "New Author 1",
      },
      {
        id: images.length + 2,
        url: "https://images.unsplash.com/photo-1522364723953-452d3431c267?w=400&h=400&fit=crop",
        author: "New Author 2",
      },
      {
        id: images.length + 3,
        url: "https://images.unsplash.com/photo-1508780709619-79562169bc64?w=400&h=400&fit=crop",
        author: "New Author 3",
      },
    ];
    setImages((prev) => [...prev, ...more]);
  };

  return (
    <div className={cx("selectImage-container")}>
      {/* Header: số 3 + tiêu đề */}
      <div className={cx("header")}>
        <div className={cx("step-circle")}>3</div>
        <h2 className={cx("title")}>Chọn hình ảnh</h2>
      </div>

      {/* Ô select image bên ngoài modal */}
      <div className={cx("selector-box")} onClick={openModal}>
        {selectedImage && (
          <div className={cx("thumbnail-wrapper")}>
            <img src={selectedImage.url} alt="Selected" />
            <div
              className={cx("edit-icon")}
              onClick={(e) => {
                e.stopPropagation();
                openModal();
              }}
            >
              <svg viewBox="0 0 24 24">
                <path
                  d="M4 20h4l11-11-4-4L4 16v4zM20.7 5.3a1 1 0 00-1.4 0l-1 1 4 4 1-1a1 1 0 000-1.4l-2.6-2.6z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        )}
        <div className={cx("placeholder")}>
          <div className={cx("placeholder-text")}>{size}</div>
          <button
            className={cx("choose-btn")}
            onClick={(e) => {
              e.stopPropagation();
              openModal();
            }}
          >
            Chọn hình ảnh
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className={cx("modal-overlay")} onClick={closeModal}>
          <div
            className={cx("modal-content")}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header modal */}
            <div className={cx("modal-header")}>
              <h3 className={cx("modal-title")}>Choose Your Image</h3>
              <div className={cx("close-icon")} onClick={closeModal}>
                <svg viewBox="0 0 24 24">
                  <path
                    d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7a1 1 0 10-1.41 1.42L10.59 12l-4.9 4.89a1 1 0 101.41 1.42L12 13.41l4.89 4.9a1 1 0 001.42-1.41L13.41 12l4.9-4.89a1 1 0 000-1.4z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            {/* Body modal: scroll được */}
            <div className={cx("modal-body")}>
              {/* --- SEARCH BAR --- */}
              <div className={cx("search-bar")}>
                <input
                  type="text"
                  placeholder="Search Keywords"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* --- UPLOAD AREA --- */}
              <label className={cx("upload-area")}>
                <div className={cx("drag-text")}>Drag Image Here OR</div>
                <span className={cx("upload-btn")}>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>

              {/* --- IMAGE GRID --- */}
              <div className={cx("image-grid")}>
                {filteredImages.map((img) => (
                  <div
                    key={img.id}
                    className={cx("image-card")}
                    onClick={() => handleImageSelect(img)}
                  >
                    <img src={img.url} alt={img.author} />
                    <div className={cx("author-label")}>{img.author}</div>
                  </div>
                ))}
              </div>

              {/* --- LOAD MORE --- */}
              <div className={cx("load-more-wrapper")}>
                <button
                  className={cx("load-more-btn")}
                  onClick={handleLoadMore}
                >
                  Load More
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectImage;
