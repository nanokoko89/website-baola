import MyStore from "../components/mystores/MyStore/MyStore";
import HeaderBar from "../components/utils/Headerbar";
import { useState } from "react";

const MyStorePage = () => {
  const [showPreview, setShowPreview] = useState(false);
  return (
    <>
      <HeaderBar
        title="Cửa hàng của tôi"
        onPreviewClick={() => setShowPreview((p) => !p)}
      />
      <MyStore
        mobilePreviewOpen={showPreview}
        onClosePreview={() => setShowPreview(false)}
      />
    </>
  );
};

export default MyStorePage;
