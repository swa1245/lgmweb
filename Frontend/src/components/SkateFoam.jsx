
"use client";
import React from "react";

const SkateFoam = () => {
  return (
    <section className="relative bg-white py-24 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full filter blur-[120px] opacity-5"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-400 rounded-full filter blur-[120px] opacity-5"></div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-20">
          {/* Text content */}
          <div className="lg:w-1/2 space-y-10 text-center lg:text-left font-[Arimo]">
            <div className="space-y-4 font-[Arimo]">
              <div className="inline-block px-3 py-1 border-l-2 border-sky-500 text-sky-600 text-sm font-medium tracking-wider font-[Arimo]">
                PREMIUM QUALITY
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight">
                SKATE <span className="font-semibold text-orange-500">FOAM</span>
              </h2>
              <div className="h-px w-16 bg-gray-300 mx-auto lg:mx-0"></div>
            </div>

            <p className="text-gray-600 text-lg font-light leading-relaxed ">
              Unlike most brands of inline skates, we exclusively use closed cell memory foam.
              It doesn’t absorb water or sweat, keeping your skates dry and fresh.
            </p>

            <div className="flex justify-center lg:justify-start items-center gap-4">
              <div className="h-px w-12 bg-gray-300"></div>
              <span className="text-orange-500 font-light text-sm font-[Arimo]">02</span>
            </div>
          </div>

          {/* Image section */}
          <div className="lg:w-1/2 w-full mt-16 lg:mt-0">
            <div className="relative">
              <div className="relative z-10 overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/banner/skateFoam.jpg"
                  alt="Skate Foam"
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>

                <div className="absolute bottom-0 left-0 p-6 w-full ">
                  <h3 className="text-white text-2xl font-light mb-2 font-[Arimo]">
                    Premium <span className="font-semibold">Quality</span>
                  </h3>
                  <p className="text-gray-200 text-sm font-light max-w-xs font-[Arimo]">
                    Closed-cell memory foam for superior comfort & moisture resistance
                  </p>
                </div>
              </div>

              {/* Borders */}
              <div className="absolute -top-4 -right-4 w-20 h-20 border border-gray-200 hidden sm:block"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 border border-gray-200 hidden sm:block"></div>

              {/* Tags */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 shadow-sm text-sm hidden md:block font-['Poppins']">
                <span className="text-gray-900 font-light font-['Poppins']">Closed Cell Memory</span>
              </div>
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 shadow-sm text-sm hidden md:block font-['Poppins']">
                <span className="text-gray-900 font-light">Moisture Resistant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkateFoam;
