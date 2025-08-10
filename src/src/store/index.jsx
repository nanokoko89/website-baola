// src/app/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

// Sử dụng `localStorage` làm storage mặc định
import storage from "redux-persist/lib/storage"; // localStorage cho web

import authReducer from "./authSlice";
import templateReducer from "./templateSlice";
import newProductReducer from "./newProductSlice";
import newCoachingCalltReducer from "./newCoachingCallSlice";
import newOnlineCourseReducer from "./newOnlineCourseSlice";

// 1. Định nghĩa persistConfig cho từng slice hoặc toàn bộ rootReducer
const authPersistConfig = {
  key: "auth", // tên namespace trong localStorage, ví dụ: "persist:auth"
  storage: storage, // sử dụng localStorage
  whitelist: ["currentUser"],
  // hoặc bạn có thể whitelist: ["currentUser"] để chỉ lưu field đó;
  // nếu để omit, thì toàn bộ state (bao gồm loading, error) sẽ được lưu lại.
  // Thường chỉ cần lưu currentUser (vì loading, error sẽ reset khi reload).
};

// 2. Kết hợp reducer
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  template: templateReducer,
  newProduct: newProductReducer,
  coachingCall: newCoachingCalltReducer,
  onlineCourse: newOnlineCourseReducer,
});

// 3. Thiết lập persistReducer cho root (nếu muốn persist nhiều slice cùng lúc)
//    Ví dụ: const rootPersistConfig = { key: "root", storage, whitelist: ["auth", "otherSlice"] };
//    const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
//    Ở đây mình đã persist riêng auth: persistReducer(authPersistConfig, authReducer).

// 4. Tạo store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Redux Persist lưu state dưới dạng JSON string, có thể gặp lỗi nếu có non-serializable value
        // Bỏ sự kiểm tra một số action type của redux-persist
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/REGISTER",
          "persist/REJECT",
          "persist/PAUSE",
        ],
      },
    }),
});

// 5. Tạo persistor
export const persistor = persistStore(store);
