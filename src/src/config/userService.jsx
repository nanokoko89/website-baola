// src/services/userService.js

import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebase";

/**
 * Cập nhật socialLinks cho user
 * @param {string} uid - UID của user
 * @param {object} socialLinksObj - Ví dụ: { facebook: "...", linkedin: "..." }
 */
export async function updateSocialLinks(uid, socialLinksObj) {
  const userDocRef = doc(db, "users", uid);
  await setDoc(
    userDocRef,
    {
      socialLinks: socialLinksObj,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

/**
 * Cập nhật paymentVerified cho user
 * @param {string} uid - UID của user
 * @param {boolean} isVerified
 */
export async function updatePaymentVerified(uid, isVerified) {
  const userDocRef = doc(db, "users", uid);
  await setDoc(
    userDocRef,
    {
      paymentVerified: isVerified,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

/**
 * Cập nhật method thanh toán (paymentMethod) cho user
 * @param {string} uid - UID của user
 * @param {object} paymentMethodObj - Ví dụ: { type: "stripe", customerId: "cus_ABC123" }
 */
export async function updatePaymentMethod(uid, paymentMethodObj) {
  const userDocRef = doc(db, "users", uid);
  await setDoc(
    userDocRef,
    {
      paymentMethod: paymentMethodObj,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

/**
 * Lấy tổng số lượt xem trang checkout cho tất cả sản phẩm của một username
 * @param {string} username
 * @returns {Promise<number>}
 */
export async function fetchCheckoutViewsByUsername(username) {
  if (!username) return 0;
  const q = query(
    collection(db, "products"),
    where("username", "==", username)
  );
  const snap = await getDocs(q);
  return snap.docs.reduce(
    (total, docSnap) => total + (docSnap.data().checkoutViewCount || 0),
    0
  );
}
