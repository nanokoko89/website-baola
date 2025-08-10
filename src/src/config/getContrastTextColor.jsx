export default function getContrastTextColor(hex) {
  if (!hex) return "#000";
  let c = hex.replace("#", "");
  if (c.length === 3)
    c = c
      .split("")
      .map((ch) => ch + ch)
      .join("");
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;

  // Chuyển về linear RGB
  const lum = (v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);

  const L = 0.2126 * lum(r) + 0.7152 * lum(g) + 0.0722 * lum(b);

  // Contrast ratio so với trắng (#FFF) và đen (#000)
  const contrastWhite = 1.05 / (L + 0.05);
  const contrastBlack = (L + 0.05) / 0.05;

  return contrastWhite > contrastBlack ? "#fff" : "#000";
}
