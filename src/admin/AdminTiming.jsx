import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const defaultTiming = {
  morning: "6:30 AM – 1:00 PM",
  evening: "2:00 PM – 10:00 PM",
  address: "श्री राम मंदिर, रायपुर तेलीबांधा वी.आई.पी. रोड",
};

const AdminTiming = () => {
  const [form, setForm] = useState(defaultTiming);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchTiming();
  }, []);

  const fetchTiming = async () => {
    try {
      const snap = await getDoc(doc(db, "settings", "darshanTiming"));
      if (snap.exists()) {
        setForm({ ...defaultTiming, ...snap.data() });
      }
    } catch (error) {
      console.error("Error loading timing:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await setDoc(doc(db, "settings", "darshanTiming"), form);
      setSaved(true);
    } catch (error) {
      console.error("Error saving timing:", error);
      alert("Failed to save. Check console.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: "30px" }}>Loading...</div>;

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Manage Darshan Timing</h1>

      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <label>
          Morning timing (प्रातः)
          <input
            type="text"
            value={form.morning}
            onChange={handleChange("morning")}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </label>

        <label>
          Evening timing (दोपहर)
          <input
            type="text"
            value={form.evening}
            onChange={handleChange("evening")}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </label>

        <label>
          Address
          <input
            type="text"
            value={form.address}
            onChange={handleChange("address")}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </label>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Timing"}
        </button>

        {saved && <p style={{ color: "green" }}>Saved successfully!</p>}
      </form>
    </div>
  );
};

export default AdminTiming;