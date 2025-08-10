// src/pages/MyStorePage.jsx
import React from "react";
import Sidebar from "../components/utils/Sidebar/Sidebar";
import ChooseProductType from "../components/ChooseProductType";
import HeaderBar from "../components/utils/Headerbar";

const ProductType = () => {
  const breadcrumbItems = [
    { label: "Cửa hàng", link: "/mystore" },
    { label: "Chọn loại sản phẩm", link: "/mystore/choose-product-type" },
  ];
  return (
    <>
      <Sidebar />
      {/* Truyền title là My Store */}
      <HeaderBar items={breadcrumbItems} />
      <ChooseProductType />
    </>
  );
};

export default ProductType;
