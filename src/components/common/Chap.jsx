import React, { useState } from "react";
import classNames from "classnames/bind";
import { FiMoreVertical, FiChevronRight, FiPlus } from "react-icons/fi";
import { MdOutlineDragIndicator } from "react-icons/md";
import { RiDraggable } from "react-icons/ri";

import styles from "./ChapterList.module.scss";

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

const cx = classNames.bind(styles);

const initialData = [
  {
    id: 1,
    title: "Chương 1: Tổng quan và cài đặt",
    published: true,
    lessons: [
      { id: 11, title: "Bài học 1: Chào mừng" },
      { id: 12, title: "Bài học 2: Tổng quan về khóa học" },
      { id: 13, title: "Bài học 3" },
      { id: 14, title: "Bài học 4" },
    ],
  },
  {
    id: 2,
    title: "Chương 2: Thay đổi mệnh giá",
    published: true,
    lessons: [],
  },
  {
    id: 3,
    title: "Mô-đun 3: Chủ đề 2",
    published: true,
    lessons: [],
  },
];

function SortableChapter({ chapter, isOpen, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `chapter-${chapter.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cx("chapter-card", { dragging: isDragging })}
      {...attributes}
      {...listeners}
    >
      <div className={cx("chapter-inner")}>{children()}</div>
    </div>
  );
}

function SortableLesson({ lesson, chapterId }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `lesson-${chapterId}-${lesson.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 998 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cx("lesson-item", { dragging: isDragging })}
      {...attributes}
      {...listeners}
    >
      <div className={cx("lesson-left")}>
        <RiDraggable size={16} className={cx("icon-drag-visual-small")} />
        <span className={cx("lesson-title")}>{lesson.title}</span>
      </div>
      <div className={cx("lesson-right")}>
        <FiChevronRight size={18} />
      </div>
    </div>
  );
}

