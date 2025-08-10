// File: src/components/ImagePicker/ImagePicker.jsx
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ImagePicker.module.scss";
const cx = classNames.bind(styles);

/**
 * Component ImagePicker:
 * - Hiển thị nút "Chọn ảnh" (hoặc bất cứ text nào muốn)
 * - Khi click mở modal để chọn/upload/drag –drop ảnh
 * - Khi user chọn ảnh (từ grid mẫu hoặc upload từ máy), gọi props.onSelect({ url, author })
 */
const ImagePicker = ({ onSelect }) => {
  // State quản lý modal
  const [showModal, setShowModal] = useState(false);

  // Danh sách ảnh mẫu (hardcode hoặc có thể fetch từ bên ngoài)
  const [images, setImages] = useState([
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
  ]);

  // State cho tìm kiếm (theo author)
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc ảnh theo author
  const filteredImages = images.filter((img) =>
    img.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mở modal
  const openModal = () => {
    setSearchTerm("");
    setShowModal(true);
  };

  // Đóng modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Khi user click chọn ảnh từ grid mẫu
  const handleImageSelect = (imgObj) => {
    onSelect && onSelect({ url: imgObj.url, author: imgObj.author });
    setShowModal(false);
  };

  // Khi user upload file từ input
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const tempUrl = URL.createObjectURL(file);
    onSelect && onSelect({ url: tempUrl, author: file.name });
    setShowModal(false);
  };

  // Drag –drop bên trong modal (vùng upload)
  const handleDragOverInside = (e) => {
    e.preventDefault();
  };

  const handleDropInside = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    const tempUrl = URL.createObjectURL(file);
    onSelect && onSelect({ url: tempUrl, author: file.name });
    setShowModal(false);
  };

  // Giả lập load more: thêm 3 ảnh mới vào cuối danh sách
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
    <>
      {/* Nút Chọn ảnh bên ngoài (bên trong ImageUploader sẽ đặt ở vị trí mong muốn) */}
      <button className={cx("pickerButton")} onClick={openModal} type="button">
        Chọn ảnh
      </button>

      {/* Modal */}
      {showModal && (
        <div className={cx("modalOverlay")} onClick={closeModal}>
          <div
            className={cx("modalContent")}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header modal */}
            <div className={cx("modalHeader")}>
              <h3 className={cx("modalTitle")}>Chọn ảnh</h3>
              <div className={cx("closeIcon")} onClick={closeModal}>
                <svg viewBox="0 0 24 24">
                  <path
                    d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7a1 1 0 10-1.41 1.42L10.59 12l-4.9 4.89a1 1 0 101.41 1.42L12 13.41l4.89 4.9a1 1 0 001.42-1.41L13.41 12l4.9-4.89a1 1 0 000-1.4z"
                    fill="#5b57ff"
                  />
                </svg>
              </div>
            </div>

            {/* Body modal */}
            <div className={cx("modalBody")}>
              {/* Search bar */}
              <div className={cx("searchBar")}>
                <input
                  type="text"
                  placeholder="Tìm theo author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className={cx("searchIcon")}>
                  {/* Nếu muốn icon search, insert SVG ở đây */}
                </div>
              </div>

              {/* Upload area (bên trong modal) */}
              <label
                className={cx("uploadArea")}
                onDragOver={handleDragOverInside}
                onDrop={handleDropInside}
              >
                <div className={cx("dragText")}>Kéo –thả ảnh tại đây</div>
                <span className={cx("uploadBtn")}>Tải ảnh lên</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>

              {/* Grid ảnh mẫu */}
              <div className={cx("imageGrid")}>
                {filteredImages.map((img) => (
                  <div
                    key={img.id}
                    className={cx("imageCard")}
                    onClick={() => handleImageSelect(img)}
                  >
                    <img src={img.url} alt={img.author} />
                    <div className={cx("authorLabel")}>{img.author}</div>
                  </div>
                ))}
              </div>

              {/* Load more */}
              <div className={cx("loadMoreWrapper")}>
                <button className={cx("loadMoreBtn")} onClick={handleLoadMore}>
                  Tải thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePicker;
