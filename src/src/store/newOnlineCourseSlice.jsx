/* File: src/store/newOnlineCourseSlice.jsx */
import { createSlice } from "@reduxjs/toolkit";
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  type: "OnlineCourse",

  // ======== TEMPLATE ========
  template: {
    pickStyle: "button",
    addText: {
      title: "",
      description: "",
      buttonText: "",
    },
    imageUrl: "",
  },

  // ======== CHECKOUT ========
  checkout: {
    imageUrl: "",
    title: "",
    description: "",
    bottomTitle: "",
    callActionButtonText: "",
    price: "",
    discount: "",
    collectInfo: { fields: [] },
  },

  // ======== COURSE ========
  course: {
    imageUrl: "",
    title: "",
    description: "",
    titleFont: "",
    backgroundColor: "",
    primaryColor: "",
    content: { chapters: [] },
  },

  // ======== OPTIONS / REVIEWS ========
  options: { reviews: [] },
};

const newOnlineCourseSlice = createSlice({
  name: "onlineCourse",
  initialState,
  reducers: {
    // TEMPLATE
    setTemplatePickStyle: (state, { payload }) => {
      state.template.pickStyle = payload;
    },
    setTemplateAddTextTitle: (state, { payload }) => {
      state.template.addText.title = payload;
    },
    setTemplateAddTextDescription: (state, { payload }) => {
      state.template.addText.description = payload;
    },
    setTemplateAddTextButtonText: (state, { payload }) => {
      state.template.addText.buttonText = payload;
    },
    setTemplateImageUrl: (state, { payload }) => {
      state.template.imageUrl = payload;
    },

    // CHECKOUT
    setCheckoutImageUrl: (state, { payload }) => {
      state.checkout.imageUrl = payload;
    },
    setCheckoutTitle: (state, { payload }) => {
      state.checkout.title = payload;
    },
    setCheckoutDescription: (state, { payload }) => {
      state.checkout.description = payload;
    },
    setCheckoutBottomTitle: (state, { payload }) => {
      state.checkout.bottomTitle = payload;
    },
    setCheckoutCallActionButtonText: (state, { payload }) => {
      state.checkout.callActionButtonText = payload;
    },
    setCheckoutPrice: (state, { payload }) => {
      state.checkout.price = payload;
    },
    setCheckoutDiscount: (state, { payload }) => {
      state.checkout.discount = payload;
    },

    // COLLECT INFO
    addCollectField: (state, { payload: { id, type } }) => {
      let options = [];
      if (["dropdown", "checkboxes", "multiple"].includes(type))
        options = ["", ""];
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
    updateCollectFieldLabel: (state, { payload: { id, label } }) => {
      const f = state.checkout.collectInfo.fields.find((x) => x.id === id);
      if (f) f.label = label;
    },
    updateCollectFieldRequired: (state, { payload: { id, required } }) => {
      const f = state.checkout.collectInfo.fields.find((x) => x.id === id);
      if (f) f.required = required;
    },
    removeCollectField: (state, { payload: id }) => {
      state.checkout.collectInfo.fields =
        state.checkout.collectInfo.fields.filter((x) => x.id !== id);
      state.checkout.collectInfo.fields.forEach((f, idx) => {
        f.order = idx;
      });
    },
    addCollectFieldOption: (state, { payload: { id } }) => {
      const f = state.checkout.collectInfo.fields.find((x) => x.id === id);
      if (f) f.options.push("");
    },
    updateCollectFieldOption: (
      state,
      { payload: { id, optionIndex, value } }
    ) => {
      const f = state.checkout.collectInfo.fields.find((x) => x.id === id);
      if (f) f.options[optionIndex] = value;
    },
    removeCollectFieldOption: (state, { payload: { id, optionIndex } }) => {
      const f = state.checkout.collectInfo.fields.find((x) => x.id === id);
      if (f) f.options.splice(optionIndex, 1);
    },
    reorderCollectFields: (state, { payload: { oldIndex, newIndex } }) => {
      state.checkout.collectInfo.fields = arrayMove(
        state.checkout.collectInfo.fields,
        oldIndex,
        newIndex
      );
      state.checkout.collectInfo.fields.forEach((f, idx) => {
        f.order = idx;
      });
    },

    // REVIEWS
    addReview: (state, { payload }) => {
      state.options.reviews.push(payload);
    },
    removeReview: (state, { payload: id }) => {
      state.options.reviews = state.options.reviews.filter((x) => x.id !== id);
    },
    updateReview: (
      state,
      { payload: { id, name, text, imageUrl, rating } }
    ) => {
      const r = state.options.reviews.find((x) => x.id === id);
      if (r) {
        if (name !== undefined) r.name = name;
        if (text !== undefined) r.text = text;
        if (imageUrl !== undefined) r.imageUrl = imageUrl;
        if (rating !== undefined) r.rating = rating;
      }
    },

    // CHAPTERS
    addChapter: (state, { payload: { id, title } }) => {
      state.course.content.chapters.push({
        id,
        title: title || `Chương ${state.course.content.chapters.length + 1}`,
        lessons: [],
        published: true,
      });
    },
    removeChapter: (state, { payload: id }) => {
      state.course.content.chapters = state.course.content.chapters.filter(
        (x) => x.id !== id
      );
    },
    reorderChapters: (state, { payload: { oldIndex, newIndex } }) => {
      state.course.content.chapters = arrayMove(
        state.course.content.chapters,
        oldIndex,
        newIndex
      );
    },
    setChapterTitle: (state, { payload: { chapterId, title } }) => {
      const c = state.course.content.chapters.find((x) => x.id === chapterId);
      if (c) c.title = title;
    },
    setChapterPublished: (state, { payload: { chapterId, published } }) => {
      const c = state.course.content.chapters.find((x) => x.id === chapterId);
      if (c) c.published = published;
    },

    // LESSONS
    addLesson: (state, { payload: { chapterId, lessonId } }) => {
      const c = state.course.content.chapters.find((x) => x.id === chapterId);
      if (c)
        c.lessons.push({
          id: lessonId,
          videoUrl: "",
          title: "",
          description: "",
          materials: [],
        });
    },
    removeLesson: (state, { payload: { chapterId, lessonId } }) => {
      const c = state.course.content.chapters.find((x) => x.id === chapterId);
      if (c) c.lessons = c.lessons.filter((x) => x.id !== lessonId);
    },

    reorderLessons: (state, { payload: { chapterId, oldIndex, newIndex } }) => {
      const c = state.course.content.chapters.find((x) => x.id === chapterId);
      if (c) c.lessons = arrayMove(c.lessons, oldIndex, newIndex);
    },
    setLessonVideo: (state, { payload: { chapterId, lessonId, videoUrl } }) => {
      const c = state.course.content.chapters.find((x) => x.id === chapterId);
      const l = c?.lessons.find((x) => x.id === lessonId);
      if (l) l.videoUrl = videoUrl;
    },
    setLessonTitle: (state, { payload: { chapterId, lessonId, title } }) => {
      const c = state.course.content.chapters.find((x) => x.id === chapterId);
      const l = c?.lessons.find((x) => x.id === lessonId);
      if (l) l.title = title;
    },
    setLessonDescription: (
      state,
      { payload: { chapterId, lessonId, description } }
    ) => {
      const c = state.course.content.chapters.find((x) => x.id === chapterId);
      const l = c?.lessons.find((x) => x.id === lessonId);
      if (l) l.description = description;
    },
    addLessonMaterial: (
      state,
      { payload: { chapterId, lessonId, material } }
    ) => {
      const c = state.course.content.chapters.find((x) => x.id === chapterId);
      const l = c?.lessons.find((x) => x.id === lessonId);
      if (l) l.materials.push(material);
    },
    removeLessonMaterial: (
      state,
      { payload: { chapterId, lessonId, index } }
    ) => {
      const c = state.course.content.chapters.find((x) => x.id === chapterId);
      const l = c?.lessons.find((x) => x.id === lessonId);
      if (l) l.materials.splice(index, 1);
    },

    // COURSE BRANDING

    setCourseImageUrl: (state, { payload }) => {
      state.course.imageUrl = payload;
    },
    setCourseTitle: (state, { payload }) => {
      state.course.title = payload;
    },
    setCourseDescription: (state, { payload }) => {
      state.course.description = payload;
    },

    setCourseTitleFont: (state, { payload }) => {
      state.course.titleFont = payload;
    },
    setCourseBackgroundColor: (state, { payload }) => {
      state.course.backgroundColor = payload;
    },
    setCoursePrimaryColor: (state, { payload }) => {
      state.course.primaryColor = payload;
    },

    // ======== SET EXISTING ========
    setExistingProduct: (state, { payload }) => {
      const product = payload;
      const fields = product?.checkout?.collectInfo?.fields;
      if (Array.isArray(fields)) {
        fields.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      }
      return product;
    },

    // RESET
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

  addReview,
  removeReview,
  updateReview,

  addChapter,
  removeChapter,
  reorderChapters,
  setChapterTitle,
  setChapterPublished,

  addLesson,
  removeLesson,
  reorderLessons,
  setLessonVideo,
  setLessonTitle,
  setLessonDescription,
  addLessonMaterial,
  removeLessonMaterial,
  setCourseImageUrl,
  setCourseTitle,
  setCourseDescription,
  setCourseTitleFont,
  setCourseBackgroundColor,
  setCoursePrimaryColor,
  setExistingProduct,
  resetNewProduct,
} = newOnlineCourseSlice.actions;

export default newOnlineCourseSlice.reducer;

export const initializeOnlineCourse = () => (dispatch, getState) => {
  const state = getState().onlineCourse;
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

  if (state.course.content.chapters.length === 0) {
    const m1 = uuidv4();
    dispatch(addChapter({ id: m1, title: "Chương 1: Giới Thiệu" }));
    const l1 = uuidv4();
    dispatch(addLesson({ chapterId: m1, lessonId: l1 }));
    dispatch(
      setLessonTitle({
        chapterId: m1,
        lessonId: l1,
        title: "Bài 1: Chào mừng",
      })
    );
    const l2 = uuidv4();
    dispatch(addLesson({ chapterId: m1, lessonId: l2 }));
    dispatch(
      setLessonTitle({
        chapterId: m1,
        lessonId: l2,
        title: "Bài 2: Tổng quan khóa học",
      })
    );
    const m2 = uuidv4();
    dispatch(addChapter({ id: m2, title: "Chương 2: Chủ đề 1" }));
    const m3 = uuidv4();
    dispatch(addChapter({ id: m3, title: "Chương 3: Chủ đề 2" }));
  }

  if (!state.course.title) {
    dispatch(
      setCourseImageUrl(
        "https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg"
      )
    );
    dispatch(setCourseTitle("Chương Trình 12 tuần của tôi"));
    dispatch(
      setCourseDescription(
        `<p>Tóm tắt khóa học để giải thích về khóa học của bạn. </p>\n<ul>\n  <li>Take advantage of bullets to</li>\n  <li>List what they will learn</li>\n  <li>List what important changes it will drive</li>\n  <li>List how it will make their life better</li>\n</ul>`
      )
    );
    dispatch(setCourseTitleFont("Mặc định"));
    dispatch(setCourseBackgroundColor("#FFFFFF"));
    dispatch(setCoursePrimaryColor("#000000"));
  }
};
