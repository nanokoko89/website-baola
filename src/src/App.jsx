import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";

import MyStorePage from "./pages/MyStorePage";
import MyIncome from "./pages/MyIncome";
import ProductType from "./pages/ProductType";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import { useDispatch, useSelector } from "react-redux";
import { listenAuthState, selectCurrentUser } from "./store/authSlice";
import { useEffect } from "react";
import {
  setTemplateIndex,
  setSelectedColors,
  setSelectedFont,
  resetTemplate,
} from "./store/templateSlice";
import SignupPage from "./pages/SignupPage";
import MissionPage from "./pages/MissionPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import EditProfilePage from "./pages/EditProfilePage";
import UserPage from "./pages/UserPage";
import CreateProductPage from "./pages/CreateProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import ThankYouPage from "./pages/ThankYouPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShortenerPage from "./pages/ShortenerPage";
import Course from "./pages/Course";
import TiktokShopBanner from "./components/common/TiktokShopBanner";
import ProductCreate from "./pages/ProductCreate";
import TestPage from "./pages/TestPage";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import LoadingScreen from "./components/utils/LoadingScreen";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  // Khi App mount, dispatch listenAuthState để lắng nghe Firebase Auth
  useEffect(() => {
    dispatch(listenAuthState());
    // Lưu ý: listenAuthState trả về một Promise resolve(userData hoặc null).
    // Bạn cũng có thể dispatch liên tục để lắng nghe thay đổi, nhưng call một lần khi mount là đủ.
  }, [dispatch]);

  // Đồng bộ template khi currentUser thay đổi hoặc khi logout
  useEffect(() => {
    if (currentUser) {
      dispatch(setTemplateIndex(currentUser.templateIndex ?? 0));
      if (currentUser.selectedColors) {
        dispatch(setSelectedColors(currentUser.selectedColors));
      }
      if (currentUser.selectedFont) {
        dispatch(setSelectedFont(currentUser.selectedFont));
      }
    } else {
      dispatch(resetTemplate());
    }
  }, [currentUser, dispatch]);

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                !currentUser ? <HomePage /> : <Navigate to="/mystore" replace />
              }
            />
            <Route path="/mission" element={<MissionPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/:username" element={<UserPage />} />

            <Route path="/shortener" element={<ShortenerPage />} />
            <Route path="/tiktok-banner" element={<TiktokShopBanner />} />

            <Route
              path="/dashboard"
              element={
                currentUser ? <Dashboard /> : <Navigate to="/login" replace />
              }
            />
            <Route path="/mystore" element={<MyStorePage />} />

            <Route path="/edit-profile" element={<EditProfilePage />} />

            <Route path="/income" element={<MyIncome />} />
            <Route
              path="/mystore/choose-product-type"
              element={<ProductType />}
            />
            <Route path="/course/:courseId" element={<Course />} />

            <Route
              path="/mystore/create-product/:type"
              element={<CreateProductPage />}
            />
            <Route path="/product-create" element={<ProductCreate />} />

            <Route path="/:username/:productId" element={<CheckoutPage />} />
            <Route
              path="/:username/success/:productId"
              element={<ThankYouPage />}
            />

            <Route
              path="/profile"
              element={
                currentUser ? <Profile /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/signup"
              element={
                !currentUser ? (
                  <SignupPage />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              }
            />
            <Route
              path="/login"
              element={
                !currentUser ? (
                  <LoginPage />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              }
            />
            <Route path="/quen-mat-khau" element={<ForgetPasswordPage />} />
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}

            <Route path="/test" element={<TestPage />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
