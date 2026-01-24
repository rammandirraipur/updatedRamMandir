import React from "react";
import { useAuth } from "../AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Avatar from "@mui/material/Avatar";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  // Logout current user
  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  // Switch Google account
  const switchAccount = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Welcome Back...</h1>

        {/* Avatar */}
        <Avatar
          alt={user.displayName}
          src={user.photoURL}
          sx={{ width: 100, height: 100, margin: "20px auto" }}
        />

        {/* User Info */}
        <h2 className="user-name">{user.displayName}</h2>
        <div className="email-wrapper">
          <FcGoogle size={24} style={{ marginRight: "8px" }} />
          <span>{user.email}</span>
        </div>

        {/* Buttons */}
        <div className="buttons-wrapper">
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
          <button className="switch-btn" onClick={switchAccount}>
            Switch Google Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
