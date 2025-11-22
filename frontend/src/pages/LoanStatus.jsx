import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

export default function LoanStatus() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLoans();
  }, []);

  async function loadLoans() {
    try {
      const res = await api.get("/loans/my-loans");  // FIXED ✔
      setLoans(res.data);
    } catch (err) {
      toast.error("Failed to fetch loan status");
    } finally {
      setLoading(false);
    }
  }

  const getStatusBadge = (status) => {
    if (status === "APPROVED")
      return (
        <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1 text-sm">
          <FaCheckCircle /> Approved
        </span>
      );

    if (status === "REJECTED")
      return (
        <span className="px-4 py-1 bg-red-100 text-red-700 rounded-full flex items-center gap-1 text-sm">
          <FaTimesCircle /> Rejected
        </span>
      );

    return (
      <span className="px-4 py-1 bg-yellow-100 text-yellow-800 rounded-full flex items-center gap-1 text-sm">
        <FaClock /> Pending
      </span>
    );
  };

  if (loading) {
    return (
      <div className="pt-24 px-6 text-center text-gray-700 text-xl">
        Loading your loan history...
      </div>
    );
  }

  return (
    <div className="pt-24 px-6 min-h-screen bg-gray-50">
      <ToastContainer theme="colored" />

      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Your Loan Applications
      </h2>

      {loans.length === 0 ? (
        <p className="text-gray-600 text-lg">No loan applications found.</p>
      ) : (
        <div className="space-y-6">
          {loans.map((loan) => (
            <div
              key={loan._id}
              className="bg-white p-6 rounded-xl shadow border hover:shadow-lg transition-all duration-200"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  Loan Amount: ₹{loan.amountRequested}
                </h3>
                {getStatusBadge(loan.status)}
              </div>

              <p className="mt-2 text-gray-600">
                Tenure: {loan.tenureMonths} months
              </p>

              <p className="text-gray-600">
                Eligibility Score:{" "}
                <span className="font-semibold">
                  {loan.eligibilityScore
                    ? loan.eligibilityScore.toFixed(2)
                    : "Not evaluated"}
                </span>
              </p>

              <p className="text-gray-500 mt-2">
                Applied on {new Date(loan.createdAt).toLocaleDateString()}
              </p>

              <div className="mt-4 w-full border-t pt-4 text-sm text-gray-500">
                <p>
                  Evaluation Completed:{" "}
                  {loan.updatedAt
                    ? loan.updatedAt.split("T")[0]
                    : "Pending"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
