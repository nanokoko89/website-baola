// đường dẫn: src/components/CustomImagePicker/CustomImagePicker.jsx

import React, { useRef, useState } from "react";
import classNames from "classnames/bind";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./CustomImagePicker.module.scss";

const cx = classNames.bind(styles);
const MAX_IMAGES = 9;

// ==== Component con: SortableItem ====
// Mỗi thumbnail sẽ là một SortableItem để kéo-thả được.
const SortableItem = ({ item, index, onRemove, isFirst }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cx("thumb-container")}
      {...attributes}
      {...listeners}
    >
      {/* Nếu là ảnh đầu (ảnh đại diện), đánh dấu badge */}
      {isFirst && <div className={cx("badge")}>Ảnh đại diện</div>}

      <img
        src={item.preview}
        alt={`Ảnh ${index + 1}`}
        className={cx("thumb-image")}
      />

      <button
        type="button"
        className={cx("remove-btn")}
        onClick={() => onRemove(index)}
      >
        ×
      </button>
    </div>
  );
};

// ==== Component chính: CustomImagePicker ====
const CustomImagePicker = ({ onImagesChange }) => {
  const fileInputRef = useRef(null);
  // Mảng chứa các object: { id, file, preview }
  const [imageList, setImageList] = useState([]);
  // Dành cho DragOverlay (hiển thị ghost item khi kéo)
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Kéo sau 5px chạm chuột
      },
    })
  );

  // Khi click vào ô “Thêm hình ảnh”
  const handleAddClick = () => {
    if (imageList.length >= MAX_IMAGES) return;
    fileInputRef.current.click();
  };

  // Xử lý khi user chọn file từ <input type="file">
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const remainSlots = MAX_IMAGES - imageList.length;
    const chosenFiles = files.slice(0, remainSlots);

    // Tạo id + preview cho mỗi file
    const newPreviews = chosenFiles.map((file) => {
      return {
        id: `${Date.now()}-${Math.random()}`, // id đơn giản
        file,
        preview: URL.createObjectURL(file),
      };
    });

    const updatedList = [...imageList, ...newPreviews];
    setImageList(updatedList);
    onImagesChange && onImagesChange(updatedList.map((item) => item.file));

    // Reset input để có thể chọn cùng file lần nữa
    e.target.value = "";
  };

  // Xóa 1 ảnh theo index
  const handleRemove = (idx) => {
    const updated = imageList.filter((_, index) => index !== idx);
    setImageList(updated);
    onImagesChange && onImagesChange(updated.map((item) => item.file));
  };

  // Xử lý khi bắt đầu drag
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  // Xử lý khi drag xong: hoán đổi vị trí
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over.id) {
      const oldIndex = imageList.findIndex((item) => item.id === active.id);
      const newIndex = imageList.findIndex((item) => item.id === over.id);
      const newOrder = arrayMove(imageList, oldIndex, newIndex);
      setImageList(newOrder);
      onImagesChange && onImagesChange(newOrder.map((item) => item.file));
    }
  };

  // Nếu activeId khác null, tìm object tương ứng để hiển thị DragOverlay
  const activeItem =
    activeId != null ? imageList.find((item) => item.id === activeId) : null;

  return (
    <div className={cx("wrapper")}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={imageList.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className={cx("thumbnails")}>
            {imageList.map((item, idx) => (
              <SortableItem
                key={item.id}
                item={item}
                index={idx}
                onRemove={handleRemove}
                isFirst={idx === 0}
              />
            ))}

            {/* Ô “Thêm hình ảnh” (nếu chưa đủ 9 ảnh) */}
            {imageList.length < MAX_IMAGES && (
              <div className={cx("add-box")} onClick={handleAddClick}>
                <div className={cx("plus-icon")}>＋</div>
                <div className={cx("add-text")}>
                  Thêm hình ảnh ({imageList.length}/{MAX_IMAGES})
                </div>
              </div>
            )}
          </div>
        </SortableContext>

        {/* DragOverlay: hiển thị thumbnail khi kéo */}
        <DragOverlay>
          {activeItem ? (
            <div className={cx("thumb-container", "drag-overlay")}>
              <img
                src={activeItem.preview}
                alt="Đang kéo"
                className={cx("thumb-image")}
              />
              <div className={cx("badge")}>Ảnh đại diện</div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Input file ẩn */}
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        className={cx("hidden-input")}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default CustomImagePicker;
