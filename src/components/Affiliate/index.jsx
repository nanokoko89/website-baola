import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames/bind";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Link as LinkIcon,
  Copy,
  Check,
  Download,
  Play,
  Pause,
  Wallet,
  Settings,
  Users,
  BadgeDollarSign,
  TrendingUp,
  ClipboardList,
  CircleDollarSign,
  HandCoins,
} from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 * Affiliate Hub – bản chạy ngay trong Canvas (không Tailwind).
 * Kiểu Vite React + classNames/bind (cx) + CSS Modules.
 *
 * ➜ Khi đưa vào dự án Vite thật:
 * 1) Tách stylesText bên dưới sang `App.module.scss`
 * 2) `import styles from './App.module.scss'` thay cho StyleInjector + Proxy
 * 3) Giữ `const cx = classNames.bind(styles)`
 */

// ---------------------- Styles (SCSS-like, inject runtime) ----------------------
const stylesText = `
:root{--bg:#f7f4eb;--text:#0f172a;--muted:#64748b;--border:#e2e8f0;--card:#ffffff;--primary:#0b1220;--primary-700:#000}
*{box-sizing:border-box}
html,body,#root{height:100%}
body{margin:0;background:linear-gradient(to bottom,#fff,var(--bg));color:var(--text);font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}

.app{min-height:100vh;display:flex;flex-direction:column}
.container{max-width:1120px;margin:0 auto;padding:16px}

.header{position:relative}
.headerInner{display:flex;align-items:center;justify-content:space-between;padding:32px 16px 24px}
.brand{font-weight:800;font-size:24px;letter-spacing:.2px}
.brandDesc{margin-top:4px;color:var(--muted)}
.actions{display:flex;gap:8px}
.blob{position:absolute;right:0;top:0;width:420px;height:220px;background:radial-gradient(120px 120px at 70% 40%,#fde68a55,transparent),radial-gradient(120px 120px at 40% 60%,#93c5fd55,transparent),radial-gradient(120px 120px at 60% 80%,#fecaca66,transparent);filter:blur(24px);opacity:.7;border-radius:50%;transform:translate(20px,-10px);z-index:-1}

.nav{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.75);backdrop-filter:blur(8px);border-bottom:1px solid var(--border)}
.navInner{display:flex;gap:8px;overflow:auto;padding:0 16px}
.tab{appearance:none;border:none;background:none;padding:12px 16px;margin-bottom:-1px;border-bottom:2px solid transparent;color:var(--muted);display:flex;align-items:center;gap:8px;cursor:pointer}
.tabActive{color:var(--primary);border-color:var(--primary)}

.statsGrid{display:grid;gap:12px;grid-template-columns:repeat(2,1fr);padding:0 16px 24px}
@media (min-width:768px){.statsGrid{grid-template-columns:repeat(4,1fr)}}

.card{background:var(--card);border:1px solid var(--border);border-radius:16px;box-shadow:0 1px 2px rgba(0,0,0,.04)}
.cardHeader{padding:16px;border-bottom:1px solid #f2f4f7;display:flex;align-items:center;justify-content:space-between;gap:12px}
.cardTitle{font-weight:600}
.cardDesc{margin-top:4px;color:var(--muted);font-size:12px}
.cardBody{padding:16px}

.stat{display:flex;align-items:flex-start;gap:12px}
.statIcon{padding:8px;border-radius:12px;background:#f1f5f9}
.statLabel{color:var(--muted);font-size:12px}
.statValue{font-weight:700;font-size:20px;margin-top:2px}
.statSub{color:var(--muted);font-size:12px;margin-top:2px}

.grid{display:grid;gap:16px}
.gridCols1{grid-template-columns:1fr}
.gridCols2Md{grid-template-columns:1fr}
@media (min-width:768px){.gridCols2Md{grid-template-columns:repeat(2,1fr)}}
.gridCols3Lg{grid-template-columns:1fr}
@media (min-width:1024px){.gridCols3Lg{grid-template-columns:repeat(3,1fr)}}

.btn{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:12px;font-size:14px;border:1px solid var(--border);background:#fff;cursor:pointer;transition:transform .06s ease,background .2s}
.btn:active{transform:translateY(1px)}
.btn:hover{background:#f8fafc}
.btnPrimary{background:var(--primary);color:#fff;border-color:var(--primary)}
.btnPrimary:hover{background:var(--primary-700)}
.btnDanger{color:#b91c1c;border-color:#fecaca;background:#fff0f0}

.inputWrap{display:block;font-size:14px}
.inputLabel{color:#334155}
.input{margin-top:6px;width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:12px;outline:none}
.input:focus{box-shadow:0 0 0 2px rgba(15,23,42,.08)}

.badge{font-size:12px;padding:4px 8px;border-radius:10px;display:inline-block}
.badgeSlate{background:#f1f5f9;color:#334155}
.badgeGreen{background:#dcfce7;color:#166534}
.badgeAmber{background:#fef3c7;color:#92400e}
.badgeRed{background:#ffe4e6;color:#9f1239}
.badgeBlue{background:#dbeafe;color:#1e3a8a}

.modalOverlay{position:fixed;inset:0;background:rgba(0,0,0,.3)}
.modal{position:relative;width:100%;max-width:720px;background:#fff;border:1px solid var(--border);border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.18)}
.modalHeader{display:flex;align-items:center;justify-content:space-between;padding:16px;border-bottom:1px solid #f1f5f9}
.modalBody{padding:16px}

.tableWrap{overflow:auto}
.table{width:100%;border-collapse:collapse;font-size:14px}
.table th{color:var(--muted);text-align:left;padding:10px 0}
.table td{padding:10px 0;border-top:1px solid #f1f5f9;vertical-align:top}

.code{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;background:#f1f5f9;padding:4px 8px;border-radius:8px}
.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

.chart{height:288px}
.footer{padding:24px 0;text-align:center;color:#64748b;font-size:13px}
`;

