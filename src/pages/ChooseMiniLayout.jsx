// src/pages/MyStorePage.jsx
import React from "react";
import Sidebar from "../components/utils/Sidebar/Sidebar";
import MiniLayouts from "../components/MiniLayouts";
import HeaderBar from "../components/utils/Headerbar";

const ChooseMiniLayout = () => {
  const breadcrumbItems = [
    { label: "Cửa hàng", link: "/mystore" },
    { label: "Thêm mẫu", link: "/mystore/choose-mini-layout" },
  ];
  return (
    <>
      <Sidebar />
      {/* Truyền title là My Store */}
      <HeaderBar items={breadcrumbItems} />
      <MiniLayouts />
    </>
  );
};

export default ChooseMiniLayout;
