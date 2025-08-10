"use client";

import { ShieldCheck, LogOut } from "lucide-react";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminProfile = () => {
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState("admin@example.com"); // default

  const joinDate = "August 2025";

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      const admin = JSON.parse(storedAdmin);
      setAdminEmail(admin.email || "admin@example.com");
    } else {
      // If not logged in, redirect
      router.push("/admin-login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("token"); // optional if you're using it
    router.push("/admin-login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900 font-sans mb-8">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md text-center mt-10">
        {/* Admin Icon */}
        <div className="flex justify-center mb-4">
          <ShieldCheck size={60} className="text-orange-500" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 mb-1">Admin Profile</h2>
        <p className="text-gray-500 mb-6">
          Welcome back,{" "}
          <span className="font-semibold text-gray-700">
            {adminEmail?.split("@")[0]}
          </span>
        </p>

        {/* Admin Details */}
        <div className="bg-gray-100 text-left p-4 rounded-lg mb-6 border border-gray-200">
          <p className="font-semibold mb-2">
            Email: <span className="font-normal">{adminEmail}</span>
          </p>
          <p className="text-sm text-gray-600">Role: Admin</p>
          <p className="text-sm text-gray-600">Joined: {joinDate}</p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow hover:scale-105 transition-transform duration-200"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      
    </div>
  );
};

export default AdminProfile;
