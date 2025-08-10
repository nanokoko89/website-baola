// src/components/Blog/Blog.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link để điều hướng client-side
import classNames from "classnames/bind";
import styles from "./Blog.module.scss";
import blogCardImage from "../../assets/blog.jpg";
import Header from "../utils/Header";
import Subscribe from "./Subscribe";

const cx = classNames.bind(styles);

// Thêm trường `slug` cho mỗi bài viết
const posts = [
  {
    id: 1,
    slug: "chien-luoc-xay-dung-kiem-tien-mo-rong-doanh-nghiep-nguoi-sang-tao",
    title:
      "9 Chiến Lược Đã Được Chứng Minh để Xây Dựng, Kiếm Tiền & Mở Rộng Doanh Nghiệp Người Sáng Tạo",
    image:
      "https://stan.store/blog/wp-content/uploads/2025/06/How-to-Add-a-Link-to-Your-TikTok-Bio-to-Drive-Sales.png",
    date: "4 tháng 2, 2025",
  },
  {
    id: 2,
    slug: "huong-dan-kiem-tien-voi-cac-cuoc-goi-huan-luyen",
    title:
      "Hướng Dẫn Toàn Diện cho Người Sáng Tạo về Kiếm Tiền với Các Cuộc Gọi Huấn Luyện",
    image:
      "https://stan.store/blog/wp-content/uploads/2025/06/How-to-Add-a-Link-to-Your-TikTok-Bio-to-Drive-Sales.png",
    date: "28 tháng 1, 2025",
  },
  {
    id: 3,
    slug: "lo-trinh-kiem-tien-voi-khan-gia-nho",
    title:
      "Lộ Trình Kiếm Tiền Với Một Khán Giả Nhỏ trong Nền Kinh Tế Người Sáng Tạo Ngày Nay",
    image:
      "https://stan.store/blog/wp-content/uploads/2025/06/How-to-Add-a-Link-to-Your-TikTok-Bio-to-Drive-Sales.png",
    date: "21 tháng 1, 2025",
  },
  {
    id: 4,
    slug: "gop-mat-voi-bao-la-autodm",
    title:
      "Các Nhà Sáng Tạo ơi, Hãy Gặp Gỡ Bạn Đồng Hành Tiết Kiệm Thời Gian Mới: Bao La AutoDM 📲",
    image:
      "https://stan.store/blog/wp-content/uploads/2025/06/How-to-Add-a-Link-to-Your-TikTok-Bio-to-Drive-Sales.png",
    date: "14 tháng 1, 2025",
  },
  {
    id: 5,
    slug: "nhin-lai-nam-2024-nen-kinh-te-nguoi-sang-tao",
    title:
      "Nhìn Lại Năm 2024: Sự Tiến Hóa của Nền Kinh Tế Người Sáng Tạo và Con Đường Phía Trước",
    image:
      "https://stan.store/blog/wp-content/uploads/2025/06/How-to-Add-a-Link-to-Your-TikTok-Bio-to-Drive-Sales.png",
    date: "7 tháng 1, 2025",
  },
  {
    id: 6,
    slug: "dam-uoc-mo-xay-dung-cuoc-song-mo-uoc",
    title:
      "Dám Ước Mơ: Giành Một Năm Lương và Xây Dựng Cuộc Sống Mơ Ước với Bao La",
    image:
      "https://stan.store/blog/wp-content/uploads/2025/06/How-to-Add-a-Link-to-Your-TikTok-Bio-to-Drive-Sales.png",
    date: "31 tháng 12, 2024",
  },
  // 6 bài tiếp theo cho trang 2
  {
    id: 7,
    slug: "cach-them-lien-ket-vao-bio-tiktok",
    title: "Cách Thêm Liên Kết vào Bio TikTok để Thúc Đẩy Doanh Số Năm 2025",
    image:
      "https://stan.store/blog/wp-content/uploads/2025/02/Scaling-Your-Creator-Business-With-Digital-Downloads.jpg",
    date: "3 tháng 6, 2025",
  },
  {
    id: 8,
    slug: "cach-ban-san-pham-ky-thuat-so-tren-tiktok-shop",
    title: "Cách Bán Sản Phẩm Kỹ Thuật Số Trên TikTok Shop",
    image:
      "https://stan.store/blog/wp-content/uploads/2025/02/Scaling-Your-Creator-Business-With-Digital-Downloads.jpg",
    date: "2 tháng 5, 2025",
  },
  {
    id: 9,
    slug: "cach-xay-dung-mo-ta-san-pham-hap-dan",
    title:
      "Cách Xây Dựng Mô Tả Sản Phẩm Hấp Dẫn để Biến Khách Xem Thành Người Mua",
    image:
      "https://stan.store/blog/wp-content/uploads/2025/02/Scaling-Your-Creator-Business-With-Digital-Downloads.jpg",
    date: "11 tháng 3, 2025",
  },
  {
    id: 10,
    slug: "cach-tao-uu-dai-san-pham-gia-thap",
    title:
      "Cách Tạo Các Ưu Đãi Sản Phẩm Giá Thấp Chuyển Người Đăng Ký Thành Người Mua",
    image:
      "https://stan.store/blog/wp-content/uploads/2025/02/Scaling-Your-Creator-Business-With-Digital-Downloads.jpg",
    date: "28 tháng 2, 2025",
  },
  {
    id: 11,
    slug: "bao-la-store-vs-beacons",
    title:
      "Bao La Store vs. Beacons: Vượt Khỏi Các Tính Năng, Nền Tảng Dành Cho Nhà Sáng Tạo Nào Phù Hợp Với Bạn?",
    image:
      "https://stan.store/blog/wp-content/uploads/2025/02/Scaling-Your-Creator-Business-With-Digital-Downloads.jpg",
    date: "28 tháng 2, 2025",
  },
  {
    id: 12,
    slug: "kiem-tien-ngay-khi-ban-ngu",
    title:
      "Kiếm Tiền Ngay Khi Bạn Ngủ: Cách Mở Rộng Doanh Nghiệp Người Sáng Tạo với Sản Phẩm Kỹ Thuật Số",
    image:
      "https://stan.store/blog/wp-content/uploads/2025/02/Scaling-Your-Creator-Business-With-Digital-Downloads.jpg",
    date: "11 tháng 2, 2025",
  },
];

