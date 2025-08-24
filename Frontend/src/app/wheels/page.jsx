"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";
import { CheckCircle } from "lucide-react";

// // Example imports for images from /public (adjust names to match your files)
import blackMagic901 from "public/1000211267.png";

import yoruWheel1 from "public/1000210678.png";

const Wheels = () => {
  const [view, setView] = useState("grid");
  const { addToCart } = useCart();
  const [stockStatus, setStockStatus] = useState({});
  const [wheelType, setWheelType] = useState("inline"); // 'inline' or 'quad'
  const [activeWheels, setActiveWheels] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Inline wheels
  const inlineWheels = [
    {
      id: "inline-wheel-1001",
      name: "90mm Black Magic XF",
      // images: [blackMagic90_1, blackMagic90_2, blackMagic90_3],
      image: blackMagic901,
      price: 2499,
      description:
        "Professional racing wheels with superior grip and durability",
      specs: {
        usage: "Speed Skating",
        quantity: "8 pcs",
        size: "90mm",
        hardness: "85A",
        core: "Aluminum",
      },
    },
    {
      id: "inline-wheel-1002",
      name: "100mm Black Magic XF",
      // images: [blackMagic100_1, blackMagic100_2, blackMagic100_3],
      // image: blackMagic1001,
      price: 2999,
      description:
        "High-performance wheels for competitive skating with enhanced control",
      specs: {
        usage: "Racing",
        quantity: "8 pcs",
        size: "100mm",
        hardness: "86A",
        core: "Aluminum",
      },
    },
  ];

  // Quad wheels
  const quadWheels = [
    {
      id: "quad-wheel-1001",
      name: "Hyper Rollo Wheel",
      // images: [
      //   hyperRolloWheel1,
      //   hyperRolloWheel2,
      //   hyperRolloWheel3,
      //   hyperRolloWheel4,
      // ],
      // image: hyperRolloWheel1,
      price: 1999,
      description: "Professional quad skating wheels for superior performance",
      specs: {
        brand: "LGM",
        size: "56mm",
        quantity: "8 pcs",
        usage: "Skating",
      },
    },
    {
      id: "quad-wheel-1002",
      name: "Omen Wheel (Road & Rink)",
      // images: [omenWheel1, omenWheel2],
      // image: omenWheel1,
      price: 2499,
      description: "High-quality wheels for road and rink skating",
      specs: {
        brand: "LGM",
        size: "65mm",
        quantity: "8 pcs",
        usage: "Skating",
      },
    },
  ];

  // Stock check
  const checkStockStatus = () => {
    try {
      const stockStatusData = JSON.parse(
        localStorage.getItem("lgmStockStatus") || "{}"
      );

      const updatedInlineWheels = inlineWheels.map((wheel) => {
        const productId = wheel.id.toString();
        const isOutOfStock = stockStatusData[productId] === false;

        return {
          ...wheel,
          countInStock: isOutOfStock ? 0 : wheel.countInStock || 15,
        };
      });

      const updatedQuadWheels = quadWheels.map((wheel) => {
        const productId = wheel.id.toString();
        const isOutOfStock = stockStatusData[productId] === false;

        return {
          ...wheel,
          countInStock: isOutOfStock ? 0 : wheel.countInStock || 15,
        };
      });

      setActiveWheels(
        wheelType === "inline" ? updatedInlineWheels : updatedQuadWheels
      );
      setStockStatus(stockStatusData);
    } catch (error) {
      console.error("Error checking stock status:", error);
      setActiveWheels(wheelType === "inline" ? inlineWheels : quadWheels);
    }
  };

  const handleAddToCart = (wheel) => {
    try {
      const stockStatusData = JSON.parse(
        localStorage.getItem("lgmStockStatus") || "{}"
      );
      const isOutOfStock = stockStatusData[wheel.id.toString()] === false;

      if (isOutOfStock || wheel.countInStock <= 0) {
        toast.error(`${wheel.name} is currently out of stock`);
        return;
      }

      addToCart({
        id: wheel.id,
        type: wheelType === "quad" ? "quad-wheel" : "inline-wheel",
        name: wheel.name,
        price: wheel.price,
        quantity: 1,
      });

      toast.success(`${wheel.name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    checkStockStatus();

    const handleStorageChange = (event) => {
      if (
        event.key === "lgmStockStatus" ||
        event.key === "lgmStockUpdateTime" ||
        event.key === null
      ) {
        checkStockStatus();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [wheelType]);

  return (
    <div className="min-h-screen bg-white font-">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Text Section */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              {/* Premium Selection Label */}
              <div className="inline-flex items-center mb-4">
                <div className="px-3 py-1.5 bg-white/90 backdrop-blur rounded-lg shadow-md border border-gray-100">
                  <span className="text-gray-900 font-medium tracking-wide text-xs sm:text-sm uppercase">
                    Premium Selection
                  </span>
                </div>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-black leading-tight">
                Professional{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">
                  Skating Wheels
                </span>
              </h1>

              {/* Subtext */}
              <p className="mt-4 text-lg text-gray-700 max-w-xl">
                Upgrade your skating experience with our high-performance
                wheels. Engineered for speed, durability, and precision for both
                inline and quad skates.
              </p>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <Image
                src={wheelType === "inline" ? blackMagic901 : hyperRolloWheel1}
                alt="Featured Wheels"
                className="w-full h-auto object-contain max-w-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Wheels Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900">
              Featured Wheel Collections
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Discover our premium selection of high-performance wheels for all
              your skating needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Inline Wheels */}
            <div className="bg-blue-50 rounded-2xl shadow-lg p-6 hover:-translate-y-1 transition flex flex-col justify-between">
              {/* Title with Badge */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Inline Wheels
                </h3>
                <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Premium
                </span>
              </div>

              {/* Image */}
              <div className="flex justify-center mb-4">
                <Image
                  src={blackMagic901}
                  alt="Inline Wheels"
                  className="object-contain"
                />
              </div>

              {/* Description */}
              <p className="text-gray-600 text-center mb-4">
                High-performance inline wheels designed for speed, control, and
                durability. Perfect for racing, fitness, and recreational
                skating.
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-blue-600 w-5 h-5" />
                  <span className="text-gray-700">
                    Sizes from 90mm to 110mm
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-blue-600 w-5 h-5" />
                  <span className="text-gray-700">
                    Hardness ratings for all surfaces
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-blue-600 w-5 h-5" />
                  <span className="text-gray-700">
                    Premium urethane formulas
                  </span>
                </li>
              </ul>

              {/* Button */}
              <Link href="/inline-wheels">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition">
                  View Collection →
                </button>
              </Link>
            </div>

            {/* Quad Wheels */}
            <div className="bg-purple-50 rounded-2xl shadow-lg p-6 hover:-translate-y-1 transition flex flex-col justify-between">
              {/* Title with Badge */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Quad Wheels</h3>
                <span className="bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Professional
                </span>
              </div>

              {/* Image */}
              <div className="flex justify-center mb-4">
                <Image
                  src={yoruWheel1}
                  alt="Quad Wheels"
                  className="object-contain"
                />
              </div>

              {/* Description */}
              <p className="text-gray-600 text-center mb-4">
                Professional quad wheels engineered for roller derby, artistic
                skating, and rink skating. Superior grip and smooth rolling
                performance.
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-purple-600 w-5 h-5" />
                  <span className="text-gray-700">
                    Variety of sizes and profiles
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-purple-600 w-5 h-5" />
                  <span className="text-gray-700">
                    Indoor and outdoor options
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-purple-600 w-5 h-5" />
                  <span className="text-gray-700">Durable construction</span>
                </li>
              </ul>

              {/* Button */}
              <Link href="/quad-wheels">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl transition">
                  View Collection →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Information */}
      <div className="bg-gray-50 py-16">
        <div className="container  ">
          <div className="max-w-4xl mx-50 space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                125mm Inline Wheels
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The 125mm inline skate wheel is truly paramount to the sport in
                the evolution of the inline world championships. Bont has won
                more medallions with these than 110mm wheels were permitted into
                the world championships than any other brand. The Bont Red Magic
                Marathon wheel dominates the 125mm Inline Wheel market.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                110mm Inline Wheels
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The Bont 110mm Red magic inline wheel in conjunction with MPC
                wheels is the most winning 110mm inline skate wheel in the
                world. Now with the introduction of the Bont pro 110mm inline
                wheels we are racing the bar even higher.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                100mm Inline Wheels
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The Bont Red magic 100mm inline racing wheel is the fastest
                100mm inline wheel on the market for racing at the highest
                level. For skaters looking for serious and reliable wheels, Pro
                recreational skaters, the Bont 100mm inline wheels are the best
                on the market.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                90mm Inline Wheels
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Bont makes a range of 90mm inline wheels from the professional
                Red magic to the 90mm Elemental inline wheel which is perfect
                for training and junior racing.
              </p>
            </section>

            <section>
              <h2 className="text-3xl  font-bold text-gray-900 mb-4">
                80mm Inline Wheels
              </h2>
              <p className="text-gray-600 leading-relaxed">
                It wasn't some time ago that 80mm inline wheels were dominating
                the racing scene. These days 80mm inline wheels are more suited
                to junior racing and recreational skating. Bont makes a range of
                80mm inline wheels from tubeless for all kinds of inline
                skating.
              </p>
            </section>

            <section>
              <h2 className="text-3xl  font-bold text-gray-900 mb-4">
                Wet Weather Inline Wheels
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Partnering with MPC wheels, Bont provide skaters with the best
                wet weather wheels on the market. The MPC Storm Surge sets wet
                track records for breakfast. The MPC Storm Surge wet weather
                inline wheels are available in 125mm, 110mm, and 100mm.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wheels;
