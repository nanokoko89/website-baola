// src/pages/MyStorePage.jsx
import React, { useState } from "react";
import HeaderBar from "../components/utils/Headerbar";
import CreateProduct from "../components/CreateProduct";
import { useParams, useSearchParams } from "react-router-dom";

const CreateProductPage = () => {
  const { type } = useParams();
  const [searchParams] = useSearchParams();
  const isEditing = Boolean(searchParams.get("id"));

    const breadcrumbItems = [
      { label: "Cửa hàng", link: "/mystore?tab=store" },
      {
        label: isEditing ? "Sửa sản phẩm" : "Tạo sản phẩm",
        link: "/mystore/choose-product-type",
      },
    ];

  const [showPreview, setShowPreview] = useState(false);
  return (
    <>
      <HeaderBar
        items={breadcrumbItems}
        onPreviewClick={() => setShowPreview((p) => !p)}
      />
      <CreateProduct
        type={type}
        mobilePreviewOpen={showPreview}
        onClosePreview={() => setShowPreview(false)}
      />
    </>
  );
};

export default CreateProductPage;
