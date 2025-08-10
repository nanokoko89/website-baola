import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";

export default function SidebarLayout({ children }) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