// Ở Canvas chỉ có 1 file, nên mình giả lập CSS Modules bằng cách inject
// <style> + Proxy để map className => chính tên class.
const styles = new Proxy({}, { get: (_, key) => key });
const cx = classNames.bind(styles);

function StyleInjector() {
  useEffect(() => {
    if (document.getElementById("affiliate-hub-styles")) return;
    const el = document.createElement("style");
    el.id = "affiliate-hub-styles";
    el.innerHTML = stylesText;
    document.head.appendChild(el);
  }, []);
  return null;
}

// ---------------------- Helpers ----------------------
const VN = new Intl.NumberFormat("vi-VN");
const formatVND = (n) => `${VN.format(n)}₫`;
const uid = () => Math.random().toString(36).slice(2, 10);
const todayISO = () => new Date().toISOString();

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw
        ? JSON.parse(raw)
        : typeof initialValue === "function"
        ? initialValue()
        : initialValue;
    } catch {
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, setValue];
}

// ---------------------- Seed Data ----------------------
function seedData() {
  const program1 = {
    id: uid(),
    name: "Khoá học TikTok A-Z",
    product: "Video course 20h",
    commissionType: "percent",
    commissionValue: 30,
    cookieDays: 30,
    trackingDomain: "https://uhub.vn/product/tiktok-az",
  };
  const program2 = {
    id: uid(),
    name: "SaaS CRM BaoLa",
    product: "Gói Pro (tháng)",
    commissionType: "fixed",
    commissionValue: 80000,
    cookieDays: 15,
    trackingDomain: "https://baola.vn/crm-pro",
  };

  const aff1 = {
    id: uid(),
    name: "Nguyễn Lan",
    email: "lan@demo.vn",
    bank: "MB 123456 – Lan",
    status: "active",
    programIds: [program1.id, program2.id],
    code: "LANSTAR",
  };
  const aff2 = {
    id: uid(),
    name: "Trần Minh",
    email: "minh@demo.vn",
    bank: "TPBank 9988 – Minh",
    status: "active",
    programIds: [program1.id],
    code: "MINH888",
  };

  const link1 = {
    id: uid(),
    affiliateId: aff1.id,
    programId: program1.id,
    code: uid(),
    url: `${program1.trackingDomain}?ref=${aff1.code}&p=${program1.id}`,
  };
  const link2 = {
    id: uid(),
    affiliateId: aff2.id,
    programId: program1.id,
    code: uid(),
    url: `${program1.trackingDomain}?ref=${aff2.code}&p=${program1.id}`,
  };
  const link3 = {
    id: uid(),
    affiliateId: aff1.id,
    programId: program2.id,
    code: uid(),
    url: `${program2.trackingDomain}?ref=${aff1.code}&p=${program2.id}`,
  };

  const now = Date.now();
  const daysAgo = (d) => new Date(now - d * 86400000).toISOString();
  const events = [
    {
      id: uid(),
      linkId: link1.id,
      type: "click",
      amount: 0,
      timestamp: daysAgo(7),
    },
    {
      id: uid(),
      linkId: link1.id,
      type: "click",
      amount: 0,
      timestamp: daysAgo(7),
    },
    {
      id: uid(),
      linkId: link1.id,
      type: "sale",
      amount: 1390000,
      timestamp: daysAgo(6),
    },
    {
      id: uid(),
      linkId: link2.id,
      type: "click",
      amount: 0,
      timestamp: daysAgo(5),
    },
    {
      id: uid(),
      linkId: link2.id,
      type: "sale",
      amount: 1390000,
      timestamp: daysAgo(5),
    },
    {
      id: uid(),
      linkId: link3.id,
      type: "click",
      amount: 0,
      timestamp: daysAgo(4),
    },
    {
      id: uid(),
      linkId: link3.id,
      type: "sale",
      amount: 159000,
      timestamp: daysAgo(3),
    },
    {
      id: uid(),
      linkId: link3.id,
      type: "click",
      amount: 0,
      timestamp: daysAgo(1),
    },
  ];

  const payouts = [];
  return {
    programs: [program1, program2],
    affiliates: [aff1, aff2],
    links: [link1, link2, link3],
    events,
    payouts,
    settings: { defaultCookieDays: 30, brand: "Affiliate Hub" },
  };
}

