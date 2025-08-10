// src/components/DigitalProduct/DigitalProduct.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  setTemplatePickStyle,
  setTemplateAddTextTitle,
  setTemplateAddTextDescription,
  setTemplateAddTextButtonText,
  setTemplateImageUrl,
  setCheckoutImageUrl,
  setCheckoutTitle,
  setCheckoutDescription,
  setCheckoutBottomTitle,
  setCheckoutCallActionButtonText,
  setCheckoutPrice,
  setCheckoutDiscount,
  addCollectField,
  updateCollectFieldLabel,
  updateCollectFieldRequired,
  removeCollectField,
  addCollectFieldOption,
  updateCollectFieldOption,
  removeCollectFieldOption,
  initializeNewProduct,
  setExistingProduct,
  reorderCollectFields,
  addReview,
  removeReview,
  updateReview,
  resetNewProduct,
} from "../../../store/newProductSlice";

import PickStyle from "../../common/PickStyle";
import TwoColumnLayout from "../../utils/TwoColumnLayout/TwoColumnLayout";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { CgOptions } from "react-icons/cg";

import FieldsSection from "../../common/FieldsSection";
import AddReviews from "../../common/AddReviews";
import BookingCallScreen from "../../BookingCallScreen";
import CustomLabelInput from "../../common/CustomLabelInput";
import NumberLabel from "../../common/NumberLabel";
import DescriptionCard from "../../common/DescriptionCard";
import ImageUploader from "../../common/ImageUploader";
import PriceInput from "../../common/PriceInput";
import ActionButtons from "../../common/ActionButtons";
import TemplateStylePreview from "../../utils/TemplateStylePreview/TemplateStylePreview";
import ProductPublishedModal from "../../ProductPublishedModal";

import { db, deleteProduct } from "../../../config/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  where,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export default function DigitalProduct({
  mobilePreviewOpen = false,
  onClosePreview,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const newProduct = useSelector((s) => s.newProduct);
  const currentUser = useSelector((s) => s.auth.currentUser);

  const id = searchParams.get("id");

  const [publishedInfo, setPublishedInfo] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const ref = doc(db, "products", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const product = snap.data();
          const reviews = product.options?.reviews || [];
          dispatch(
            setExistingProduct({
              ...product,
              options: { ...(product.options || {}), reviews },
            })
          );
        }
      } else {
        dispatch(resetNewProduct());
        dispatch(initializeNewProduct());
      }
    };
    fetchProduct();
  }, [id, dispatch]);

  const handlePublish = async () => {
    try {
      const productsCol = collection(db, "products");
      if (id) {
        const ref = doc(db, "products", id);
        await updateDoc(ref, { ...newProduct, published: true });
        navigate("/mystore");
        return id;
      }
      const q = query(
        productsCol,
        where("username", "==", currentUser.username),
        orderBy("order", "desc"),
        limit(1)
      );
      const snapshot = await getDocs(q);

      let maxOrder = 0;
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (typeof data.order === "number") {
          maxOrder = data.order;
        }
      });

      const productWithOrder = {
        ...newProduct,
        order: maxOrder + 1,
        username: currentUser.username,
        published: true,
      };

      const docRef = await addDoc(productsCol, productWithOrder);
      setPublishedInfo({
        id: docRef.id,
        name: newProduct.template.addText.title,
      });
      return docRef.id;
    } catch (error) {
      console.error("Error publishing product:", error);
      throw error;
    }
  };

  const handlersReview = {
    add: (review) => dispatch(addReview(review)),
    remove: (id) => dispatch(removeReview(id)),
    update: (update) => dispatch(updateReview(update)),
  };

  // Định nghĩa tabs
  const tabs = [
    {
      label: "Thẻ sản phẩm",
      icon: <CiImageOn style={{ fontSize: 24, marginRight: 8 }} />,
      content: <PickStyleComponent onNext={() => goToTab(1)} id={id} />,
      rightPreview: (
        <TemplateStylePreview
          type={newProduct.template.pickStyle}
          productType={newProduct.type}
          title={newProduct.template.addText.title}
          description={newProduct.template.addText.description}
          buttonText={newProduct.template.addText.buttonText}
          imageUrl={newProduct.template.imageUrl}
        />
      ),
    },
    {
      label: "Trang thanh toán",
      icon: (
        <MdOutlineShoppingCartCheckout
          style={{ fontSize: 18, marginRight: 8 }}
        />
      ),
      content: <PaymentComponent handlePublish={handlePublish} id={id} />,
      rightPreview: <BookingCallScreen product={newProduct} />,
    },
    {
      label: "Tùy chọn",
      icon: <CgOptions style={{ fontSize: 24, marginRight: 8 }} />,
      content: (
        <OptionsComponent
          reviews={newProduct.options.reviews}
          reviewHandlers={handlersReview}
          handlePublish={handlePublish}
        />
      ),
      rightPreview: <BookingCallScreen product={newProduct} />,
    },
  ];

  // Hàm chuyển tab
  const goToTab = (idx) => {
    const label = tabs[idx]?.label;
    if (label) {
      const params = new URLSearchParams(searchParams);
      params.set("tab", label);
      setSearchParams(params);
    }
  };

  // Lấy index mặc định từ URL
  const tabParam = searchParams.get("tab");
  const initIndex = tabs.findIndex((t) => t.label === tabParam);
  const defaultIndex = initIndex >= 0 ? initIndex : 0;

  return (
    <>
      <TwoColumnLayout
        tabs={tabs}
        initialActiveTabIndex={defaultIndex}
        onTabChange={(i) => {
          const params = new URLSearchParams(searchParams);
          params.set("tab", tabs[i].label);
          setSearchParams(params);
        }}
        mobilePreviewOpen={mobilePreviewOpen}
        onClosePreview={onClosePreview}
      />
      <ProductPublishedModal
        isOpen={!!publishedInfo}
        productName={publishedInfo?.name}
        link={
          publishedInfo
            ? `${window.location.origin}/${currentUser.username}/${publishedInfo.id}`
            : ""
        }
        onClose={() => {
          setPublishedInfo(null);
          navigate("/mystore");
        }}
      />{" "}
    </>
  );
}

