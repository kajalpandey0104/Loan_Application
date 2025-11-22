import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    ShieldCheck,
    BadgeCheck,
    ScrollText,
    TrendingUp,
    Info,
    Calculator,
    ArrowRightCircle,
    ArrowLeftCircle
} from "lucide-react";


export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">

            {/* Hero Section */}
            <div className="pt-24 pb-16 text-center px-6">
                <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-sm">
                    Loan Origination & Approval System
                </h1>

                <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                    Apply for loans, track your application status, and get real-time loan
                    eligibility — powered by smart financial algorithms.
                </p>

                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                    <button
                        onClick={() => navigate("/register")}
                        className="bg-blue-600 text-white text-lg px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition flex items-center gap-2"
                    >
                        Get Started <ArrowRight size={20} />
                    </button>

                    <button
                        onClick={() => navigate("/login")}
                        className="bg-white text-blue-600 border border-blue-500 text-lg px-6 py-3 rounded-xl shadow hover:bg-blue-50 transition"
                    >
                        Login
                    </button>

                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-white rounded-t-3xl shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Why Choose Our Platform?
                </h2>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">

                    <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-md transition">
                        <ScrollText className="text-blue-600 mb-4" size={40} />
                        <h3 className="text-xl font-semibold">Easy Loan Applications</h3>
                        <p className="mt-2 text-gray-600">
                            Apply for loans in minutes with our smart guided workflow.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-md transition">
                        <BadgeCheck className="text-green-600 mb-4" size={40} />
                        <h3 className="text-xl font-semibold">Instant Eligibility Check</h3>
                        <p className="mt-2 text-gray-600">
                            Real-time scoring system based on income & credit score.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-md transition">
                        <ShieldCheck className="text-indigo-600 mb-4" size={40} />
                        <h3 className="text-xl font-semibold">Officer Review System</h3>
                        <p className="mt-2 text-gray-600">
                            Officers can approve or reject applications securely.
                        </p>
                    </div>
                </div>
            </div>

            {/* Loan Calculation Section */}
            <div className="bg-gradient-to-b from-white to-gray-100 py-20 px-6">
                <h2 className="text-3xl font-bold text-center mb-10 flex justify-center gap-3 items-center">
                    <Calculator size={30} className="text-blue-600" />
                    How Loan Eligibility Is Calculated
                </h2>

                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Income */}
                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                        <TrendingUp className="text-blue-600 mb-3" size={38} />
                        <h3 className="text-xl font-bold">Income Normalization</h3>
                        <p className="text-gray-600 mt-2">
                            Income is converted into a 0–1 scale based on your maximum income range.
                            <br />
                            <strong>incomeNorm = income / INCOME_NORM_MAX</strong>
                        </p>
                    </div>

                    {/* Credit Score */}
                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                        <Info className="text-green-600 mb-3" size={38} />
                        <h3 className="text-xl font-bold">Credit Score Factor</h3>
                        <p className="text-gray-600 mt-2">
                            Credit score is normalized between 300–850.
                            <br />
                            <strong>creditNorm = (score - 300) / (850 - 300)</strong>
                        </p>
                    </div>

                    {/* Final Score */}
                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                        <Calculator className="text-indigo-600 mb-3" size={38} />
                        <h3 className="text-xl font-bold">Eligibility Formula</h3>
                        <p className="text-gray-600 mt-2">
                            The final eligibility score:
                        </p>

                        <p className="bg-blue-50 p-3 rounded-lg text-blue-700 font-mono text-sm mt-4">
                            score = (0.6 × creditNorm) + (0.4 × incomeNorm)
                        </p>

                        <p className="mt-3 text-gray-700">
                            If score ≥ threshold → <span className="font-bold text-green-700">Approved</span>
                            <br />
                            Else → <span className="font-bold text-red-600">Rejected</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-6 text-center text-gray-600 mt-10">
                © {new Date().getFullYear()} Loan Origination System • All Rights Reserved
            </footer>
        </div>
    );
}
