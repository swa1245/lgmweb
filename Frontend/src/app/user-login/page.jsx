


"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { Inter, Poppins } from 'next/font/google';
import API_CONFIG from "../../config/api";

// Initialize the fonts
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins'
});

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginPromise = fetch(`${API_CONFIG.BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Login failed");
        }

        // ✅ Save token and full user info including phone
        const { name, email, phone } = data.user;
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ name, email, phone }));
        
        // Dispatch custom event to update navbar
        window.dispatchEvent(new Event('loginStatusChanged'));

        return data;
      })
      .then(() => {
        router.push("/inline-skates");
      });

    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: "Login successful!",
      error: (err) => err.message || "Login failed",
    });
  };

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex flex-col ${inter.variable} ${poppins.variable}`}>
      <div className="flex-grow flex items-center justify-center px-4 py-10 sm:py-16">
        <div className="w-full max-w-4xl flex overflow-hidden rounded-2xl shadow-2xl bg-white">
          <style jsx global>{`
            :root {
              --font-inter: ${inter.style.fontFamily};
              --font-poppins: ${poppins.style.fontFamily};
            }
          `}</style>
          {/* Left side - Image/Illustration */}
          <div className="hidden md:block w-1/2 bg-gradient-to-br from-orange-400 to-orange-600 p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 font-poppins tracking-tight">Welcome Back!</h2>
                <p className="text-orange-100 mb-8 font-inter leading-relaxed">Log in to access your account and continue your shopping experience.</p>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <LogIn className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-sm">Secure and easy login process</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-sm">Access your orders and profile</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-orange-300 opacity-20"></div>
            <div className="absolute top-0 -left-16 w-48 h-48 rounded-full bg-orange-300 opacity-20"></div>
          </div>
          
          {/* Right side - Login Form */}
          <div className="w-full md:w-1/2 p-8 sm:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 font-poppins tracking-tight">Login</h2>
              <p className="text-gray-600 font-inter">Please sign in to continue</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 font-inter">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 font-inter text-gray-800 shadow-sm hover:border-orange-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 font-inter">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200 font-inter text-gray-800 shadow-sm hover:border-orange-300"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 font-medium text-sm font-inter"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <label className="flex items-center space-x-2 text-sm">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-gray-700">Remember me</span>
                </label>
                <Link
                  href="#"
                  className="text-sm font-semibold hover:text-orange-700 transition-colors underline underline-offset-2"
                  style={{ color: '#1a202c', textDecoration: 'underline' }}
                >
                  Forgot password?
                </Link>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-lg font-medium text-base shadow-md transition-all duration-300 hover:shadow-lg flex items-center justify-center"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
              
              
              
              
            </form>
            
            <p className="text-center text-gray-600 mt-8">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-orange-600 hover:text-orange-800 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
