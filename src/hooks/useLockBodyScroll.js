import { useLayoutEffect } from "react";

export default function useLockBodyScroll(active) {
  useLayoutEffect(() => {
    if (typeof document === "undefined") return;

    const body = document.body;
    const html = document.documentElement;

    const prevOverflow = body.style.overflow;
    const prevOB = html.style.overscrollBehavior;

    if (active) {
      body.style.overflow = "hidden"; // khóa scroll nền
      html.style.overscrollBehavior = "none"; // chặn scroll/elastic trên mobile
    }

    return () => {
      body.style.overflow = prevOverflow;
      html.style.overscrollBehavior = prevOB;
    };
  }, [active]);
}
