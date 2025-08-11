import React, { useMemo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Affiliate.module.scss";

const cx = classNames.bind(styles);

/* ---------------- Icons (inline SVG để không phụ thuộc libs) ---------------- */
const IconCoin = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.12" />
    <path
      d="M12 6a6 6 0 100 12 6 6 0 000-12Zm.75 3.5a.75.75 0 10-1.5 0v.41a3.26 3.26 0 00-1.5.81.75.75 0 001.06 1.06c.24-.24.58-.38.94-.38.69 0 1.25.41 1.25.92s-.56.92-1.25.92H11a.75.75 0 000 1.5h.25v.41a.75.75 0 001.5 0v-.44A2.93 2.93 0 0015 13.12c0-1.38-1.31-2.37-2.25-2.55V9.5Z"
      fill="currentColor"
    />
  </svg>
);
const IconPlus = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M11 5a1 1 0 112 0v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H5a1 1 0 110-2h6V5z"
      fill="currentColor"
    />
  </svg>
);
const IconCalendar = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M7 2a1 1 0 100 2h1V2h2v2h4V2h2v2h1a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h1V2h2v2H7zM4 10h16v9a1 1 0 01-1 1H6a1 1 0 01-1-1v-9z"
      fill="currentColor"
    />
  </svg>
);
const IconMore = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <circle cx="5" cy="12" r="2" fill="currentColor" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <circle cx="19" cy="12" r="2" fill="currentColor" />
  </svg>
);
const IconCopy = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M8 7a3 3 0 013-3h7a3 3 0 013 3v7a3 3 0 01-3 3h-7a3 3 0 01-3-3V7zm3-1a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V7a1 1 0 00-1-1h-7zM4 9a3 3 0 013-3h1v2H7a1 1 0 00-1 1v8a3 3 0 003 3h8a1 1 0 001-1v-1h2v1a3 3 0 01-3 3H9a5 5 0 01-5-5V9z"
      fill="currentColor"
    />
  </svg>
);

/* -------------------- Mock dữ liệu giống ảnh -------------------- */
const mockLinks = [
  {
    id: "1",
    whop: "Search Accelerator",
    url: "https://whop.com/search-accelerator?a=nguyentuan1989xk",
    signups: 0,
    earnings: 0,
    price: 3000,
    rate: 30,
    status: "Active",
  },
];

export default function Affiliate() {
  const [tab, setTab] = useState("affiliates"); // 'affiliates' | 'partners'

  const totalRewards = useMemo(
    () => mockLinks.reduce((s, r) => s + r.earnings, 0),
    []
  );

  return (
    <div className={cx("page")}>
      {/* Topbar */}
      <div className={cx("topbar")}>
        <div className={cx("topbarLeft")}>
          <div className={cx("tabs")}>
            <button
              className={cx("tab", { active: tab === "affiliates" })}
              onClick={() => setTab("affiliates")}
            >
              Quản lý hệ thống tiếp thị
            </button>
            <button
              className={cx("tab", { active: tab === "partners" })}
              onClick={() => setTab("partners")}
            >
              Dành cho người tiếp thị
            </button>
          </div>
        </div>

        <div className={cx("topbarRight")}>
          <button className={cx("applyBtn")}>Đăng ký làm đối tác</button>
          <button className={cx("avatarBtn")} aria-label="Account" />
        </div>
      </div>

      {tab === "partners" ? (
        <PartnersView />
      ) : (
        <AffiliatesView totalRewards={totalRewards} />
      )}
    </div>
  );
}

