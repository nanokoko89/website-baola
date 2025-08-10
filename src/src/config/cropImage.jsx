// src/utils/cropImage.js

/**
 * Hàm getCroppedImg:
 *  - imageSrc: URL gốc của ảnh (có thể là Object URL hoặc URL bình thường)
 *  - pixelCrop: đối tượng { x, y, width, height } trả về từ react-easy-crop
 *  - rotation: độ xoay (mặc định 0)
 *
 * Hàm sẽ trả về một Promise chứa:
 *  {
 *    file: Blob (định dạng image/jpeg),
 *    url: Object URL để preview (tạo từ Blob)
 *  }
 */

export const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
  // Tạo <img> ẩn để load ảnh
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.setAttribute("crossOrigin", "anonymous"); // để không gặp lỗi CORS
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
      image.src = url;
    });

  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Tính safe area để xoay mà không bị cắt mất ảnh
  const safeArea = Math.max(image.width, image.height) * 2;
  canvas.width = safeArea;
  canvas.height = safeArea;

  // Vẽ ảnh lên canvas đã xoay
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-safeArea / 2, -safeArea / 2);
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );

  // Lấy dữ liệu pixel toàn bộ vùng safeArea
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // Thiết lập lại kích thước canvas theo khu vực cần crop
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Dán lại ImageData, dịch tọa độ để lấy đúng vùng cần crop
  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );

  // Chuyển sang Blob (image/jpeg)
  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve({
        file, // Blob (để upload lên server nếu cần)
        url: URL.createObjectURL(file), // Object URL (để preview)
      });
    }, "image/jpeg");
  });
};

// utils/cropImage.js
export function cropImageToCircle(imageUrl, size) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // nếu cần fetch từ domain khác
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      // Vẽ hình tròn và clip
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      // Tính tỷ lệ cover cho vừa khung circle
      const ratio = Math.max(size / img.width, size / img.height);
      const w = img.width * ratio;
      const h = img.height * ratio;
      const x = (size - w) / 2;
      const y = (size - h) / 2;

      ctx.drawImage(img, x, y, w, h);

      // Chuyển canvas thành blob (PNG để giữ background trong suốt)
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Canvas toBlob failed"));
        },
        "image/png",
        1
      );
    };
    img.onerror = reject;
    img.src = imageUrl;
  });
}
