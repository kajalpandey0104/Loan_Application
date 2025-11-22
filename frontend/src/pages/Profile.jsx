import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";

export default function Profile() {
  const { user } = useAuth();

  const [income, setIncome] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [loading, setLoading] = useState(true);

  // Load profile on page load
  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
       const res = await api.get("/customer/me");
  // ✔ FIXED
      setIncome(res.data.customer.income || "");
      setCreditScore(res.data.customer.creditScore || "");
    } catch (err) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  async function saveDetails() {
    try {
      await api.put("/customer/update", { income, creditScore }); // ✔ FIXED
      toast.success("Profile updated!");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  }

  if (loading) {
    return (
      <div className="pt-24 text-center text-lg text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="pt-24 px-6 min-h-screen bg-gray-50">
      <ToastContainer />

      <div className="max-w-lg mx-auto bg-white p-8 shadow rounded-xl">

        <h2 className="text-3xl font-bold mb-6">Your Profile</h2>

        <p className="text-gray-700 mb-2">Name: {user?.name}</p>
        <p className="text-gray-700 mb-6">Role: {user?.role}</p>

        <label className="block font-semibold mb-2">Monthly Income (₹)</label>
        <input
          type="number"
          className="border p-3 rounded-lg w-full mb-4"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />

        <label className="block font-semibold mb-2">Credit Score</label>
        <input
          type="number"
          className="border p-3 rounded-lg w-full mb-6"
          value={creditScore}
          onChange={(e) => setCreditScore(e.target.value)}
        />

        <button
          onClick={saveDetails}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
