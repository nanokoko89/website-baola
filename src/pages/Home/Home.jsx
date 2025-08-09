import React, { useEffect, useRef, useState } from "react";
import styles from "./Home.module.scss";
import bind from "../../utils/cx";
import FloatingCards from "../../components/FloatingCards/FloatingCards.jsx";
import Memberships from "../../components/Memberships/Memberships.jsx";
const cx = bind(styles);

export default function Home() {
  const h1Ref = useRef(null);
  const [heroMid, setHeroMid] = useState(null);
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
            {Array.from({ length: 5 }).map((_, i) => (
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
          <span className={cx("loved")}>Loved by 1,000,000+ creators</span>
        </div>

        <h1 ref={h1Ref} className={cx("h1")}>
          <span>Fund your</span>
          <span>creative work</span>
        </h1>

        <p className={cx("sub")}>
          Accept support. Start a membership. Setup a shop. It’s easier than you
          think.
        </p>
        <a href="#" className={cx("btn", "btn-cta")}>
          Start my page
        </a>
        <p className={cx("muted")}>It’s free and takes less than a minute!</p>
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
