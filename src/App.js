import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import DarshanTimingPage from "./components/DarshanTimingPage";
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
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminRoute from "./admin/AdminRoute";
import AdminGallery from "./admin/AdminGallery";
import AdminBlog from "./admin/AdminBlog";
import AdminTiming from "./admin/AdminTiming";

import { useAuth } from "./AuthContext";

function App() {
  const { user } = useAuth();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <About />
              <Gallery />
              <DarshanTimingPage />
              <BlogSection />
              <LiveAarti />
              <DonationForm />
              <Footer />
            </>
          }
        />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="timing" element={<AdminTiming />} />
        </Route>

        <Route path="/donation" element={<DonationForm />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/auth" />}
        />
      </Routes>
    </>
  );
}

export default App;