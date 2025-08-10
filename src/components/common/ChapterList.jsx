// src/components/ChapterList/ChapterList.jsx
import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { FiMoreVertical, FiChevronRight, FiPlus } from "react-icons/fi";
import { MdOutlineDragIndicator } from "react-icons/md";
import {
  RiDraggable,
  RiDeleteBinLine,
  RiEyeOffLine,
  RiEyeLine,
} from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import ActionPopover from "../mystores/MyStore/DraggableList/ActionPopover";
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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useSelector, useDispatch } from "react-redux";
import {
  addChapter as addChapterAction,
  addLesson as addLessonAction,
  reorderChapters,
  reorderLessons,
  setLessonTitle,
  removeChapter,
  setChapterTitle,
  setChapterPublished,
} from "../../store/newOnlineCourseSlice";
import { v4 as uuidv4 } from "uuid";
import RenameChapterModal from "../onlineCourseComponents/RenameChapterModal";

const cx = classNames.bind(styles);

function SortableChapter({ chapter, children }) {
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

function SortableLesson({ lesson, chapterId, handleLesson }) {
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
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cx("lesson-item", { dragging: isDragging })}
      {...attributes}
      {...listeners}
      onClick={() => {
        if (!isDragging) {
          handleLesson(chapterId, lesson.id);
        }
      }}
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

const ChapterList = ({ handleLesson }) => {
  const chapters = useSelector(
    (state) => state.onlineCourse.course.content.chapters
  );

  const dispatch = useDispatch();
  const [openChapters, setOpenChapters] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameTitle, setRenameTitle] = useState("");
  const [renameId, setRenameId] = useState(null);

  useEffect(() => {
    if (chapters.length > 0 && openChapters.length === 0) {
      setOpenChapters([chapters[0].id]);
    }
  }, [chapters, openChapters.length]);

  // Sensor với delay để phân biệt click nhanh vs long-press drag
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200, // giữ 200ms để drag
        tolerance: 5, // di chuyển >5px cũng kích hoạt drag
      },
    })
  );

  const handleDragStart = ({ active }) => {
    setActiveId(active.id);
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      setActiveId(null);
      return;
    }
    const a = active.id;
    const o = over.id;

    // Kéo–thả chương
    if (a.startsWith("chapter-") && o.startsWith("chapter-")) {
      const oldIdx = chapters.findIndex((c) => `chapter-${c.id}` === a);
      const newIdx = chapters.findIndex((c) => `chapter-${c.id}` === o);
      if (oldIdx !== -1 && newIdx !== -1 && oldIdx !== newIdx) {
        dispatch(reorderChapters({ oldIndex: oldIdx, newIndex: newIdx }));
      }
      setActiveId(null);
      return;
    }

    // Kéo–thả bài học
    if (a.startsWith("lesson-") && o.startsWith("lesson-")) {
      const [, chapA] = a.split("-");
      const [, chapO] = o.split("-");
      if (chapA === chapO) {
        const chap = chapters.find((c) => String(c.id) === chapA);
        if (chap) {
          const oldIdx = chap.lessons.findIndex(
            (l) => `lesson-${chapA}-${l.id}` === a
          );
          const newIdx = chap.lessons.findIndex(
            (l) => `lesson-${chapA}-${l.id}` === o
          );
          if (oldIdx !== -1 && newIdx !== -1 && oldIdx !== newIdx) {
            dispatch(
              reorderLessons({
                chapterId: chapA,
                oldIndex: oldIdx,
                newIndex: newIdx,
              })
            );
          }
        }
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

  const handleMenuOpen = (e, chapId) => {
    e.stopPropagation();
    setSelectedChapter(chapId);
    setMenuAnchor(e.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedChapter(null);
  };

  const handleDeleteChapter = () => {
    if (!selectedChapter) return;
    dispatch(removeChapter(selectedChapter));
  };

  const handleRenameChapter = () => {
    if (!selectedChapter) return;
    const chap = chapters.find((c) => c.id === selectedChapter);
    setRenameTitle(chap?.title || "");
    setRenameId(selectedChapter);
    setRenameOpen(true);
  };

  const handleTogglePublish = () => {
    if (!selectedChapter) return;
    const chap = chapters.find((c) => c.id === selectedChapter);
    const isPublished = chap?.published !== false;
    dispatch(
      setChapterPublished({
        chapterId: selectedChapter,
        published: !isPublished,
      })
    );
  };

  const handleSaveRename = (title) => {
    if (!renameId) return;
    dispatch(setChapterTitle({ chapterId: renameId, title }));
    setRenameOpen(false);
    setRenameId(null);
  };

  const handleCloseRename = () => {
    setRenameOpen(false);
    setRenameId(null);
  };

  const handleAddLesson = (chapterId) => {
    const chap = chapters.find((c) => c.id === chapterId);
    const nextIndex = chap ? chap.lessons.length + 1 : 1;
    const lessonId = uuidv4();
    dispatch(addLessonAction({ chapterId, lessonId }));
    dispatch(
      setLessonTitle({
        chapterId,
        lessonId,
        title: `Bài học ${nextIndex}`,
      })
    );
    if (!openChapters.includes(chapterId)) {
      setOpenChapters((prev) => [...prev, chapterId]);
    }
    handleLesson(chapterId, lessonId);
  };

  const handleAddChapter = () => {
    const id = uuidv4();
    const title = `Chương ${chapters.length + 1}: Tiêu đề mới`;
    dispatch(addChapterAction({ id, title }));
    setOpenChapters((prev) => [...prev, id]);
  };

  const selectedChap = chapters.find((c) => c.id === selectedChapter);
  const isPublished = selectedChap?.published !== false;
  const menuOptions = selectedChapter
    ? [
        {
          label: "Xóa",
          icon: <RiDeleteBinLine />,
          onClick: handleDeleteChapter,
        },
        {
          label: "Thay đổi tên",
          icon: <AiOutlineEdit />,
          onClick: handleRenameChapter,
        },
        {
          label: isPublished ? "Tạm ẩn" : "Hiển thị",
          icon: isPublished ? <RiEyeOffLine /> : <RiEyeLine />,
          onClick: handleTogglePublish,
        },
      ]
    : [];

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
            const isChapPublished = chap.published !== false;

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
                        <span
                          className={cx(
                            isChapPublished ? "badge-published" : "badge-hidden"
                          )}
                        >
                          {isChapPublished ? "Đã xuất bản" : "Tạm ẩn"}
                        </span>
                        <FiMoreVertical
                          size={20}
                          className={cx("more-icon")}
                          onClick={(e) => handleMenuOpen(e, chap.id)}
                        />
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
                              handleLesson={handleLesson}
                            />
                          ))}
                        </SortableContext>

                        <button
                          type="button"
                          className={cx("btn-add-lesson")}
                          onClick={() => handleAddLesson(chap.id)}
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
          onClick={handleAddChapter}
        >
          <FiPlus size={20} className={cx("icon-plus")} />
          <span>Thêm chương</span>
        </button>
      </div>

      <DragOverlay>
        {activeId ? (
          activeId.startsWith("chapter-") ? (
            <div className={cx("chapter-card", "dragging-overlay")}>
              {(() => {
                const chapId = activeId.split("-")[1];
                const chap = chapters.find((c) => String(c.id) === chapId);
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
                const chap = chapters.find((c) => String(c.id) === chapId);
                const lesson = chap?.lessons.find(
                  (l) => String(l.id) === lessonId
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
      <ActionPopover
        anchorEl={menuAnchor}
        options={menuOptions}
        onClose={handleMenuClose}
      />
      <RenameChapterModal
        isOpen={renameOpen}
        initialTitle={renameTitle}
        onClose={handleCloseRename}
        onSave={handleSaveRename}
      />
    </DndContext>
  );
};

export default ChapterList;
