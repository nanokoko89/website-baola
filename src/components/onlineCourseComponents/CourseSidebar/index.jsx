import React, { useState } from "react";
import classNames from "classnames/bind";
import { FaChevronDown } from "react-icons/fa";
import styles from "./CourseSidebar.module.scss";
import { MdOutlineCircle } from "react-icons/md";
import { GoCheckCircleFill } from "react-icons/go";
import { HiOutlineHome } from "react-icons/hi2";

const cx = classNames.bind(styles);

export default function CourseSidebar({
  title,
  modules = [],
  currentLesson = {},
  onLessonClick = () => {},
  progress = 0,
  goCourseHome,
}) {
  const [expandedModules, setExpandedModules] = useState(() =>
    currentLesson ? { [currentLesson.moduleId]: true } : {}
  );

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  return (
    <div className={cx("sidebar")}>
      <div className={cx("sidebarHeader")}>
        <h2 className={cx("programTitle")}>{title}</h2>
        <div className={cx("progressContainer")}>
          <div className={cx("progressBar")}>
            <div
              className={cx("progressFill")}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className={cx("progressText")}>{progress}% hoàn thãnh</p>
        </div>

        <button className={cx("courseHomeButton")} onClick={goCourseHome}>
          <div className={cx("home-icon")}>
            <HiOutlineHome size={16} />
          </div>
          <span>Trang chủ khóa học</span>
        </button>
      </div>

      <div className={cx("modulesList")}>
        {modules.map((module) => (
          <div key={module.id} className={cx("moduleItem")}>
            <div
              className={cx("moduleHeader")}
              onClick={() => toggleModule(module.id)}
            >
              <div className={cx("moduleInfo")}>
                <div
                  className={cx("moduleIcon", {
                    completed: module.completed,
                    current: module.id === 1 && !module.completed,
                    pending: !module.completed && module.id !== 1,
                  })}
                >
                  {module.completed ? (
                    <GoCheckCircleFill size={24} />
                  ) : (
                    <MdOutlineCircle size={24} />
                  )}
                </div>
                <h3 className={cx("moduleTitle")}>{module.title}</h3>
              </div>
              <div className={cx("moduleActions")}>
                <span className={cx("moduleProgress")}>{module.progress}</span>
                <FaChevronDown
                  className={cx("chevronIcon", {
                    expanded: expandedModules[module.id],
                  })}
                />
              </div>
            </div>

            {expandedModules[module.id] && (
              <div className={cx("lessonsList")}>
                {module.lessons.map((lesson) => {
                  const isCurrent = currentLesson.id === lesson.id;
                  return (
                    <div
                      key={lesson.id}
                      className={cx("lessonItem")}
                      onClick={() => onLessonClick(lesson.id)}
                    >
                      <div
                        className={cx("lessonIcon", {
                          completed: lesson.completed && !isCurrent,
                          current: isCurrent,
                          pending: !lesson.completed && !isCurrent,
                        })}
                      >
                        {lesson.completed || isCurrent ? (
                          <GoCheckCircleFill size={24} />
                        ) : (
                          <MdOutlineCircle size={24} />
                        )}
                      </div>
                      <span
                        className={cx("lessonTitle", {
                          completed: lesson.completed && !isCurrent,
                          current: isCurrent,
                        })}
                      >
                        {lesson.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
