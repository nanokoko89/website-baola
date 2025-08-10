export const WEEK_DAYS = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
];

function parseTime(str) {
  const [h, m] = str.split(":").map(Number);
  return h * 60 + m;
}

function formatTime(mins) {
  const h = Math.floor(mins / 60)
    .toString()
    .padStart(2, "0");
  const m = (mins % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

function dateToString(date) {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getDateTime(date, minutes) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return new Date(d.getTime() + minutes * 60000);
}

function hasConflict(start, duration, bookings) {
  const end = start.getTime() + duration * 60000;
  return bookings.some((b) => {
    const bStart = new Date(b.start).getTime();
    const bEnd = new Date(b.end).getTime();
    return Math.max(bStart, start.getTime()) < Math.min(bEnd, end);
  });
}

export function generateBookingSlots(config = {}, bookings = []) {
  const duration = parseInt(String(config.time).match(/\d+/)?.[0] || "0", 10);
  const blockBefore = parseInt(
    String(config.breakBeforeMeeting).match(/\d+/)?.[0] || "0",
    10
  );
  const blockAfter = parseInt(
    String(config.breakAfterMeeting).match(/\d+/)?.[0] || "0",
    10
  );
  const preventHours = parseInt(
    String(config.preventTime).match(/\d+/)?.[0] || "0",
    10
  );
  const inNext = parseInt(config.inNext, 10) || 0;
  const now = new Date();
  const earliest = new Date(now.getTime() + preventHours * 60 * 60 * 1000);
  const result = [];

  for (let i = 0; i < inNext; i++) {
    const day = new Date();
    day.setDate(day.getDate() + i);
    const dayName = WEEK_DAYS[day.getDay()];
    const intervals = (config.slots && config.slots[dayName]) || [];
    const times = [];
    intervals.forEach(({ from, to }) => {
      let startMin = parseTime(from);
      const endMin = parseTime(to);
      while (startMin + duration <= endMin) {
        const startDate = getDateTime(day, startMin);
        if (
          startDate >= earliest &&
          !hasConflict(startDate, duration, bookings)
        ) {
          times.push(formatTime(startMin));
        }
        startMin += duration + blockBefore + blockAfter;
      }
    });
    if (times.length) {
      result.push({ date: dateToString(day), slots: times });
    }
  }
  return result;
}
