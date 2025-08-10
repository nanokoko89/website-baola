import React, { useRef, useState } from "react";
import classNames from "classnames/bind";
import { FiPlay } from "react-icons/fi";
import { auth, uploadVideo } from "../../config/firebase";
import styles from "./VideoUpload.module.scss";

const cx = classNames.bind(styles);

/**
 * Helper function để tạo thumbnail từ file video một cách đáng tin cậy.
 * @param {File} videoFile - File video người dùng đã chọn.
 * @returns {Promise<{thumbUrl: string, videoUrl: string}>}
 */
const generateThumbnail = (videoFile) => {
  return new Promise((resolve, reject) => {
    const videoUrl = URL.createObjectURL(videoFile);
    const videoEl = document.createElement("video");
    const canvas = document.createElement("canvas");

    // Timeout để tránh treo vô hạn
    const timeout = setTimeout(() => {
      reject(new Error("Timeout khi tạo thumbnail"));
      URL.revokeObjectURL(videoUrl);
    }, 10000);

    videoEl.addEventListener("loadedmetadata", () => {
      // Đặt kích thước canvas
      canvas.width = videoEl.videoWidth || 640;
      canvas.height = videoEl.videoHeight || 360;

      // Thử nhiều thời điểm khác nhau để tìm frame không đen
      const timeToSeek = Math.min(2, videoEl.duration * 0.1); // 10% của video hoặc 2 giây
      videoEl.currentTime = timeToSeek;
    });

    videoEl.addEventListener("seeked", () => {
      try {
        clearTimeout(timeout);

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Không thể tạo canvas context"));
          return;
        }

        // Vẽ frame hiện tại
        ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);

        // Kiểm tra xem canvas có dữ liệu không (tránh canvas trống/đen)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let hasNonBlackPixels = false;

        // Kiểm tra một số pixel để xem có khác màu đen không
        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          if (r > 10 || g > 10 || b > 10) {
            // Threshold nhỏ để tránh nhiễu
            hasNonBlackPixels = true;
            break;
          }
        }

        if (!hasNonBlackPixels) {
          console.warn("Frame hiện tại có vẻ là màu đen, thử frame khác...");
          // Thử frame khác
          const newTime = Math.min(videoEl.duration * 0.3, 5);
          if (newTime !== videoEl.currentTime && newTime < videoEl.duration) {
            videoEl.currentTime = newTime;
            return;
          }
        }

        // Chuyển canvas thành Blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const thumbUrl = URL.createObjectURL(blob);
              resolve({ thumbUrl, videoUrl });
            } else {
              reject(new Error("Không thể tạo blob từ canvas."));
              URL.revokeObjectURL(videoUrl);
            }
          },
          "image/jpeg",
          0.8
        );
      } catch (error) {
        clearTimeout(timeout);
        reject(new Error("Lỗi khi xử lý frame: " + error.message));
        URL.revokeObjectURL(videoUrl);
      }
    });

    videoEl.addEventListener("error", (e) => {
      clearTimeout(timeout);
      console.error("Video error:", e);
      reject(
        new Error(
          "Lỗi khi load video. File có thể bị hỏng hoặc không được hỗ trợ."
        )
      );
      URL.revokeObjectURL(videoUrl);
    });

    // Cấu hình video element
    videoEl.crossOrigin = "anonymous"; // Thêm này nếu cần thiết
    videoEl.src = videoUrl;
    videoEl.muted = true;
    videoEl.playsInline = true;
    videoEl.preload = "metadata";

    // Force load
    videoEl.load();
  });
};

export default function VideoUpload({ onVideoSelect, initialUrl }) {
  const fileInputRef = useRef(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [statusText, setStatusText] = useState("Tải video bài học ở đây");

  const handleButtonClick = () => fileInputRef.current.click();

  React.useEffect(() => {
    if (initialUrl) {
      setStatusText("Video đã được tải lên");
    }
  }, [initialUrl]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Kiểm tra file type
    if (!file.type.startsWith("video/")) {
      setStatusText("Vui lòng chọn file video hợp lệ");
      return;
    }

    // Reset trạng thái
    if (thumbnail) {
      URL.revokeObjectURL(thumbnail);
      setThumbnail(null);
    }

    setUploading(true);
    setStatusText("Đang tạo thumbnail...");

    let videoUrlToRevoke = null;
    let thumbUrlToRevoke = null;

    try {
      // Tạo thumbnail
      const { thumbUrl, videoUrl: localVideoUrl } = await generateThumbnail(
        file
      );
      videoUrlToRevoke = localVideoUrl;
      thumbUrlToRevoke = thumbUrl;

      setThumbnail(thumbUrl);
      setStatusText("Đang upload video...");

      // Upload lên Firebase
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error("Vui lòng đăng nhập trước khi upload");
      }

      const downloadUrl = await uploadVideo(file, userId);
      onVideoSelect?.(downloadUrl);
      setStatusText("Upload thành công!");
    } catch (err) {
      console.error("Lỗi trong quá trình xử lý video:", err);
      setStatusText("Lỗi: " + err.message);

      // Cleanup nếu có lỗi
      if (thumbUrlToRevoke) {
        URL.revokeObjectURL(thumbUrlToRevoke);
        setThumbnail(null);
      }
    } finally {
      // Cleanup video URL
      if (videoUrlToRevoke) {
        URL.revokeObjectURL(videoUrlToRevoke);
      }
      setUploading(false);
    }
  };

  // Cleanup khi component unmount
  React.useEffect(() => {
    return () => {
      if (thumbnail) {
        URL.revokeObjectURL(thumbnail);
      }
    };
  }, [thumbnail]);

  return (
    <div className={cx("container")}>
      <div className={cx("thumbnail")}>
        {thumbnail ? (
          <img
            src={thumbnail}
            alt="Video thumbnail"
            className={cx("thumbImg")}
            onError={() => {
              console.error("Thumbnail failed to load");
              setStatusText("Lỗi hiển thị thumbnail");
            }}
          />
        ) : (
          <FiPlay className={cx("playIcon")} />
        )}
      </div>
      <div className={cx("content")}>
        <p className={cx("uploadText")}>{statusText}</p>
        <button
          type="button"
          className={cx("btn")}
          onClick={handleButtonClick}
          disabled={uploading}
        >
          {uploading ? "Đang xử lý..." : "Chọn video"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/mp4,video/webm,video/ogg,video/avi,video/mov"
          className={cx("fileInput")}
          onChange={handleFileChange}
          onClick={(e) => (e.target.value = null)}
        />
      </div>
    </div>
  );
}
