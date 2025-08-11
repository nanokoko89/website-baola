// src/pages/MyStorePage.jsx
import React from "react";
import HeaderBar from "../components/utils/Headerbar";
import ProfileContent from "../components/ProfileContent";

const Profile = () => {
  return (
    <>
      <HeaderBar title="Tài khoản" />
      <ProfileContent />
    </>
  );
};

export default Profile;
