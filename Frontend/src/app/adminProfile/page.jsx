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
    
    // Dispatch custom event to update navbar
    window.dispatchEvent(new Event('loginStatusChanged'));
    
    router.push("/admin-login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 text-gray-900 font-sans mb-8">
      <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md text-center mt-10 border border-gray-100 relative overflow-hidden transition-all duration-300 hover:shadow-blue-100">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 z-0"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-50 rounded-full -ml-16 -mb-16 z-0"></div>
        
        {/* Admin Icon */}
        <div className="flex justify-center mb-6 relative z-10">
          <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-4 rounded-full shadow-lg">
            <ShieldCheck size={50} className="text-white" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2 relative z-10">Admin Profile</h2>
        <p className="text-gray-500 mb-8 relative z-10">
          Welcome back,{" "}
          <span className="font-semibold text-orange-600">
            {adminEmail?.split("@")[0]}
          </span>
        </p>

        {/* Admin Details */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 text-left p-6 rounded-2xl mb-8 border border-blue-100 shadow-inner relative z-10">
          <p className="font-semibold mb-3 flex items-center">
            <span className="bg-blue-100 p-1.5 rounded-md mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"></path><polyline points="15,9 18,9 18,11"></polyline><path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0"></path><line x1="6" y1="10" x2="7" y2="10"></line></svg>
            </span>
            <span className="text-gray-800">Email:</span> <span className="font-normal ml-1 text-gray-700">{adminEmail}</span>
          </p>
          <p className="text-sm text-gray-600 mb-2 flex items-center ml-9">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Role: <span className="font-medium ml-1">Administrator</span>
          </p>
          <p className="text-sm text-gray-600 flex items-center ml-9">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Joined: <span className="font-medium ml-1">{joinDate}</span>
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-red-200 hover:scale-105 transition-all duration-300 relative z-10 w-full"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
      
      <div className="text-center mt-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} LGM Admin Portal
      </div>
    </div>
  );
};

export default AdminProfile;
