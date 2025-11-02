"use client";
import { useEffect, useState } from "react";

export default function DateTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
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
