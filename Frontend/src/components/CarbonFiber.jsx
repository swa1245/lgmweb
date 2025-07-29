


"use client";

import Image from "next/image";
import Footer from "@/components/Footer";

const CarbonFiber = () => {
  return (
    <section className="relative bg-white py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500 rounded-full filter blur-[120px] opacity-5"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-400 rounded-full filter blur-[120px] opacity-5"></div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Text Section */}
          <div className="lg:w-1/2 space-y-10 text-center lg:text-left font-['Poppins']">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 border-l-2 border-sky-500 text-sky-600 text-sm font-medium tracking-wider">
                ADVANCED TECHNOLOGY
              </div>
              <h2 className="text-4xl sm:text-5xl font-light text-gray-900 leading-tight">
                CARBON <span className="font-semibold text-orange-500">FIBER</span>
              </h2>
              <div className="h-px w-16 bg-gray-300 mx-auto lg:mx-0"></div>
            </div>
            <div className="text-gray-600 text-lg space-y-6 font-light leading-relaxed">
              <p>
                We select our carbon material from the world's #1 carbon manufacturer in
                Japan. The base of our inline skate boots is extra sturdy with
                hand-laid fibers embedded in epoxy thermosetting resin to withstand
                high strain.
              </p>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="h-px w-12 bg-gray-300"></div>
              <span className="text-orange-500 font-light text-sm">01</span>
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 w-full mt-16 lg:mt-0">
            <div className="relative">
              <div className="relative z-10 overflow-hidden group rounded-lg">
                <img
                  src="/banner/carbon.jpg"
                  alt="Carbon Fiber Technology"
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full z-20">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 font-['Poppins']">
                      <div className="w-6 h-0.5 bg-orange-500"></div>
                      <span className="text-orange-400 text-xs font-medium uppercase tracking-wider">
                        Premium Material
                      </span>
                    </div>
                    <h3 className="text-white text-xl sm:text-2xl font-light font-['Poppins']">
                      Advanced <span className="font-semibold">Technology</span>
                    </h3>
                    <p className="text-gray-300 text-sm font-light max-w-xs leading-relaxed font-['Poppins']">
                      Premium Japanese carbon fiber for unmatched strength and performance.
                    </p>
                  </div>
                </div>

                
                {/* Borders */}
                <div className="absolute -bottom-3 -right-3 w-24 h-24 border-r-2 border-b-2 border-orange-500/30"></div>
                <div className="absolute -top-3 -left-3 w-24 h-24 border-l-2 border-t-2 border-sky-500/30"></div>
              </div>

              {/* Side Tag Vertical */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white shadow-lg py-5 px-3 hidden sm:flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-4 transform -rotate-90">
                  <span className="text-xs font-medium tracking-widest text-gray-500">
                    JAPANESE
                  </span>
                  <div className="h-px w-6 bg-orange-500"></div>
                  <span className="text-xs font-medium tracking-widest text-gray-800">
                    CARBON
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </section>
  );
};

export default CarbonFiber;
