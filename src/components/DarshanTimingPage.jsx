import React from "react";
import "./DarshanTimingPage.css";

function DarshanTimingPage() {
  return (
    <div className="darshan-page" id="DarshanTimingPage">
      <div className="darshan-container">
        <h1 className="darshan-title">श्री राम मंदिर</h1>
        <p className="darshan-subtitle">प्रतिदिन दर्शन समय</p>

        <div className="darshan-timings">
          <div className="timing-card">
            <span className="timing-label">प्रातः</span>
            <span className="timing-value">6:30 AM – 1:00 PM</span>
          </div>
          <div className="timing-card">
            <span className="timing-label">दोपहर</span>
            <span className="timing-value">2:00 PM – 10:00 PM</span>
          </div>
        </div>

        <p className="darshan-address">
          श्री राम मंदिर, रायपुर तेलीबांधा वी.आई.पी. रोड
        </p>
      </div>
    </div>
  );
}

export default DarshanTimingPage;