// ---------------------- Core App ----------------------
export default function App() {
  const [db, setDb] = useLocalStorage("affiliate-hub-db", seedData);
  const [tab, setTab] = useState("overview");
  const [toast, setToast] = useState(null);

  const { settings } = db;
  const derived = useMemo(() => buildDerived(db), [db]);

  function save(partial) {
    setDb((prev) => ({ ...prev, ...partial }));
  }
  function notify(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  }

  return (
    <div className={cx("app")}>
      <StyleInjector />
      <div className={cx("header")}>
        <div className={cx("headerInner", "container")}>
          <div>
            <h1 className={cx("brand")}>{settings.brand || "Affiliate Hub"}</h1>
            <p className={cx("brandDesc")}>
              Xây dựng & quản lý hệ thống cộng tác viên/tiếp thị liên kết cho
              nhà bán hàng.
            </p>
          </div>
          <div className={cx("actions")}>
            <Button
              onClick={() =>
                save({
                  settings: {
                    ...settings,
                    brand:
                      prompt("Nhập tên thương hiệu", settings.brand) ||
                      settings.brand,
                  },
                })
              }
            >
              <Settings size={16} /> Đổi tên thương hiệu
            </Button>
            <a
              href="https://uhub.vn"
              target="_blank"
              rel="noreferrer"
              className={cx("btn")}
            >
              {" "}
              <HandCoins size={16} /> Tư vấn triển khai{" "}
            </a>
          </div>
        </div>
        <div className={cx("statsGrid")}>
          <div className={cx("container")}>
            <div className={cx("grid", "gridCols2Md")} style={{ gap: 12 }}>
              <Stat
                icon={<TrendingUp />}
                label="Doanh thu từ affiliate"
                value={`${VN.format(Math.round(derived.sumSales))}₫`}
                sub={`Hoa hồng: ${VN.format(
                  Math.round(derived.sumCommission)
                )}₫`}
              />
              <Stat
                icon={<ClipboardList />}
                label="Lượt click"
                value={derived.countClick}
                sub={`CR: ${(
                  (derived.countSale / Math.max(1, derived.countClick)) *
                  100
                ).toFixed(1)}%`}
              />
              <Stat
                icon={<Users />}
                label="Cộng tác viên"
                value={derived.affCount}
                sub={`Đang hoạt động: ${derived.affActive}`}
              />
              <Stat
                icon={<BadgeDollarSign />}
                label="Chương trình"
                value={derived.progCount}
                sub={`Cookie mặc định ${derived.defaultCookie} ngày`}
              />
            </div>
          </div>
        </div>
        <div className={cx("blob")} />
      </div>

      <nav className={cx("nav")}>
        <div className={cx("navInner", "container")}>
          <Tab
            id="overview"
            icon={<TrendingUp size={18} />}
            label="Tổng quan"
            active={tab}
            setTab={setTab}
          />
          <Tab
            id="programs"
            icon={<BadgeDollarSign size={18} />}
            label="Chương trình"
            active={tab}
            setTab={setTab}
          />
          <Tab
            id="affiliates"
            icon={<Users size={18} />}
            label="Cộng tác viên"
            active={tab}
            setTab={setTab}
          />
          <Tab
            id="links"
            icon={<LinkIcon size={18} />}
            label="Link & Tracking"
            active={tab}
            setTab={setTab}
          />
          <Tab
            id="payouts"
            icon={<Wallet size={18} />}
            label="Chi trả"
            active={tab}
            setTab={setTab}
          />
          <Tab
            id="settings"
            icon={<Settings size={18} />}
            label="Cài đặt"
            active={tab}
            setTab={setTab}
          />
        </div>
      </nav>

      <main className={cx("container")}>
        <AnimatePresence mode="wait">
          {tab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Overview db={db} derived={derived} />
            </motion.div>
          )}
          {tab === "programs" && (
            <motion.div
              key="programs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Programs db={db} save={save} notify={notify} />
            </motion.div>
          )}
          {tab === "affiliates" && (
            <motion.div
              key="affiliates"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Affiliates db={db} save={save} notify={notify} />
            </motion.div>
          )}
          {tab === "links" && (
            <motion.div
              key="links"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Links db={db} save={save} notify={notify} />
            </motion.div>
          )}
          {tab === "payouts" && (
            <motion.div
              key="payouts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Payouts db={db} save={save} notify={notify} />
            </motion.div>
          )}
          {tab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <SettingsTab db={db} save={save} notify={notify} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            style={{
              position: "fixed",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
            }}
            className={cx("btn", "btnPrimary")}
          >
            {" "}
            {toast}{" "}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className={cx("footer")}>
        © {new Date().getFullYear()} Affiliate Hub • Demo client-side • Made for
        sellers in VN
      </footer>
    </div>
  );
}

// ---------------------- UI Atoms ----------------------
function Tab({ id, label, icon, active, setTab }) {
  const isActive = active === id;
  return (
    <button
      onClick={() => setTab(id)}
      className={cx("tab", { tabActive: isActive })}
    >
      {icon}
      {label}
    </button>
  );
}