// ================= PickStyleComponent =================
function PickStyleComponent({ onNext }) {
  const dispatch = useDispatch();
  const template = useSelector((s) => s.newProduct.template);

  const pickStyle = useSelector((s) => s.newProduct.template.pickStyle);
  const addText = useSelector((s) => s.newProduct.template.addText);
  return (
    <div>
      <div style={{ marginBottom: 32, maxWidth: 360, width: "100%" }}>
        <NumberLabel number="1" label="Chọn kiểu" />
        <PickStyle
          hidePreview
          setTypeStyle={(id) => dispatch(setTemplatePickStyle(id))}
          selectedStyle={pickStyle}
        />
      </div>
      <div style={{ marginBottom: 32 }}>
        <NumberLabel number="2" label="Thêm chữ" />
        <CustomLabelInput
          label="Tiêu đề"
          maxLength={50}
          placeholder="Tiêu đề"
          value={addText.title}
          onChange={(val) => dispatch(setTemplateAddTextTitle(val))}
        />
        {pickStyle !== "button" && (
          <>
            <CustomLabelInput
              label="Mô tả"
              maxLength={100}
              placeholder="Mô tả"
              value={addText.description}
              onChange={(val) => dispatch(setTemplateAddTextDescription(val))}
            />
            <CustomLabelInput
              label="Nút"
              maxLength={50}
              placeholder="Nút"
              value={addText.buttonText}
              onChange={(val) => dispatch(setTemplateAddTextButtonText(val))}
            />
          </>
        )}
      </div>
      <NumberLabel number="3" label="Thêm hình thu nhỏ" />
      <ImageUploader
        onImageChange={({ url }) => dispatch(setTemplateImageUrl(url))}
        imageUrl={template.imageUrl}
      />
      <ActionButtons title="Tiếp tục" handleBtn={onNext} />
    </div>
  );
}

// ================= PaymentComponent =================

function PaymentComponent({ handlePublish, id }) {
  const dispatch = useDispatch();
  const checkout = useSelector((s) => s.newProduct.checkout);
  const navigate = useNavigate();

  const {
    title,
    description,
    bottomTitle,
    callActionButtonText,
    price,
    discount,
    collectInfo,
  } = checkout;

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <NumberLabel number="1" label="Chọn ảnh sản phẩm" />
        <ImageUploader
          onImageChange={({ url }) => dispatch(setCheckoutImageUrl(url))}
          imageUrl={checkout.imageUrl}
        />
      </div>
      <NumberLabel number="2" label="Thông tin sản phẩm" />
      <CustomLabelInput
        label="Tiêu đề"
        maxLength={50}
        placeholder="Tiêu đề"
        value={title}
        onChange={(val) => dispatch(setCheckoutTitle(val))}
      />
      <DescriptionCard
        title="Mô tả"
        description={description}
        onContentChange={(val) => {
          dispatch(setCheckoutDescription(val));
        }}
      />
      <CustomLabelInput
        label="Tiêu đề phần mua hàng"
        maxLength={50}
        placeholder="Tiêu đề mua"
        value={bottomTitle}
        onChange={(val) => dispatch(setCheckoutBottomTitle(val))}
      />
      <CustomLabelInput
        label="Nút mua hàng"
        maxLength={50}
        placeholder="MUA HÀNG"
        value={callActionButtonText}
        onChange={(val) => dispatch(setCheckoutCallActionButtonText(val))}
      />
      <PriceInput
        price={price}
        discount={discount}
        onPriceChange={(val) => dispatch(setCheckoutPrice(val))}
        onDiscountChange={(val) => dispatch(setCheckoutDiscount(val))}
      />
      <NumberLabel number="3" label="Thu thập thông tin" />
      <FieldsSection
        fields={collectInfo.fields}
        onAddField={(type) => dispatch(addCollectField({ id: uuidv4(), type }))}
        onLabelChange={(id, label) =>
          dispatch(updateCollectFieldLabel({ id, label }))
        }
        onToggleRequired={(id, required) =>
          dispatch(updateCollectFieldRequired({ id, required }))
        }
        onRemoveField={(id) => dispatch(removeCollectField(id))}
        onAddOption={(id) => dispatch(addCollectFieldOption({ id }))}
        onOptionChange={(id, idx, val) =>
          dispatch(
            updateCollectFieldOption({ id, optionIndex: idx, value: val })
          )
        }
        onRemoveOption={(id, idx) =>
          dispatch(removeCollectFieldOption({ id, optionIndex: idx }))
        }
        onReorder={(oldIdx, newIdx) =>
          dispatch(reorderCollectFields({ oldIndex: oldIdx, newIndex: newIdx }))
        }
      />
      <ActionButtons
        title="Xuất bản"
        handleBtn={handlePublish}
        deleteBtn={id ? true : false}
        onDelete={() => {
          deleteProduct(id);
          navigate("/mystore");
        }}
      />
    </div>
  );
}

// ================= OptionsComponent =================

function OptionsComponent({ reviews, reviewHandlers, handlePublish }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <AddReviews
        reviews={reviews}
        onAdd={(r) => reviewHandlers.add(r)}
        onRemove={(id) => reviewHandlers.remove(id)}
        onUpdate={(u) => reviewHandlers.update(u)}
      />
      <ActionButtons title="Xuất bản" deleteBtn handleBtn={handlePublish} />
    </div>
  );
}
