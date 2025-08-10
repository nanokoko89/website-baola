import React, { useEffect } from "react";
import NumberLabel from "../../common/NumberLabel";
import ImageUploader from "../../common/ImageUploader";
import CustomLabelInput from "../../common/CustomLabelInput";
import PriceInput from "../../common/PriceInput";
import FieldsSection from "../../common/FieldsSection";
import DescriptionCard from "../../common/DescriptionCard";
import ActionButtons from "../../common/ActionButtons";

export default function CheckoutComponent({
  checkout,
  onImageChange,
  onTitleChange,
  onDescriptionChange,
  onBottomTitleChange,
  onCTAChange,
  onPriceChange,
  onDiscountChange,
  collectInfo,
  onAddField,
  onLabelChange,
  onToggleRequired,
  onRemoveField,
  onAddOption,
  onOptionChange,
  onRemoveOption,
  onReorder,

  onNext,
}) {
  return (
    <div>
      <NumberLabel number="1" label="Chọn ảnh" />
      <div style={{ marginBottom: 32 }}>
        <ImageUploader
          onImageChange={({ url }) => onImageChange(url)}
          imageUrl={checkout.imageUrl}
        />
      </div>
      <NumberLabel number="2" label="Viết mô tả" />
      <DescriptionCard
        title="Mô tả"
        onContentChange={onDescriptionChange}
        description={checkout.description}
      />
      <div style={{ marginBottom: 16 }}>
        <CustomLabelInput
          label="Tiêu đề dưới cùng"
          value={checkout.bottomTitle}
          onChange={onBottomTitleChange}
        />
      </div>
      <div style={{ marginBottom: 32 }}>
        <CustomLabelInput
          label="Nút kêu gọi hành động"
          value={checkout.callActionButtonText}
          onChange={onCTAChange}
        />
      </div>
      <NumberLabel number="3" label="Đặt giá" />
      <div style={{ marginBottom: 32 }}>
        <PriceInput
          value={checkout.price}
          discountValue={checkout.discount}
          onPriceChange={onPriceChange}
          onDiscountChange={onDiscountChange}
        />
      </div>
      <NumberLabel number="4" label="Thu thập thông tin" />
      <FieldsSection
        fields={collectInfo}
        onAddField={onAddField}
        onLabelChange={onLabelChange}
        onToggleRequired={onToggleRequired}
        onRemoveField={onRemoveField}
        onAddOption={onAddOption}
        onOptionChange={onOptionChange}
        onRemoveOption={onRemoveOption}
        onReorder={onReorder}
      />
      <ActionButtons title="Tiếp tục" handleBtn={onNext} />
    </div>
  );
}
