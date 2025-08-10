// src/firebase.jsx
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Thiết lập persistence:
// - Nếu bạn muốn dùng localStorage (giữ login ngay cả khi reload/đóng mở tab), dùng browserLocalPersistence
// - Nếu chỉ muốn lưu trong session (đóng tab thì sign-out), dùng browserSessionPersistence
// Ở ví dụ này mình sẽ mặc định dùng browserLocalPersistence cho cả dev và production.

setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.error("Không thể thiết lập browserLocalPersistence:", err);
});

// Nếu bạn có nhu cầu tách riêng dev/production, ví dụ:
// if (process.env.NODE_ENV === "development") {
//   setPersistence(auth, browserSessionPersistence); // dev chỉ giữ trong session
// } else {
//   setPersistence(auth, browserLocalPersistence);   // production dùng localStorage
// }

// export const uploadImage = async (file, userId) => {
//   if (!file || !userId) {
//     console.warn("Thiếu file hoặc userId khi upload");
//     return null;
//   }

//   try {
//     const storageRef = ref(storage, `photos/${userId}`);
//     const snapshot = await uploadBytes(storageRef, file);
//     const url = await getDownloadURL(snapshot.ref);
//     return url;
//   } catch (error) {
//     console.error("Lỗi khi upload ảnh:", error);
//     return null;
//   }
// };

export async function uploadImage(file, folderPath) {
  if (!file) {
    throw new Error("Không có file để upload");
  }

  // Tạo tên file kèm timestamp để tránh trùng
  const fileName = `${Date.now()}-${file.name}`;
  const fullPath = `${folderPath}/${fileName}`;

  // Tham chiếu đến Storage
  const storageRef = ref(storage, fullPath);

  // Upload file lên Storage
  const snapshot = await uploadBytes(storageRef, file);

  // Lấy URL để hiển thị hoặc lưu vào Firestore/Auth
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}

export const uploadVideo = async (file, userId) => {
  if (!file || !userId) {
    console.warn("Thiếu file hoặc userId khi upload video");
    return null;
  }
  try {
    const videoRef = ref(storage, `videos/${userId}/${file.name}`);
    const snapshot = await uploadBytes(videoRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    console.error("Lỗi khi upload video:", error);
    return null;
  }
};

// Hàm xóa product theo ID
export async function deleteProduct(productId) {
  try {
    // Tạo reference đến document cần xóa
    const productRef = doc(db, "products", productId);

    // Xóa document
    await deleteDoc(productRef);
    return { success: true, message: "Xóa product thành công" };
  } catch (error) {
    console.error("Lỗi khi xóa product:", error);
    return { success: false, error: error.message };
  }
}

// Cách sử dụng:
// deleteProduct('product-id-123');
