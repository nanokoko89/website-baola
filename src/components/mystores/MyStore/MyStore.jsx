// src/pages/MyStore.jsx
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../config/firebase";

import classNames from "classnames/bind";
import styles from "./MyStore.module.scss";

import DraggableList from "./DraggableList";
import ThemeEdit from "./ThemeEdit";
import LoadingScreen from "../../utils/LoadingScreen";
import { previewSlides, slides } from "../../../config/others";
import getContrastTextColor from "../../../config/getContrastTextColor";
import {
  setTemplateIndex,
  setSelectedColors,
  setSelectedFont,
} from "../../../store/templateSlice";

const cx = classNames.bind(styles);

function MyStore({ mobilePreviewOpen = false, onClosePreview }) {
  // Lấy template (không thay đổi)
  const template = useSelector((state) => state.template);
  const selectedFont = useSelector((state) => state.template.selectedFont);
  const selectedColors = useSelector((state) => state.template.selectedColors);
  const dispatch = useDispatch();

  // **Bước 1**: Lấy currentUser từ Redux (đảm bảo key đúng với store của bạn)
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = "store";
  const currentTabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(currentTabParam || defaultTab);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    if (currentUser.templateIndex !== undefined)
      dispatch(setTemplateIndex(currentUser.templateIndex));
    if (currentUser.selectedColors)
      dispatch(setSelectedColors(currentUser.selectedColors));
    if (currentUser.selectedFont)
      dispatch(setSelectedFont(currentUser.selectedFont));
  }, [currentUser]);

  useEffect(() => {
    setLoading(true);
    const q = collection(db, "products");
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((item) => item.username === currentUser?.username);

        items.sort((a, b) => (a.order || 0) - (b.order || 0));

        setProducts(items);
        setLoading(false);
      },
      (error) => {
        console.error("Realtime fetch lỗi:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [currentUser]); // Thêm currentUser vào dependency để reload khi user thay đổi

  useLayoutEffect(() => {
    if (!currentTabParam) {
      setSearchParams({ tab: defaultTab }, { replace: true });
    }
  }, [currentTabParam, setSearchParams]);

  useEffect(() => {
    const updatedTab = searchParams.get("tab") || defaultTab;
    if (updatedTab !== activeTab) {
      setActiveTab(updatedTab);
    }
  }, [searchParams]);

  const handleTabClick = (tabName) => {
    setSearchParams({ tab: tabName });
  };

  // Reset theme state to user's saved values whenever the edit tab is opened
  useEffect(() => {
    if (activeTab === "edit-theme" && currentUser) {
      if (currentUser.templateIndex !== undefined)
        dispatch(setTemplateIndex(currentUser.templateIndex));
      if (currentUser.selectedColors)
        dispatch(setSelectedColors(currentUser.selectedColors));
      if (currentUser.selectedFont)
        dispatch(setSelectedFont(currentUser.selectedFont));
    }
  }, [activeTab]);

  // Determine preview settings based on active tab
  const previewIndex =
    activeTab === "store"
      ? currentUser?.templateIndex ?? template.templateIndex
      : template.templateIndex;

  const previewFont =
    activeTab === "store"
      ? currentUser?.selectedFont || selectedFont
      : selectedFont;

  const previewColors =
    activeTab === "store"
      ? currentUser?.selectedColors || slides[previewIndex].colors
      : selectedColors || slides[previewIndex].colors;

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className={cx("container")}>
      <div className={cx("tab-header")}>
        <button
          className={cx("tab-button", { active: activeTab === "store" })}
          onClick={() => handleTabClick("store")}
        >
          Cửa hàng
        </button>
        <button
          className={cx("tab-button", { active: activeTab === "edit-theme" })}
          onClick={() => handleTabClick("edit-theme")}
        >
          Đổi giao diện
        </button>
      </div>

      <div className={cx("content")}>
        <div className={cx("tabsContent")}>
          {activeTab === "store" && (
            <DraggableList products={products} setProducts={setProducts} />
          )}
          {activeTab === "edit-theme" && <ThemeEdit slides={slides} />}
        </div>

        <div className={cx("preview", { open: mobilePreviewOpen })}>
          <button className={cx("closeBtn")} onClick={onClosePreview}>
            ×
          </button>
          <div
            className={cx("previewFrame")}
            style={{
              "--template-font-family": `'${previewFont}', sans-serif`,
              "--template-color-primary": previewColors.primary,
              "--template-color-secondary": previewColors.secondary,
              "--template-text-color": getContrastTextColor(
                previewColors.secondary
              ),
              "--template-button-text-color": getContrastTextColor(
                previewColors.primary
              ),
              background: `linear-gradient(
    var(--template-color-primary),
    var(--template-color-secondary)
  )`,
            }}
          >
            {React.createElement(previewSlides[previewIndex].Component, {
              disableClick: true,
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyStore;
