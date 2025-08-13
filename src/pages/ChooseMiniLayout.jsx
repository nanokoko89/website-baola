// src/pages/MyStorePage.jsx
import React from "react";
import MiniLayouts from "../components/MiniLayouts";
import HeaderBar from "../components/utils/Headerbar";

const ChooseMiniLayout = () => {
    const breadcrumbItems = [
      { label: "Cửa hàng", link: "/mystore?tab=store" },
      { label: "Thêm mẫu", link: "/mystore/choose-mini-layout" },
    ];
  return (
    <>
      {/* Truyền title là My Store */}
      <HeaderBar items={breadcrumbItems} />
      <MiniLayouts />
    </>
  );
};

export default ChooseMiniLayout;
