function numberWithCommas(x) {
  if (x === null || x === undefined) return x;

  // Remove any comma separators and cast to Number to drop leading zeros
  const num = Number(x.toString().replace(/,/g, ""));

  const value = isNaN(num) ? x : num;
  const parts = value.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
export default numberWithCommas;
