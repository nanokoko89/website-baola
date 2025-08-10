// src/components/common/DescriptionCard.jsx
import React, { useRef, useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./DescriptionCard.module.scss";
const cx = classNames.bind(styles);

const DescriptionCard = ({
  title = "Mô tả nội dung",
  onContentChange,
  description,
}) => {
  const editorRef = useRef(null);
  const selectedRangeRef = useRef(null);

  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    strikeThrough: false,
    heading: false,
    link: false,
    list: false,
  });

  // Modal link state
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const isSelectionInsideEditor = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return false;
    const range = selection.getRangeAt(0);
    return editorRef.current?.contains(range.commonAncestorContainer);
  };

  const updateActiveFormats = () => {
    const selection = window.getSelection();
    if (!selection || !selection.anchorNode) return;

    // Tìm nút hiện tại (nếu là textNode thì lấy parentElement)
    const node =
      selection.anchorNode.nodeType === 3
        ? selection.anchorNode.parentElement
        : selection.anchorNode;

    const isInLink = node.closest("a") !== null;
    const isInList = node.closest("ul, ol") !== null;

    const isBold = document.queryCommandState("bold");
    const isItalic = document.queryCommandState("italic");
    const isStrike = document.queryCommandState("strikeThrough");

    // Thay vì chỉ kiểm tra node.classList, ta dùng closest để leo lên thẻ <p> có class "headingLike"
    const headingElement = node.closest("p.headingLike");
    const isHeading = headingElement !== null;

    setActiveFormats({
      bold: isBold,
      italic: isItalic,
      strikeThrough: isStrike,
      heading: isHeading,
      link: isInLink,
      list: isInList,
    });
  };

  useEffect(() => {
    document.addEventListener("selectionchange", updateActiveFormats);
    return () => {
      document.removeEventListener("selectionchange", updateActiveFormats);
    };
  }, []);

  useEffect(() => {
    if (
      editorRef.current &&
      description !== undefined &&
      description !== null
    ) {
      // Chỉ cập nhật nếu nội dung thực sự khác biệt để tránh cursor jump
      if (editorRef.current.innerHTML !== description) {
        editorRef.current.innerHTML = description;
      }
    }
  }, [description]);

  const handleCommand = (command, value = null) => {
    if (!isSelectionInsideEditor()) return;
    document.execCommand(command, false, value);
    editorRef.current.focus();
    updateActiveFormats();
  };

  const headingStyle = `
        margin-left: 0 !important;
        padding-left: 0 !important;
        text-indent: 0 !important;
        position: static !important;
        left: auto !important;
        right: auto !important;
        transform: none !important;
        background: transparent !important;
        border: none !important;
        outline: none !important;
        list-style: none !important;
      `;

  const handleToggleHeadingLike = () => {
    if (!isSelectionInsideEditor()) return;
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);

    const container = document.createElement("div");
    container.appendChild(range.cloneContents());
    let blocks = container.querySelectorAll("p, li, div");
    if (blocks.length === 0 && selection.anchorNode?.parentElement) {
      blocks = [selection.anchorNode.parentElement];
    }

    const addHeading = (el) => {
      el.classList.add("headingLike");
      el.style.cssText = headingStyle;
    };

    const removeHeading = (el) => {
      el.classList.remove("headingLike");
      el.style.cssText = "";
    };

    blocks.forEach((cloneNode) => {
      const text = cloneNode.textContent?.trim();
      if (!text) return;

      const realBlock = Array.from(
        editorRef.current.querySelectorAll("p, li")
      ).find((el) => el.textContent?.trim() === text);
      if (!realBlock) return;

      if (realBlock.tagName === "LI") {
        const p = document.createElement("p");
        p.innerHTML = realBlock.innerHTML;
        if (realBlock.classList.contains("headingLike")) {
          removeHeading(p);
        } else {
          addHeading(p);
        }
        realBlock.replaceWith(p);
      } else if (realBlock.classList.contains("headingLike")) {
        removeHeading(realBlock);
      } else if (realBlock.tagName === "P") {
        addHeading(realBlock);
      }
    });

    // Cập nhật trạng thái activeFormats để tô màu nút H
    updateActiveFormats();

    // **Thêm dòng này để gọi callback**, đẩy HTML mới lên state contentHtml:
    if (editorRef.current) {
      const newHtml = editorRef.current.innerHTML;
      onContentChange?.(newHtml);
    }
  };

  const handleShowLinkModal = () => {
    if (!isSelectionInsideEditor()) return;
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    selectedRangeRef.current = selection.getRangeAt(0).cloneRange();

    const node =
      selection.anchorNode.nodeType === 3
        ? selection.anchorNode.parentElement
        : selection.anchorNode;
    const aTag = node.closest("a");
    if (aTag) {
      setLinkUrl(aTag.getAttribute("href") || "");
      setLinkName(aTag.textContent || "");
    } else {
      const text = selection.toString();
      setLinkName(text);
      setLinkUrl("");
    }
    setShowLinkModal(true);
  };

  const handleSaveLink = () => {
    if (!selectedRangeRef.current) return;
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(selectedRangeRef.current);

    if (
      !linkUrl ||
      (!linkUrl.startsWith("http://") && !linkUrl.startsWith("https://"))
    ) {
      alert("Vui lòng nhập URL hợp lệ (bắt đầu bằng http:// hoặc https://)");
      return;
    }

    document.execCommand("unlink");
    document.execCommand("createLink", false, linkUrl);

    const selNode =
      window.getSelection().anchorNode.nodeType === 3
        ? window.getSelection().anchorNode.parentElement
        : window.getSelection().anchorNode;
    const newATag = selNode.closest("a");
    if (newATag && linkName.trim() !== "") {
      newATag.textContent = linkName;
      newATag.setAttribute("href", linkUrl);
    }

    setShowLinkModal(false);
    setLinkName("");
    setLinkUrl("");

    editorRef.current.focus();
    updateActiveFormats();
  };

  const handleRemoveLink = () => {
    if (!selectedRangeRef.current) return;
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(selectedRangeRef.current);

    document.execCommand("unlink");

    setShowLinkModal(false);
    setLinkName("");
    setLinkUrl("");

    editorRef.current.focus();
    updateActiveFormats();
  };

  // Mỗi khi user nhập, lấy innerHTML và gọi onContentChange
  const handleInput = () => {
    if (!editorRef.current) return;
    const newHtml = editorRef.current.innerHTML;
    onContentChange?.(newHtml);
  };
  const handleCloseModal = () => {
    setShowLinkModal(false);
  };
  return (
    <div className={cx("container")}>
      <label className={cx("label")}>
        {title} <span>*</span>
      </label>

      <div className={cx("card")}>
        <div className={cx("toolbar")}>
          <button
            className={cx("btn", { active: activeFormats.heading })}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleToggleHeadingLike}
          >
            H
          </button>
          <button
            className={cx("btn", { active: activeFormats.bold })}
            onClick={() => handleCommand("bold")}
            style={{ fontWeight: "bold" }}
          >
            B
          </button>
          <button
            className={cx("btn", { active: activeFormats.strikeThrough })}
            onClick={() => handleCommand("strikeThrough")}
            style={{ textDecoration: "line-through" }}
          >
            S
          </button>
          <button
            className={cx("btn", { active: activeFormats.italic })}
            onClick={() => handleCommand("italic")}
            style={{ fontStyle: "italic" }}
          >
            I
          </button>
          <button
            className={cx("btn", { active: activeFormats.list })}
            onClick={() => handleCommand("insertUnorderedList")}
          >
            •
          </button>

          <button
            className={cx("btn", { active: activeFormats.link })}
            onClick={handleShowLinkModal}
          >
            🔗
          </button>
        </div>

        <div
          className={cx("editor")}
          contentEditable
          ref={editorRef}
          onInput={handleInput}
          suppressContentEditableWarning
        />
      </div>

      {showLinkModal && (
        <div className={cx("modalOverlay")} onClick={handleCloseModal}>
          <div
            className={cx("modalContent")}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={cx("modalCloseBtn")} onClick={handleCloseModal}>
              ✕
            </button>

            <h3 className={cx("modalTitle")}>Chỉnh sửa liên kết</h3>

            <div className={cx("modalBody")}>
              <input
                type="text"
                className={cx("modalInput")}
                placeholder="Tên"
                value={linkName}
                onChange={(e) => setLinkName(e.target.value)}
              />

              <input
                type="text"
                className={cx("modalInput")}
                placeholder="https://..."
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
            </div>

            <div className={cx("modalFooter")}>
              <button
                className={cx("modalBtn", "deleteBtn")}
                onClick={handleRemoveLink}
              >
                Xóa siêu liên kết
              </button>
              <button
                className={cx("modalBtn", "saveBtn")}
                onClick={handleSaveLink}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionCard;
