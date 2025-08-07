// // // // "use client";
// // // // import { useState } from "react";
// // // // import Link from "next/link";
// // // // import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
// // // // import { MdKeyboardArrowDown } from "react-icons/md";
// // // // import { HiMenu } from "react-icons/hi";
// // // // import { Truck, GraduationCap } from "lucide-react";
// // // // import { FaUserShield, FaUserCircle } from "react-icons/fa";


// // // // export default function Navbar() {
// // // //   const [showDropdown, setShowDropdown] = useState(false);
// // // //   const [showLoginDropdown, setShowLoginDropdown] = useState(false);
// // // //   const [mobileMenu, setMobileMenu] = useState(false);

// // // //   return (
// // // //     <>
// // // // {/* Top Offer Bar */}
// // // // <div className="bg-orange-400 text-white text-md text-center py-2 font-bold font-[Arimo] flex justify-center items-center gap-4">
// // // //   <div
// // // //     className="flex items-center gap-1"
// // // //     style={{
// // // //       animation: 'blinkSlow 2.5s ease-in-out infinite'
// // // //     }}
// // // //   >
// // // //     <Truck size={18} className="text-white" />
// // // //     <span>Free Delivery on Every Order</span>
// // // //   </div>

// // // //   <span className="text-white">|</span>

// // // //   <div
// // // //     className="flex items-center gap-1"
// // // //     style={{
// // // //       animation: 'blinkSlow 2.5s ease-in-out infinite'
// // // //     }}
// // // //   >
// // // //     <GraduationCap size={18} className="text-white" />
// // // //     <span>Extra 10% Discount for Academic Students</span>
// // // //   </div>

// // // //   {/* Inline style tag for animation */}
// // // //   <style jsx>{`
// // // //     @keyframes blinkSlow {
// // // //       0%, 100% { opacity: 1; }
// // // //       50% { opacity: 0.3; }
// // // //     }
// // // //   `}</style>
// // // // </div>


// // // //       {/* Navbar */}
// // // //       <nav className="bg-white shadow-sm font-[Arimo] font-semibold px-4 md:px-12 py-3 flex justify-between items-center">
// // // //         {/* Left: Logo + Nav Links */}
// // // //         <div className="flex items-center gap-6">
// // // //           <HiMenu
// // // //             className="text-2xl text-gray-700 md:hidden"
// // // //             onClick={() => setMobileMenu(!mobileMenu)}
// // // //           />

// // // //           <div className="hidden md:flex items-center gap-6 text-[15px] font-medium text-gray-700">
// // // //             <Link
// // // //               href="/"
// // // //               className="bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full"
// // // //             >
// // // //               Home
// // // //             </Link>
// // // //             <Link href="#" className="hover:text-blue-600">
// // // //               Inline Skates
// // // //             </Link>
// // // //             <Link href="#" className="hover:text-blue-600">
// // // //               Roller/Quad Skates
// // // //             </Link>

// // // //             <div
// // // //               className="relative"
// // // //               onMouseEnter={() => setShowDropdown(true)}
// // // //               onMouseLeave={() => setShowDropdown(false)}
// // // //             >
// // // //               <button className="flex items-center gap-1 hover:text-blue-600">
// // // //                 Products <MdKeyboardArrowDown className="text-lg" />
// // // //               </button>
// // // //               {showDropdown && (
// // // //                 <div className="absolute top-8 left-0 bg-white w-48 shadow-lg border rounded z-50">
// // // //                   <Link
// // // //                     href="#"
// // // //                     className="block px-4 py-2 text-black font-semibold hover:bg-gray-100"
// // // //                   >
// // // //                     Hockey Skates
// // // //                   </Link>
// // // //                   <Link
// // // //                     href="#"
// // // //                     className="block px-4 py-2 text-black font-semibold hover:bg-gray-100"
// // // //                   >
// // // //                     Workout Gear
// // // //                   </Link>
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             <Link href="#" className="hover:text-blue-600">
// // // //               Hockey Skates
// // // //             </Link>
// // // //             <Link href="#" className="hover:text-blue-600">
// // // //               Workout Gear
// // // //             </Link>
// // // //             <Link href="#" className="hover:text-blue-600">
// // // //               Contact
// // // //             </Link>
// // // //           </div>
// // // //         </div>

