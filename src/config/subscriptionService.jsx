import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export async function fetchSubscriptionByUser(userId) {
  if (!userId) return null;

  const docRef = doc(db, "subscriptions", userId);
  const snap = await getDoc(docRef);

  if (snap.exists()) {
    return { id: snap.id, ...snap.data() };
  }
  // Nếu chưa có document subscription cho user, tạo mặc định gói "creator"
  const defaultData = {
    planId: "creator",
    period: "monthly",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await setDoc(docRef, defaultData, { merge: true });
  return { id: docRef.id, ...defaultData };
}

export async function fetchInvoicesByUser(userId) {
  if (!userId) return [];
  const q = query(collection(db, "invoices"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function fetchPlans() {
  const snap = await getDocs(collection(db, "plans"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function fetchPlanById(planId) {
  if (!planId) return null;

  // Tạo truy vấn: tìm document trong collection "plans"
  // có trường "id" bằng giá trị planId truyền vào
  const q = query(collection(db, "plans"), where("id", "==", planId));

  // Thực thi truy vấn
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  // Lấy document đầu tiên (giả sử id là duy nhất)
  const doc = querySnapshot.docs[0];

  // Trả về object gồm firebase-generated id và dữ liệu
  return { id: doc.id, ...doc.data() };
}

export async function updateUserSubscription(
  userId,
  planId,
  period = "monthly"
) {
  if (!userId || !planId) return;
  const docRef = doc(db, "subscriptions", userId);
  await setDoc(
    docRef,
    { planId, period, updatedAt: new Date().toISOString() },
    { merge: true }
  );
}
