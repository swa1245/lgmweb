"use client";

import Image from "next/image";

export default function HistoryPage() {
  return (
    <section className="bg-white py-16 font-['Poppins']">
      <div className="px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center font-[Arimo]">
          {/* Left Side - Text Content */}
          <div className="space-y-6 order-2 md:order-none">
            <div className="space-y-2">
              <h3 className="text-sky-400 text-lg font-semibold tracking-wider">
                OUR LEGACY
              </h3>
              <h2 className="text-5xl font-bold text-black tracking-tight">
                HISTORY
              </h2>
            </div>
            <div className="text-gray-600 text-lg leading-relaxed">
              <p>
                LGM Sports was founded in 2016 and conducts its business
                operations out of Pune, Maharashtra, India. We manufacture,
                supply, and export items like Roller Skating Safety Nofear Guard
                Set, LGM Quad Roller Skating Shoes, Skating Inline Skate
                Specers, PVC Head Guard Fluorescent, Skate Bag, and more.
                <br />
                <br />
                The operational success of our company is based on its highly
                skilled personnel. At LGM Sports, we understand how important it
                is to have a skilled workforce that encourages the development
                of strong qualities in our workplace. These people make sure
                that every project undertaken is completed effectively,
                maintaining our position as a leading manufacturer in the
                skating industry.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="h-[2px] w-12 bg-orange-500"></div>
              <span className="text-orange-500 font-semibold tracking-wider">
                SINCE 2016
              </span>
            </div>
            <div className="mt-8">
              <Image
                src="/logo/lo.jpg"
                alt="LGM Sports Logo"
                className="opacity-90"
                height={64}
                width={64}
              />
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative group order-1 md:order-none mx-auto md:mx-10 md:px-10 md:ml-0 md:h-[60vh] mb-8 md:mb-0">
            <Image
              src="/banner/history.jpg"
              alt="LGM Sports History"
              fill
                className="grayscale transition-all duration-500 group-hover:grayscale-0 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
