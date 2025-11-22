import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
            Loan Organisation & Approval System
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">

            {!user && (
              <>
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/register">Register</Link>
              </>
            )}

            {user?.role === "CUSTOMER" && (
              <>
                <Link className="nav-link" to="/customer">Home</Link>
                <Link className="nav-link" to="/apply-loan">Apply Loan</Link>
                <Link className="nav-link" to="/loan-status">Loan Status</Link>
                <Link className="nav-link" to="/profile">Profile</Link>
              </>
            )}

            {user?.role === "OFFICER" && (
              <>
                <Link className="nav-link" to="/officer">Officer Panel</Link>
              </>
            )}

            {user && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 shadow-md transition-all"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-gray-700 hover:text-gray-900"
            onClick={() => setOpen(!open)}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-xl border-t border-gray-200 px-6 py-4 space-y-4 animate-fadeIn">

          {!user && (
            <>
              <Link className="mobile-link" to="/" onClick={() => setOpen(false)}>Home</Link>
              <Link className="mobile-link" to="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link className="mobile-link" to="/register" onClick={() => setOpen(false)}>Register</Link>
            </>
          )}

          {user?.role === "CUSTOMER" && (
            <>
              <Link className="mobile-link" to="/customer" onClick={() => setOpen(false)}>Home</Link>
              <Link className="mobile-link" to="/apply-loan" onClick={() => setOpen(false)}>Apply Loan</Link>
              <Link className="mobile-link" to="/loan-status" onClick={() => setOpen(false)}>Loan Status</Link>
              <Link className="mobile-link" to="/profile" onClick={() => setOpen(false)}>Profile</Link>
            </>
          )}

          {user?.role === "OFFICER" && (
            <Link className="mobile-link" to="/officer" onClick={() => setOpen(false)}>
              Officer Panel
            </Link>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
