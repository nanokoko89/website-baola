import HeaderBar from "../components/utils/Headerbar";
import EditProfile from "../components/EditProfiles/EditProfile/EditProfile";
import { useState } from "react";

const EditProfilePage = () => {
    const breadcrumbItems = [
      { label: "Cửa hàng", link: "/mystore?tab=store" },
      { label: "Sửa hồ sơ", link: "/edit-profile" },
    ];
  const [showPreview, setShowPreview] = useState(false);
  return (
    <>
      <HeaderBar
        items={breadcrumbItems}
        onPreviewClick={() => setShowPreview((p) => !p)}
      />
      <EditProfile
        mobilePreviewOpen={showPreview}
        onClosePreview={() => setShowPreview(false)}
      />
    </>
  );
};

export default EditProfilePage;
