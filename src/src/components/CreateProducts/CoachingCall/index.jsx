import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { BsCalendar3Week } from "react-icons/bs";
import { CgOptions } from "react-icons/cg";

import TwoColumnLayout from "../../utils/TwoColumnLayout/TwoColumnLayout";
import CheckoutComponent from "./CheckoutComponent";
import AvaiblityTimeComponent from "./AvaiblityTimeComponent";
import OptionsComponent from "./OptionsComponent";
import { v4 as uuidv4 } from "uuid";
import BookingCallScreen from "../../BookingCallScreen";
import ProductPublishedModal from "../../ProductPublishedModal";

import {
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
  reorderCollectFields,
  addReview,
  removeReview,
  updateReview,
  initializeCoachingCall,
  setExistingProduct,
} from "../../../store/newCoachingCallSlice";

import { useNavigate, useSearchParams } from "react-router-dom";

import { db } from "../../../config/firebase";
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

export default function CoachingCall({
  mobilePreviewOpen = false,
  onClosePreview,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const coachingCall = useSelector((state) => state.coachingCall);
  const currentUser = useSelector((state) => state.auth.currentUser);

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
      }
    };
    fetchProduct();
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(initializeCoachingCall());
  }, [dispatch]);

  // Handlers for checkout
  const handleCheckoutImage = (url) => dispatch(setCheckoutImageUrl(url));
  const handleCheckoutTitle = (val) => dispatch(setCheckoutTitle(val));
  const handleCheckoutDesc = (val) => dispatch(setCheckoutDescription(val));
  const handleCheckoutBottom = (val) => dispatch(setCheckoutBottomTitle(val));
  const handleCheckoutCTA = (val) =>
    dispatch(setCheckoutCallActionButtonText(val));
  const handleCheckoutPrice = (val) => dispatch(setCheckoutPrice(val));
  const handleCheckoutDiscount = (val) => dispatch(setCheckoutDiscount(val));

  const handleAddField = (type) =>
    dispatch(addCollectField({ id: uuidv4(), type }));
  const handleLabelChange = (id, label) =>
    dispatch(updateCollectFieldLabel({ id, label }));
  const handleToggleRequired = (id, required) =>
    dispatch(updateCollectFieldRequired({ id, required }));
  const handleRemoveField = (id) => dispatch(removeCollectField(id));
  const handleAddOption = (id) => dispatch(addCollectFieldOption({ id }));
  const handleOptionChange = (id, index, value) =>
    dispatch(updateCollectFieldOption({ id, optionIndex: index, value }));
  const handleRemoveOption = (id, index) =>
    dispatch(removeCollectFieldOption({ id, optionIndex: index }));
  const handleReorder = (oldIndex, newIndex) =>
    dispatch(reorderCollectFields({ oldIndex, newIndex }));

  // Handlers for reviews
  const handlersReview = {
    add: (review) => dispatch(addReview(review)),
    remove: (id) => dispatch(removeReview(id)),
    update: (update) => dispatch(updateReview(update)),
  };

  const handlePublish = async () => {
    try {
      const productsCol = collection(db, "products");
      if (id) {
        const ref = doc(db, "products", id);
        await updateDoc(ref, { ...coachingCall, published: true });
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

      // Gán order mới = maxOrder + 1
      const productWithOrder = {
        ...coachingCall,
        order: maxOrder + 1,
        username: currentUser.username,
        published: true,
      };

      const docRef = await addDoc(productsCol, productWithOrder);
      setPublishedInfo({
        id: docRef.id,
        name: coachingCall.template.addText.title,
      });
      return docRef.id;
    } catch (error) {
      console.error("Error publishing product:", error);
      throw error;
    }
  };

  const tabs = [
    {
      label: "Trang thanh toán",
      icon: (
        <MdOutlineShoppingCartCheckout
          style={{ fontSize: 24, marginRight: 8 }}
        />
      ),
      content: (
        <CheckoutComponent
          checkout={coachingCall.checkout}
          onImageChange={handleCheckoutImage}
          onTitleChange={handleCheckoutTitle}
          onDescriptionChange={handleCheckoutDesc}
          onBottomTitleChange={handleCheckoutBottom}
          onCTAChange={handleCheckoutCTA}
          onPriceChange={handleCheckoutPrice}
          onDiscountChange={handleCheckoutDiscount}
          collectInfo={coachingCall.checkout.collectInfo.fields}
          onAddField={handleAddField}
          onLabelChange={handleLabelChange}
          onToggleRequired={handleToggleRequired}
          onRemoveField={handleRemoveField}
          onAddOption={handleAddOption}
          onOptionChange={handleOptionChange}
          onRemoveOption={handleRemoveOption}
          onReorder={handleReorder}
          onNext={() => goToTab(1)}
        />
      ),
      rightPreview: <BookingCallScreen product={coachingCall} />,
    },
    {
      label: "Lịch",
      icon: <BsCalendar3Week style={{ fontSize: 18, marginRight: 8 }} />,
      content: (
        <AvaiblityTimeComponent
          availableTime={coachingCall.availableTime}
          dispatch={dispatch}
          handlePublish={handlePublish}
        />
      ),
      rightPreview: <BookingCallScreen product={coachingCall} />,
    },
    {
      label: "Tùy chọn",
      icon: <CgOptions style={{ fontSize: 24, marginRight: 8 }} />,
      content: (
        <OptionsComponent
          reviews={coachingCall.options.reviews}
          reviewHandlers={handlersReview}
          handlePublish={handlePublish}
        />
      ),
      rightPreview: <BookingCallScreen product={coachingCall} />,
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
      />
    </>
  );
}