/* ---------------------- View: Whop Partners ---------------------- */
function PartnersView() {
  return (
    <div className={cx("partnersWrap")}>
      <section className={cx("hero")}>
        <h2 className={cx("heroTitle")}>Trở thành đối tác tiếp thị</h2>
        <p className={cx("heroSub")}>
          Become a Whop Partner, refer users, and make money whenever Whop makes
          money for the next 50 years.
        </p>
        <button className={cx("heroCta")}>Apply to be a partner</button>
      </section>

      <section className={cx("steps")}>
        <div className={cx("stepCard")}>
          <div className={cx("mockBox")}>
            <div className={cx("inputBox")}>
              whop.com/?<b>a=nguyentuan1989xk</b>
            </div>
          </div>
          <div className={cx("stepContent")}>
            <h4>1. Share your link</h4>
            <p>
              Share your referral link with your network or invite new users to
              your whop.
            </p>
          </div>
        </div>

        <div className={cx("stepCard")}>
          <div className={cx("mockBox")}>
            <div className={cx("inputBox")}>jessica@whop.com</div>
            <div className={cx("badgeSuccess")}>
              <span className={cx("dot")} /> Signed up
            </div>
          </div>
          <div className={cx("stepContent")}>
            <h4>2. New user signs up</h4>
            <p>
              When people sign up to Whop with your link, they will be
              attributed to you.
            </p>
          </div>
        </div>

        <div className={cx("stepCard")}>
          <div className={cx("mockNotif")}>
            <div className={cx("notifIcon")}>W</div>
            <div className={cx("notifBody")}>
              <div className={cx("notifHead")}>
                <b>Whop</b>
                <span className={cx("notifTime")}>2m ago</span>
              </div>
              <div className={cx("notifText")}>
                You&apos;ve earned <b>$50.00</b> from a new referral!
              </div>
            </div>
          </div>
          <div className={cx("stepContent")}>
            <h4>3. Get paid</h4>
            <p>
              Anytime Whop makes money from one of your referrals, you&apos;ll
              get paid for the next 50 years.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------------- View: Affiliates (dashboard) ---------------------- */
function AffiliatesView({ totalRewards }) {
  const [showRows, setShowRows] = useState(10);

  return (
    <>
      {/* Chart card + filter */}
      <section className={cx("chartCard")}>
        <div className={cx("chartHeader")}>
          <div className={cx("chartTitle")}>Total rewards</div>
          <div className={cx("filters")}>
            <button className={cx("filterBtn")}>Last 7 days</button>
            <div className={cx("divider")} />
            <button className={cx("daterangeBtn")}>
              <IconCalendar className={cx("calIcon")} />
              Aug 5 - 11, 2025
            </button>
          </div>
        </div>
        <div className={cx("chartBody")}>
          <div className={cx("nodata")}>No data available</div>
        </div>
      </section>

      {/* KPI cards */}
      <section className={cx("kpis")}>
        <div className={cx("kpiCard", "primary")}>
          <div className={cx("kpiIconWrap")}>
            <IconCoin className={cx("kpiIcon")} />
          </div>
          <div className={cx("kpiMeta")}>
            <div className={cx("kpiLabel")}>Total rewards</div>
            <div className={cx("kpiValue")}>${totalRewards.toFixed(2)}</div>
          </div>
        </div>

        <div className={cx("kpiCard")}>
          <div className={cx("kpiIconWrap")}>
            <IconPlus className={cx("kpiIcon")} />
          </div>
          <div className={cx("kpiMeta")}>
            <div className={cx("kpiLabel")}>Total referrals</div>
            <div className={cx("kpiValue")}>0</div>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className={cx("tableWrap")}>
        <div className={cx("tableHeadRow")}>
          <div className={cx("tableTitle")}>Your affiliate links</div>
          <div className={cx("tableActions")}>
            <button className={cx("secondaryBtn")}>Browse</button>
          </div>
        </div>

        <div className={cx("table")}>
          <div className={cx("thead")}>
            <div className={cx("th", "colWhop")}>Whop</div>
            <div className={cx("th", "colLink")}>Affiliate link</div>
            <div className={cx("th", "colNum")}>Signups</div>
            <div className={cx("th", "colNum")}>Your earnings</div>
            <div className={cx("th", "colPrice")}>Price</div>
            <div className={cx("th", "colNum")}>Affiliate rate</div>
            <div className={cx("th", "colStatus")}>Status</div>
            <div className={cx("th", "colMore")} />
          </div>

          <div className={cx("tbody")}>
            {mockLinks.map((r) => (
              <div className={cx("tr")} key={r.id}>
                <div className={cx("td", "colWhop")}>
                  <div className={cx("whopIcon")}>S</div>
                  <div className={cx("whopName")}>{r.whop}</div>
                </div>
                <div className={cx("td", "colLink")}>
                  <a
                    className={cx("link")}
                    href={r.url}
                    onClick={(e) => e.preventDefault()}
                  >
                    {r.url}
                  </a>
                  <button
                    className={cx("iconBtn")}
                    aria-label="Copy link"
                    onClick={() => {
                      navigator.clipboard?.writeText(r.url);
                    }}
                  >
                    <IconCopy />
                  </button>
                </div>
                <div className={cx("td", "colNum")}>{r.signups}</div>
                <div className={cx("td", "colNum")}>
                  ${r.earnings.toFixed(2)}
                </div>
                <div className={cx("td", "colPrice")}>
                  $
                  {r.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className={cx("td", "colNum")}>{r.rate}%</div>
                <div className={cx("td", "colStatus")}>
                  <span
                    className={cx("status", { active: r.status === "Active" })}
                  >
                    {r.status}
                  </span>
                </div>
                <div className={cx("td", "colMore")}>
                  <button className={cx("iconBtn")} aria-label="More">
                    <IconMore />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={cx("tfoot")}>
            <div className={cx("rowsInfo")}>Showing 1 to 1 of 1</div>
            <div className={cx("rowsSelect")}>
              <span>Show</span>
              <select
                value={showRows}
                onChange={(e) => setShowRows(Number(e.target.value))}
              >
                {[10, 20, 50].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
