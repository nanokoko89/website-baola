import cx from "classnames/bind";
import styles from "./BookingCallScreen.module.scss";
import PreviewPanel from "../common/PreviewPanel";
import numberWithCommas from "../../config/numberWithCommas";
import Form from "../common/Form";
import PaymentCard from "../common/PaymentCard";
import ReviewCard from "../common/ReviewCard";
import { useSelector } from "react-redux";
import getContrastTextColor from "../../config/getContrastTextColor";
import Book from "../coachingCallComponents/Calendars/Book";

const cn = cx.bind(styles);

export default function BookingCallScreen({
  product = {
    checkout: {
      imageUrl: "",
      price: 0,
      description: "",
      bottomTitle: "",
      collectInfo: { fields: [] },
    },
  },
  theme = {},
}) {
  const { selectedColors, selectedFont } = useSelector(
    (state) => state.template
  );
  const colors = theme.colors ||
    selectedColors || { primary: "#8000ff", secondary: "#e6b6ff" };
  const fontFamily = theme.fontFamily || selectedFont;

  const textColor = getContrastTextColor(colors.secondary);
  const buttonTextColor = getContrastTextColor(colors.primary);

  const styleVars = {
    "--template-font-family": fontFamily
      ? `'${fontFamily}', sans-serif`
      : undefined,
    "--template-color-primary": colors.primary,
    "--template-color-secondary": colors.secondary,
    "--template-text-color": textColor,
    "--template-button-text-color": buttonTextColor,
  };

  return (
    <div className={cn("wrapper")} style={styleVars}>
      <div className={cn("header")}>
        <img
          src={
            product.checkout.imageUrl ||
            "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg"
          }
          alt="Calendar"
          className={cn("calendarImage")}
        />
      </div>
      <div className={cn("container")}>
        <PreviewPanel content={product.checkout.description} />

        {product.type === "CoachingCall" && <Book />}

        <h2 className={cn("bottomTitle")}>{product.checkout.bottomTitle}</h2>

        <Form fields={product.checkout.collectInfo.fields} />

        {Array.isArray(product.options?.reviews) &&
          product.options.reviews.map((r, idx) => (
            <ReviewCard
              key={r.id || idx}
              avatarUrl={r.imageUrl}
              username={r.name}
              content={r.text}
              rating={r.rating}
            />
          ))}
        <PaymentCard
          total={
            product.checkout.price > 0
              ? `${numberWithCommas(product.checkout.price)}đ`
              : "Miễn phí"
          }
        />
      </div>
    </div>
  );
}
