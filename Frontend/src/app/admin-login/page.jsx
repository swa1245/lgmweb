"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Lock, ShieldCheck, User } from "lucide-react";


export default function AdminSignup() {
  const router = useRouter();
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

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
        toast.error(data.message || "Signup failed");
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

      toast.success("Successfully signed up!");

      setTimeout(() => {
        //Redirect to adminProfile
        router.push("/admin-dashboard");
      }, 1500);
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Toastify */}
      <ToastContainer />

      {/* Centered Card */}
      <div className="flex-grow flex items-center justify-center px-4 py-10 ">
        <div className="w-full max-w-sm bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-200 hover:shadow-[0_4px_40px_rgba(0,0,0,0.1)] transition-all duration-300">
          <div className="flex justify-center mb-3">
            <ShieldCheck className="w-12 h-12 text-orange-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-[#0f172a] drop-shadow-sm">
            Admin Signin
          </h2>
          <p className="text-center text-md text-gray-500 mb-6">
            Create your admin account
          </p>

          <form className="space-y-5" onSubmit={handleSignup}>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Admin ID"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-orange-400 outline-none transition duration-200 hover:border-gray-400"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-orange-400 outline-none transition duration-200 hover:border-gray-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-95"
            >
              Sign In as Admin
            </button>

            <p className="text-center text-[15px] text-gray-600 mt-2">
              Not an admin?{" "}
              <a
                href="/"
                className="!text-blue-600 hover:underline font-medium"
              >
                Return to store
              </a>
            </p>
          </form>
        </div>
      </div>

      
    </div>
  );
}
