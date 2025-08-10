// src/components/PaymentMethods/PaymentMethods.jsx
import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./PaymentMethods.module.scss";
import { AiOutlineFileImage } from "react-icons/ai"; // icon để biểu diễn việc upload QR
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/authSlice";
import { uploadImage } from "../../config/firebase";
import { updatePaymentMethod } from "../../config/userService";

const cx = classNames.bind(styles);

const PaymentMethods = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [method, setMethod] = useState("");

  // State cho từng phương thức
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
    branch: "",
  });

  const [momoPhone, setMomoPhone] = useState("");
  const [vnpayPhone, setVnpayPhone] = useState("");
  const [qrImage, setQrImage] = useState(null);
  const [existingQrUrl, setExistingQrUrl] = useState(null);

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (currentUser && currentUser.paymentMethod) {
      const pm = currentUser.paymentMethod;
      setMethod(pm.type || "");
      if (pm.type === "bank" && pm.bankInfo) {
        setBankInfo({
          bankName: pm.bankInfo.bankName || "",
          accountName: pm.bankInfo.accountName || "",
          accountNumber: pm.bankInfo.accountNumber || "",
          branch: pm.bankInfo.branch || "",
        });
      } else if (pm.type === "momo") {
        setMomoPhone(pm.momoPhone || "");
      } else if (pm.type === "vnpay") {
        setVnpayPhone(pm.vnpayPhone || "");
      } else if (pm.type === "qr") {
        setExistingQrUrl(pm.qrUrl || null);
      }
    }
  }, [currentUser]);

  // Handler thay đổi phương thức
  const handleMethodChange = (e) => {
    setMethod(e.target.value);
    setExistingQrUrl(null);
    setQrImage(null);
  };

  // Handler cho các input ngân hàng
  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setBankInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handler upload QR
  const handleQrUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setQrImage(e.target.files[0]);
    }
  };

  // Lưu thông tin phương thức thanh toán lên Firebase
  const handleSave = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    if (!currentUser) {
      setErrorMsg("Vui lòng đăng nhập lại.");
      return;
    }
    setSaving(true);
    try {
      const payload = { type: method };
      if (method === "bank") {
        payload.bankInfo = bankInfo;
      } else if (method === "momo") {
        payload.momoPhone = momoPhone;
      } else if (method === "vnpay") {
        payload.vnpayPhone = vnpayPhone;
      } else if (method === "qr" && qrImage) {
        const url = await uploadImage(qrImage, `paymentQrs/${currentUser.uid}`);
        payload.qrUrl = url;
      }

      await updatePaymentMethod(currentUser.uid, payload);
      setSuccessMsg("Thông tin phương thức đã được lưu!");
    } catch (err) {
      console.error("Save payment method error:", err);
      setErrorMsg("Không thể lưu. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={cx("payment")}>
      <h2 className={cx("sectionTitle")}>Phương thức thanh toán</h2>
      <p className={cx("description")}>
        Chọn cách bạn muốn nhận tiền từ nền tảng. Vui lòng nhập đầy đủ thông tin
        và nhấn “Lưu”.
      </p>

      {/* Chọn loại phương thức */}
      <div className={cx("formGroup", "methodGroup")}>
        <label className={cx("label")}>Chọn phương thức</label>
        <select
          className={cx("input", "select")}
          value={method}
          onChange={handleMethodChange}
        >
          <option value="">-- Vui lòng chọn --</option>
          <option value="bank">Chuyển khoản ngân hàng</option>
          <option value="momo">Ví Momo</option>
          <option value="vnpay">Ví VNPAY</option>
          <option value="qr">Tải lên mã QR</option>
        </select>
      </div>

      {/* Nếu chọn Chuyển khoản ngân hàng */}
      {method === "bank" && (
        <div className={cx("bankSection")}>
          <div className={cx("formGrid")}>
            <div className={cx("formGroup")}>
              <label className={cx("label")}>Tên ngân hàng</label>
              <input
                type="text"
                name="bankName"
                className={cx("input")}
                placeholder="Ví dụ: Vietcombank"
                value={bankInfo.bankName}
                onChange={handleBankChange}
              />
            </div>
            <div className={cx("formGroup")}>
              <label className={cx("label")}>Tên chủ tài khoản</label>
              <input
                type="text"
                name="accountName"
                className={cx("input")}
                placeholder="Ví dụ: NGUYEN VAN A"
                value={bankInfo.accountName}
                onChange={handleBankChange}
              />
            </div>
            <div className={cx("formGroup")}>
              <label className={cx("label")}>Số tài khoản</label>
              <input
                type="text"
                name="accountNumber"
                className={cx("input")}
                placeholder="Ví dụ: 0123456789"
                value={bankInfo.accountNumber}
                onChange={handleBankChange}
              />
            </div>
            <div className={cx("formGroup")}>
              <label className={cx("label")}>Chi nhánh/Phòng giao dịch</label>
              <input
                type="text"
                name="branch"
                className={cx("input")}
                placeholder="Ví dụ: Chi nhánh Hà Nội"
                value={bankInfo.branch}
                onChange={handleBankChange}
              />
            </div>
          </div>
        </div>
      )}

      {/* Nếu chọn Ví Momo */}
      {method === "momo" && (
        <div className={cx("walletSection")}>
          <div className={cx("formGroup")}>
            <label className={cx("label")}>Số điện thoại Momo</label>
            <input
              type="tel"
              className={cx("input")}
              placeholder="Ví dụ: 0912345678"
              value={momoPhone}
              onChange={(e) => setMomoPhone(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Nếu chọn Ví VNPAY */}
      {method === "vnpay" && (
        <div className={cx("walletSection")}>
          <div className={cx("formGroup")}>
            <label className={cx("label")}>Số điện thoại VNPAY</label>
            <input
              type="tel"
              className={cx("input")}
              placeholder="Ví dụ: 0912345678"
              value={vnpayPhone}
              onChange={(e) => setVnpayPhone(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Nếu chọn tải lên mã QR */}
      {method === "qr" && (
        <div className={cx("qrSection")}>
          <div className={cx("formGroup")}>
            <label className={cx("label")}>Tải lên hình ảnh mã QR</label>
            <div className={cx("qrUploadWrapper")}>
              <input
                type="file"
                accept="image/*"
                id="qrUpload"
                className={cx("fileInput")}
                onChange={handleQrUpload}
              />
              <label htmlFor="qrUpload" className={cx("uploadLabel")}>
                <AiOutlineFileImage className={cx("uploadIcon")} />
                {qrImage
                  ? qrImage.name
                  : existingQrUrl
                  ? "Đổi tập tin..."
                  : "Chọn tập tin..."}{" "}
              </label>
            </div>
          </div>
          {(qrImage || existingQrUrl) && (
            <div className={cx("qrPreview")}>
              <img
                src={qrImage ? URL.createObjectURL(qrImage) : existingQrUrl}
                alt="QR Preview"
                className={cx("qrImage")}
              />
            </div>
          )}
        </div>
      )}

      {errorMsg && <p className={cx("error-message")}>{errorMsg}</p>}
      {successMsg && <p className={cx("success-message")}>{successMsg}</p>}

      {/* Nút Lưu */}
      <button
        className={cx("button", method ? "" : "buttonDisabled")}
        onClick={handleSave}
        disabled={!method || saving}
      >
        {saving ? "Đang lưu..." : "Lưu phương thức"}
      </button>
    </div>
  );
};

export default PaymentMethods;
