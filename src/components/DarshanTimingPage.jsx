import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "./DarshanTimingPage.css";

const defaultTiming = {
  morning: "6:30 AM – 1:00 PM",
  evening: "2:00 PM – 10:00 PM",
  address: "श्री राम मंदिर, रायपुर तेलीबांधा वी.आई.पी. रोड",
};

function DarshanTimingPage() {
  const [timing, setTiming] = useState(defaultTiming);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTiming();
  }, []);

  const fetchTiming = async () => {
    try {
      const snap = await getDoc(doc(db, "settings", "darshanTiming"));
      if (snap.exists()) {
        setTiming({ ...defaultTiming, ...snap.data() });
      }
    } catch (error) {
      console.error("Error loading darshan timing:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="darshan-page" id="DarshanTimingPage">Loading...</div>;
  }

  return (
    <div className="darshan-page" id="DarshanTimingPage">
      <div className="darshan-container">
        <h1 className="darshan-title">श्री राम मंदिर</h1>
        <p className="darshan-subtitle">प्रतिदिन दर्शन समय</p>

        <div className="darshan-timings">
          <div className="timing-card">
            <span className="timing-label">प्रातः</span>
            <span className="timing-value">{timing.morning}</span>
          </div>
          <div className="timing-card">
            <span className="timing-label">दोपहर</span>
            <span className="timing-value">{timing.evening}</span>
          </div>
        </div>

        <p className="darshan-address">{timing.address}</p>
      </div>
    </div>
  );
}

export default DarshanTimingPage;