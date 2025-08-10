import React from "react";
import MainLayout from "../layouts/MainLayout/MainLayout.jsx";
import Home from "../pages/Home/Home.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import SidebarLayout from "../layouts/SidebarLayout/SidebarLayout.jsx";

export default function App() {
  return (
    <SidebarLayout>
      <Dashboard />
    </SidebarLayout>
  );
}
