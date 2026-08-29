import React, { useState, useEffect } from "react";
import "./livearti.css";

const LiveAarti = () => {
  // ======= CONFIG =======
  const liveStartHour = 19; // 7:30 PM
  const liveStartMinute = 30;
  const liveEndHour = 20; // 8:00 PM
  const liveEndMinute = 0;

  // YouTube channel /live URL
  const liveURL =
    "https://www.youtube.com/channel/UCJlpMH0sntPikQ8ksnbpxtg/live";

  // ======= STATE =======
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Convert times to minutes since midnight
  const startTime = liveStartHour * 60 + liveStartMinute;
  const endTime = liveEndHour * 60 + liveEndMinute;
  const nowMinutes =
    currentTime.getHours() * 60 + currentTime.getMinutes();

  const isAartiTime =
    nowMinutes >= startTime && nowMinutes < endTime;

  // Countdown before Aarti
  const countdownMinutes = startTime - nowMinutes;
  const countdownSeconds = 60 - currentTime.getSeconds();

  return (
    <section className="aarti-section" id="livearti">
      <h2 className="aarti-title">
        🔱 Live Aarti Darshan
        {isAartiTime && <span className="live-dot"></span>}
      </h2>

      <div className="aarti-container">
        {isAartiTime ? (
          <a
            href={liveURL}
            target="_blank"
            rel="noopener noreferrer"
            className="live-link-button"
          >
            ▶️ Watch Live Aarti
          </a>
        ) : countdownMinutes > 0 ? (
          <div className="offline-message">
            ⏳ Aarti will start in {countdownMinutes} min{" "}
            {countdownSeconds} sec.
          </div>
        ) : (
          <div className="offline-message">
            🔔 Aarti has ended. Please come back tomorrow at 7:30 PM.
          </div>
        )}
      </div>

      <p className="aarti-caption">
        Experience the divine Ram Mandir Aarti live from Raipur between
        7:30 PM to 8:00 PM.
      </p>
    </section>
  );
};

export default LiveAarti;
