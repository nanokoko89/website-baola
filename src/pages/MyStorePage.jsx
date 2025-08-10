import Sidebar from "../components/utils/Sidebar/Sidebar";
import MyStore from "../components/mystores/MyStore/MyStore";
import HeaderBar from "../components/utils/Headerbar";
import BottomTabs from "../components/utils/BottomTabs";
import { useState } from "react";

const MyStorePage = () => {
  const [showPreview, setShowPreview] = useState(false);
  return (
    <>
      <Sidebar />

      <HeaderBar
        title="Cửa hàng của tôi"
        onPreviewClick={() => setShowPreview((p) => !p)}
      />
      <MyStore
        mobilePreviewOpen={showPreview}
        onClosePreview={() => setShowPreview(false)}
      />
      <BottomTabs />
    </>
  );
};

export default MyStorePage;
