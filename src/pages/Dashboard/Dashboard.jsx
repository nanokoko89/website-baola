import React, { useEffect, useRef, useState } from "react";
import styles from "./Dashboard.module.scss";
import bind from "../../utils/cx.js";
import FloatingCards from "../../components/FloatingCards/FloatingCards.jsx";
import Memberships from "../../components/Memberships/Memberships.jsx";
import useScrollProgress from "../../hooks/useScrollProgress.js";
import useFadeToY from "../../hooks/useFadeToY.js";

const cx = bind(styles);

function lerpColor(a, b, t) {
  const ah = parseInt(a.slice(1), 16);
  const bh = parseInt(b.slice(1), 16);
  const ar = (ah >> 16) & 0xff,
    ag = (ah >> 8) & 0xff,
    ab = ah & 0xff;
  const br = (bh >> 16) & 0xff,
    bg = (bh >> 8) & 0xff,
    bb = bh & 0xff;
  const rr = Math.round(ar + (br - ar) * t)
    .toString(16)
    .padStart(2, "0");
  const gg = Math.round(ag + (bg - ag) * t)
    .toString(16)
    .padStart(2, "0");
  const bb2 = Math.round(ab + (bb - ab) * t)
    .toString(16)
    .padStart(2, "0");
  return `#${rr}${gg}${bb2}`;
}

export default function Dashboard() {
  const h1Ref = useRef(null);
  const [heroMid, setHeroMid] = useState(null);
  const headerP = useScrollProgress(0, 80);
  const cardsFade = useFadeToY(heroMid ?? -1, 160);

  useEffect(() => {
    const topColor = lerpColor("#ffffff", "#faf8f0", headerP);
    const color = lerpColor(topColor, "#f7f4eb", cardsFade);
    document.body.style.background = color;
  }, [headerP, cardsFade]);

  useEffect(() => {
    return () => {
      document.body.style.background = "";
    };
  }, []);
  useEffect(() => {
    const measure = () => {
      if (!h1Ref.current) return;
      const rect = h1Ref.current.getBoundingClientRect();
      const mid =
        (window.scrollY || window.pageYOffset) + rect.top + rect.height * 0.5;
      setHeroMid(mid);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  return (
    <div className={cx("page")}>
      {/* Floating cards left/right with scroll motion */}
      <FloatingCards
        side="left"
        fadeAt={heroMid}
        fadeRange={160}
        items={[
          {
            top: 48,
            baseRotate: 7,
            sideOffset: 6,
            card: {
              avatar: "C",
              title: "Cara is building a new platform for artists",
              supporters: "8,780",
            },
          },
          {
            top: 212,
            baseRotate: -7,
            sideOffset: -36,
            small: true,
            card: {
              img: "https://i.pravatar.cc/80?img=14",
              title:
                "Kaleigh Cohen is creating indoor cycling and strength workouts on YouTube!",
              supporters: "4,488",
            },
          },
          {
            top: 400,
            baseRotate: 10,
            sideOffset: 24,
            small: true,
            card: {
              img: "https://i.pravatar.cc/80?img=8",
              title: "Teacher Stefano is creating YouTube videos and Podcast",
              supporters: "641",
            },
          },
        ]}
      />
      <FloatingCards
        side="right"
        fadeAt={heroMid}
        fadeRange={160}
        items={[
          {
            top: 56,
            baseRotate: 8,
            sideOffset: 66,
            card: {
              img: "https://i.pravatar.cc/80?img=5",
              title: "The Thrill Of The Thrift is creating thrifting videos",
              supporters: "112",
            },
          },
          {
            top: 236,
            baseRotate: 24,
            sideOffset: 24,
            small: true,
            card: {
              logo: "BTR",
              title: "Beach Talk Radio is a Dinky Little Podcast",
              supporters: "1,805",
            },
          },
          {
            top: 400,
            baseRotate: -4,
            sideOffset: 136,
            small: true,
            card: {
              logo: "SP",
              title:
                "Simple Politics is helping people have better conversations about politics",
              supporters: "—",
            },
          },
        ]}
      />

      {/* Hero section */}
      <main className={cx("hero")}>
        <div className={cx("social-proof")}>
          <span className={cx("stars")} aria-hidden="true">
            {Array.from({ length: 3 }).map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 24 24"
                width="18"
                height="18"
                className={cx("star")}
              >
                <path
                  d="M12 .9l3 7 7.7.6-5.8 4.9 1.9 7.5L12 16.9 5.2 20.9l1.9-7.5L1.3 8.5 9 7.9 12 .9z"
                  fill="currentColor"
                />
              </svg>
            ))}
          </span>
          <span className={cx("loved")}>
            Sứ mệnh giúp 1,000,000+ người Việt
          </span>
          <span className={cx("stars")} aria-hidden="true">
            {Array.from({ length: 3 }).map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 24 24"
                width="18"
                height="18"
                className={cx("star")}
              >
                <path
                  d="M12 .9l3 7 7.7.6-5.8 4.9 1.9 7.5L12 16.9 5.2 20.9l1.9-7.5L1.3 8.5 9 7.9 12 .9z"
                  fill="currentColor"
                />
              </svg>
            ))}
          </span>
        </div>

        <h1 ref={h1Ref} className={cx("h1")}>
          <span>Tăng thu nhập</span>
          <span>lên 1 triệu đô</span>
        </h1>

        <p className={cx("sub")}>
          Xây dựng thương hiệu. Thiết lập cửa hàng. Kiếm tiền cùng internet. Mọi
          thứ dễ hơn bạn nghĩ.
        </p>
        <a href="#" className={cx("btn", "btn-cta")}>
          Băt đầu trang của tôi
        </a>
        <p className={cx("muted")}>Nó miễn phí và chỉ mất chưa đầy một phút!</p>
      </main>

      {/* Content below to allow scrolling and showcase the animation */}
      <section className={cx("feature")}>
        <div className="container">
          <h2>Why creators love us</h2>
          <ul className={cx("grid")}>
            <li>
              <strong>Memberships</strong>
              <br />
              Recurring income from your fans.
            </li>
            <li>
              <strong>Shop</strong>
              <br />
              Sell digital products in minutes.
            </li>
            <li>
              <strong>Support</strong>
              <br />
              One‑time tips from your audience.
            </li>
          </ul>
        </div>
      </section>
      <Memberships />
      <footer className={cx("site-footer")} />
    </div>
  );
}