function Card({ children, className }) {
  return <div className={cx("card", className)}>{children}</div>;
}
function CardHeader({ title, desc, right }) {
  return (
    <div className={cx("cardHeader")}>
      <div>
        <div className={cx("cardTitle")}>{title}</div>
        {desc && <div className={cx("cardDesc")}>{desc}</div>}
      </div>
      {right}
    </div>
  );
}
function CardBody({ children, className }) {
  return <div className={cx("cardBody", className)}>{children}</div>;
}
function Input({ label, ...props }) {
  return (
    <label className={cx("inputWrap")}>
      <span className={cx("inputLabel")}>{label}</span>
      <input {...props} className={cx("input")} />
    </label>
  );
}
function Select({ label, children, ...props }) {
  return (
    <label className={cx("inputWrap")}>
      <span className={cx("inputLabel")}>{label}</span>
      <select {...props} className={cx("input")}>
        {children}
      </select>
    </label>
  );
}
function Button({ children, className = "", ...props }) {
  return (
    <button {...props} className={cx("btn", className)}>
      {children}
    </button>
  );
}
function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button {...props} className={cx("btn", "btnPrimary", className)}>
      {children}
    </button>
  );
}
function Badge({ children, color = "slate" }) {
  const colorMap = {
    slate: "badgeSlate",
    green: "badgeGreen",
    red: "badgeRed",
    amber: "badgeAmber",
    blue: "badgeBlue",
  };
  return (
    <span className={cx("badge", colorMap[color] || "badgeSlate")}>
      {children}
    </span>
  );
}

