import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function PrivateRoute({ children, role }) {
  const { user } = useContext(AuthContext);

  // Not logged in → redirect
  if (!user) return <Navigate to="/login" replace />;

  // Role mismatch → access denied → redirect
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
