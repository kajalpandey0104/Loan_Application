import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import {
  FaSearch,
  FaCheck,
  FaTimes,
  FaUser,
  FaMoneyBillWave,
  FaClock,
  FaFilter,
} from "react-icons/fa";

export default function OfficerDashboard() {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("APPROVED"); // Default
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
  fetchLoans();
}, [filter]);


  useEffect(() => {
    applySearchAndFilter();
  }, [searchTerm, filter, loans]);


  /** 1️⃣ Load All Loans **/
  async function fetchLoans() {
    try {
      setLoading(true);
      const res = await api.get(`/officer/loans?status=${filter}`);

      setLoans(res.data);
    } catch {
      toast.error("Failed to fetch loans");
    } finally {
      setLoading(false);
    }
  }


  /** 2️⃣ Approve / Reject **/
  async function handleReview(id, action) {
    try {
      await api.post(`/officer/loans/${id}/review`, { action });

      toast.success(`Loan ${action.toLowerCase()} successfully`);

      // Refresh data
      fetchLoans();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }


  /** 3️⃣ Filtering + Search **/
  function applySearchAndFilter() {
    let result = loans;

    // Filter by status
    result = result.filter((l) => l.status === filter);

    // Search
    if (searchTerm.trim() !== "") {
      result = result.filter(
        (l) =>
          l._id.includes(searchTerm) ||
          (l.customerId?.userId || "").includes(searchTerm)
      );
    }

    setFilteredLoans(result);
  }


  /** Loading Skeleton **/
  const Skeleton = () => (
    <div className="bg-white p-6 rounded-xl shadow animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  );


  return (
    <div className="min-h-screen pt-24 px-6 bg-gray-100">
      <ToastContainer theme="colored" />

      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Officer Dashboard
      </h1>

      {/* 🔍 Search + Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Search */}
        <div className="flex items-center bg-white px-4 py-2 rounded-xl shadow w-full md:w-1/3">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search Loan ID or Applicant ID..."
            className="w-full outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow">
          <FaFilter className="text-gray-500" />
          <select
            className="outline-none bg-transparent"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="APPROVED">Approved</option>
            <option value="PENDING">Pending</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>


      {/* 🕒 Loading */}
      {loading && (
        <div className="space-y-4">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      )}

      {/* 📭 Empty */}
      {!loading && filteredLoans.length === 0 && (
        <p className="text-center text-gray-600 text-lg mt-10">
          No applications found for this filter.
        </p>
      )}

      {/* 📌 Loan Cards */}
      <div className="space-y-6">
        {filteredLoans.map((loan) => (
          <div
            key={loan._id}
            className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-all"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                <FaMoneyBillWave className="text-indigo-600" /> ₹
                {loan.amountRequested}
              </h3>

              <span className="text-sm text-gray-500">
                Loan ID: {loan._id.substring(0, 8)}...
              </span>
            </div>

            {/* Details */}
            <div className="mt-4 bg-gray-50 rounded-xl p-4 border">
              <p className="flex items-center gap-2 text-gray-700 font-medium">
                <FaUser className="text-blue-600" />
                Applicant: {loan.customerId?.userId?.name || "Unknown"}

              </p>

              <p className="text-gray-600 mt-1">
                Credit Score:{" "}
                <span className="font-semibold">
                  {loan.customerId?.creditScore ?? "N/A"}
                </span>
              </p>

              <p className="text-gray-600">
                Income: ₹
                <span className="font-semibold">
                  {loan.customerId?.income ?? "N/A"}
                </span>
              </p>

              <p className="text-gray-600">
                Tenure: <span className="font-semibold">{loan.tenureMonths}</span>{" "}
                months
              </p>
            </div>

            {/* Actions */}
            {loan.status === "PENDING" && (
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => handleReview(loan._id, "APPROVE")}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow transition"
                >
                  <FaCheck /> Approve
                </button>

                <button
                  onClick={() => handleReview(loan._id, "REJECT")}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow transition"
                >
                  <FaTimes /> Reject
                </button>
              </div>
            )}

            {/* Status Badge */}
            {loan.status !== "PENDING" && (
              <div className="mt-4">
                <span
                  className={`px-4 py-1 rounded-full text-white text-sm ${
                    loan.status === "APPROVED"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {loan.status}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

