"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft, FaBicycle } from "react-icons/fa";
import { motion } from "framer-motion";

const CyclingPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 via-blue-200 to-white font-['Arimo']">
      {/* Back button */}
      <div className="container mx-auto px-4 pt-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>
      </div>

      {/* Hero section with animated elements */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          
          <div className="relative bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-12 md:p-16 max-w-3xl mx-auto text-center z-10 border border-white border-opacity-20">
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-500 to-blue-500 flex items-center justify-center">
                <FaBicycle className="text-white text-4xl" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-orange-500 to-blue-600 text-transparent bg-clip-text">
              Cycling Products
            </h1>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Products Coming Soon</h2>
            
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-10">
              We're working hard to bring you the best cycling products. Stay tuned for our upcoming collection!
            </p>
            
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto rounded-full"></div>
          </div>
        </motion.div>
      </div>
      
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default CyclingPage;
