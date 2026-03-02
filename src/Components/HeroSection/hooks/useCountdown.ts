import { useEffect, useState } from "react";

// march 16 2026, 11:00 AM IST (UTC+5:30)
const TARGET_DATE = new Date("2026-03-16T05:30:00.000Z");

export const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calcTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeLeft;
};

function calcTimeLeft() {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: "00", hours: "00", mins: "00", secs: "00" };
  }

  return {
    days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0"),
    hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
    mins: String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, "0"),
    secs: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
  };
}
