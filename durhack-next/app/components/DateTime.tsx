"use client";
import { useEffect, useState } from "react";

export default function DateTime() {
  // Start with null to avoid hydration mismatch
  const [now, setNow] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted || !now) {
    return (
      <div className="current-time">
        <i className="fa-solid fa-calendar-day" />{" "}
        <span id="current-date">Loading...</span>
        <span className="time-dot" />
        <i className="fa-solid fa-clock" />{" "}
        <span id="current-clock">Loading...</span>
      </div>
    );
  }

  return (
    <div className="current-time">
      <i className="fa-solid fa-calendar-day" />{" "}
      <span id="current-date">
        {now.toLocaleDateString("en-US", dateOptions)}
      </span>
      <span className="time-dot" />
      <i className="fa-solid fa-clock" />{" "}
      <span id="current-clock">
        {now.toLocaleTimeString("en-US", timeOptions)}
      </span>
    </div>
  );
}
