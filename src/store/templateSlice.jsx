import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_FONT } from "../utils/fonts";

// Chỉ quản lý các thiết lập liên quan đến template.
// Thông tin hồ sơ (displayName, bio, ...) nằm trong authSlice.currentUser.

const initialState = {
  displayName: "Tên thương hiệu",
  templateIndex: 0,
  bio: "Viết đôi chút về bạn",
  socialLinks: [],
  selectedColors: {
    primary: "#01685F",
    secondary: "#FFFFFF",
  },
  selectedFont: DEFAULT_FONT,
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setTemplateIndex: (state, action) => {
      state.templateIndex = action.payload;
    },
    setDisplayName: (state, action) => {
      state.displayName = action.payload;
    },
    setBio: (state, action) => {
      state.bio = action.payload;
    },
    setSelectedColors: (state, action) => {
      state.selectedColors = action.payload;
    },
    setSelectedFont: (state, action) => {
      state.selectedFont = action.payload;
    },
    resetTemplate: () => initialState,
  },
});

export const {
  setTemplateIndex,
  setDisplayName,
  setBio,
  setSelectedColors,
  setSelectedFont,
  resetTemplate,
} = templateSlice.actions;
export default templateSlice.reducer;