const POSTS_PER_PAGE = 6;

const Blog = () => {
  // state quản lý trang hiện tại (mặc định là trang 1)
  const [currentPage, setCurrentPage] = useState(1);

  // Tính tổng số trang dựa trên số bài / POSTS_PER_PAGE
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // Tính index bắt đầu và kết thúc để slice mảng posts
  const indexOfFirstPost = (currentPage - 1) * POSTS_PER_PAGE;
  const indexOfLastPost = indexOfFirstPost + POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Hàm chuyển trang khi nhấp số hoặc mũi tên
  const handlePageClick = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
  };

  return (
    <div className={cx("blog-wrapper")}>
      <Header tab="Blog" />

      <section className={cx("hero")}>
        <div className={cx("container")}>
          <div className={cx("card")}>
            <img
              src={blogCardImage}
              alt="Thẻ blog"
              className={cx("card-image")}
            />
            <div className={cx("card-overlay")}>
              <h3 className={cx("card-title")}>
                Cách thêm liên kết{" "}
                <span className={cx("highlight")}>vào TikTok Bio</span> để{" "}
                <span className={cx("highlight")}>tăng doanh thu</span>
              </h3>
            </div>
          </div>

          <div className={cx("hero-text")}>
            <h1 className={cx("hero-title")}>
              Cách thêm liên kết vào TikTok Bio để tăng doanh thu năm 2025
            </h1>
            {/* Nếu muốn nút này cũng điều hướng, có thể thay thành <Link> */}
            <button className={cx("btn-read-more")}>
              Đọc thêm <span className={cx("arrow")}>&rarr;</span>
            </button>
          </div>
        </div>
      </section>

      <section className={cx("content-below")}>
        <h2>Mọi thứ bạn cần để phát triển với vai trò là một người sáng tạo</h2>
        <div className={cx("blogs")}>
          {/* Grid hiển thị bài viết trang hiện tại */}
          <div className={cx("grid")}>
            {currentPosts.map((post) => (
              <div key={post.id} className={cx("card")}>
                <div className={cx("card-image-wrapper")}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className={cx("card-image")}
                  />
                  <div className={cx("card-overlay")}></div>
                </div>

                <div className={cx("card-content")}>
                  <h3 className={cx("card-title")}>{post.title}</h3>
                </div>

                <div className={cx("card-footer")}>
                  {/* Thay <a> bằng <Link> để điều hướng đến BlogDetailPage */}
                  <Link to={`/blog/${post.slug}`} className={cx("read-more")}>
                    Đọc thêm&nbsp;
                    <span className={cx("arrow")}>&rarr;</span>
                  </Link>
                  <span className={cx("date")}>{post.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Phần phân trang (pagination) */}
          <div className={cx("pagination")}>
            {currentPage > 1 && (
              <button
                className={cx("page-button", "arrow")}
                onClick={() => handlePageClick(currentPage - 1)}
              >
                &larr;
              </button>
            )}

            {Array.from({ length: totalPages }, (_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  className={cx("page-button", {
                    active: currentPage === pageNum,
                  })}
                  onClick={() => handlePageClick(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            {currentPage < totalPages && (
              <button
                className={cx("page-button", "arrow")}
                onClick={() => handlePageClick(currentPage + 1)}
              >
                &rarr;
              </button>
            )}
          </div>
        </div>
      </section>

      <section className={cx("content-below")}>
        <Subscribe />
      </section>
    </div>
  );
};

export default Blog;