// // // //         {/* Right: Search + Icons */}
// // // //         <div className="flex items-center gap-3 md:gap-4 relative font-[Arimo] font-semibold">
// // // //           {/* Search */}
// // // //           <div className="hidden md:block relative">
// // // //             <input
// // // //               type="text"
// // // //               placeholder="Search products..."
// // // //               className="rounded-full border border-gray-300 py-2 px-4 pr-10 text-sm w-64 outline-none text-gray-800"
// // // //             />
// // // //             <FiSearch className="absolute top-2.5 right-4 text-gray-500 text-lg" />
// // // //           </div>

// // // //           {/* Cart */}
// // // //           <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
// // // // <FiShoppingCart className="text-gray-800 text-xl" strokeWidth={2.5} />

// // // //           </button>

// // // //           {/* User Login Dropdown */}
// // // //           <div className="relative  font-semibold">
// // // //             <button
// // // //               onClick={() => setShowLoginDropdown(!showLoginDropdown)}
// // // //               className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
// // // //             >
// // // //               <FiUser className="text-gray-800 text-xl" strokeWidth={2.5} />

// // // //             </button>

// // // // {showLoginDropdown && (
// // // //               <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg z-50">
// // // //                 <Link
// // // //                   href="/admin-login"
// // // //                   className="flex items-center gap-2 px-4 py-2 !text-black font-semibold !hover:bg-gray-100"
// // // //                 >
// // // //                   <FaUserShield className="text-gray-600" />
// // // //                   Admin Access
// // // //                 </Link>
// // // //                 <hr className="my-1" />
// // // //                 <Link
// // // //                   href="/user-login"
// // // //                   className="flex items-center gap-2 px-4 py-2 !text-black font-semibold !hover:bg-gray-100"
// // // //                 >
// // // //                   <FaUserCircle className="text-gray-600" />
// // // //                   User Login
// // // //                 </Link>
// // // //                 <Link
// // // //                   href="/register"
// // // //                   className="flex items-center gap-2 px-4 py-2 !text-black font-semibold !hover:bg-gray-100"
// // // //                 >
// // // //                   <FaUserCircle className="text-gray-600" />
// // // //                   Sign Up
// // // //                 </Link>
// // // //               </div>
// // // //             )}

// // // //           </div>
// // // //         </div>
// // // //       </nav>

// // // //       {/* Mobile Menu */}
// // // //       {mobileMenu && (
// // // //         <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-2 text-sm font-medium text-gray-800 font-semibold]">
// // // //           <Link href="#" className="block">
// // // //             Inline Skates
// // // //           </Link>
// // // //           <Link href="#" className="block">
// // // //             Roller/Quad Skates
// // // //           </Link>
// // // //           <Link href="#" className="block">
// // // //             Hockey Skates
// // // //           </Link>
// // // //           <Link href="#" className="block">
// // // //             Workout Gear
// // // //           </Link>
// // // //           <Link href="#" className="block">
// // // //             Contact
// // // //           </Link>
// // // //         </div>
// // // //       )}
// // // //     </>
// // // //   );
// // // // }









// // // "use client";
// // // import { useState, useRef, useEffect } from "react";
// // // import Link from "next/link";
// // // import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
// // // import { MdKeyboardArrowDown } from "react-icons/md";
// // // import { HiMenu } from "react-icons/hi";
// // // import { Truck, GraduationCap } from "lucide-react";
// // // import { FaUserShield, FaUserCircle } from "react-icons/fa";

// // // export default function Navbar() {
// // //   const [showDropdown, setShowDropdown] = useState(false);
// // //   const [showLoginDropdown, setShowLoginDropdown] = useState(false);
// // //   const [mobileMenu, setMobileMenu] = useState(false);
// // //   const loginDropdownRef = useRef(null);

// // //   // Close dropdown when clicking outside
// // //   useEffect(() => {
// // //     const handleClickOutside = (e) => {
// // //       if (loginDropdownRef.current && !loginDropdownRef.current.contains(e.target)) {
// // //         setShowLoginDropdown(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   return (
// // //     <>
// // //       {/* Top Offer Bar */}
// // //       <div className="bg-orange-400 text-white text-md text-center py-2 font-bold font-[Arimo] flex justify-center items-center gap-4">
// // //         <div className="flex items-center gap-1 animate-blinkSlow">
// // //           <Truck size={18} className="text-white" />
// // //           <span>Free Delivery on Every Order</span>
// // //         </div>
// // //         <span className="text-white">|</span>
// // //         <div className="flex items-center gap-1 animate-blinkSlow">
// // //           <GraduationCap size={18} className="text-white" />
// // //           <span>Extra 10% Discount for Academic Students</span>
// // //         </div>
// // //         <style jsx>{`
// // //           @keyframes blinkSlow {
// // //             0%, 100% { opacity: 1; }
// // //             50% { opacity: 0.3; }
// // //           }
// // //           .animate-blinkSlow {
// // //             animation: blinkSlow 2.5s ease-in-out infinite;
// // //           }
// // //         `}</style>
// // //       </div>

