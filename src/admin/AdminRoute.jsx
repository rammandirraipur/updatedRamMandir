import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { ADMIN_EMAILS } from "../adminConfig";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/admin/login" />;
  if (!ADMIN_EMAILS.includes(user.email)) return <Navigate to="/admin/login" />;

  return children;
};

export default AdminRoute;