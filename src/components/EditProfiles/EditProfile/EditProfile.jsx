import classNames from "classnames/bind";
import styles from "./EditProfile.module.scss";
import StoreHeaderEdit from "../StoreHeaderEdit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTemplateIndex,
  setSelectedColors,
  setSelectedFont,
} from "../../../store/templateSlice";
import { selectCurrentUser } from "../../../store/authSlice";
import { previewSlides, slides } from "../../../config/others";
import getContrastTextColor from "../../../config/getContrastTextColor";

const cx = classNames.bind(styles);

function EditProfile({ mobilePreviewOpen = false, onClosePreview }) {
  const dispatch = useDispatch();
  const templateIndex = useSelector((state) => state.template.templateIndex);
  const currentUser = useSelector(selectCurrentUser);
  const previewDisplayName = useSelector((state) => state.template.displayName);
  const previewBio = useSelector((state) => state.template.bio);
  const selectedFont = useSelector((state) => state.template.selectedFont);
  const selectedColors = useSelector((state) => state.template.selectedColors);
  const PreviewComponent = previewSlides[templateIndex]?.Component;

  const previewFont = selectedFont;
  const previewColors = selectedColors || slides[templateIndex]?.colors;

  const previewUser = {
    ...currentUser,
    displayName: previewDisplayName,
    bio: previewBio,
  };

  useEffect(() => {
    if (!currentUser) return;
    if (currentUser.templateIndex !== undefined)
      dispatch(setTemplateIndex(currentUser.templateIndex));
    if (currentUser.selectedColors)
      dispatch(setSelectedColors(currentUser.selectedColors));
    if (currentUser.selectedFont)
      dispatch(setSelectedFont(currentUser.selectedFont));
  }, [currentUser, dispatch]);

  return (
    <div className={cx("container")}>
      <div className={cx("left")}>
        <StoreHeaderEdit />
      </div>

      <div className={cx("preview", { open: mobilePreviewOpen })}>
        <button className={cx("closeBtn")} onClick={onClosePreview}>×</button>
        <div
          className={cx("right")}
          style={{
            "--template-font-family": `'${previewFont}', sans-serif`,
            "--template-color-primary": previewColors.primary,
            "--template-color-secondary": previewColors.secondary,
            "--template-text-color": getContrastTextColor(
              previewColors.secondary
            ),
            "--template-button-text-color": getContrastTextColor(
              previewColors.primary
            ),
          }}
        >
          {PreviewComponent && (
            <PreviewComponent user={previewUser} headerOnly disableClick />
          )}
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
