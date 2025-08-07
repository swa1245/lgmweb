"use client";
import React from "react";

const OnePieceConstruction = () => {
  return (
    <section className="relative bg-white py-24 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500 rounded-full filter blur-[120px] opacity-5"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-400 rounded-full filter blur-[120px] opacity-5 "></div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20 font-['Poppins']">
          {/* Left side - Text content */}
          <div className="lg:w-1/2 space-y-10">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 border-l-2 border-sky-500 text-sky-600 text-sm font-medium tracking-wider font-[Arimo]">
                INNOVATIVE DESIGN
              </div>
              <h2 className="text-5xl font-light text-gray-900 leading-tight font-[Arimo]">
                ONE PIECE{" "}
                <span className="font-semibold font-[Arimo] text-orange-500">CONSTRUCTION</span>
              </h2>
              <div className="h-px w-16 bg-gray-300"></div>
            </div>

            <div className="text-gray-600 text-lg space-y-6 font-light leading-relaxed font-[Arimo]">
              <p>
                Our method of producing high-end inline skates utilizes a unique
                process we call One-Piece Construction. While more skill-intensive
                and time-consuming than mainstream methods, this approach leads the
                market in performance.
              </p>
              <p>
                Unlike two-piece boots where the base is pre-made and components are
                glued on separately, our one-piece construction stitches the outer
                skin directly to anti-stretch material bonded into the carbon. This
                ensures your skates maintain their shape and performance over time.
              </p>
              <p className="text-sky-600 font-normal">
                This process was pioneered in the production of custom speed skates,
                setting new standards in skate manufacturing.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-gray-300"></div>
              <span className="text-orange-500 font-light text-sm font-[Arimo]">03</span>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="lg:w-1/2 mt-16 lg:mt-0">
            <div className="relative">
              <div className="relative z-10 overflow-hidden group">
                <img
                  src="/banner/one-piece-construction_900x.webp"
                  alt="One Piece Construction"
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 group-hover:filter group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full z-20 font-[Arimo]">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-0.5 bg-orange-500"></div>
                      <span className="text-orange-400 text-xs font-medium uppercase tracking-wider">
                        Innovative Design
                      </span>
                    </div>
                    <h3 className="text-white text-2xl font-light">
                      One Piece <span className="font-semibold">Construction</span>
                    </h3>
                    <p className="text-gray-300 text-sm font-light max-w-xs leading-relaxed">
                      Our one-piece construction ensures superior performance and durability
                    </p>
                  </div>
                </div>

                

                {/* Decorative corners */}
                <div className="absolute -bottom-3 -right-3 w-24 h-24 border-r-2 border-b-2 border-orange-500/30"></div>
                <div className="absolute -top-3 -left-3 w-24 h-24 border-l-2 border-t-2 border-sky-500/30"></div>
              </div>

              {/* Technical badge */}
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg py-6 px-3 flex flex-col items-center justify-center font-['Poppins']">
                <div className="flex flex-col items-center gap-4 transform -rotate-90 font-['Poppins']">
                  <span className="text-xs font-medium tracking-widest text-gray-500">
                    UNIQUE
                  </span>
                  <div className="h-px w-6 bg-orange-500"></div>
                  <span className="text-xs font-medium tracking-widest text-gray-800">
                    DESIGN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnePieceConstruction;
