// src/pages/MyStorePage.jsx
import React from "react";
import ChooseProductType from "../components/ChooseProductType";
import HeaderBar from "../components/utils/Headerbar";

const ProductType = () => {
    const breadcrumbItems = [
      { label: "Cửa hàng", link: "/mystore?tab=store" },
      { label: "Chọn loại sản phẩm", link: "/mystore/choose-product-type" },
    ];
  return (
    <>
      {/* Truyền title là My Store */}
      <HeaderBar items={breadcrumbItems} />
      <ChooseProductType />
    </>
  );
};

export default ProductType;