// // //       {/* Navbar */}
// // //       <nav className="bg-white shadow-sm font-semibold px-4 md:px-12 py-3 flex justify-between items-center">
// // //         {/* Left Nav */}
// // //         <div className="flex items-center gap-6">
// // //           <HiMenu
// // //             className="text-2xl text-gray-700 md:hidden"
// // //             onClick={() => setMobileMenu(!mobileMenu)}
// // //           />

// // //           <div className="hidden md:flex items-center gap-6 text-[15px] font-medium text-gray-700">
// // //             <Link href="/" className="bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full">
// // //               Home
// // //             </Link>
// // //             <Link href="#" className="hover:text-blue-600">Inline Skates</Link>
// // //             <Link href="#" className="hover:text-blue-600">Roller/Quad Skates</Link>

// // //             <div
// // //               className="relative"
// // //               onMouseEnter={() => setShowDropdown(true)}
// // //               onMouseLeave={() => setShowDropdown(false)}
// // //             >
// // //               <button className="flex items-center gap-1 hover:text-blue-600">
// // //                 Products <MdKeyboardArrowDown className="text-lg" />
// // //               </button>
// // //               {showDropdown && (
// // //                 <div className="absolute top-8 left-0 bg-white w-48 shadow-lg border rounded z-50">
// // //                   <Link href="#" className="block px-4 py-2 text-black font-semibold hover:bg-gray-100">Hockey Skates</Link>
// // //                   <Link href="#" className="block px-4 py-2 text-black font-semibold hover:bg-gray-100">Workout Gear</Link>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             <Link href="#" className="hover:text-blue-600">Hockey Skates</Link>
// // //             <Link href="#" className="hover:text-blue-600">Workout Gear</Link>
// // //             <Link href="#" className="hover:text-blue-600">Contact</Link>
// // //           </div>
// // //         </div>

// // //         {/* Right Icons */}
// // //         <div className="flex items-center gap-3 md:gap-4 relative font-semibold">
// // //           {/* Search */}
// // //           <div className="hidden md:block relative">
// // //             <input
// // //               type="text"
// // //               placeholder="Search products..."
// // //               className="rounded-full border border-gray-300 py-2 px-4 pr-10 text-sm w-64 outline-none text-gray-800"
// // //             />
// // //             <FiSearch className="absolute top-2.5 right-4 text-gray-500 text-lg" />
// // //           </div>

// // // {/* Cart Icon */}
// // // <Link href="/cart">
// // //   <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
// // //     <FiShoppingCart className="text-gray-800 text-xl" strokeWidth={2.5} />
// // //   </button>
// // // </Link>


// // //           {/* User Dropdown */}
// // //           <div className="relative" ref={loginDropdownRef}>
// // //             <button
// // //               onClick={() => setShowLoginDropdown((prev) => !prev)}
// // //               className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
// // //             >
// // //               <FiUser className="text-gray-800 text-xl" strokeWidth={2.5} />
// // //             </button>

// // //             {showLoginDropdown && (
// // //               <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg z-50">
// // //                 <Link
// // //                   href="/admin-login"
// // //                   className="flex items-center gap-2 px-4 py-2 !text-black font-semibold !hover:bg-gray-100"
// // //                 >
// // //                   <FaUserShield className="text-gray-600" />
// // //                   Admin Access
// // //                 </Link>
// // //                 <hr className="my-1" />
// // //                 <Link
// // //                   href="/user-login"
// // //                   className="flex items-center gap-2 px-4 py-2 !text-black font-semibold !hover:bg-gray-100"
// // //                 >
// // //                   <FaUserCircle className="text-gray-600" />
// // //                   User Login
// // //                 </Link>
// // //                 <Link
// // //                   href="/register"
// // //                   className="flex items-center gap-2 px-4 py-2 !text-black font-semibold !hover:bg-gray-100"
// // //                 >
// // //                   <FaUserCircle className="text-gray-600" />
// // //                   Sign Up
// // //                 </Link>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </nav>

