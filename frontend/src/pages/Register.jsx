import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  });

  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (form.name.trim().length < 3) {
      toast.error("Name must be at least 3 characters");
      return false;
    }

    if (!form.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      // IMPORTANT: correct endpoint
      await api.post("/auth/register", form);

      toast.success("Registration Successful!", { autoClose: 1000 });

      setTimeout(() => navigate("/login"), 1300);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">

      <ToastContainer position="top-right" theme="colored" />

      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-10 animate-fadeIn">

        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Full Name */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Password with Toggle */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter password"
                className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />

              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 text-xl"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Select Role</label>
            <select
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="CUSTOMER">Customer</option>
              <option value="OFFICER">Loan Officer</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            className={`w-full mt-4 bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold transition 
            ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700 hover:shadow-lg"}`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline ml-2"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
