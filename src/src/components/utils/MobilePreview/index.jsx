// src/components/MobilePreview/MobilePreview.jsx
import React from "react";
import classNames from "classnames/bind";
import styles from "./MobilePreview.module.scss";

const cx = classNames.bind(styles);

/**
 * Props:
 *  - currentStep: 'productCard' | 'checkout' | 'addons'
 *  - data: object chứa các thông tin cần hiển thị (image, title, description, price, buttonLabel, v.v.)
 */
export default function MobilePreview({ currentStep, data }) {
  return (
    <div className={cx("mobile-preview")}>
      <div className={cx("mobile-frame")}>
        {/* Header/back button */}
        <div className={cx("mobile-header")}>
          <button className={cx("back-button")}>&larr;</button>
        </div>
        <div className={cx("mobile-content")}>
          {currentStep === "productCard" && (
            <div className={cx("preview-card")}>
              <div className={cx("preview-img")}>
                {data.thumbnail ? (
                  <img src={data.thumbnail} alt="Thumb" />
                ) : (
                  <div className={cx("img-placeholder")} />
                )}
              </div>
              <h3 className={cx("preview-title")}>{data.title}</h3>
              <span className={cx("preview-price")}>${data.price}</span>
              <p className={cx("preview-desc")}>{data.description}</p>
              <button className={cx("preview-btn")}>{data.buttonLabel}</button>
            </div>
          )}

          {currentStep === "checkout" && (
            <div className={cx("preview-checkout")}>
              <div className={cx("preview-img")}>
                {data.productImage ? (
                  <img src={data.productImage} alt="Product" />
                ) : (
                  <div className={cx("img-placeholder")} />
                )}
              </div>
              <h3 className={cx("preview-title")}>{data.title}</h3>
              <p className={cx("preview-desc")}>{data.description}</p>
              <div className={cx("price-section")}>
                <span className={cx("preview-price")}>${data.price}</span>
                {data.hasDiscount && (
                  <span className={cx("preview-discount")}>
                    ${data.discountPrice}
                  </span>
                )}
              </div>
              <button className={cx("preview-btn")}>
                {data.buyButtonLabel}
              </button>
            </div>
          )}

          {currentStep === "addons" && (
            <div className={cx("preview-addons")}>
              <h3 className={cx("addons-heading")}>Your Add-ons</h3>
              <ul className={cx("addons-list")}>
                {data.selectedAddons?.length > 0
                  ? data.selectedAddons.map((ad, idx) => (
                      <li key={idx} className={cx("addon-item")}>
                        {ad}
                      </li>
                    ))
                  : "No add-ons selected."}
              </ul>
              <button className={cx("preview-btn")}>
                {data.publish ? "Published" : "Publish"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
