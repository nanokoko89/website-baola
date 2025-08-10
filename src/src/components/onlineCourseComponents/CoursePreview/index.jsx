import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./CoursePreview.module.scss";
import CourseSidebar from "../CourseSidebar";
import getContrastTextColor from "../../../config/getContrastTextColor";
import lightenColorWithOpacity from "../../../utils/lightenColorWithOpacity";
import { LuMenu } from "react-icons/lu";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

const cx = classNames.bind(styles);

export default function CoursePreview({ product = {} }) {
  const course = product.course || {};
  const modules = (course.content?.chapters || []).filter(
    (c) => c.published !== false
  );
  const modulesWithProgress = modules.map((m) => {
    const lessons = m.lessons.map((l) => ({
      ...l,
      completed: l.completed || false,
    }));
    const completedCount = lessons.filter((l) => l.completed).length;
    const moduleProgress = lessons.length
      ? Math.floor((completedCount / lessons.length) * 100)
      : 0;
    return {
      ...m,
      lessons,
      completed: moduleProgress === 100,
      progress: `${moduleProgress}%`,
    };
  });

  const allLessons = modulesWithProgress.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleId: m.id }))
  );

  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentLesson =
    allLessons.find((l) => l.id === currentLessonId) || null;
  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter((l) => l.completed).length;
  const progress = totalLessons
    ? Math.floor((completedLessons / totalLessons) * 100)
    : 0;

  const handleLessonClick = (id) => {
    setCurrentLessonId(id);
    setSidebarOpen(false);
  };

  const goCourseHome = () => {
    setCurrentLessonId(null);
    setSidebarOpen(false);
  };

  const currentIndex = currentLesson
    ? allLessons.findIndex((l) => l.id === currentLesson.id)
    : -1;
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;

  const colors = {
    primary: course.primaryColor || "#0f766e",
    secondary: course.backgroundColor || "#ffffff",
  };

  const sidebarBackground = lightenColorWithOpacity(colors.primary, 90);
  const textColor = getContrastTextColor(colors.secondary);
  const buttonTextColor = getContrastTextColor(colors.primary);

  const styleVars = {
    "--template-font-family": course.titleFont
      ? `'${course.titleFont}', sans-serif`
      : undefined,
    "--template-color-primary": colors.primary,
    "--template-color-secondary": colors.secondary,
    "--sidebar-background": sidebarBackground,
    "--template-text-color": textColor,
    "--template-button-text-color": buttonTextColor,
  };

  const isLessonView = Boolean(currentLesson);

  return (
    <div className={cx("wrapper")} style={styleVars}>
      <div className={cx("container")}>
        <div className={cx("mainContent")}>
          {isLessonView ? (
            <>
              <div className={cx("videoSection")}>
                <div className={cx("videoContainer")}>
                  <video
                    key={currentLesson.id}
                    className={cx("videoFrame")}
                    src={currentLesson.videoUrl}
                    controls
                  />
                </div>
              </div>
              <div className={cx("lessonContent")}>
                <h1 className={cx("lessonTitle")}>{currentLesson.title}</h1>
                {currentLesson.description && (
                  <div
                    className={cx("lessonText")}
                    dangerouslySetInnerHTML={{
                      __html: currentLesson.description,
                    }}
                  />
                )}
                <div className={cx("lessonNavButtons")}>
                  {prevLesson && (
                    <div
                      onClick={() => handleLessonClick(prevLesson.id)}
                      className={cx("navButton")}
                    >
                      <div className={cx("navTexts")}>
                        <GrFormPrevious size={24} />

                        <span className={cx("navNote")}>Bài trước: </span>
                      </div>
                      <span className={cx("navTitle")}>{prevLesson.title}</span>
                    </div>
                  )}
                  {nextLesson && (
                    <div
                      onClick={() => handleLessonClick(nextLesson.id)}
                      className={cx("navButton")}
                      style={{ justifyContent: "end" }}
                    >
                      <div className={cx("navTexts")}>
                        <span className={cx("navNote")}>Bài tiếp:</span>
                        <span className={cx("navTitle")}>
                          {nextLesson.title}
                        </span>
                      </div>
                      <MdNavigateNext size={24} />
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              {course.imageUrl && (
                <div className={cx("courseImageWrapper")}>
                  <img
                    src={course.imageUrl}
                    alt="course"
                    className={cx("courseImage")}
                  />
                </div>
              )}
              <div className={cx("lessonContent")}>
                <h1 className={cx("lessonTitle")}>{course.title}</h1>
                {course.description && (
                  <div
                    className={cx("lessonText")}
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />
                )}
                {allLessons[0] && (
                  <button
                    onClick={() => handleLessonClick(allLessons[0].id)}
                    className={cx("startBtn")}
                  >
                    Bắt đầu học
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div
        className={cx("mobileSidebar", { open: sidebarOpen })}
        onClick={() => setSidebarOpen(false)}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <CourseSidebar
            title={course.title}
            modules={modulesWithProgress}
            currentLesson={currentLesson || {}}
            onLessonClick={handleLessonClick}
            progress={progress}
            goCourseHome={goCourseHome}
          />
        </div>
      </div>

      <div className={cx("mobileBottomBar")}>
        <button
          className={cx("bottomMenuButton")}
          onClick={() => setSidebarOpen(true)}
        >
          <LuMenu size={24} />
        </button>
        <span className={cx("mobileCourseTitle")}>
          {isLessonView ? currentLesson.title : course.title}
        </span>
      </div>
    </div>
  );
}
