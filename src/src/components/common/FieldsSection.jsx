// FieldsSection.jsx

import React, { useState, useRef, useEffect } from "react";
import styles from "./FieldsSection.module.scss";
import classNames from "classnames/bind";

// 1. Import các thành phần và utilities từ @dnd-kit
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// 2. Import icon từ react-icons/ai
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineFontSize,
  AiOutlineOrderedList,
  AiOutlineMenuUnfold,
  AiOutlineCheckSquare,
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineDrag,
  AiOutlineDelete,
} from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi2";

const cx = classNames.bind(styles);

// 2. ICONS sử dụng React components
const ICONS = {
  name: <AiOutlineUser />,
  email: <AiOutlineMail />,
  phone: <AiOutlinePhone />,
  text: <AiOutlineFontSize />,
  multiple: <AiOutlineOrderedList />,
  dropdown: <AiOutlineMenuUnfold />,
  checkboxes: <AiOutlineCheckSquare />,
  add: <AiOutlinePlus />,
  option: <AiOutlinePlus />,
  remove: <AiOutlineMinus />,
  drag: <AiOutlineDrag />,
  trash: <HiOutlineTrash />,
};

/**
 * SortableFieldCard: Component con cho mỗi trường thông tin động
 * Sử dụng useSortable để kích hoạt kéo-thả (drag‐drop) cho cả card
 */
const SortableFieldCard = ({
  field,
  handleLabelChange,
  handleOptionChange,
  handleAddOption,
  handleRemoveOption,
  handleToggleRequiredDynamic,
  handleDeleteField,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    boxShadow: isDragging
      ? "0 8px 20px rgba(0, 0, 0, 0.12)"
      : "0 4px 12px rgba(0, 0, 0, 0.05)",
    cursor: isDragging ? "grabbing" : "default",
  };

  return (
    <div ref={setNodeRef} style={style} className={cx("dynamicFieldCard")}>
      {/* ====== Khu vực kéo (Drag Handle) ====== */}
      <div className={cx("dragHandle")} {...attributes} {...listeners}>
        {ICONS.drag}
      </div>

      {/* ====== Phần đầu (Header): Icon loại trường + ô nhập tiêu đề ====== */}
      <div className={cx("fieldHeader")}>
        <span className={cx("fieldTypeIcon")}>
          {field.type === "text" && ICONS.text}
          {field.type === "multiple" && ICONS.multiple}
          {field.type === "dropdown" && ICONS.dropdown}
          {field.type === "checkboxes" && ICONS.checkboxes}
        </span>
        <input
          type="text"
          className={cx("fieldTitleInput")}
          placeholder={
            field.type === "text"
              ? "Tiêu đề trường văn bản..."
              : field.type === "multiple"
              ? "Tiêu đề lựa chọn nhiều..."
              : field.type === "dropdown"
              ? "Tiêu đề dropdown..."
              : field.type === "checkboxes"
              ? "Tiêu đề checkboxes..."
              : ""
          }
          value={field.label}
          onChange={(e) => handleLabelChange(field.id, e.target.value)}
        />
      </div>

      {/* ====== Nếu trường có các lựa chọn (options) ====== */}
      {(field.type === "multiple" ||
        field.type === "dropdown" ||
        field.type === "checkboxes") && (
        <div className={cx("optionsWrapper")}>
          {field.options.map((opt, idx) => (
            <div key={idx} className={cx("optionRow")}>
              {/* Biểu tượng kéo (drag-handle) minh họa (không sắp xếp lại từng option) */}
              <span className={cx("optionDragHandle")}>{ICONS.drag}</span>
              <input
                type="text"
                className={cx("optionInput")}
                placeholder={`Lựa chọn ${idx + 1}`}
                value={opt}
                onChange={(e) =>
                  handleOptionChange(field.id, idx, e.target.value)
                }
              />
              <button
                className={cx("removeOptionButton")}
                onClick={() => handleRemoveOption(field.id, idx)}
              >
                {ICONS.remove}
              </button>
            </div>
          ))}
          <button
            className={cx("addOptionLink")}
            onClick={() => handleAddOption(field.id)}
          >
            <span className={cx("addOptionIcon")}>{ICONS.option}</span>
            Thêm lựa chọn
          </button>
        </div>
      )}

      {/* ====== Phần chân (Footer): Chuyển đảo “Bắt buộc” + Xóa trường ====== */}
      <div className={cx("fieldFooter")}>
        <span className={cx("requiredLabel")}>Bắt buộc</span>
        <label className={cx("requiredSwitch")}>
          <input
            type="checkbox"
            checked={field.required}
            onChange={() =>
              handleToggleRequiredDynamic(field.id, field.required)
            }
          />
          <span className={cx("requiredSlider")}></span>
        </label>
        <button
          className={cx("deleteFieldButton")}
          onClick={() => handleDeleteField(field.id)}
        >
          {ICONS.trash}
        </button>
      </div>
    </div>
  );
};

