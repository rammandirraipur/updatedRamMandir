import React from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "./AdminLayout.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-wrapper">
      <div className="admin-topbar">
        <div className="admin-brand">🛕 Admin Panel</div>

        <nav className="admin-nav">
          <Link
            to="/admin/gallery"
            className={isActive("/admin/gallery") ? "active" : ""}
          >
            Gallery
          </Link>
          <Link
            to="/admin/blog"
            className={isActive("/admin/blog") ? "active" : ""}
          >
            Blog
          </Link>
          <Link
            to="/admin/timing"
            className={isActive("/admin/timing") ? "active" : ""}
          >
            Darshan Timing
          </Link>
        </nav>

        <button className="admin-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;