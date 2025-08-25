"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Lock, ShieldCheck, User, Eye, EyeOff } from "lucide-react";


export default function AdminLogin() {
  const router = useRouter();
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adminId, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.message || "Login failed");
        toast.error(data.message || "Login failed");
        setIsLoading(false);
        return;
      }

      // ✅ Store admin in localStorage
      localStorage.setItem(
        "admin",
        JSON.stringify({
          name: data.name || adminId,
          email: data.email || "admin@example.com", // fallback if backend doesn't send email
        })
      );
      
      // Dispatch custom event to update navbar
      window.dispatchEvent(new Event('loginStatusChanged'));

      toast.success("Successfully logged in!");

      setTimeout(() => {
        //Redirect to adminProfile
        router.push("/admin-dashboard");
      }, 1500);
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col">
      {/* Toastify */}
      <ToastContainer />

      <div className="flex-grow flex items-center justify-center px-4 py-10 sm:py-16">
        <div className="w-full max-w-4xl flex overflow-hidden rounded-2xl shadow-2xl bg-white">
          {/* Left side - Form */}
          <div className="w-full md:w-3/5 p-8 sm:p-10">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-7 h-7 text-blue-500" />
                Admin Login
              </h2>
              <p className="text-gray-600">Access your admin dashboard</p>
            </div>
          
            {formError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md animate-scale-in">
                <p className="text-red-700 text-sm">{formError}</p>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Admin ID <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700" />
                  <input
                    type="text"
                    placeholder="Enter your admin ID"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link 
                    href="#" 
                    className="font-semibold hover:text-blue-700 transition-colors underline underline-offset-2"
                    style={{ color: '#1a202c', textDecoration: 'underline' }}
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-medium text-base shadow-md transition-all duration-300 hover:shadow-lg flex items-center justify-center mt-6"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In as Admin"
                )}
              </button>

              <p className="text-center text-gray-600 mt-6">
                Need an admin account?{" "}
                <Link
                  href="/admin-signup"
                  className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </form>
          </div>
          
          {/* Right side - Image/Illustration */}
          <div className="hidden md:block md:w-2/5 bg-gradient-to-br from-blue-500 to-blue-600 p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Admin Portal</h2>
                <p className="text-blue-100 mb-8">Sign in to manage products, orders, and customer data securely.</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-sm">Manage product inventory</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-sm">Process customer orders</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-sm">Access sales analytics</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-blue-300 opacity-20"></div>
            <div className="absolute top-0 -left-16 w-48 h-48 rounded-full bg-blue-300 opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
