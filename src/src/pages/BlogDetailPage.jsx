// src/components/Blog/BlogDetailPage.jsx

import React, { useEffect, useState } from "react";
import sanitizeHtml from "../utils/sanitizeHtml";
import { useParams, Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./BlogDetailPage.module.scss";
import Header from "../components/utils/Header";

const cx = classNames.bind(styles);

const posts = [
  {
    id: 1,
    slug: "chien-luoc-xay-dung-kiem-tien-mo-rong-doanh-nghiep-nguoi-sang-tao",
    title:
      "9 Chiến Lược Đã Được Chứng Minh để Xây Dựng, Kiếm Tiền & Mở Rộng Doanh Nghiệp Người Sáng Tạo",
    image:
      "https://stan.store/blog/wp-content/uploads/2025/06/How-to-Add-a-Link-to-Your-TikTok-Bio-to-Drive-Sales.png",
    date: "4 tháng 2, 2025",
    content: `
      <p>Chào mừng bạn đến với bài viết chi tiết về “9 Chiến Lược Đã Được Chứng Minh để Xây Dựng, Kiếm Tiền & Mở Rộng Doanh Nghiệp Người Sáng Tạo”. Ở đây, bạn sẽ tìm thấy:</p>
      <ol>
        <li><strong>Chiến Lược #1:</strong> Tập trung vào giá trị cốt lõi.</li>
        <li><strong>Chiến Lược #2:</strong> Xây dựng cộng đồng trung thành.</li>
        <li><strong>Chiến Lược #3:</strong> Tận dụng kênh social media.</li>
        <li><strong>…</strong> (Bạn có thể bổ sung thêm nội dung chi tiết ở đây.)</li>
      </ol>
      <p>Hãy tưởng tượng mỗi gạch đầu dòng ở trên như một bước nhảy, đưa bạn từ khởi điểm đến “đỉnh cao” của nền kinh tế người sáng tạo. Mỗi khi đọc một mục, hãy ghi chú lại và áp dụng ngay – để từng chiến lược lan tỏa, biến ý tưởng thành doanh thu thực tế.</p>
      <p>Chúc bạn luôn đam mê, kiên trì và sớm thành công với con đường sáng tạo của riêng mình!</p>
    `,
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

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    // Tìm bài viết tương ứng với slug trong mảng posts
    const foundPost = posts.find((p) => p.slug === slug);
    if (foundPost) {
      setPostData(foundPost);
    } else {
      // Nếu không tìm thấy, redirect về trang Blog (hoặc trang 404)
      navigate("/blog", { replace: true });
    }
  }, [slug, navigate]);

  if (!postData) {
    // Khi chưa load được data (hoặc đang điều hướng về /blog)
    return (
      <div className={cx("loading")}>
        <p>Đang tải nội dung chi tiết…</p>
      </div>
    );
  }

  return (
    <div className={cx("detail-wrapper")}>
      {/* Header (có thể giữ lại nav/menu chung) */}
      <Header tab="Blog" />
      <div className={cx("background")} />

      <div className={cx("container")}>
        {/* Nút quay về danh sách blog */}
        <div className={cx("back-button")}>
          <Link to="/blog">&larr; Quay về Blog</Link>
        </div>

        <h1 className={cx("title")}>{postData.title}</h1>
        <p className={cx("date")}>{postData.date}</p>

        <div className={cx("image-wrapper")}>
          <img
            src={postData.image}
            alt={postData.title}
            className={cx("main-image")}
          />
        </div>

        {/* Nội dung chi tiết: có thể là HTML string, ở đây dùng dangerouslySetInnerHTML */}
        <div
          className={cx("content")}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(postData.content) }}
        />

        {/* Section ủng hộ, đăng ký (Subscribe) */}
        <div className={cx("subscribe-section")}>
          {/* Giả sử bạn có component Subscribe */}
          {/* import Subscribe từ "./Subscribe" nếu muốn hiển thị */}
          {/* <Subscribe /> */}
          {/* Hoặc bạn có thể để một lời kêu gọi ủng hộ bản tin ở đây */}
          <p>Hãy theo dõi để nhận thêm nhiều bài viết giá trị khác!</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
