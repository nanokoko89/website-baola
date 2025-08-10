// src/store/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DEFAULT_FONT } from "../utils/fonts";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";

// --- Thunk: signupWithEmail (tạo user mới và lưu thêm profile vào Firestore)
export const signupWithEmail = createAsyncThunk(
  "auth/signupWithEmail",
  async (
    { username, fullName, email, phone, password },
    { rejectWithValue }
  ) => {
    try {
      // Kiểm tra trùng lặp username trong Firestore
      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        return rejectWithValue("Username này đã được sử dụng.");
      }

      // 1. Tạo user trên Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 2. Cập nhật displayName = fullName
      await updateProfile(user, { displayName: fullName });

      // 3. Lưu thêm thông tin vào Firestore collection "users"
      await setDoc(doc(db, "users", user.uid), {
        username,
        fullName,
        displayName: fullName,
        email,
        phone,
        avatarURL: null,
        socialLinks: {},
        visitCount: 0,
        paymentVerified: false,
        paymentMethod: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        selectedColors: {
          primary: "#F4D5E5",
          secondary: "#D7E2FC",
        },
        selectedFont: DEFAULT_FONT,
      });

      // 4. Trả về dữ liệu user (bao gồm username nếu cần)
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber || null,
        username,
      };
    } catch (err) {
      let message = "Đã có lỗi xảy ra khi signup.";
      if (err.code === "auth/email-already-in-use") {
        message = "Email này đã được sử dụng.";
      } else if (err.code === "auth/weak-password") {
        message = "Mật khẩu quá yếu (ít nhất 6 ký tự).";
      } else if (err.code === "auth/invalid-email") {
        message = "Email không hợp lệ.";
      } else if (err.code === "auth/too-many-requests") {
        message =
          "Bạn đã thực hiện thao tác quá nhiều lần. Vui lòng thử lại sau.";
      } else if (err.code === "auth/operation-not-allowed") {
        message = "Phương thức đăng ký bằng Email/Password đang bị tắt.";
      }
      return rejectWithValue(message);
    }
  }
);

// --- Thunk: loginWithEmail (đăng nhập bằng email + password)
export const loginWithEmail = createAsyncThunk(
  "auth/loginWithEmail",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Đăng nhập với Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Lấy thêm document trong Firestore để có username
      const userDocSnap = await getDoc(doc(db, "users", user.uid));
      const username = userDocSnap.exists()
        ? userDocSnap.data().username || ""
        : "";

      // Trả về thông tin cần thiết (bao gồm username)
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber || null,
        username,
      };
    } catch (err) {
      console.log(err.code);
      let message = "Đã có lỗi khi đăng nhập.";
      if (err.code === "auth/user-not-found") {
        message = "Email chưa đăng ký tài khoản.";
      } else if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        message = "Email hoặc mật khẩu không đúng.";
      } else if (err.code === "auth/invalid-email") {
        message = "Email không hợp lệ.";
      } else if (err.code === "auth/user-disabled") {
        message = "Tài khoản đã bị vô hiệu hóa.";
      } else if (err.code === "auth/too-many-requests") {
        message =
          "Bạn đã đăng nhập sai quá nhiều lần. Vui lòng thử lại sau hoặc đặt lại mật khẩu.";
      } else if (err.code === "auth/network-request-failed") {
        message = "Lỗi kết nối internet. Vui lòng kiểm tra kết nối.";
      }
      return rejectWithValue(message);
    }
  }
);

// --- Thunk: logoutUser (đăng xuất)
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return true;
    } catch (err) {
      console.error(err);
      return rejectWithValue("Không thể đăng xuất.");
    }
  }
);

