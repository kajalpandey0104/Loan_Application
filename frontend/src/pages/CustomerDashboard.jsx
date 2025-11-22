import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FaMoneyCheckAlt,
  FaChartLine,
  FaRegUserCircle,
  FaUserEdit,
  FaCalculator,
  FaWallet,
  FaShieldAlt
} from "react-icons/fa";
import { MdOutlineInfo } from "react-icons/md";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleCardClick(path) {
    toast.info("Opening page...", { autoClose: 500 });
    setTimeout(() => navigate(path), 600);
  }

  return (
    <div className="min-h-screen pt-24 px-6 bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
      <ToastContainer position="top-right" />

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-3">
            <FaRegUserCircle className="text-blue-600 text-7xl drop-shadow-xl" />
          </div>

          <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
            Welcome, <span className="text-blue-800">{user?.name?.toUpperCase()}</span>
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            Manage your financial journey with smart tools & insights.
          </p>
        </div>

        {/* ACTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Apply Loan */}
          <div
            onClick={() => handleCardClick("/apply-loan")}
            className="dashboard-card group"
          >
            <div className="icon-box bg-blue-100 text-blue-600 group-hover:scale-110">
              <FaMoneyCheckAlt size={34} />
            </div>
            <h2 className="card-title text-blue-700">Apply Loan</h2>
            <p className="card-desc">
              Apply for a new loan with instant eligibility evaluation.
            </p>
            <button className="card-btn bg-blue-600 hover:bg-blue-700">
              Apply Now →
            </button>
          </div>

          {/* Loan Status */}
          <div
            onClick={() => handleCardClick("/loan-status")}
            className="dashboard-card group"
          >
            <div className="icon-box bg-green-100 text-green-600 group-hover:scale-110">
              <FaChartLine size={34} />
            </div>
            <h2 className="card-title text-green-700">Loan Status</h2>
            <p className="card-desc">
              Track approvals, rejections & your eligibility score.
            </p>
            <button className="card-btn bg-green-600 hover:bg-green-700">
              View Status →
            </button>
          </div>

          {/* Profile */}
          <div
            onClick={() => handleCardClick("/profile")}
            className="dashboard-card group"
          >
            <div className="icon-box bg-purple-100 text-purple-600 group-hover:scale-110">
              <FaUserEdit size={34} />
            </div>
            <h2 className="card-title text-purple-700">Profile Settings</h2>
            <p className="card-desc">
              Update your personal details to improve eligibility like income and credit score.
            </p>
            <button className="card-btn bg-purple-600 hover:bg-purple-700">
              Edit Profile →
            </button>
          </div>
        </div>


        {/* ACCOUNT SUMMARY */}
        <div className="mt-16 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-10 border border-gray-200">
          <h3 className="section-title">
            <FaShieldAlt className="text-blue-600" /> Account Summary
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            <div className="summary-card">
              <p className="summary-label">Name</p>
              <p className="summary-value">{user?.name}</p>
            </div>

            <div className="summary-card">
              <p className="summary-label">Role</p>
              <p className="summary-value">{user?.role}</p>
            </div>

            <div className="summary-card">
              <p className="summary-label">Customer ID</p>
              <p className="summary-value">{user?.customerId || "- - - -"}</p>
            </div>

            <div className="summary-card">
              <p className="summary-label">Last Login</p>
              <p className="summary-value">
                {localStorage.getItem("lastLogin") || "Today"}
              </p>
            </div>
          </div>
        </div>


        {/* ELIGIBILITY INFO */}
        <div className="mt-12 p-10 bg-blue-50 border-l-8 border-blue-600 rounded-3xl shadow-lg">
          <h4 className="section-title text-blue-800">
            <FaCalculator /> Loan Eligibility Breakdown
          </h4>

          <p className="text-gray-700 mt-3 text-lg">
            Your eligibility score is calculated using:
          </p>

          <ul className="mt-4 text-gray-700 space-y-2 ml-6 list-disc text-lg">
            <li><b>40%</b> — Your Income Score</li>
            <li><b>60%</b> — Your Credit Score</li>
            <li>Score <b>≥ 0.60</b> → Auto-approved</li>
            <li>Score <b>&lt; 0.60</b> → Auto-rejected</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
