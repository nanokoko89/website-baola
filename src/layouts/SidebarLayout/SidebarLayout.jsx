import React from "react";
import Sidebar from "../../components/utils/Sidebar/Sidebar";
import BottomTabs from "../../components/utils/BottomTabs";
import { Outlet } from "react-router-dom";

// Layout giữ nguyên Sidebar và BottomTabs giữa các trang
export default function SidebarLayout() {
  return (
    <>
      <Sidebar />
      <Outlet />
      <BottomTabs />
    </>
  );
}
