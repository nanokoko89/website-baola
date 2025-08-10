/**
 * Lighten a hex color by a given percentage and add 0.5 opacity
 * @param {string} hexColor - Hex color string (with or without '#')
 * @param {number} percent - Percent to lighten (0-100)
 * @returns {string} rgba color string with alpha = 0.5
 */
function lightenColorWithOpacity(hexColor, percent) {
  // Loại bỏ kí tự "#" nếu có
  let hex = hexColor.replace(/^#/, "");
  // Mở rộng 3 ký tự thành 6 ký tự
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((ch) => ch + ch)
      .join("");
  }

  // Chuyển hex thành số nguyên
  const num = parseInt(hex, 16);
  // Tách kênh R, G, B rồi tính làm sáng
  let r = (num >> 16) + Math.round((255 - (num >> 16)) * (percent / 100));
  let g =
    ((num >> 8) & 0xff) +
    Math.round((255 - ((num >> 8) & 0xff)) * (percent / 100));
  let b = (num & 0xff) + Math.round((255 - (num & 0xff)) * (percent / 100));

  // Giới hạn giá trị không vượt quá 255
  r = Math.min(255, r);
  g = Math.min(255, g);
  b = Math.min(255, b);

  // Trả về chuỗi rgba với alpha cố định 0.5
  return `rgba(${r}, ${g}, ${b}, 0.6)`;
}

export default lightenColorWithOpacity;
