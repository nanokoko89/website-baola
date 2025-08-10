import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
  serverTimestamp,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export async function fetchOrdersByUser(userId, startDate, endDate) {
  if (!userId) return [];
  const constraints = [where("sellerId", "==", userId)];
  if (startDate)
    constraints.push(where("createdAt", ">=", Timestamp.fromDate(startDate)));
  if (endDate)
    constraints.push(where("createdAt", "<=", Timestamp.fromDate(endDate)));
  const q = query(collection(db, "orders"), ...constraints);

  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export function subscribeOrdersByUser(userId, startDate, endDate, callback) {
  if (!userId) return () => {};
  const constraints = [where("sellerId", "==", userId)];
  if (startDate)
    constraints.push(where("createdAt", ">=", Timestamp.fromDate(startDate)));
  if (endDate)
    constraints.push(where("createdAt", "<=", Timestamp.fromDate(endDate)));
  const q = query(collection(db, "orders"), ...constraints);
  const unsubscribe = onSnapshot(
    q,
    (snap) => {
      const items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      callback(items);
    },
    (err) => console.error("Realtime fetch orders error:", err)
  );
  return unsubscribe;
}

export async function createOrder(data) {
  const ordersCol = collection(db, "orders");
  const docRef = await addDoc(ordersCol, {
    ...data,
    status: data.status || "pending",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateOrderStatus(orderId, status) {
  const docRef = doc(db, "orders", orderId);
  await updateDoc(docRef, { status });
}

export function subscribeOrder(orderId, callback) {
  if (!orderId) return () => {};
  const docRef = doc(db, "orders", orderId);
  const unsubscribe = onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        callback({ id: snap.id, ...snap.data() });
      }
    },
    (err) => console.error("Realtime fetch order error:", err)
  );
  return unsubscribe;
}

export function groupRevenueByDate(orders) {
  const map = {};
  orders.forEach((ord) => {
    const ts =
      ord.createdAt && ord.createdAt.seconds
        ? new Date(ord.createdAt.seconds * 1000)
        : new Date(ord.createdAt || Date.now());
    const label = ts.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "short",
    });
    map[label] = (map[label] || 0) + (ord.amount || 0);
  });
  return Object.keys(map)
    .sort((a, b) => new Date(a) - new Date(b))
    .map((date) => ({ date, revenue: map[date] }));
}

export function groupOrdersByDate(orders) {
  const map = {};
  orders.forEach((ord) => {
    const ts =
      ord.createdAt && ord.createdAt.seconds
        ? new Date(ord.createdAt.seconds * 1000)
        : new Date(ord.createdAt || Date.now());
    const label = ts.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "short",
    });
    map[label] = (map[label] || 0) + 1;
  });
  return Object.keys(map)
    .sort((a, b) => new Date(a) - new Date(b))
    .map((date) => ({ date, value: map[date] }));
}

export async function hasUserPurchasedProduct(userId, productId) {
  if (!userId || !productId) return false;
  const q = query(
    collection(db, "orders"),
    where("buyerId", "==", userId),
    where("productId", "==", productId),
    where("status", "==", "paid")
  );
  const snap = await getDocs(q);
  return !snap.empty;
}
