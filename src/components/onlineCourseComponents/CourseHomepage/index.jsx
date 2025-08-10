import NumberLabel from "../../common/NumberLabel";
import ImageUploader from "../../common/ImageUploader";
import CustomizeBrand from "../../common/CustomizeBrand";
import CustomLabelInput from "../../common/CustomLabelInput";
import DescriptionCard from "../../common/DescriptionCard";
import { IoArrowBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourseImageUrl,
  setCourseTitle,
  setCourseDescription,
  setCourseBackgroundColor,
  setCoursePrimaryColor,
} from "../../../store/newOnlineCourseSlice";

export default function CourseHomepage({ onContentChange, onBack }) {
  const dispatch = useDispatch();
  const course = useSelector((state) => state.onlineCourse.course);

  const handleTitleChange = (val) => dispatch(setCourseTitle(val));
  const handleDescChange = (html) => {
    dispatch(setCourseDescription(html));
    onContentChange?.(html);
  };
  const handleImageChange = ({ url }) => dispatch(setCourseImageUrl(url));
  const handleBgChange = (color) => dispatch(setCourseBackgroundColor(color));
  const handlePrimaryChange = (color) => dispatch(setCoursePrimaryColor(color));

  return (
    <div>
      <div
        onClick={onBack}
        style={{
          marginBottom: "32px",
          fontSize: "24px",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
        }}
      >
        <IoArrowBackOutline />{" "}
        <span style={{ marginLeft: "8px" }}>Trở về khóa học</span>
      </div>
      <div style={{ marginBottom: "32px" }}>
        <NumberLabel number="1" label="Mô tả trang" />

        <CustomLabelInput
          label="Tiêu đề"
          maxLength={50}
          required={false}
          placeholder="Bắt đầu với khóa học tuyệt vời này"
          value={course.title}
          onChange={handleTitleChange}
        />

        <DescriptionCard
          title="Mô tả"
          onContentChange={handleDescChange}
          isCustomProduct={true}
          description={course.description}
          placeholder="Tóm tắt khóa học đôi dòng để kết thúc bán hàng. Họ sẽ học được gì?"
        />
      </div>
      <div style={{ marginBottom: "32px" }}>
        <NumberLabel number="2" label="Tùy chỉnh thương hiệu" />
        <div
          style={{ fontSize: "16px", fontWeight: "500", marginBottom: "12px" }}
        >
          Chọn ảnh
        </div>
        <ImageUploader
          onImageChange={handleImageChange}
          imageUrl={course.imageUrl}
        />

        <CustomizeBrand
          backgroundColor={course.backgroundColor}
          highlightColor={course.primaryColor}
          onBackgroundChange={handleBgChange}
          onHighlightChange={handlePrimaryChange}
        />
      </div>
    </div>
  );
}