// // //       {/* Mobile Menu */}
// // //       {mobileMenu && (
// // //         <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-2 text-sm font-medium text-gray-800 ">
// // //           <Link href="#" className="block">Inline Skates</Link>
// // //           <Link href="#" className="block">Roller/Quad Skates</Link>
// // //           <Link href="#" className="block">Hockey Skates</Link>
// // //           <Link href="#" className="block">Workout Gear</Link>
// // //           <Link href="#" className="block">Contact</Link>
// // //         </div>
// // //       )}
// // //     </>
// // //   );
// // // }





"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
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
  const loginDropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!admin || !!token);
    setIsAdmin(!!admin);
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

  const handleProfileClick = () => {
    const admin = localStorage.getItem("admin");
    const token = localStorage.getItem("token");

    if (admin) {
      router.push("/adminProfile");
    } else if (token) {
      router.push("/userProfile");
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

          <div className="hidden md:flex items-center gap-6 text-[15px] font-medium">
            <Link href="/" className={navLinkClass("/")}>Home</Link>
            <Link href="/inline-skates" className={navLinkClass("/inline-skates")}>Inline Skates</Link>
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
                  <Link href="/hockey-skates" className="block px-4 py-2 !text-black">Hockey Skates</Link>
                  <Link href="/workout-gear" className="block px-4 py-2 !text-black">Workout Gear</Link>
                </div>
              )}
            </div>

            <Link href="/hockey-skates" className={navLinkClass("/hockey-skates")}>Hockey Skates</Link>
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
            <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
              <FiShoppingCart className="text-gray-800 text-xl" strokeWidth={2.5} />
            </button>
          </Link>

          <div className="relative" ref={loginDropdownRef}>
            <button
              onClick={handleProfileClick}
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 relative"
            >
              <FiUser className="text-gray-800 text-xl" strokeWidth={2.5} />
              {isLoggedIn && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></span>
              )}
            </button>

            {!isLoggedIn && showLoginDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg z-50 text-black">
                <Link href="/admin-login" className="flex items-center gap-2 px-4 py-2 text-black font-semibold hover:bg-gray-100">
                  <FaUserShield className="text-gray-600" />
                  Admin Access
                </Link>
                <hr className="my-1" />
                <Link href="/user-login" className="flex items-center gap-2 px-4 py-2 text-black font-semibold hover:bg-gray-100">
                  <FaUserCircle className="text-gray-600" />
                  User Login
                </Link>
                <Link href="/register" className="flex items-center gap-2 px-4 py-2 text-black font-semibold hover:bg-gray-100">
                  <FaUserCircle className="text-gray-600" />
                  User Sign Up
                </Link>
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
            { href: "/inline-skates", label: "Inline Skates" },
            { href: "/quad-skates", label: "Roller/Quad Skates" },
            { href: "/hockey-skates", label: "Hockey Skates" },
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






// "use client";
// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { HiMenu } from "react-icons/hi";
// import { Truck, GraduationCap } from "lucide-react";
// import { FaUserShield, FaUserCircle } from "react-icons/fa";

// export default function Navbar() {
//   const pathname = usePathname();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showLoginDropdown, setShowLoginDropdown] = useState(false);
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const loginDropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (loginDropdownRef.current && !loginDropdownRef.current.contains(e.target)) {
//         setShowLoginDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const isActive = (path) => pathname === path;

//   const SvgUnderline = ({ active }) => (
//     active ? (
//       <svg
//         viewBox="0 0 100 5"
//         preserveAspectRatio="none"
//         className="absolute bottom-0 left-0 w-full h-[5px]"
//       >
//         <path
//           d="M0,0 Q50,10 100,0"
//           stroke="#3b82f6"
//           strokeWidth="5"
//           fill="none"
//         />
//       </svg>
//     ) : null
//   );

//   const NavItem = ({ href, label }) => {
//     const active = isActive(href);
//     return (
//       <div className="relative flex items-center">
//         <Link
//           href={href}
//           className={`relative px-4 py-2 font-medium ${
//             active ? "text-blue-600" : "hover:text-blue-600"
//           }`}
//         >
//           {label}
//         </Link>
//         <SvgUnderline active={active} />
//       </div>
//     );
//   };

//   return (
//     <>
//       {/* Top Offer Bar */}
//       <div className="bg-gradient-to-r from-orange-text-white text-sm text-center py-2 font-bold font-sans flex justify-center gap-4 animate-pulse">
//         <div className="flex items-center gap-1">
//           <Truck size={18} />
//           Free Delivery on Every Order
//         </div>
//         <span>|</span>
//         <div className="flex items-center gap-1">
//           <GraduationCap size={18} />
//           10% Discount for Students
//         </div>
//       </div>


//       {/* Navbar */}
//       <nav className="bg-white shadow-sm font-semibold px-4 md:px-12 py-3 flex justify-between items-center">
//         {/* Left Nav */}
//         <div className="flex items-center gap-6">
//           <HiMenu
//             className="text-2xl text-gray-700 md:hidden"
//             onClick={() => setMobileMenu(!mobileMenu)}
//           />

//           <div className="hidden md:flex items-center gap-6 text-[15px] font-medium text-gray-700">
//             <NavItem href="/" label="Home" />
//             <NavItem href="/inline-skates" label="Inline Skates" />
//             <NavItem href="/quad-skates" label="Roller/Quad Skates" />

//             <div
//               className="relative"
//               onMouseEnter={() => setShowDropdown(true)}
//               onMouseLeave={() => setShowDropdown(false)}
//             >
//               <button className="flex items-center gap-1 hover:text-blue-600 relative">
//                 Products <MdKeyboardArrowDown className="text-lg" />
//               </button>
//               {showDropdown && (
//                 <div className="absolute top-8 left-0 bg-white w-48 shadow-lg border rounded z-50">
//                   <Link href="/hockey-skates" className="block px-4 py-2 text-black font-semibold hover:bg-gray-100">
//                     Hockey Skates
//                   </Link>
//                   <Link href="/workout-gear" className="block px-4 py-2 text-black font-semibold hover:bg-gray-100">
//                     Workout Gear
//                   </Link>
//                 </div>
//               )}
//             </div>

//             <NavItem href="/hockey-skates" label="Hockey Skates" />
//             <NavItem href="/workout-gear" label="Workout Gear" />
//             <NavItem href="/Contact" label="Contact" />
//           </div>
//         </div>

//         {/* Right Icons */}
//         <div className="flex items-center gap-3 md:gap-4 relative font-semibold">
//           <div className="hidden md:block relative">
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="rounded-full border border-gray-300 py-2 px-4 pr-10 text-sm w-64 outline-none text-gray-800"
//             />
//             <FiSearch className="absolute top-2.5 right-4 text-gray-500 text-lg" />
//           </div>

//           <Link href="/cart">
//             <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
//               <FiShoppingCart className="text-gray-800 text-xl" strokeWidth={2.5} />
//             </button>
//           </Link>

//           <div className="relative" ref={loginDropdownRef}>
//             <button
//               onClick={() => setShowLoginDropdown((prev) => !prev)}
//               className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
//             >
//               <FiUser className="text-gray-800 text-xl" strokeWidth={2.5} />
//             </button>

//             {showLoginDropdown && (
//               <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg z-50">
//                 <Link href="/admin-login" className="flex items-center gap-2 px-4 py-2 text-black font-semibold hover:bg-gray-100">
//                   <FaUserShield className="text-gray-600" />
//                   Admin Access
//                 </Link>
//                 <hr className="my-1" />
//                 <Link href="/user-login" className="flex items-center gap-2 px-4 py-2 !text-black font-semibold hover:bg-gray-100">
//                   <FaUserCircle className="text-gray-600" />
//                   User Login
//                 </Link>
//                 <Link href="/register" className="flex items-center gap-2 px-4 py-2 !text-black font-semibold hover:bg-gray-100">
//                   <FaUserCircle className="text-gray-600" />
//                   User Sign Up
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       {mobileMenu && (
//         <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-2 text-sm font-medium text-gray-800">
//           {[ 
//             { href: "/", label: "Home" },
//             { href: "/inline-skates", label: "Inline Skates" },
//             { href: "/quad-skates", label: "Roller/Quad Skates" },
//             { href: "/hockey-skates", label: "Hockey Skates" },
//             { href: "/workout-gear", label: "Workout Gear" },
//             { href: "/Contact", label: "Contact" },
//           ].map(({ href, label }) => (
//             <Link
//               key={href}
//               href={href}
//               className={`block px-3 py-2 rounded-md ${
//                 isActive(href) ? "bg-blue-100 text-blue-600" : "hover:text-blue-600"
//               }`}
//             >
//               {label}
//             </Link>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }
