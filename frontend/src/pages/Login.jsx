import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (!form.email.includes("@")) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/login", form);

      // Save last login time
      localStorage.setItem("lastLogin", new Date().toLocaleString());

      // LOGIN CONTEXT UPDATE
      login(
        res.data.token,
        res.data.role,
        res.data.userId,
        res.data.customerId,
        res.data.name
      );

      toast.success("Login Successful!", { autoClose: 1000 });

      setTimeout(() => {
        if (res.data.role === "OFFICER") navigate("/officer");
        else navigate("/customer");
      }, 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer position="top-right" theme="colored" />

      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-10 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Login to Continue
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              autoFocus
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />

              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-xl"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            disabled={loading}
            className={`w-full mt-4 bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold transition-all 
            ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700 hover:shadow-lg"}
            `}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline ml-2"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
