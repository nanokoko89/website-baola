import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLessonVideo,
  setLessonTitle,
  setLessonDescription,
} from "../../../store/newOnlineCourseSlice";
import VideoUpload from "../../common/VideoUpload";
import SupportingMaterialsUpload from "../../common/SupportingMaterialsUpload";
import { IoArrowBackOutline } from "react-icons/io5";
import CustomLabelInput from "../../common/CustomLabelInput";
import NumberLabel from "../../common/NumberLabel";
import DescriptionCard from "../../common/DescriptionCard";

function CreateLesson({ onBack, chapterId, lessonId }) {
  const dispatch = useDispatch();

  const lesson = useSelector((state) => {
    const chapter = state.onlineCourse.course.content.chapters.find(
      (c) => c.id === chapterId
    );
    return chapter?.lessons.find((l) => l.id === lessonId);
  });

  const handleVideoSelect = (url) => {
    if (chapterId && lessonId) {
      dispatch(setLessonVideo({ chapterId, lessonId, videoUrl: url }));
    }
  };

  const handleTitleChange = (val) => {
    dispatch(setLessonTitle({ chapterId, lessonId, title: val }));
  };

  const handleDescChange = (val) => {
    dispatch(setLessonDescription({ chapterId, lessonId, description: val }));
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div
        onClick={onBack}
        style={{
          marginBottom: "32px",
          fontSize: "24px",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <IoArrowBackOutline />{" "}
        <span style={{ marginLeft: "8px" }}>Trở về khóa học</span>
      </div>
      <div style={{ marginBottom: "32px" }}>
        <VideoUpload
          onVideoSelect={handleVideoSelect}
          initialUrl={lesson?.videoUrl}
        />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <CustomLabelInput
          label="Tên bài học"
          maxLength={50}
          value={lesson?.title || ""}
          onChange={handleTitleChange}
        />
      </div>
      <DescriptionCard
        isCoachingCall
        title="Mô tả bài học"
        onContentChange={handleDescChange}
        description={lesson?.description || ""}
      />
      <SupportingMaterialsUpload />
    </div>
  );
}

export default CreateLesson;
