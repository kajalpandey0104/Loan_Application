import React, { useState } from "react";
import api from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { FaMoneyBillWave, FaClock } from "react-icons/fa";

export default function ApplyLoan() {
  const [amount, setAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // VALIDATION
    if (!amount || Number(amount) < 500) {
      toast.error("Loan amount must be at least ₹500");
      return;
    }

    if (!tenure || Number(tenure) < 3) {
      toast.error("Tenure must be at least 3 months");
      return;
    }

    setLoading(true);

    try {
      // CORRECT API PAYLOAD — customerId NOT needed
      await api.post("/loans/apply", {
        amountRequested: Number(amount),
        tenureMonths: Number(tenure),
      });

      toast.success("Loan Application Submitted Successfully!");

      // CLEAR FORM
      setAmount("");
      setTenure("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit loan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-24 px-6 min-h-screen bg-gray-100">
      <ToastContainer theme="colored" />

      <div className="max-w-lg mx-auto bg-white p-10 rounded-2xl shadow-xl border">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Apply for a Loan
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Loan Amount */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Loan Amount (₹)
            </label>

            <div className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50 shadow-sm">
              <FaMoneyBillWave className="text-green-600 text-xl" />
              <input
                type="number"
                className="flex-1 bg-transparent outline-none text-gray-800"
                placeholder="e.g. 50000"
                value={amount}
                min="500"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          {/* Tenure */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Tenure (Months)
            </label>

            <div className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50 shadow-sm">
              <FaClock className="text-blue-600 text-xl" />
              <input
                type="number"
                className="flex-1 bg-transparent outline-none text-gray-800"
                placeholder="e.g. 12"
                min="3"
                onChange={(e) => setTenure(e.target.value)}
                value={tenure}
              />
            </div>
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition shadow 
              ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}