function Stat({ icon, label, value, sub }) {
  return (
    <div className={cx("card")}>
      <div className={cx("cardBody")}>
        <div className={cx("stat")}>
          <div className={cx("statIcon")}>{icon}</div>
          <div>
            <div className={cx("statLabel")}>{label}</div>
            <div className={cx("statValue")}>{value}</div>
            {sub && <div className={cx("statSub")}>{sub}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function Modal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={cx("modalOverlay")} onClick={onClose} />
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            className={cx("modal")}
          >
            <div className={cx("modalHeader")}>
              <div className={cx("cardTitle")}>{title}</div>
              <button
                onClick={onClose}
                className={cx("btn")}
                style={{ padding: 8 }}
              >
                <X size={18} />
              </button>
            </div>
            <div className={cx("modalBody")}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------- Derived metrics ----------------------
function buildDerived(db) {
  const { programs, affiliates, links, events, payouts, settings } = db;
  const linkById = Object.fromEntries(links.map((l) => [l.id, l]));
  const progById = Object.fromEntries(programs.map((p) => [p.id, p]));

  let sumSales = 0;
  let sumCommission = 0;
  let countSale = 0;
  let countClick = 0;
  const eventsByDay = {};

  for (const ev of events) {
    const day = new Date(ev.timestamp).toISOString().slice(0, 10);
    if (!eventsByDay[day])
      eventsByDay[day] = {
        day,
        clicks: 0,
        sales: 0,
        revenue: 0,
        commission: 0,
      };
    if (ev.type === "click") {
      eventsByDay[day].clicks++;
      countClick++;
    }
    if (ev.type === "sale") {
      const link = linkById[ev.linkId];
      const prog = link ? progById[link.programId] : null;
      const commission = prog
        ? prog.commissionType === "percent"
          ? ev.amount * (prog.commissionValue / 100)
          : prog.commissionValue
        : 0;
      eventsByDay[day].sales++;
      eventsByDay[day].revenue += ev.amount;
      eventsByDay[day].commission += commission;
      countSale++;
      sumSales += ev.amount;
      sumCommission += commission;
    }
  }
  const chart = Object.values(eventsByDay).sort((a, b) =>
    a.day.localeCompare(b.day)
  );

  const affiliateTotals = affiliates
    .map((a) => {
      const lks = links.filter((l) => l.affiliateId === a.id);
      const evs = events.filter((e) => lks.some((l) => l.id === e.linkId));
      const clicks = evs.filter((e) => e.type === "click").length;
      const sales = evs.filter((e) => e.type === "sale");
      const revenue = sales.reduce((s, ev) => s + ev.amount, 0);
      const commission = sales.reduce((s, ev) => {
        const prog = progById[linkById[ev.linkId].programId];
        return (
          s +
          (prog.commissionType === "percent"
            ? ev.amount * (prog.commissionValue / 100)
            : prog.commissionValue)
        );
      }, 0);
      const unpaid =
        commission -
        payouts
          .filter((p) => p.affiliateId === a.id)
          .reduce((s, p) => s + p.amount, 0);
      return {
        affiliate: a,
        clicks,
        sales: sales.length,
        revenue,
        commission,
        unpaid,
      };
    })
    .sort((a, b) => b.revenue - a.revenue);

  return {
    sumSales,
    sumCommission,
    countSale,
    countClick,
    chart,
    affiliateTotals,
    affCount: affiliates.length,
    affActive: affiliates.filter((a) => a.status === "active").length,
    progCount: programs.length,
    defaultCookie: settings?.defaultCookieDays ?? 30,
  };
}

// ---------------------- Overview ----------------------
function Overview({ db, derived }) {
  return (
    <div className={cx("grid", "gridCols3Lg")}>
      <Card className={cx()}>
        <CardHeader title="Biểu đồ doanh thu & hoa hồng" desc="Theo ngày" />
        <CardBody>
          <div className={cx("chart")}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={derived.chart} />
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Top cộng tác viên" desc="Theo doanh thu" />
        <CardBody>
          <div className={cx("grid", "gridCols1")} style={{ gap: 12 }}>
            {derived.affiliateTotals.slice(0, 6).map((it, idx) => (
              <div
                key={it.affiliate.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 999,
                      background: "#e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>
                      {it.affiliate.name}
                    </div>
                    <div className={cx("cardDesc")}>
                      {it.sales} sale • {it.clicks} click
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>
                  {formatVND(it.revenue)}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card className={cx("grid", "gridCols1")}>
        <CardHeader
          title="Bảng tổng hợp"
          desc="Theo cộng tác viên"
          right={<ExportCSV data={derived.affiliateTotals} />}
        />
        <CardBody>
          <div className={cx("tableWrap")}>
            <table className={cx("table")}>
              <thead>
                <tr>
                  <th className={cx()}>Cộng tác viên</th>
                  <th>Click</th>
                  <th>Sale</th>
                  <th>Doanh thu</th>
                  <th>Hoa hồng</th>
                  <th>Chưa trả</th>
                </tr>
              </thead>
              <tbody>
                {derived.affiliateTotals.map((r) => (
                  <tr key={r.affiliate.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{r.affiliate.name}</div>
                      <div className={cx("cardDesc")}>{r.affiliate.email}</div>
                    </td>
                    <td>{r.clicks}</td>
                    <td>{r.sales}</td>
                    <td>{formatVND(r.revenue)}</td>
                    <td>{formatVND(r.commission)}</td>
                    <td>{formatVND(r.unpaid)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function ComposedChart({ data }) {
  return (
    <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip
        formatter={(value, name) =>
          name === "revenue" || name === "commission" ? formatVND(value) : value
        }
      />
      <Legend />
      <Line
        type="monotone"
        dataKey="revenue"
        strokeWidth={2}
        name="Doanh thu"
      />
      <Line
        type="monotone"
        dataKey="commission"
        strokeWidth={2}
        name="Hoa hồng"
      />
      <Line type="monotone" dataKey="clicks" strokeWidth={2} name="Click" />
      <Line type="monotone" dataKey="sales" strokeWidth={2} name="Sale" />
    </LineChart>
  );
}

// ---------------------- Programs ----------------------
function Programs({ db, save, notify }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    product: "",
    commissionType: "percent",
    commissionValue: 20,
    cookieDays: db.settings.defaultCookieDays,
    trackingDomain: "https://example.com/product",
  });

  function addProgram() {
    if (!form.name.trim()) return notify("Vui lòng nhập tên chương trình");
    const p = {
      id: uid(),
      ...form,
      commissionValue: Number(form.commissionValue),
      cookieDays: Number(form.cookieDays),
    };
    save({ programs: [p, ...db.programs] });
    setOpen(false);
    setForm({
      name: "",
      product: "",
      commissionType: "percent",
      commissionValue: 20,
      cookieDays: db.settings.defaultCookieDays,
      trackingDomain: "https://example.com/product",
    });
    notify("Đã tạo chương trình");
  }

  function removeProgram(id) {
    if (!confirm("Xoá chương trình?")) return;
    save({
      programs: db.programs.filter((p) => p.id !== id),
      links: db.links.filter((l) => l.programId !== id),
    });
  }

  return (
    <div className={cx("grid", "gridCols1")}>
      <Card>
        <CardHeader
          title="Chương trình của bạn"
          right={
            <PrimaryButton onClick={() => setOpen(true)}>
              <Plus size={16} />
              Tạo chương trình
            </PrimaryButton>
          }
        />
        <CardBody>
          <div className={cx("grid", "gridCols2Md")}>
            {db.programs.map((p) => (
              <Card key={p.id}>
                <CardBody>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600 }}>{p.name}</div>
                      <div className={cx("cardDesc")}>{p.product}</div>
                    </div>
                    <Badge color="blue">Cookie {p.cookieDays} ngày</Badge>
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 12,
                      fontSize: 14,
                    }}
                  >
                    <div>
                      <div className={cx("cardDesc")}>Hoa hồng</div>
                      <div style={{ fontWeight: 600 }}>
                        {p.commissionType === "percent"
                          ? `${p.commissionValue}%`
                          : formatVND(p.commissionValue)}
                      </div>
                    </div>
                    <div>
                      <div className={cx("cardDesc")}>Trang đích</div>
                      <div className={cx("truncate")}>{p.trackingDomain}</div>
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: 16,
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <Button
                      onClick={() =>
                        navigator.clipboard
                          .writeText(p.trackingDomain)
                          .then(() => notify("Đã copy link trang đích"))
                      }
                    >
                      <Copy size={14} /> Copy trang đích
                    </Button>
                    <Button
                      className={cx("btnDanger")}
                      onClick={() => removeProgram(p.id)}
                    >
                      Xoá
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Tạo chương trình affiliate"
      >
        <div className={cx("grid", "gridCols2Md")}>
          <Input
            label="Tên chương trình"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="VD: Khoá học TikTok A-Z"
          />
          <Input
            label="Sản phẩm/Dịch vụ"
            value={form.product}
            onChange={(e) => setForm({ ...form, product: e.target.value })}
            placeholder="VD: Gói Pro (tháng)"
          />
          <Select
            label="Kiểu hoa hồng"
            value={form.commissionType}
            onChange={(e) =>
              setForm({ ...form, commissionType: e.target.value })
            }
          >
            <option value="percent">% theo doanh thu</option>
            <option value="fixed">Số tiền cố định</option>
          </Select>
          <Input
            label="Giá trị hoa hồng"
            type="number"
            value={form.commissionValue}
            onChange={(e) =>
              setForm({ ...form, commissionValue: e.target.value })
            }
          />
          <Input
            label="Cookie (ngày)"
            type="number"
            value={form.cookieDays}
            onChange={(e) => setForm({ ...form, cookieDays: e.target.value })}
          />
          <Input
            label="Trang đích/Tracking domain"
            value={form.trackingDomain}
            onChange={(e) =>
              setForm({ ...form, trackingDomain: e.target.value })
            }
            placeholder="https://example.com/product"
          />
        </div>
        <div
          style={{
            marginTop: 16,
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
          }}
        >
          <Button onClick={() => setOpen(false)}>Huỷ</Button>
          <PrimaryButton onClick={addProgram}>
            <Plus size={16} /> Tạo
          </PrimaryButton>
        </div>
      </Modal>
    </div>
  );
}

// ---------------------- Affiliates ----------------------
function Affiliates({ db, save, notify }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    bank: "",
    status: "active",
    programIds: [],
    code: "",
  });

  function addAffiliate() {
    if (!form.name.trim()) return notify("Nhập tên cộng tác viên");
    const code = (form.code || form.name)
      .toUpperCase()
      .replace(/\s+/g, "")
      .slice(0, 10);
    const a = { id: uid(), ...form, code };
    save({ affiliates: [a, ...db.affiliates] });
    setOpen(false);
    setForm({
      name: "",
      email: "",
      bank: "",
      status: "active",
      programIds: [],
      code: "",
    });
    notify("Đã thêm cộng tác viên");
  }

  function toggleStatus(a) {
    const status = a.status === "active" ? "paused" : "active";
    save({
      affiliates: db.affiliates.map((x) =>
        x.id === a.id ? { ...x, status } : x
      ),
    });
  }

  function assignProgram(a, pid, checked) {
    const programIds = checked
      ? Array.from(new Set([...(a.programIds || []), pid]))
      : (a.programIds || []).filter((id) => id !== pid);
    save({
      affiliates: db.affiliates.map((x) =>
        x.id === a.id ? { ...x, programIds } : x
      ),
    });
  }

  return (
    <div className={cx("grid", "gridCols1")}>
      <Card>
        <CardHeader
          title="Danh sách cộng tác viên"
          right={
            <PrimaryButton onClick={() => setOpen(true)}>
              <Plus size={16} />
              Thêm cộng tác viên
            </PrimaryButton>
          }
        />
        <CardBody>
          <div className={cx("grid", "gridCols2Md")}>
            {db.affiliates.map((a) => (
              <Card key={a.id}>
                <CardBody>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600 }}>
                        {a.name}{" "}
                        <Badge
                          color={a.status === "active" ? "green" : "amber"}
                        >
                          {a.status === "active"
                            ? "Đang hoạt động"
                            : "Tạm dừng"}
                        </Badge>
                      </div>
                      <div className={cx("cardDesc")}>{a.email}</div>
                      <div className={cx("cardDesc")}>{a.bank}</div>
                      <div style={{ fontSize: 12 }}>
                        Mã giới thiệu:{" "}
                        <span className={cx("code")}>{a.code}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Button onClick={() => toggleStatus(a)}>
                        {a.status === "active" ? (
                          <Pause size={14} />
                        ) : (
                          <Play size={14} />
                        )}{" "}
                        {a.status === "active" ? "Tạm dừng" : "Kích hoạt"}
                      </Button>
                    </div>
                  </div>
                  <div style={{ marginTop: 12, fontSize: 14 }}>
                    <div className={cx("cardDesc")}>Gán vào chương trình</div>
                    <div style={{ marginTop: 8, display: "grid", gap: 6 }}>
                      {db.programs.map((p) => (
                        <label
                          key={p.id}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={a.programIds?.includes(p.id)}
                            onChange={(e) =>
                              assignProgram(a, p.id, e.target.checked)
                            }
                          />
                          <span>{p.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Thêm cộng tác viên"
      >
        <div className={cx("grid", "gridCols2Md")}>
          <Input
            label="Họ tên"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            label="Tài khoản/Ngân hàng"
            value={form.bank}
            onChange={(e) => setForm({ ...form, bank: e.target.value })}
          />
          <Input
            label="Mã giới thiệu (tuỳ chọn)"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
          />
          <div style={{ gridColumn: "1/-1" }}>
            <div className={cx("inputLabel")} style={{ marginBottom: 8 }}>
              Gán chương trình
            </div>
            <div className={cx("grid", "gridCols2Md")}>
              {db.programs.map((p) => (
                <label
                  key={p.id}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form.programIds.includes(p.id)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setForm((f) => ({
                        ...f,
                        programIds: checked
                          ? Array.from(new Set([...f.programIds, p.id]))
                          : f.programIds.filter((x) => x !== p.id),
                      }));
                    }}
                  />
                  <span>{p.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 16,
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
          }}
        >
          <Button onClick={() => setOpen(false)}>Huỷ</Button>
          <PrimaryButton onClick={addAffiliate}>
            <Plus size={16} /> Thêm
          </PrimaryButton>
        </div>
      </Modal>
    </div>
  );
}

// ---------------------- Links & Tracking ----------------------
function Links({ db, save, notify }) {
  const [filterAff, setFilterAff] = useState("all");
  const [filterProg, setFilterProg] = useState("all");

  function createLink(affiliateId, programId) {
    const aff = db.affiliates.find((a) => a.id === affiliateId);
    const prog = db.programs.find((p) => p.id === programId);
    if (!aff || !prog) return notify("Chọn cộng tác viên & chương trình");
    const url = `${prog.trackingDomain}?ref=${aff.code}&p=${prog.id}`;
    const l = { id: uid(), affiliateId, programId, code: uid(), url };
    save({ links: [l, ...db.links] });
    notify("Đã tạo link");
  }

  function simulate(link, type) {
    const amount =
      type === "sale"
        ? Number(prompt("Nhập doanh thu đơn hàng (VND)", "499000")) || 0
        : 0;
    const e = {
      id: uid(),
      linkId: link.id,
      type,
      amount,
      timestamp: todayISO(),
    };
    save({ events: [...db.events, e] });
    notify(type === "sale" ? "Đã ghi sale" : "Đã ghi click");
  }

  const filtered = db.links.filter(
    (l) =>
      (filterAff === "all" || l.affiliateId === filterAff) &&
      (filterProg === "all" || l.programId === filterProg)
  );

  return (
    <div className={cx("grid", "gridCols1")}>
      <Card>
        <CardHeader title="Tạo link affiliate" />
        <CardBody>
          <div
            className={cx("grid", "gridCols2Md")}
            style={{ alignItems: "end" }}
          >
            <Select
              label="Cộng tác viên"
              value={filterAff}
              onChange={(e) => setFilterAff(e.target.value)}
            >
              <option value="all">— Tất cả —</option>
              {db.affiliates.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </Select>
            <Select
              label="Chương trình"
              value={filterProg}
              onChange={(e) => setFilterProg(e.target.value)}
            >
              <option value="all">— Tất cả —</option>
              {db.programs.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>
            <div style={{ gridColumn: "1/-1", display: "flex", gap: 8 }}>
              <PrimaryButton
                style={{ width: "100%" }}
                onClick={() =>
                  createLink(
                    filterAff === "all" ? db.affiliates[0]?.id : filterAff,
                    filterProg === "all" ? db.programs[0]?.id : filterProg
                  )
                }
              >
                <LinkIcon size={16} /> Tạo link
              </PrimaryButton>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Danh sách link & mô phỏng sự kiện"
          desc="Copy link chia sẻ, ghi click/sale để test tracking"
        />
        <CardBody>
          <div className={cx("tableWrap")}>
            <table className={cx("table")}>
              <thead>
                <tr>
                  <th>Cộng tác viên</th>
                  <th>Chương trình</th>
                  <th>Link</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => {
                  const a = db.affiliates.find((x) => x.id === l.affiliateId);
                  const p = db.programs.find((x) => x.id === l.programId);
                  return (
                    <tr key={l.id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{a?.name}</div>
                        <div className={cx("cardDesc")}>{a?.email}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{p?.name}</div>
                        <div className={cx("cardDesc")}>
                          Cookie {p?.cookieDays} ngày
                        </div>
                      </td>
                      <td style={{ minWidth: 360 }}>
                        <code className={cx("code", "truncate")} title={l.url}>
                          {l.url}
                        </code>
                      </td>
                      <td style={{ minWidth: 260 }}>
                        <div
                          style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
                        >
                          <Button
                            onClick={() => navigator.clipboard.writeText(l.url)}
                          >
                            <Copy size={14} /> Copy
                          </Button>
                          <Button onClick={() => simulate(l, "click")}>
                            <Play size={14} /> Ghi click
                          </Button>
                          <Button onClick={() => simulate(l, "sale")}>
                            <BadgeDollarSign size={14} /> Ghi sale
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

// ---------------------- Payouts ----------------------
function Payouts({ db, save, notify }) {
  const derived = useMemo(() => buildDerived(db), [db]);

  function markPaid(affiliateId, amount) {
    if (!amount || amount <= 0) return;
    const rec = { id: uid(), affiliateId, amount, timestamp: todayISO() };
    save({ payouts: [...db.payouts, rec] });
    notify("Đã ghi nhận chi trả");
  }

  return (
    <div className={cx("grid", "gridCols1")}>
      <Card>
        <CardHeader
          title="Công nợ hoa hồng"
          desc="Tổng hợp số tiền chưa thanh toán"
        />
        <CardBody>
          <div className={cx("tableWrap")}>
            <table className={cx("table")}>
              <thead>
                <tr>
                  <th>Cộng tác viên</th>
                  <th>Hoa hồng tích luỹ</th>
                  <th>Chưa trả</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {derived.affiliateTotals.map((r) => (
                  <tr key={r.affiliate.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{r.affiliate.name}</div>
                      <div className={cx("cardDesc")}>{r.affiliate.bank}</div>
                    </td>
                    <td>{formatVND(r.commission)}</td>
                    <td>
                      <span style={{ fontWeight: 700 }}>
                        {formatVND(r.unpaid)}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 8 }}>
                        <PrimaryButton
                          onClick={() => markPaid(r.affiliate.id, r.unpaid)}
                          disabled={r.unpaid <= 0}
                        >
                          <CircleDollarSign size={16} /> Trả hết
                        </PrimaryButton>
                        <Button
                          onClick={() => {
                            const n = Number(
                              prompt(
                                "Nhập số tiền thanh toán (VND)",
                                String(Math.max(0, r.unpaid))
                              )
                            );
                            if (Number.isFinite(n)) markPaid(r.affiliate.id, n);
                          }}
                        >
                          Trả một phần
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Lịch sử chi trả" />
        <CardBody>
          <div className={cx("tableWrap")}>
            <table className={cx("table")}>
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Cộng tác viên</th>
                  <th>Số tiền</th>
                </tr>
              </thead>
              <tbody>
                {db.payouts.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className={cx("cardDesc")}
                      style={{ padding: "12px 0" }}
                    >
                      Chưa có bản ghi.
                    </td>
                  </tr>
                )}
                {db.payouts
                  .slice()
                  .reverse()
                  .map((p) => {
                    const a = db.affiliates.find((x) => x.id === p.affiliateId);
                    return (
                      <tr key={p.id}>
                        <td>{new Date(p.timestamp).toLocaleString()}</td>
                        <td>{a?.name}</td>
                        <td style={{ fontWeight: 700 }}>
                          {formatVND(p.amount)}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

// ---------------------- Settings ----------------------
function SettingsTab({ db, save, notify }) {
  const [val, setVal] = useState(db.settings.defaultCookieDays);
  function updateCookie() {
    save({ settings: { ...db.settings, defaultCookieDays: Number(val) } });
    notify("Đã cập nhật cookie mặc định");
  }
  function resetAll() {
    if (!confirm("Khôi phục dữ liệu mẫu? (Mất dữ liệu hiện tại)")) return;
    localStorage.removeItem("affiliate-hub-db");
    window.location.reload();
  }
  return (
    <div className={cx("grid", "gridCols2Md")}>
      <Card>
        <CardHeader title="Thiết lập chung" />
        <CardBody>
          <div className={cx("grid", "gridCols2Md")}>
            <Input
              label="Cookie mặc định (ngày)"
              type="number"
              value={val}
              onChange={(e) => setVal(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <PrimaryButton onClick={updateCookie}>
              <Check size={16} /> Lưu
            </PrimaryButton>
            <Button onClick={resetAll}>Khôi phục dữ liệu mẫu</Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Hướng dẫn tích hợp thực tế"
          desc="Mô hình triển khai production"
        />
        <CardBody>
          <ol style={{ paddingLeft: 18, fontSize: 14, lineHeight: 1.6 }}>
            <li>
              Back-end ghi <b>click</b> & <b>sale</b> vào DB (VD:
              Firebase/Cloudflare Workers/PostgreSQL).
            </li>
            <li>
              Link chia sẻ có query{" "}
              <code>?ref=&lt;AFFCODE&gt;&amp;p=&lt;PROGRAM_ID&gt;</code>; đặt
              cookie theo số ngày của chương trình.
            </li>
            <li>
              Webhook đơn hàng thành công → tính hoa hồng theo chương trình →
              ghi <i>sale</i>.
            </li>
            <li>Dashboard này gọi API thay vì localStorage.</li>
          </ol>
        </CardBody>
      </Card>
    </div>
  );
}

// ---------------------- Utilities ----------------------
function ExportCSV({ data }) {
  function onExport() {
    const rows = [
      [
        "Affiliate",
        "Email",
        "Clicks",
        "Sales",
        "Revenue",
        "Commission",
        "Unpaid",
      ],
    ];
    for (const r of data)
      rows.push([
        r.affiliate.name,
        r.affiliate.email,
        r.clicks,
        r.sales,
        r.revenue,
        r.commission,
        r.unpaid,
      ]);
    const csv = rows
      .map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `affiliate_report_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <Button onClick={onExport}>
      <Download size={14} /> Xuất CSV
    </Button>
  );
}
