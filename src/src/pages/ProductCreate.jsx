import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ProductCreate.module.scss";

// SVG icons
const FileIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.5 4.5V14.5H2.5V1.5H10.5L13.5 4.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 1.5H13C13.2761 1.5 13.5 1.72386 13.5 2V14C13.5 14.2761 13.2761 14.5 13 14.5H3C2.72386 14.5 2.5 14.2761 2.5 14V2C2.5 1.72386 2.72386 1.5 3 1.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 12H8.01"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.5 4L6 11.5L2.5 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DiscordIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5 3.5C7.5 1 8.5 1 13.5 3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.25 10.5C13.25 12.5 11.75 14.5 8 14.5C4.25 14.5 2.75 12.5 2.75 10.5C2.75 8.5 4.25 6.5 8 6.5C11.75 6.5 13.25 8.5 13.25 10.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.5 10.5C5.5 11.0523 5.94772 11.5 6.5 11.5C7.05228 11.5 7.5 11.0523 7.5 10.5C7.5 9.94772 7.05228 9.5 6.5 9.5C5.94772 9.5 5.5 9.94772 5.5 10.5Z"
      fill="currentColor"
    />
    <path
      d="M8.5 10.5C8.5 11.0523 8.94772 11.5 9.5 11.5C10.0523 11.5 10.5 11.0523 10.5 10.5C10.5 9.94772 10.0523 9.5 9.5 9.5C8.94772 9.5 8.5 9.94772 8.5 10.5Z"
      fill="currentColor"
    />
  </svg>
);

const GithubIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 10.8683 3.43842 13.2755 6.05371 14.0691C6.40073 14.1368 6.5 13.9217 6.5 13.7399V12.5091C4.8696 12.8654 4.50762 11.7844 4.50762 11.7844C4.22659 11.0358 3.81548 10.8228 3.81548 10.8228C3.25293 10.4294 3.86182 10.4379 3.86182 10.4379C4.48657 10.4844 4.81323 11.1132 4.81323 11.1132C5.36426 12.0355 6.21851 11.8161 6.53174 11.6407C6.59619 11.2326 6.77197 10.9597 6.96484 10.8056C5.67627 10.6494 4.32031 10.1218 4.32031 7.6123C4.32031 6.90283 4.55762 6.32373 4.82764 5.87402C4.75342 5.69922 4.54932 5.05371 4.89282 4.16846C4.89282 4.16846 5.40918 3.98267 6.49829 4.81152C7.00293 4.65625 7.5 4.57812 8 4.57617C8.5 4.57812 9.00098 4.65625 9.50171 4.81152C10.5908 3.98267 11.1072 4.16846 11.1072 4.16846C11.4507 5.05371 11.2466 5.69922 11.1724 5.87402C11.4443 6.32373 11.6797 6.90283 11.6797 7.6123C11.6797 10.1277 10.3218 10.6475 9.02856 10.7998C9.27148 10.9915 9.5 11.3677 9.5 11.9473V13.7399C9.5 13.9236 9.59766 14.1407 9.9519 14.0691C12.5654 13.2736 14.5 10.8683 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5Z"
      fill="currentColor"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 1.5V10.5M8 10.5L5 7.5M8 10.5L11 7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.5 10.5V12.5C2.5 13.0523 2.94772 13.5 3.5 13.5H12.5C13.0523 13.5 13.5 13.0523 13.5 12.5V10.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const KeyIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5 1.5L14.5 5.5M14.5 5.5L10.5 9.5M14.5 5.5H7.5C4.5 5.5 2.5 7.5 1.5 10.5V14.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MeterIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M8 4.5V8L10.5 10.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 3.5V12.5M3.5 8H12.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ImageIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 16L8.293 10.7071C8.6835 10.3166 9.3165 10.3166 9.70703 10.7071L15 16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.5 13.5L13.293 11.7071C13.6835 11.3166 14.3165 11.3166 14.7071 11.7071L21 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="16.5" cy="7.5" r="1.5" fill="currentColor" />
  </svg>
);

const PlusIconThick = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5V19M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Use classNames with bind
const cx = classNames.bind(styles);