const FieldsSection = ({
  fields,
  onAddField,
  onLabelChange,
  onToggleRequired,
  onRemoveField,
  onAddOption,
  onOptionChange,
  onRemoveOption,
  onReorder,
}) => {
  // ====== Quản lý menu “+ Thêm trường” ======
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef(null);

  // ====== Các loại trường động có thể thêm ======
  const availableFieldTypes = [
    { type: "text", label: "Văn bản", icon: ICONS.text },
    {
      type: "multiple",
      label: "Lựa chọn nhiều",
      icon: ICONS.multiple,
    },
    { type: "dropdown", label: "Dropdown", icon: ICONS.dropdown },
    {
      type: "checkboxes",
      label: "Checkboxes",
      icon: ICONS.checkboxes,
    },
  ];

  // ====== Trạng thái của trường số điện thoại (bật/tắt và xóa) ======
  const [phoneRequired, setPhoneRequired] = useState(false);
  const [showPhoneField, setShowPhoneField] = useState(true);

  // ====== Đóng menu khi nhấp ngoài (click outside) ======
  const handleClickOutside = (e) => {
    if (buttonRef.current && !buttonRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ====== Thêm một trường động mới ======
  const handleAddField = (fieldType) => {
    onAddField && onAddField(fieldType.type);
    setMenuOpen(false);
  };

  // ====== Xóa một trường động ======
  const handleDeleteField = (fieldId) => {
    onRemoveField && onRemoveField(fieldId);
  };

  // ====== Thay đổi nhãn (label) của trường động ======
  const handleLabelChange = (fieldId, value) => {
    onLabelChange && onLabelChange(fieldId, value);
  };

  // ====== Thay đổi một lựa chọn (option) trong trường động ======
  const handleOptionChange = (fieldId, idx, value) => {
    onOptionChange && onOptionChange(fieldId, idx, value);
  };

  // ====== Thêm một lựa chọn (option) cho trường động ======
  const handleAddOption = (fieldId) => {
    onAddOption && onAddOption(fieldId);
  };

  // ====== Xóa một lựa chọn (option) khỏi trường động ======
  const handleRemoveOption = (fieldId, idx) => {
    onRemoveOption && onRemoveOption(fieldId, idx);
  };

  const handleToggleRequiredDynamic = (fieldId, required) => {
    onToggleRequired && onToggleRequired(fieldId, !required);
  };

  // ====== Chuyển đổi “Bắt buộc” cho trường Số điện thoại ======
  const togglePhoneRequired = () => setPhoneRequired((prev) => !prev);

  // ====== Xóa hoàn toàn trường Số điện thoại ======
  const deletePhoneField = () => setShowPhoneField(false);

  // ====== Thiết lập sensors cho kéo-thả ======
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Kéo vượt 5px mới bắt đầu drag
      },
    })
  );

  // ====== Xử lý khi kết thúc kéo-thả ======
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = (fields || []).findIndex((f) => f.id === active.id);
    const newIndex = (fields || []).findIndex((f) => f.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    onReorder && onReorder(oldIndex, newIndex);
  };

  return (
    <div className={cx("container")}>
      {/* ====== Tiêu đề & Mô tả ====== */}
      <h2 className={cx("title")}>Các trường</h2>
      <p className={cx("subtitle")}>
        Các trường thông tin cơ bản không thể chỉnh sửa.
      </p>

      {/* ====== CÁC TRƯỜNG CỐ ĐỊNH: Tên, Email ====== */}
      <div className={cx("fixedFields")}>
        <div className={cx("fixedFieldItem")}>
          <span className={cx("fixedFieldIcon")}>{ICONS.name}</span>
          <span className={cx("fixedFieldLabel")}>Tên của bạn</span>
        </div>
        <div className={cx("fixedFieldItem")}>
          <span className={cx("fixedFieldIcon")}>{ICONS.email}</span>
          <span className={cx("fixedFieldLabel")}>Email</span>
        </div>
      </div>

      {/* ====== TRƯỜNG SỐ ĐIỆN THOẠI (cố định nhưng có bật/tắt + xóa) ====== */}
      {showPhoneField && (
        <div className={cx("phoneFieldItem")}>
          <div className={cx("phoneLabelWrapper")}>
            <span className={cx("fixedFieldIcon")}>{ICONS.phone}</span>
            <span className={cx("fixedFieldLabel")}>Số điện thoại</span>
          </div>
          <div className={cx("phoneActions")}>
            <span className={cx("requiredLabel")}>Bắt buộc</span>
            <label className={cx("phoneRequiredSwitch")}>
              <input
                type="checkbox"
                checked={phoneRequired}
                onChange={togglePhoneRequired}
              />
              <span className={cx("phoneRequiredSlider")}></span>
            </label>
            <button
              className={cx("phoneDeleteButton")}
              onClick={deletePhoneField}
            >
              {ICONS.trash}
            </button>
          </div>
        </div>
      )}

      <div className={cx("divider")}></div>

      {/* ====== NÚT “Thêm trường” ====== */}
      <p className={cx("headingAdd")}>Thu thập thêm thông tin khách hàng</p>
      <div className={cx("addFieldWrapper")} ref={buttonRef}>
        <button
          className={cx("addFieldButton")}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className={cx("addFieldIcon")}>{ICONS.add}</span>
          Thêm trường
        </button>
        {menuOpen && (
          <div className={cx("addFieldMenu")}>
            {availableFieldTypes.map((ft) => (
              <div
                key={ft.type}
                className={cx("menuItem")}
                onClick={() => handleAddField(ft)}
              >
                <span className={cx("menuIcon")}>{ft.icon}</span>
                <span>{ft.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ====== Danh sách các trường động (có thể kéo-thả) ====== */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={(fields || []).map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className={cx("dynamicFields")}>
            {(fields || []).map((field) => (
              <SortableFieldCard
                key={field.id}
                field={field}
                handleLabelChange={handleLabelChange}
                handleOptionChange={handleOptionChange}
                handleAddOption={handleAddOption}
                handleRemoveOption={handleRemoveOption}
                handleToggleRequiredDynamic={handleToggleRequiredDynamic}
                handleDeleteField={handleDeleteField}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default FieldsSection;
