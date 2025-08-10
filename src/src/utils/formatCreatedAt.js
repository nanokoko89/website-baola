/**
 * Định dạng Firestore Timestamp hoặc Date thành "D-M-YYYY lúc H:MM [sáng|chiều]".
 * @param {firebase.firestore.Timestamp|Date} ts
 * @returns {string}
 */
function formatCreatedAt(ts) {
  // Nếu là Firestore Timestamp thì chuyển sang Date
  const date = ts.toDate ? ts.toDate() : ts;

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let hours = date.getHours();
  const mins = date.getMinutes();
  // Xác định sáng/chiều
  const period = hours < 12 ? "sáng" : "chiều";
  // Chuyển giờ sang 12h
  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours -= 12;
  }
  // Đệm số phút nếu cần
  const minsStr = mins < 10 ? `0${mins}` : mins;

  return `${day}-${month}-${year} lúc ${hours}:${minsStr} ${period}`;
}

export default formatCreatedAt;
