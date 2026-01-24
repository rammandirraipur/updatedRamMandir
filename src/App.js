import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Gallery from "./components/Gallery";
import BlogSection from "./components/BlogSection";
import LiveAarti from "./components/LiveAarti";
import DonationForm from "./components/DonationForm";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";

import { useAuth } from "./AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <About />
              <Gallery />
              <BlogSection />
              <LiveAarti />
              <DonationForm />
              <Footer />
            </>
          }
        />
         <Route path="/donation" element={<DonationForm />} />

        {/* Login Page */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/auth" />}
        />
      </Routes>
    </>
  );
}

export default App;
