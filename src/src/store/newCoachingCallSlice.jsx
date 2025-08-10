// File: src/store/newCoachingCallSlice.jsx

import { createSlice } from "@reduxjs/toolkit";
import { arrayMove } from "@dnd-kit/sortable";

const initialState = {
  type: "CoachingCall",
  template: {
    pickStyle: "button",
    addText: {
      title: "",
      description: "",
      buttonText: "",
    },
    imageUrl: "",
  },
  checkout: {
    imageUrl: "",
    title: "",
    description: "",
    bottomTitle: "",
    callActionButtonText: "",
    price: "",
    discount: "",
    collectInfo: {
      // Các trường động được gom chung vào một mảng
      // mỗi field: { id, type, label, required, options? }
      fields: [],
    },
  },
  availableTime: {
    place: "",
    timeZone: "",
    time: "",
    maxAttendees: null,
    preventTime: "",
    breakBeforeMeeting: "",
    breakAfterMeeting: "",
    inNext: "",
    slots: {},
  },
  options: {
    reviews: [], // { id, name, text, imageUrl, rating }
  },
};

const newCoachingCallSlice = createSlice({
  name: "coachingCall",
  initialState,
  reducers: {
    // ======== TEMPLATE ========
    setTemplatePickStyle: (state, action) => {
      state.template.pickStyle = action.payload;
    },
    setTemplateAddTextTitle: (state, action) => {
      state.template.addText.title = action.payload;
    },
    setTemplateAddTextDescription: (state, action) => {
      state.template.addText.description = action.payload;
    },
    setTemplateAddTextButtonText: (state, action) => {
      state.template.addText.buttonText = action.payload;
    },
    setTemplateImageUrl: (state, action) => {
      state.template.imageUrl = action.payload;
    },

    // ======== CHECKOUT ========
    setCheckoutImageUrl: (state, action) => {
      state.checkout.imageUrl = action.payload;
    },
    setCheckoutTitle: (state, action) => {
      state.checkout.title = action.payload;
    },
    setCheckoutDescription: (state, action) => {
      state.checkout.description = action.payload;
    },
    setCheckoutBottomTitle: (state, action) => {
      state.checkout.bottomTitle = action.payload;
    },
    setCheckoutCallActionButtonText: (state, action) => {
      state.checkout.callActionButtonText = action.payload;
    },
    setCheckoutPrice: (state, action) => {
      state.checkout.price = action.payload;
    },
    setCheckoutDiscount: (state, action) => {
      state.checkout.discount = action.payload;
    },

    // ======== COLLECT INFO (các trường động) ========
    addCollectField: (state, action) => {
      // action.payload = { id, type }
      // type ∈ ["text", "dropdown", "checkboxes", "multiple"]
      const { id, type } = action.payload;
      let options = [];
      if (type === "dropdown" || type === "checkboxes" || type === "multiple") {
        options = ["", ""]; // mặc định 2 ô trống
      }
      const order = state.checkout.collectInfo.fields.length;
      state.checkout.collectInfo.fields.push({
        id,
        type,
        label: "",
        required: false,
        options,
        order,
      });
    },
    updateCollectFieldLabel: (state, action) => {
      // action.payload = { id, label }
      const idx = state.checkout.collectInfo.fields.findIndex(
        (f) => f.id === action.payload.id
      );
      if (idx !== -1) {
        state.checkout.collectInfo.fields[idx].label = action.payload.label;
      }
    },
    updateCollectFieldRequired: (state, action) => {
      // action.payload = { id, required }
      const idx = state.checkout.collectInfo.fields.findIndex(
        (f) => f.id === action.payload.id
      );
      if (idx !== -1) {
        state.checkout.collectInfo.fields[idx].required =
          action.payload.required;
      }
    },
    removeCollectField: (state, action) => {
      // action.payload = id
      state.checkout.collectInfo.fields =
        state.checkout.collectInfo.fields.filter(
          (f) => f.id !== action.payload
        );
      state.checkout.collectInfo.fields.forEach((f, idx) => {
        f.order = idx;
      });
    },
    addCollectFieldOption: (state, action) => {
      // action.payload = { id }
      const idx = state.checkout.collectInfo.fields.findIndex(
        (f) => f.id === action.payload.id
      );
      if (idx !== -1) {
        state.checkout.collectInfo.fields[idx].options.push("");
      }
    },
    updateCollectFieldOption: (state, action) => {
      // action.payload = { id, optionIndex, value }
      const { id, optionIndex, value } = action.payload;
      const idx = state.checkout.collectInfo.fields.findIndex(
        (f) => f.id === id
      );
      if (idx !== -1) {
        state.checkout.collectInfo.fields[idx].options[optionIndex] = value;
      }
    },
    removeCollectFieldOption: (state, action) => {
      // action.payload = { id, optionIndex }
      const { id, optionIndex } = action.payload;
      const idx = state.checkout.collectInfo.fields.findIndex(
        (f) => f.id === id
      );
      if (idx !== -1) {
        state.checkout.collectInfo.fields[idx].options.splice(optionIndex, 1);
      }
    },
    reorderCollectFields: (state, action) => {
      // action.payload = { oldIndex, newIndex }
      const { oldIndex, newIndex } = action.payload;
      state.checkout.collectInfo.fields = arrayMove(
        state.checkout.collectInfo.fields,
        oldIndex,
        newIndex
      );
      state.checkout.collectInfo.fields.forEach((f, idx) => {
        f.order = idx;
      });
    },

    // ======== AVAILABLE TIME ========
    setAvailablePlace: (state, action) => {
      state.availableTime.place = action.payload;
    },
    setAvailableTimeZone: (state, action) => {
      state.availableTime.timeZone = action.payload;
    },
    setAvailableDuration: (state, action) => {
      state.availableTime.time = action.payload;
    },
    setAvailableMaxAttendees: (state, action) => {
      state.availableTime.maxAttendees = action.payload;
    },
    setPreventTime: (state, action) => {
      state.availableTime.preventTime = action.payload;
    },
    setBreakBeforeMeeting: (state, action) => {
      state.availableTime.breakBeforeMeeting = action.payload;
    },
    setBreakAfterMeeting: (state, action) => {
      state.availableTime.breakAfterMeeting = action.payload;
    },
    setInNext: (state, action) => {
      state.availableTime.inNext = action.payload;
    },

    setAvailableSlots: (state, action) => {
      state.availableTime.slots = action.payload;
    },

    // ======== REVIEWS ========
    addReview: (state, action) => {
      // action.payload = { id, name, text, imageUrl, rating }
      state.options.reviews.push(action.payload);
    },
    removeReview: (state, action) => {
      // action.payload = id
      state.options.reviews = state.options.reviews.filter(
        (r) => r.id !== action.payload
      );
    },
    updateReview: (state, action) => {
      // action.payload = { id, name?, text?, imageUrl?, rating? }
      const idx = state.options.reviews.findIndex(
        (r) => r.id === action.payload.id
      );
      if (idx !== -1) {
        const review = state.options.reviews[idx];
        if (action.payload.name !== undefined)
          review.name = action.payload.name;
        if (action.payload.text !== undefined)
          review.text = action.payload.text;
        if (action.payload.imageUrl !== undefined)
          review.imageUrl = action.payload.imageUrl;
        if (action.payload.rating !== undefined)
          review.rating = action.payload.rating;
      }
    },
    // ======== SET EXISTING ========
    setExistingProduct: (state, action) => {
      const product = action.payload;
      const fields = product?.checkout?.collectInfo?.fields;
      if (Array.isArray(fields)) {
        fields.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      }
      return product;
    },
    // ======== RESET ========
    resetNewProduct: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setTemplatePickStyle,
  setTemplateAddTextTitle,
  setTemplateAddTextDescription,
  setTemplateAddTextButtonText,
  setTemplateImageUrl,
  setCheckoutImageUrl,
  setCheckoutTitle,
  setCheckoutDescription,
  setCheckoutBottomTitle,
  setCheckoutCallActionButtonText,
  setCheckoutPrice,
  setCheckoutDiscount,
  addCollectField,
  updateCollectFieldLabel,
  updateCollectFieldRequired,
  removeCollectField,
  addCollectFieldOption,
  updateCollectFieldOption,
  removeCollectFieldOption,
  reorderCollectFields,
  setAvailablePlace,
  setAvailableTimeZone,
  setAvailableDuration,
  setAvailableMaxAttendees,
  setPreventTime,
  setBreakBeforeMeeting,
  setBreakAfterMeeting,
  setInNext,
  setAvailableSlots,
  addReview,
  removeReview,
  updateReview,
  setExistingProduct,
  resetNewProduct,
} = newCoachingCallSlice.actions;

export default newCoachingCallSlice.reducer;

export const initializeCoachingCall = () => (dispatch, getState) => {
  const state = getState().coachingCall;
  if (!state.template.addText.title)
    dispatch(setTemplateAddTextTitle("Tiêu đề cuộc gọi 1:1"));
  if (!state.template.addText.description)
    dispatch(
      setTemplateAddTextDescription("Mô tả ngắn gọn cho cuộc gọi của bạn")
    );
  if (!state.template.addText.buttonText)
    dispatch(setTemplateAddTextButtonText("Đặt lịch ngay"));

  if (!state.checkout.title) dispatch(setCheckoutTitle("Thanh toán cuộc gọi"));
  if (!state.checkout.description)
    dispatch(setCheckoutDescription("Chi tiết về cuộc gọi và giá dịch vụ"));
  if (!state.checkout.bottomTitle)
    dispatch(setCheckoutBottomTitle("Thông tin liên hệ"));
  if (!state.checkout.callActionButtonText)
    dispatch(setCheckoutCallActionButtonText("Thanh toán"));
  if (!state.checkout.price && state.checkout.price !== 0)
    dispatch(setCheckoutPrice("100000"));
  if (state.checkout.discount === undefined) dispatch(setCheckoutDiscount("0"));

  if (!state.availableTime.place) dispatch(setAvailablePlace("google_meet"));
  if (!state.availableTime.timeZone) dispatch(setAvailableTimeZone("UTC+7"));
  if (!state.availableTime.time) dispatch(setAvailableDuration("30 phút"));
  if (!state.availableTime.maxAttendees) dispatch(setAvailableMaxAttendees(1));
  if (!state.availableTime.preventTime) dispatch(setPreventTime(""));
  if (!state.availableTime.breakBeforeMeeting)
    dispatch(setBreakBeforeMeeting(""));
  if (!state.availableTime.breakAfterMeeting)
    dispatch(setBreakAfterMeeting(""));
  if (!state.availableTime.inNext) dispatch(setInNext("60"));
  if (
    !state.availableTime.slots ||
    Object.keys(state.availableTime.slots).length === 0
  ) {
    dispatch(
      setAvailableSlots({
        "Thứ hai": [{ from: "09:00", to: "17:00" }],
        "Thứ ba": [{ from: "09:00", to: "17:00" }],
        "Thứ tư": [{ from: "09:00", to: "17:00" }],
        "Thứ năm": [{ from: "09:00", to: "17:00" }],
        "Thứ sáu": [{ from: "09:00", to: "17:00" }],
        "Thứ bảy": [],
        "Chủ nhật": [],
      })
    );
  }
};
