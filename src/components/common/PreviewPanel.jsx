// src/components/PreviewPanel.jsx
import React from "react";
import classNames from "classnames/bind";
import styles from "./PreviewPanel.module.scss";
import sanitizeHtml from "../../utils/sanitizeHtml";
const cx = classNames.bind(styles);

const PreviewPanel = ({ content }) => {
  return (
    <div className={cx("container")}>
      {content && (
        <div
          className={cx("previewContent")}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
        />
      )}
    </div>
  );
};

export default PreviewPanel;
