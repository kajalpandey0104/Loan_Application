import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import ApplyLoan from "./pages/ApplyLoan";
import LoanStatus from "./pages/LoanStatus";
import OfficerDashboard from "./pages/OfficerDashboard";
import Profile from './pages/Profile';


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer position="top-right" theme="colored" />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/officer/login" element={<OfficerLogin />} /> */}

        {/* Officer Routes */}
        <Route
          path="/officer"
          element={
            <PrivateRoute role="OFFICER">
              <OfficerDashboard />
            </PrivateRoute>
          }
        />

        {/* Customer Routes */}
        <Route
          path="/customer"
          element={
            <PrivateRoute role="CUSTOMER">
              <CustomerDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/apply-loan"
          element={
            <PrivateRoute role="CUSTOMER">
              <ApplyLoan />
            </PrivateRoute>
          }
        />

        <Route
          path="/loan-status"
          element={
            <PrivateRoute role="CUSTOMER">
              <LoanStatus />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute role="CUSTOMER">
              <Profile />
            </PrivateRoute>
          }
        />
        
       
      </Routes>
    </BrowserRouter>
  );
}