// --- Thunk: listenAuthState (lắng nghe Auth và realtime Firestore)
export const listenAuthState = createAsyncThunk(
  "auth/listenAuthState",
  async (_, { dispatch }) => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Thông tin cơ bản từ Auth
          const basicInfo = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || "",
            phoneNumber: user.phoneNumber || null,
            photoURL: user.photoURL || null,
          };

          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const docData = docSnap.data();
            const fullProfile = {
              ...basicInfo,
              username: docData.username || "",
              displayName:
                docData.displayName ||
                docData.fullName ||
                basicInfo.displayName ||
                "",
              bio: docData.bio || "",
              avatarURL: docData.avatarURL || basicInfo.photoURL || null,
              phone: docData.phone || basicInfo.phoneNumber || "",
              socialLinks: docData.socialLinks || {},
              visitCount: docData.visitCount || "",
              paymentVerified: docData.paymentVerified || false,
              paymentMethod: docData.paymentMethod || null,
              templateIndex: docData.templateIndex ?? 0,
              selectedColors: docData.selectedColors || {
                primary: "#F4D5E5",
                secondary: "#D7E2FC",
              },
              selectedFont: docData.selectedFont || DEFAULT_FONT,
            };
            resolve(fullProfile);

            // realtime cập nhật
            onSnapshot(userDocRef, (snapshot) => {
              if (snapshot.exists()) {
                const updatedData = snapshot.data();
                const updates = {
                  avatarURL:
                    updatedData.avatarURL || basicInfo.photoURL || null,
                  displayName:
                    updatedData.displayName ||
                    updatedData.fullName ||
                    basicInfo.displayName ||
                    "",
                  bio: updatedData.bio || "",
                  phone: updatedData.phone || basicInfo.phoneNumber || "",
                  socialLinks: updatedData.socialLinks || {},
                  paymentVerified: updatedData.paymentVerified || false,
                  paymentMethod: updatedData.paymentMethod || null,
                  updatedAt: updatedData.updatedAt || null,
                };
                if (updatedData.templateIndex !== undefined)
                  updates.templateIndex = updatedData.templateIndex;
                if (updatedData.selectedColors)
                  updates.selectedColors = updatedData.selectedColors;
                if (updatedData.selectedFont)
                  updates.selectedFont = updatedData.selectedFont;
                dispatch(userProfileUpdated(updates));
              }
            });
          } else {
            // Document chưa có => resolve basic + username=""
            resolve({
              ...basicInfo,
              username: "",
              displayName: basicInfo.displayName || "",
              bio: "",
              avatarURL: basicInfo.photoURL || null,
              phone: basicInfo.phoneNumber || "",
              socialLinks: {},
              paymentVerified: false,
              paymentMethod: null,
              templateIndex: 0,
              selectedColors: { primary: "#F4D5E5", secondary: "#D7E2FC" },
              selectedFont: DEFAULT_FONT,
            });

            onSnapshot(userDocRef, (snapshot) => {
              if (snapshot.exists()) {
                const updatedData = snapshot.data();
                const updates = {
                  avatarURL:
                    updatedData.avatarURL || basicInfo.photoURL || null,
                  displayName:
                    updatedData.displayName ||
                    updatedData.fullName ||
                    basicInfo.displayName ||
                    "",
                  bio: updatedData.bio || "",
                  phone: updatedData.phone || basicInfo.phoneNumber || "",
                  socialLinks: updatedData.socialLinks || {},
                  paymentVerified: updatedData.paymentVerified || false,
                  paymentMethod: updatedData.paymentMethod || null,
                  updatedAt: updatedData.updatedAt || null,
                };
                if (updatedData.templateIndex !== undefined)
                  updates.templateIndex = updatedData.templateIndex;
                if (updatedData.selectedColors)
                  updates.selectedColors = updatedData.selectedColors;
                if (updatedData.selectedFont)
                  updates.selectedFont = updatedData.selectedFont;
                dispatch(userProfileUpdated(updates));
              }
            });
          }
        } else {
          // Chưa đăng nhập hoặc đã logout
          resolve(null);
        }
      });
    });
  }
);

// --- Slice quản lý auth + user profile
const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null, // { uid, email, displayName, phoneNumber, username, ... }
    loading: false,
    error: null,
  },
  reducers: {
    userProfileUpdated: (state, action) => {
      if (!state.currentUser) return;
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // signupWithEmail
    builder
      .addCase(signupWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(signupWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // loginWithEmail
    builder
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // logoutUser
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // listenAuthState
    builder
      .addCase(listenAuthState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listenAuthState.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(listenAuthState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { userProfileUpdated, clearAuthError } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export default authSlice.reducer;
