"use client";

import { useEffect } from "react";

export default function SecurityWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const preventDevTools = () => {
        // Disable right-click
        document.addEventListener("contextmenu", (e) => e.preventDefault());

        // Disable specific key combinations
        document.addEventListener("keydown", (e) => {
          if (
            e.key === "F12" ||
            (e.ctrlKey &&
              e.shiftKey &&
              (e.key === "I" || e.key === "J" || e.key === "C")) ||
            (e.ctrlKey && e.key === "U")
          ) {
            e.preventDefault();
          }
        });

        // Detect DevTools open by window size thresholds
        const interval = setInterval(() => {
          const widthThreshold = window.outerWidth - window.innerWidth > 160;
          const heightThreshold = window.outerHeight - window.innerHeight > 160;

          if (widthThreshold || heightThreshold) {
            document.body.innerHTML = "Developer tools detected";
          }
        }, 1000);

        // Cleanup interval
        return () => clearInterval(interval);
      };

      if (typeof window !== "undefined") {
        preventDevTools();
      }
    }
  }, []);

  return <>{children}</>;
}
