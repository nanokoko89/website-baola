import React, { useEffect } from "react";
import AddReviews from "../../common/AddReviews";
import NumberLabel from "../../common/NumberLabel";
import ActionButtons from "../../common/ActionButtons";

export default function OptionsComponent({
  reviews,
  reviewHandlers,
  handlePublish,
}) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <NumberLabel number="1" label="Đánh giá khách hàng" />
      <AddReviews
        reviews={reviews}
        onAdd={(r) => reviewHandlers.add(r)}
        onRemove={(id) => reviewHandlers.remove(id)}
        onUpdate={(u) => reviewHandlers.update(u)}
      />
      <ActionButtons title="Xuất bản" handleBtn={handlePublish} />
    </div>
  );
}