function ProductCreate() {
  // State for toggle switches
  const [nameRequired, setNameRequired] = useState(true);
  const [phoneRequired, setPhoneRequired] = useState(true);

  // State for benefits expansion
  const [expandedBenefits, setExpandedBenefits] = useState({
    custom: true,
    discord: false,
    github: false,
    fileDownloads: false,
    licenseKeys: false,
    meterCredits: false,
  });

  // Toggle expansion for benefits
  const toggleBenefit = (benefit) => {
    setExpandedBenefits({
      ...expandedBenefits,
      [benefit]: !expandedBenefits[benefit],
    });
  };

  return (
    <div className={cx("container")}>
      {/* Image 2 content */}
      <div className={cx("createProduct")}>
        <h1 className={cx("pageTitle")}>Create Product</h1>

        <div className={cx("section")}>
          <div className={cx("sectionHeader")}>
            <h2 className={cx("sectionTitle")}>Product Information</h2>
            <p className={cx("sectionDescription")}>
              Basic product information which helps identify the product
            </p>
          </div>

          <div className={cx("formGroup")}>
            <label className={cx("label")}>Name</label>
            <input type="text" className={cx("input")} />
          </div>

          <div className={cx("formGroup")}>
            <div className={cx("labelWithFormat")}>
              <label className={cx("label")}>Description</label>
              <span className={cx("formatHint")}>Markdown format</span>
            </div>
            <textarea className={cx("textarea")}></textarea>
          </div>
        </div>

        <div className={cx("section")}>
          <div className={cx("sectionHeader")}>
            <h2 className={cx("sectionTitle")}>Pricing</h2>
            <p className={cx("sectionDescription")}>
              Set your billing cycle and pricing model
            </p>
          </div>

          <div className={cx("selectGroup")}>
            <div className={cx("select")}>
              <span>One-time purchase</span>
              <ChevronIcon />
            </div>
          </div>

          <div className={cx("selectGroup")}>
            <div className={cx("select")}>
              <span>Free</span>
              <ChevronIcon />
            </div>
          </div>
        </div>

        <div className={cx("section")}>
          <div className={cx("sectionHeader")}>
            <h2 className={cx("sectionTitle")}>Media</h2>
            <p className={cx("sectionDescription")}>
              Enhance the product page with medias, giving the customers a
              better idea of the product
            </p>
          </div>

          <div className={cx("mediaUpload")}>
            <ImageIcon />
            <h3 className={cx("mediaTitle")}>Add product media</h3>
            <p className={cx("mediaDescription")}>
              Up to 10MB each. 16:9 ratio recommended for optimal display.
            </p>
          </div>
        </div>
      </div>

      {/* Image 1 content */}
      <div className={cx("checkoutFields")}>
        <h2 className={cx("sectionTitle")}>Checkout Fields</h2>
        <p className={cx("sectionDescription")}>
          Ask for additional information from the customer during checkout
        </p>
        <a href="#" className={cx("manageLink")}>
          Manage Custom Fields
        </a>

        <div className={cx("fieldItem")}>
          <div className={cx("fieldIcon")}>
            <FileIcon />
          </div>
          <span className={cx("fieldName")}>Họ và tên</span>
          <div className={cx("fieldControls")}>
            <span className={cx("requiredText")}>Required</span>
            <div className={cx("toggleWrapper")}>
              <button
                className={cx("toggle", { active: nameRequired })}
                onClick={() => setNameRequired(!nameRequired)}
              >
                <span className={cx("toggleSlider")}></span>
              </button>
            </div>
            <button className={cx("removeButton")}>×</button>
          </div>
        </div>

        <div className={cx("fieldItem")}>
          <div className={cx("fieldIcon")}>
            <PhoneIcon />
          </div>
          <span className={cx("fieldName")}>Số điện thoại</span>
          <div className={cx("fieldControls")}>
            <span className={cx("requiredText")}>Required</span>
            <div className={cx("toggleWrapper")}>
              <button
                className={cx("toggle", { active: phoneRequired })}
                onClick={() => setPhoneRequired(!phoneRequired)}
              >
                <span className={cx("toggleSlider")}></span>
              </button>
            </div>
            <button className={cx("removeButton")}>×</button>
          </div>
        </div>

        <div className={cx("metadataSection")}>
          <h2 className={cx("sectionTitle")}>Metadata</h2>
          <p className={cx("sectionDescription")}>
            Optional metadata to associate with the product
          </p>

          <button className={cx("addButton")}>Add Metadata</button>
        </div>

        <div className={cx("benefitsSection")}>
          <h2 className={cx("sectionTitle")}>Automated Benefits</h2>
          <p className={cx("sectionDescription")}>
            Configure which benefits you want to grant to your customers when
            they purchase the product
          </p>

          <div className={cx("benefitItem")}>
            <div
              className={cx("benefitHeader", {
                expanded: expandedBenefits.custom,
              })}
              onClick={() => toggleBenefit("custom")}
            >
              <div className={cx("benefitTitleRow")}>
                <div className={cx("benefitCheck")}>
                  <CheckIcon />
                </div>
                <span className={cx("benefitTitle")}>Custom</span>
              </div>
              <div className={cx("benefitCount")}>
                <span>0</span>
                <ChevronIcon />
              </div>
            </div>
          </div>

          <div className={cx("benefitItem")}>
            <div
              className={cx("benefitHeader", {
                expanded: expandedBenefits.discord,
              })}
              onClick={() => toggleBenefit("discord")}
            >
              <div className={cx("benefitTitleRow")}>
                <div className={cx("benefitIcon")}>
                  <DiscordIcon />
                </div>
                <span className={cx("benefitTitle")}>Discord Invite</span>
              </div>
              <div className={cx("benefitCount")}>
                <span>0</span>
                <ChevronIcon />
              </div>
            </div>

            {expandedBenefits.discord && (
              <div className={cx("benefitContent")}>
                <p className={cx("noBenefitText")}>
                  You haven't configured any Discord Invite
                </p>
                <button className={cx("createNewButton")}>
                  <PlusIcon /> Create New
                </button>
              </div>
            )}
          </div>

          <div className={cx("benefitItem")}>
            <div
              className={cx("benefitHeader", {
                expanded: expandedBenefits.github,
              })}
              onClick={() => toggleBenefit("github")}
            >
              <div className={cx("benefitTitleRow")}>
                <div className={cx("benefitIcon")}>
                  <GithubIcon />
                </div>
                <span className={cx("benefitTitle")}>
                  GitHub Repository Access
                </span>
              </div>
              <div className={cx("benefitCount")}>
                <span>0</span>
                <ChevronIcon />
              </div>
            </div>

            {expandedBenefits.github && (
              <div className={cx("benefitContent")}>
                <p className={cx("noBenefitText")}>
                  You haven't configured any GitHub Repository Access
                </p>
                <button className={cx("createNewButton")}>
                  <PlusIcon /> Create New
                </button>
              </div>
            )}
          </div>

          <div className={cx("benefitItem")}>
            <div
              className={cx("benefitHeader", {
                expanded: expandedBenefits.fileDownloads,
              })}
              onClick={() => toggleBenefit("fileDownloads")}
            >
              <div className={cx("benefitTitleRow")}>
                <div className={cx("benefitIcon")}>
                  <DownloadIcon />
                </div>
                <span className={cx("benefitTitle")}>File Downloads</span>
              </div>
              <div className={cx("benefitCount")}>
                <span>0</span>
                <ChevronIcon />
              </div>
            </div>

            {expandedBenefits.fileDownloads && (
              <div className={cx("benefitContent")}>
                <p className={cx("noBenefitText")}>
                  You haven't configured any File Downloads
                </p>
                <button className={cx("createNewButton")}>
                  <PlusIcon /> Create New
                </button>
              </div>
            )}
          </div>

          <div className={cx("benefitItem")}>
            <div
              className={cx("benefitHeader", {
                expanded: expandedBenefits.licenseKeys,
              })}
              onClick={() => toggleBenefit("licenseKeys")}
            >
              <div className={cx("benefitTitleRow")}>
                <div className={cx("benefitIcon")}>
                  <KeyIcon />
                </div>
                <span className={cx("benefitTitle")}>License Keys</span>
              </div>
              <div className={cx("benefitCount")}>
                <span>0</span>
                <ChevronIcon />
              </div>
            </div>

            {expandedBenefits.licenseKeys && (
              <div className={cx("benefitContent")}>
                <p className={cx("noBenefitText")}>
                  You haven't configured any License Keys
                </p>
                <button className={cx("createNewButton")}>
                  <PlusIcon /> Create New
                </button>
              </div>
            )}
          </div>

          <div className={cx("benefitItem")}>
            <div
              className={cx("benefitHeader", {
                expanded: expandedBenefits.meterCredits,
              })}
              onClick={() => toggleBenefit("meterCredits")}
            >
              <div className={cx("benefitTitleRow")}>
                <div className={cx("benefitIcon")}>
                  <MeterIcon />
                </div>
                <span className={cx("benefitTitle")}>Meter Credits</span>
              </div>
              <div className={cx("benefitCount")}>
                <span>0</span>
                <ChevronIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCreate;