const ChapterList = () => {
  const [chapters, setChapters] = useState(initialData);
  const [openChapters, setOpenChapters] = useState([1]);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) {
      setActiveId(null);
      return;
    }

    const activeIdStr = active.id;
    const overIdStr = over.id;

    // Kéo–thả chương
    if (
      activeIdStr.startsWith("chapter-") &&
      overIdStr.startsWith("chapter-")
    ) {
      const oldIndex = chapters.findIndex(
        (c) => `chapter-${c.id}` === activeIdStr
      );
      const newIndex = chapters.findIndex(
        (c) => `chapter-${c.id}` === overIdStr
      );
      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        setChapters((prev) => arrayMove(prev, oldIndex, newIndex));
      }
      setActiveId(null);
      return;
    }

    // Kéo–thả bài học
    if (activeIdStr.startsWith("lesson-") && overIdStr.startsWith("lesson-")) {
      const [, chapIdA] = activeIdStr.split("-");
      const [, chapIdO] = overIdStr.split("-");
      if (chapIdA === chapIdO) {
        const chapterIdNum = Number(chapIdA);
        setChapters((prevChaps) =>
          prevChaps.map((chap) => {
            if (chap.id !== chapterIdNum) return chap;

            const oldLessons = chap.lessons;
            const oldIndex = oldLessons.findIndex(
              (l) => `lesson-${chapterIdNum}-${l.id}` === activeIdStr
            );
            const newIndex = oldLessons.findIndex(
              (l) => `lesson-${chapterIdNum}-${l.id}` === overIdStr
            );
            if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex)
              return chap;

            return {
              ...chap,
              lessons: arrayMove(oldLessons, oldIndex, newIndex),
            };
          })
        );
      }
      setActiveId(null);
      return;
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const toggleChapter = (chapterId) => {
    setOpenChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const addLesson = (chapterId) => {
    setChapters((prev) =>
      prev.map((chap) => {
        if (chap.id !== chapterId) return chap;

        let newId;
        if (chap.lessons.length > 0) {
          const maxId = Math.max(...chap.lessons.map((l) => l.id));
          newId = maxId + 1;
        } else {
          newId = Date.now();
        }
        const nextIndex = chap.lessons.length + 1;
        const newLesson = {
          id: newId,
          title: `Bài học ${nextIndex}`,
        };
        return {
          ...chap,
          lessons: [...chap.lessons, newLesson],
        };
      })
    );

    if (!openChapters.includes(chapterId)) {
      setOpenChapters((prev) => [...prev, chapterId]);
    }
  };

  const addChapter = () => {
    const newChapId = Date.now();
    const newChapter = {
      id: newChapId,
      title: `Chương ${chapters.length + 1}: Tiêu đề mới`,
      published: false,
      lessons: [],
    };
    setChapters((prev) => [...prev, newChapter]);
    setOpenChapters((prev) => [...prev, newChapId]);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      modifiers={[restrictToVerticalAxis]}
    >
      <div className={cx("wrapper")}>
        <SortableContext
          items={chapters.map((c) => `chapter-${c.id}`)}
          strategy={verticalListSortingStrategy}
        >
          {chapters.map((chap) => {
            const isOpen = openChapters.includes(chap.id);
            return (
              <SortableChapter key={chap.id} chapter={chap} isOpen={isOpen}>
                {() => (
                  <>
                    <div
                      className={cx("chapter-header")}
                      onClick={() => toggleChapter(chap.id)}
                    >
                      <MdOutlineDragIndicator
                        size={20}
                        className={cx("icon-drag-visual")}
                      />
                      <span className={cx("chapter-title")}>{chap.title}</span>
                      <div className={cx("header-right")}>
                        <FiMoreVertical size={20} className={cx("more-icon")} />
                      </div>
                    </div>

                    {isOpen && (
                      <div className={cx("lesson-list")}>
                        <SortableContext
                          items={chap.lessons.map(
                            (l) => `lesson-${chap.id}-${l.id}`
                          )}
                          strategy={verticalListSortingStrategy}
                        >
                          {chap.lessons.map((lesson) => (
                            <SortableLesson
                              key={lesson.id}
                              lesson={lesson}
                              chapterId={chap.id}
                            />
                          ))}
                        </SortableContext>

                        <button
                          type="button"
                          className={cx("btn-add-lesson")}
                          onClick={() => addLesson(chap.id)}
                        >
                          <FiPlus size={18} className={cx("icon-plus")} />
                          <span>Thêm bài học</span>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </SortableChapter>
            );
          })}
        </SortableContext>

        <button
          type="button"
          className={cx("btn-add-chapter")}
          onClick={addChapter}
        >
          <FiPlus size={20} className={cx("icon-plus")} />
          <span>Thêm mô-đun</span>
        </button>
      </div>

      <DragOverlay>
        {activeId ? (
          activeId.startsWith("chapter-") ? (
            <div className={cx("chapter-card", "dragging-overlay")}>
              {(() => {
                const chapIdNum = Number(activeId.split("-")[1]);
                const chap = chapters.find((c) => c.id === chapIdNum);
                return (
                  <div className={cx("chapter-inner")}>
                    <div className={cx("chapter-header")}>
                      <MdOutlineDragIndicator
                        size={20}
                        className={cx("icon-drag-visual")}
                      />
                      <span className={cx("chapter-title")}>{chap.title}</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className={cx("lesson-item", "dragging-overlay")}>
              {(() => {
                const [_, chapId, lessonId] = activeId.split("-");
                const chap = chapters.find((c) => c.id === Number(chapId));
                const lesson = chap.lessons.find(
                  (l) => l.id === Number(lessonId)
                );
                return (
                  <div className={cx("lesson-left")}>
                    <RiDraggable
                      size={16}
                      className={cx("icon-drag-visual-small")}
                    />
                    <span className={cx("lesson-title")}>{lesson.title}</span>
                  </div>
                );
              })()}
            </div>
          )
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default ChapterList;
