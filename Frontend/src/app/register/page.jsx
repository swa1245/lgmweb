// "use client";

// import Link from "next/link";
// import Footer from "@/components/Footer";

// export default function RegisterPage() {
//   return (
//     <div className="flex flex-col min-h-screen justify-between bg-gradient-to-br from-orange-100 to-blue-100  text-black">
//       <div className="flex-grow flex justify-center items-center px-4 py-16 sm:py-24">
//         <div className="w-full max-w-md bg-white/70 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.1)] rounded-2xl px-8 py-10 transition-all duration-300 hover:shadow-2xl border border-gray-200">
//           <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-[#0f172a] drop-shadow-sm">
//             Create an Account
//           </h2>

//           <form className="space-y-5">
//             <div>
//               <label className="block mb-1 text-[18px] font-medium">
//                 Full Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="John Doe"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition-all duration-200 hover:border-gray-400"
//               />
//             </div>

//             <div>
//               <label className="block mb-1 text-[18px] font-medium">
//                 Email Address <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="email"
//                 placeholder="your@email.com"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition-all duration-200 hover:border-gray-400"
//               />
//             </div>

//             <div>
//               <label className="block mb-1 text-[18px] font-medium">
//                 Phone Number  <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="tel"
//                 placeholder="+91 9876543210"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition-all duration-200 hover:border-gray-400"
//               />
//             </div>

//             <div>
//               <label className="block mb-1 text-[18px] font-medium">
//                 Password <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition-all duration-200 hover:border-gray-400"
//               />
//               <p className="text-sm text-gray-500 mt-1 ml-1">
//                 Must be at least 6 characters
//               </p>
//             </div>

//             <div>
//               <label className="block mb-1 text-[18px] font-medium">
//                 Confirm Password <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition-all duration-200 hover:border-gray-400"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-95 mt-5"
//             >
//               Create Account
//             </button>
//           </form>

//           <p className="text-center text-base mt-5 ">
//             Already have an account?{" "}
//             <Link
//               href="/user-login"
//               className="!text-blue-600 hover:underline font-semibold"
//             >
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="text-black  py-6  ">
//         <Footer />
//       </footer>
//     </div>
//   );
// }





'use client';

import { useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Signup successful!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        setMessage(data.message || 'Signup failed');
      }
    } catch (error) {
      setMessage('Something went wrong');
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-between bg-gradient-to-br from-orange-100 to-blue-100 text-black">
      <div className="flex-grow flex justify-center items-center px-4 py-16 sm:py-24">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.1)] rounded-2xl px-8 py-10 transition-all duration-300 hover:shadow-2xl border border-gray-200">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-[#0f172a] drop-shadow-sm">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-[18px] font-medium">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition-all duration-200 hover:border-gray-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-[18px] font-medium">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition-all duration-200 hover:border-gray-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-[18px] font-medium">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition-all duration-200 hover:border-gray-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-[18px] font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition-all duration-200 hover:border-gray-400"
                required
              />
              <p className="text-sm text-gray-500 mt-1 ml-1">
                Must be at least 6 characters
              </p>
            </div>

            <div>
              <label className="block mb-1 text-[18px] font-medium">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition-all duration-200 hover:border-gray-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-95 mt-5"
            >
              Create Account
            </button>

            {message && (
              <p className="text-center mt-4 text-sm text-red-600">{message}</p>
            )}
          </form>

          <p className="text-center text-base mt-5">
            Already have an account?{' '}
            <Link
              href="/user-login"
              className="!text-blue-600 hover:underline font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      <footer className="text-black py-6">
        <Footer />
      </footer>
    </div>
  );
}
