"use client";

import { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiSearch, FiShoppingCart, FiUser, FiBell } from "react-icons/fi"; // added FiBell
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import { Truck, GraduationCap } from "lucide-react";
import { FaUserShield, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const loginDropdownRef = useRef(null);
  const router = useRouter();
  const { cart } = useCart();

  // Check login status on mount and when localStorage changes
  const checkLoginStatus = () => {
    const admin = localStorage.getItem("admin");
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!admin || !!token);
    setIsAdmin(!!admin);
  };

  useEffect(() => {
    // Initial check
    checkLoginStatus();
    
    // Listen for storage events (when localStorage changes in other tabs)
    window.addEventListener('storage', checkLoginStatus);
    
    // Listen for custom login/logout events
    window.addEventListener('loginStatusChanged', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('loginStatusChanged', checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (loginDropdownRef.current && !loginDropdownRef.current.contains(e.target)) {
        setShowLoginDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  // Update cart count when cart changes
  useEffect(() => {
    if (cart) {
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    }
  }, [cart]);

  const handleProfileClick = () => {
    const admin = localStorage.getItem("admin");
    const token = localStorage.getItem("token");

    if (admin || token) {
      setShowLoginDropdown(!showLoginDropdown);
    } else {
      setShowLoginDropdown(true);
    }
  };

  const navLinkClass = (path) =>
    `px-4 py-1.5 rounded-sm font-semibold transition-all duration-200 relative
     ${
       pathname === path
         ? "bg-[#e6f0ff] !text-[#2563eb] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#2563eb]"
         : "!text-gray-800 hover:bg-[#e6f0ff] hover:text-[#2563eb]"
     }`;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-orange-400 text-white text-md text-center py-2 font-bold font-[Arimo] flex justify-center items-center gap-4">
        <div className="flex items-center gap-1 animate-blinkSlow">
          <Truck size={18} className="text-white" />
          <span>Free Delivery on Every Order</span>
        </div>
        <span className="text-white">|</span>
        <div className="flex items-center gap-1 animate-blinkSlow">
          <GraduationCap size={18} className="text-white" />
          <span>Extra 10% Discount for Academic Students</span>
        </div>
        <style jsx>{`
          @keyframes blinkSlow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          .animate-blinkSlow {
            animation: blinkSlow 2.5s ease-in-out infinite;
          }
        `}</style>
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow-sm font-semibold px-4 md:px-12 py-3 flex justify-between items-center">
        {/* Left Nav */}
        <div className="flex items-center gap-6">
          <HiMenu
            className="text-2xl text-gray-700 md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          />

          <div className="hidden md:flex items-center gap-2 text-[15px] font-medium">
            <Link href="/" className={navLinkClass("/")}>Home</Link>
            <Link href="/inline-skates" className={navLinkClass("/inline-skates")}>Professional Inline Skates</Link>
            <Link href="/quad-skates" className={navLinkClass("/quad-skates")}>Roller/Quad Skates</Link>

            {isAdmin && (
              <Link href="/admin-dashboard" className={navLinkClass("/admin-dashboard")}>
                Admin Dashboard
              </Link>
            )}

            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-full">
                Products <MdKeyboardArrowDown className="text-lg" />
              </button>
              {showDropdown && (
                <div className="absolute top-8 left-0 bg-white w-48 shadow-lg border rounded z-50">
                  <Link href="/workout-gear" className="block px-4 py-2 !text-black">Workout Gear</Link>
                  <Link href="/sunglasses" className="block px-4 py-2 !text-black">Sunglasses</Link>
                </div>
              )}
            </div>

            {/* <Link href="/hockey-skates" className={navLinkClass("/hockey-skates")}>Hockey Skates</Link> */}
            <Link href="/workout-gear" className={navLinkClass("/workout-gear")}>Workout Gear</Link>
            <Link href="/Contact" className={navLinkClass("/Contact")}>Contact</Link>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3 md:gap-4 relative font-semibold">
          <div className="hidden md:block relative">
            <input
              type="text"
              placeholder="Search products..."
              className="rounded-full border border-gray-300 py-2 px-4 pr-10 text-sm w-64 outline-none text-gray-800"
            />
            <FiSearch className="absolute top-2.5 right-4 text-gray-500 text-lg" />
          </div>

          <Link href="/cart">
            <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 relative">
              <FiShoppingCart className="text-gray-800 text-xl" strokeWidth={2.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </Link>

          {/* Notification Icon - only when logged in */}
          {isLoggedIn && (
            <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 relative">
              <FiBell className="text-gray-800 text-xl" strokeWidth={2.5} />
              {/* dot will be used when notification count is implemented */}
            </button>
          )}

          <div className="relative" ref={loginDropdownRef}>
            <button
              onClick={handleProfileClick}
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 relative"
            >
              <FiUser className="text-gray-800 text-xl" strokeWidth={2.5} />
              {isLoggedIn && (
                <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 border border-white"></span>
              )}
            </button>

            {showLoginDropdown && (
              <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 text-black overflow-hidden transform transition-all duration-200 ease-in-out">
                {!isLoggedIn ? (
                  <>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 border-b border-gray-200">
                      <p className="text-xs text-gray-500 mt-0.5">Sign in to access your account</p>
                    </div>
                    
                    <div className="p-2">
                      <Link href="/admin-login" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 font-medium rounded-md hover:bg-blue-50 transition-colors duration-150 group">
                        <div className="bg-blue-100 p-1.5 rounded-md group-hover:bg-blue-200 transition-colors duration-150">
                          <FaUserShield className="text-blue-600" size={16} />
                        </div>
                        <div>
                          <span className="block text-sm">Admin Access</span>
                          <span className="text-xs text-gray-500">For store management</span>
                        </div>
                      </Link>
                      
                      <div className="border-t border-gray-100 my-2"></div>
                      
                      <Link href="/user-login" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 font-medium rounded-md hover:bg-blue-50 transition-colors duration-150 group">
                        <div className="bg-orange-100 p-1.5 rounded-md group-hover:bg-orange-200 transition-colors duration-150">
                          <FaUserCircle className="text-orange-500" size={16} />
                        </div>
                        <span className="block text-sm">User Login</span>
                      </Link>
                      
                      <Link href="/register" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 font-medium rounded-md hover:bg-blue-50 transition-colors duration-150 group">
                        <div className="bg-green-100 p-1.5 rounded-md group-hover:bg-green-200 transition-colors duration-150">
                          <FaUserCircle className="text-green-500" size={16} />
                        </div>
                        <span className="block text-sm">User Sign Up</span>
                      </Link>
                    </div>
                  </>
                ) : isAdmin ? (
                  <>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 border-b border-gray-200">
                      <h3 className="text-sm font-bold text-gray-800">Admin Account</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Manage your store</p>
                    </div>
                    
                    <div className="p-2">
                      <Link href="/adminProfile" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 font-medium rounded-md hover:bg-blue-50 transition-colors duration-150 group">
                        <div className="bg-purple-100 p-1.5 rounded-md group-hover:bg-purple-200 transition-colors duration-150">
                          <FaUserShield className="text-purple-600" size={16} />
                        </div>
                        <span className="block text-sm">Admin Profile</span>
                      </Link>
                      
                      <Link href="/admin-dashboard" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 font-medium rounded-md hover:bg-blue-50 transition-colors duration-150 group">
                        <div className="bg-blue-100 p-1.5 rounded-md group-hover:bg-blue-200 transition-colors duration-150">
                          <FaUserShield className="text-blue-600" size={16} />
                        </div>
                        <span className="block text-sm">Dashboard</span>
                      </Link>
                      
                      <div className="border-t border-gray-100 my-2"></div>
                      
                      <button 
                        onClick={() => {
                          localStorage.removeItem("admin");
                          window.dispatchEvent(new Event('loginStatusChanged'));
                          router.push("/admin-login");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 font-medium rounded-md hover:bg-red-50 transition-colors duration-150 group"
                      >
                        <div className="bg-red-100 p-1.5 rounded-md group-hover:bg-red-200 transition-colors duration-150">
                          <FiUser className="text-red-500" size={16} />
                        </div>
                        <span className="block text-sm">Logout</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 border-b border-gray-200">
                      <h3 className="text-sm font-bold text-gray-800">Your Account</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Manage your profile</p>
                    </div>
                    
                    <div className="p-2">
                      <Link href="/userProfile" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 font-medium rounded-md hover:bg-blue-50 transition-colors duration-150 group">
                        <div className="bg-blue-100 p-1.5 rounded-md group-hover:bg-blue-200 transition-colors duration-150">
                          <FaUserCircle className="text-blue-600" size={16} />
                        </div>
                        <span className="block text-sm">My Profile</span>
                      </Link>
                      
                    
                      
                      <div className="border-t border-gray-100 my-2"></div>
                      
                      <button 
                        onClick={() => {
                          localStorage.removeItem("token");
                          localStorage.removeItem("user");
                          window.dispatchEvent(new Event('loginStatusChanged'));
                          router.push("/user-login");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 font-medium rounded-md hover:bg-red-50 transition-colors duration-150 group"
                      >
                        <div className="bg-red-100 p-1.5 rounded-md group-hover:bg-red-200 transition-colors duration-150">
                          <FiUser className="text-red-500" size={16} />
                        </div>
                        <span className="block text-sm">Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-2 text-sm font-medium text-gray-800">
          {[
            { href: "/", label: "Home" },
            { href: "/inline-skates", label: "Professional Inline Skates" },
            { href: "/quad-skates", label: "Roller/Quad Skates" },
            // { href: "/hockey-skates", label: "Hockey Skates" },
            { href: "/workout-gear", label: "Workout Gear" },
            { href: "/Contact", label: "Contact" },
            ...(isAdmin ? [{ href: "/admin-dashboard", label: "Admin Dashboard" }] : [])
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block px-3 py-2 rounded-full ${
                pathname === href
                  ? "bg-blue-100 text-blue-600"
                  : "hover:text-blue-600 hover:bg-blue-100"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}



