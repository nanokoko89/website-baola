import { useState } from "react";
import ChapterList from "../../common/ChapterList";
import CourseHomeBanner from "../../onlineCourseComponents/CourseHomeBanner";
import CourseHomepage from "../../onlineCourseComponents/CourseHomepage";
import CreateLesson from "../../onlineCourseComponents/CreateLesson";
import NumberLabel from "../../common/NumberLabel";
import ActionButtons from "../../common/ActionButtons";

const CourseComponent = ({ onContentChange, handlePublish }) => {
  const [mode, setMode] = useState("home");
  // mode: "home" | "list" | "edit"

  const [currentChapter, setCurrentChapter] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);

  const goHome = () => setMode("home");
  const goList = () => setMode("list");
  const handleEditLesson = (chapterId, lessonId) => {
    setCurrentChapter(chapterId);
    setCurrentLesson(lessonId);
    setMode("edit");
  };

  return (
    <div>
      {mode === "edit" ? (
        <CreateLesson
          onBack={goHome}
          chapterId={currentChapter}
          lessonId={currentLesson}
        />
      ) : mode === "list" ? (
        <CourseHomepage onContentChange={onContentChange} onBack={goHome} />
      ) : (
        <>
          <CourseHomeBanner onContentChange={onContentChange} onEdit={goList} />

          <NumberLabel number="2" label="Nội dung khóa học" />
          <ChapterList handleLesson={handleEditLesson} />

          <ActionButtons title="Xuất bản" handleBtn={handlePublish} deleteBtn />
        </>
      )}
    </div>
  );
};

export default CourseComponent;
