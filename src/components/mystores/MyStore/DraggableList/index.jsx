// src/components/DraggableList/DraggableList.jsx
import React, { useState } from "react";
import cx from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import StoreHeader from "../StoreHeader";
import {
  writeBatch,
  doc,
  updateDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db, deleteProduct } from "../../../../config/firebase";
import styles from "./DraggableList.module.scss";
import {
  RiDownloadLine,
  RiFileCopyLine,
  RiEyeOffLine,
  RiFileCopy2Line,
  RiDeleteBinLine,
} from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineWeb } from "react-icons/md";
import ActionPopover from "./ActionPopover";
import { LuCalendarDays } from "react-icons/lu";
import { TbSchool } from "react-icons/tb";
import ChangeThumbnailModal from "../ChangeThumbnailModal";

const bind = cx.bind(styles);

export default function DraggableList({ products = [], setProducts }) {
  const [dragged, setDragged] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleDragStart = (e, index) => {
    setDragged(index);
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => e.target.classList.add(bind("dragging")), 0);
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove(bind("dragging"));
    setDragged(null);
    setDragOverIdx(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIdx(index);
  };

  const handleDragLeave = () => setDragOverIdx(null);

  const handleDrop = async (e, dropIndex) => {
    e.preventDefault();
    if (dragged === null || dragged === dropIndex) return;

    const newList = [...products];
    const [movedItem] = newList.splice(dragged, 1);
    newList.splice(dropIndex, 0, movedItem);

    const updated = newList.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }));

    setProducts(updated);

    const batch = writeBatch(db);
    updated.forEach((item) => {
      const ref = doc(db, "products", item.id);
      batch.update(ref, { order: item.order });
    });

    try {
      await batch.commit();
    } catch (err) {
      console.error("Lỗi lưu order:", err);
    }

    setDragged(null);
    setDragOverIdx(null);
  };

  const handleItemClick = (product) => {
    navigate(`/mystore/create-product/${product.type}?id=${product.id}`);
  };

  const handleActionBtn = (e, product) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setMenuAnchor(e.currentTarget);
  };

  const handleDuplicateProduct = async () => {
    if (!selectedProduct) return;
    try {
      const productsCol = collection(db, "products");
      const q = query(
        productsCol,
        where("username", "==", selectedProduct.username),
        orderBy("order", "desc"),
        limit(1)
      );
      const snap = await getDocs(q);
      let maxOrder = 0;
      snap.forEach((docSnap) => {
        const data = docSnap.data();
        if (typeof data.order === "number") maxOrder = data.order;
      });

      const { id, ...clone } = selectedProduct;
      const docRef = await addDoc(productsCol, {
        ...clone,
        template: {
          ...clone.template,
          addText: {
            ...clone.template.addText,
            title: `${clone.template.addText.title} (Sao chép)`,
          },
        },
        order: maxOrder + 1,
      });

      // navigate(`/mystore/create-product/${selectedProduct.type}?id=${docRef.id}`);
      return docRef.id;
    } catch (err) {
      console.error("Duplicate failed:", err);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    try {
      await deleteProduct(selectedProduct.id);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleSaveStyle = async (data) => {
    if (!selectedProduct) return;
    try {
      const ref = doc(db, "products", selectedProduct.id);
      const updateData = typeof data === "string" ? { style: data } : data;
      await updateDoc(ref, {
        template: {
          ...selectedProduct.template,
          pickStyle: updateData.style || selectedProduct.template.pickStyle,
          imageUrl: updateData.imageUrl || selectedProduct.template.imageUrl,
          addText: {
            ...selectedProduct.template.addText,
            title: updateData.title ?? selectedProduct.template.addText.title,
            description:
              updateData.description ??
              selectedProduct.template.addText.description,
            buttonText:
              updateData.buttonText ??
              selectedProduct.template.addText.buttonText,
          },
        },
      });
      setShowChangeModal(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("Update style failed:", err);
    }
  };

  const renderIcon = (type) => {
    const iconMap = {
      email: "👤",
      DigitalProduct: <RiDownloadLine />,
      CoachingCall: <LuCalendarDays />,
      custom: "📋",
      OnlineCourse: <TbSchool />,
      membership: "🔄",
      webinar: "💻",
      community: "👥",
      media: "🔗",
      affiliate: "💰",
    };

    return <div>{iconMap[type]}</div>;
  };

  const menuOptions = selectedProduct
    ? [
        {
          label: "Sao chép link sản phẩm",
          icon: <RiFileCopyLine />,
          onClick: () => {
            const url = `https://bao-la.web.app/${currentUser.username}/${selectedProduct.id}`;
            navigator.clipboard.writeText(url);
            toast("Đã sao chép!");
          },
        },
        {
          label: "Đổi kiểu thumbnail",
          icon: <MdOutlineWeb />,
          onClick: () => setShowChangeModal(true),
        },
        {
          label: "Chỉnh sửa sản phẩm",
          icon: <AiOutlineEdit />,
          onClick: () =>
            navigate(
              `/mystore/create-product/${selectedProduct.type}?id=${selectedProduct.id}`
            ),
        },
        {
          label: "Hủy xuất bản",
          icon: <RiEyeOffLine />,
          onClick: async () => {
            if (!selectedProduct) return;
            try {
              const ref = doc(db, "products", selectedProduct.id);
              await updateDoc(ref, { published: false });
            } catch (err) {
              console.error("Unpublish failed:", err);
            }
          },
        },
        {
          label: "Nhân bản sản phẩm",
          icon: <RiFileCopy2Line />,
          onClick: handleDuplicateProduct,
        },

        {
          label: "Xóa sản phẩm",
          icon: <RiDeleteBinLine />,
          onClick: handleDeleteProduct,
        },
      ]
    : [];

  return (
    <div className={bind("draggable-container")}>
      <StoreHeader />
      <div className={bind("items-list")}>
        {products
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map((item, idx) => (
            <div
              key={item.id}
              className={bind("item-card", item.bgColor, {
                "drag-over": dragOverIdx === idx,
              })}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, idx)}
              onClick={() => handleItemClick(item)}
            >
              <div className={bind("drag-handle")}>⋮⋮</div>
              <div className={bind("item-icon")}>
                {/* <img
                  src={item.template.imageUrl}
                  alt={item.title}
                  className={bind("icon-wrapper", `${item.bgColor}-bg`)}
                /> */}

                {item.template.imageUrl ? (
                  <img
                    src={item.template.imageUrl}
                    alt={item.title}
                    className={bind("icon-wrapper", `${item.bgColor}-bg`)}
                  />
                ) : (
                  <div
                    className={bind("icon-placeholder", `${item.bgColor}-bg`)}
                  >
                    {/* Bạn có thể để icon mặc định hoặc placeholder */}
                  </div>
                )}
              </div>
              <div className={bind("item-content")}>
                <div className={bind("item-header")}>
                  <h3 className={bind("item-title")}>
                    {item.template.addText.title}
                  </h3>
                  {renderIcon(item.type)}
                </div>
                <p className={bind("item-price")}>{item.price}</p>
              </div>
              <div className={bind("item-actions")}>
                <button
                  className={bind("action-btn")}
                  onClick={(e) => handleActionBtn(e, item)}
                >
                  ⋯
                </button>
              </div>
            </div>
          ))}
      </div>
      <ActionPopover
        anchorEl={menuAnchor}
        options={menuOptions}
        onClose={() => {
          setMenuAnchor(null);
        }}
      />
      <div
        className={bind("instructions")}
        onClick={() => navigate("/mystore/choose-product-type")}
      >
        + Thêm sản phẩm
      </div>
      <ChangeThumbnailModal
        isOpen={showChangeModal}
        product={selectedProduct}
        onClose={() => {
          setShowChangeModal(false);
          setSelectedProduct(null);
        }}
        onSave={handleSaveStyle}
      />
    </div>
  );
}
