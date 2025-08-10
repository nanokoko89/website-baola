// src/components/ProfileContent/ProfileContent.jsx

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { IoPersonOutline } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { PiCurrencyCircleDollar } from "react-icons/pi";

import classNames from "classnames/bind";
import styles from "./ProfileContent.module.scss";

import Account from "./Account";
import PaymentMethods from "./PaymentMethods";
import Notifications from "./Notifications";
import Subscription from "./Subscription";
import {
  fetchSubscriptionByUser,
  fetchInvoicesByUser,
  fetchPlanById,
} from "../../config/subscriptionService";
import { selectCurrentUser } from "../../store/authSlice";

const cx = classNames.bind(styles);

function ProfileContent() {
  const currentUser = useSelector(selectCurrentUser);
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);
  const [invoiceList, setInvoiceList] = useState([]);

  const refreshSubscription = async () => {
    if (!currentUser) return;

    const sub = await fetchSubscriptionByUser(currentUser.uid);
    const inv = await fetchInvoicesByUser(currentUser.uid);
    let info = null;
    if (sub && sub.planId) {
      const plan = await fetchPlanById(sub.planId);

      if (plan) {
        const isYearly = sub.period === "yearly";
        const yearlyPrice =
          plan.price > 0 ? Math.round(plan.price * 12 * 0.75 - 1000) : 0;
        info = {
          planId: sub.planId,
          name: plan.title,
          price: isYearly ? yearlyPrice : plan.price,
          period: isYearly ? "/năm" : plan.period,
          billingNote: plan.billingNote,
          trialEnds: sub.trialEnds || null,
        };
      } else {
        info = { planId: sub.planId };
      }
    }
    setSubscriptionInfo(info);
    setInvoiceList(inv);
  };
  useEffect(() => {
    refreshSubscription();
  }, [currentUser]);

  const tabs = [
    {
      key: "account",
      label: "Tài khoản",
      icon: <IoPersonOutline style={{ fontSize: "20px", marginRight: 8 }} />,
      content: <Account />,
    },

    {
      key: "payment",
      label: "Phương thức thanh toán",
      icon: <MdOutlinePayments style={{ fontSize: "20px", marginRight: 8 }} />,
      content: <PaymentMethods />,
    },

    {
      key: "bill",
      label: "Gói đăng ký",
      icon: (
        <PiCurrencyCircleDollar style={{ fontSize: "20px", marginRight: 8 }} />
      ),
      content: (
        <Subscription
          subscription={subscriptionInfo || {}}
          invoices={invoiceList}
          onRefresh={refreshSubscription}
        />
      ),
    },

    {
      key: "notifications",
      label: "Thông báo",
      icon: (
        <IoNotificationsOutline style={{ fontSize: "20px", marginRight: 8 }} />
      ),
      content: <Notifications />,
    },
  ];

  // 2. Dùng useSearchParams để đọc/ghi ?tab=…
  const [searchParams, setSearchParams] = useSearchParams();

  // 3. Lấy giá trị tabParam từ URL, ví dụ: ?tab=account
  const tabParam = searchParams.get("tab");

  // 4. Tìm index của tabParam trong mảng `tabs`
  //    Nếu tabParam undefined hoặc không trùng key nào, mặc định index = 0
  const initialIndex = (() => {
    if (!tabParam) return 0; // Nếu không có ?tab thì index = 0 (Tài khoản)
    const found = tabs.findIndex((t) => t.key === tabParam);
    return found === -1 ? 0 : found;
  })();

  // 5. useState lưu activeTabIndex, khởi tạo bằng initialIndex
  const [activeTabIndex, setActiveTabIndex] = useState(initialIndex);

  // 6.  Khi URL (tabParam) thay đổi (người reload hoặc share link),
  //    cần cập nhật lại activeTabIndex cho khớp
  useEffect(() => {
    const found = tabs.findIndex((t) => t.key === tabParam);
    if (found !== -1 && found !== activeTabIndex) {
      setActiveTabIndex(found);
    }
    // Nếu tabParam không hợp lệ (found = -1), ta có thể chuyển về tab mặc định (index 0)
    if (found === -1 && tabParam !== null) {
      // Ví dụ: /profile?tab=abc → đổi về ?tab=account
      setSearchParams({ tab: tabs[0].key });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabParam]);

  // 7. Hàm khi user click vào 1 tab mới
  const handleTabClick = (idx) => {
    const key = tabs[idx].key;
    // Update query param → URL đổi thành ?tab=key
    setSearchParams({ tab: key });
    // setActiveTabIndex(idx);  <-- không cần set lại state ở đây,
    // vì việc setSearchParams sẽ làm URL thay đổi,
    // và effect trên (useEffect) sẽ cập nhật activeTabIndex tự động.
  };

  // Lấy object của tab đang active (dùng để hiển thị nội dung)
  const activeTab = tabs[activeTabIndex];

  return (
    <div className={cx("wrapper")}>
      {/* ========== CỘT TRÁI (header) ========== */}
      <div className={cx("tabsHeader")}>
        {tabs.map((tab, idx) => (
          <div
            key={tab.key}
            className={cx("tabItem", { active: idx === activeTabIndex })}
            onClick={() => handleTabClick(idx)}
          >
            {tab.icon}
            {tab.label}
          </div>
        ))}
      </div>

      {/* ========== NỘI DUNG TAB ========== */}
      <div className={cx("tabContent")}>{activeTab && activeTab.content}</div>
    </div>
  );
}

export default ProfileContent;
