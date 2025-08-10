import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";

export async function logVisit(userId, type) {
  try {
    await addDoc(collection(db, "visitLogs"), {
      userId,
      type,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Failed to log visit", err);
  }
}

export async function fetchVisitLogsByUser(userId, startDate, endDate) {
  if (!userId) return [];
  const constraints = [where("userId", "==", userId)];
  if (startDate)
    constraints.push(where("createdAt", ">=", Timestamp.fromDate(startDate)));
  if (endDate)
    constraints.push(where("createdAt", "<=", Timestamp.fromDate(endDate)));
  const q = query(collection(db, "visitLogs"), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export function subscribeVisitLogsByUser(userId, startDate, endDate, callback) {
  if (!userId) return () => {};
  const constraints = [where("userId", "==", userId)];
  if (startDate)
    constraints.push(where("createdAt", ">=", Timestamp.fromDate(startDate)));
  if (endDate)
    constraints.push(where("createdAt", "<=", Timestamp.fromDate(endDate)));
  const q = query(collection(db, "visitLogs"), ...constraints);
  const unsubscribe = onSnapshot(
    q,
    (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      callback(items);
    },
    (err) => console.error("Realtime fetch visits error:", err)
  );
  return unsubscribe;
}

export function groupVisitsByDate(logs) {
  const map = {};
  logs.forEach((log) => {
    const ts =
      log.createdAt && log.createdAt.seconds
        ? new Date(log.createdAt.seconds * 1000)
        : new Date(log.createdAt || Date.now());
    const iso = ts.toISOString().split("T")[0];
    map[iso] = (map[iso] || 0) + 1;
  });
  return Object.keys(map)
    .sort()
    .map((date) => ({
      date: new Date(date).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "short",
      }),
      value: map[date],
    }));
}
