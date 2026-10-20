"use client";

import { useEffect, useRef } from "react";

export default function AnimatedDetails({ children, className }) {
  const animationRef = useRef(null);
  const expandedRef = useRef(false);

  useEffect(() => () => animationRef.current?.cancel(), []);

  function toggle(event) {
    const details = event.currentTarget;
    const summary = details.firstElementChild;
    if (!summary.contains(event.target)) return;
    event.preventDefault();

    const opening = !(animationRef.current ? expandedRef.current : details.open);
    const startHeight = details.getBoundingClientRect().height;
    animationRef.current?.cancel();
    animationRef.current = null;
    expandedRef.current = opening;
    details.dataset.expanded = String(opening);
    summary.setAttribute("aria-expanded", String(opening));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      details.open = opening;
      details.style.height = "";
      details.style.overflow = "";
      return;
    }

    // Keep the content rendered until closing finishes. Measure from the current
    // animated height so another click reverses smoothly without a jump.
    details.open = true;
    details.style.height = "";
    const computed = getComputedStyle(details);
    const endHeight = opening
      ? details.getBoundingClientRect().height
      : summary.getBoundingClientRect().height
        + parseFloat(computed.borderTopWidth)
        + parseFloat(computed.borderBottomWidth);
    details.style.overflow = "hidden";

    const animation = details.animate(
      [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
      { duration: 280, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" },
    );
    animationRef.current = animation;
    animation.onfinish = () => {
      if (animationRef.current !== animation) return;
      details.open = opening;
      animation.cancel();
      animationRef.current = null;
      details.style.overflow = "";
    };
  }

  return <details className={className} onClick={toggle}>{children}</details>;
}
