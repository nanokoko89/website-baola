import PickStyle from "../../common/PickStyle";
import ImageUploader from "../../common/ImageUploader";
import CustomLabelInput from "../../common/CustomLabelInput";
import NumberLabel from "../../common/NumberLabel";
import { useSelector } from "react-redux";
import ActionButtons from "../../common/ActionButtons";

export default function PickStyleComponent({
  typeStyle,
  onPickStyle,
  onTitleChange,
  onDescriptionChange,
  onButtonTextChange,
  onImageUpload,
  onNext,
}) {
  const template = useSelector((state) => state.coachingCall.template);

  return (
    <div>
      <NumberLabel number="1" label="Chọn kiểu mẫu" />
      <div style={{ marginBottom: 32, maxWidth: 360, width: "100%" }}>
        <PickStyle selectedStyle={typeStyle} setTypeStyle={onPickStyle} />
      </div>

      <NumberLabel number="2" label="Chọn ảnh" />
      <div style={{ marginBottom: 32 }}>
        <ImageUploader
          onImageChange={({ url }) => onImageUpload(url)}
          imageUrl={template.imageUrl}
        />
      </div>

      <NumberLabel number="3" label="Thêm chữ" />
      <CustomLabelInput
        label="Tiêu đề"
        maxLength={50}
        value={template.addText.title}
        onChange={onTitleChange}
      />
      <CustomLabelInput
        label="Mô tả"
        maxLength={100}
        value={template.addText.description}
        onChange={onDescriptionChange}
      />
      <CustomLabelInput
        label="Nút kêu gọi"
        maxLength={30}
        required
        value={template.addText.buttonText}
        onChange={onButtonTextChange}
      />
      <ActionButtons title="Tiếp tục" handleBtn={onNext} />
    </div>
  );
}
