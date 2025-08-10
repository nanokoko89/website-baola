import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./TemplateStylePreview.module.scss";
import { slides } from "../../../config/others";
import getContrastTextColor from "../../../config/getContrastTextColor";

import * as DefaultCards from "../../mystores/ProductCards/DefaultCards";
import * as ModernoCards from "../../mystores/ProductCards/ModernoCards";
import * as KelsCards from "../../mystores/ProductCards/KelsCards";
import * as MaterialCards from "../../mystores/ProductCards/MaterialCards";
import * as MinimaCards from "../../mystores/ProductCards/MinimaCards";
import * as NightViewCards from "../../mystores/ProductCards/NightViewCards";
import * as SpotlightCards from "../../mystores/ProductCards/SpotlightCards";
import * as StoneCards from "../../mystores/ProductCards/StoneCards";
import * as TrishCards from "../../mystores/ProductCards/TrishCards";
import * as TylaCards from "../../mystores/ProductCards/TylaCards";
import * as EclipseCards from "../../mystores/ProductCards/EclipseCards";

const cx = classNames.bind(styles);

const CARD_SETS = [
  DefaultCards,
  ModernoCards,
  KelsCards,
  MaterialCards,
  MinimaCards,
  NightViewCards,
  SpotlightCards,
  StoneCards,
  TrishCards,
  TylaCards,
  EclipseCards,
];

const TemplateStylePreview = ({
  type = "button",
  productType = "Custom",
  title = "Đặt cuộc gọi 1:1 với tôi",
  description = "Đặt một buổi huấn luyện riêng với tôi!",
  buttonText = "Đặt lịch",
  imageUrl,
  price = 0,
  calendarHeaderOnly = false,
  onClick,
}) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const templateIndex = useSelector((state) => state.template.templateIndex);
  const selectedColors = useSelector((state) => state.template.selectedColors);

  const themeIndex = currentUser?.templateIndex ?? templateIndex ?? 0;
  const fallbackColors = slides[themeIndex].colors;
  const colors =
    currentUser?.selectedColors || selectedColors || fallbackColors;

  const primaryColor = colors?.primary || fallbackColors.primary;
  const secondaryColor = colors?.secondary || fallbackColors.secondary;
  const textColor = getContrastTextColor(secondaryColor);
  const buttonTextColor = getContrastTextColor(primaryColor);

  const { ButtonCard, CalloutCard, PreviewCard } =
    CARD_SETS[themeIndex] || DefaultCards;

  const item = {
    template: {
      pickStyle: type,
      imageUrl,
      addText: { title, description, buttonText },
    },
    checkout: {
      price,
    },
    type: productType,
    calendarHeaderOnly,
  };

  const CardComponent =
    type === "callout"
      ? CalloutCard
      : type === "preview"
      ? PreviewCard
      : ButtonCard;

  return (
    <div className={cx("wrapper")}>
      <div
        className={cx("container")}
        style={{
          "--template-color-primary": primaryColor,
          "--template-color-secondary": secondaryColor,
          "--template-text-color": textColor,
          "--template-button-text-color": buttonTextColor,
        }}
      >
        <CardComponent item={item} onClick={onClick} />
      </div>
    </div>
  );
};

export default TemplateStylePreview;
