// src/pages/MyStorePage.jsx
import React from "react";
import Sidebar from "../components/utils/Sidebar/Sidebar";
import HeaderBar from "../components/utils/Headerbar";
import ProfileContent from "../components/ProfileContent";
import BottomTabs from "../components/utils/BottomTabs";

const Profile = () => {
  return (
    <>
      <Sidebar />

      <HeaderBar title="Tài khoản" />
      <ProfileContent />
      <BottomTabs />
    </>
  );
};

export default Profile;
